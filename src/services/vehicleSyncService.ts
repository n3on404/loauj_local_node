import axios from 'axios';
import { prisma } from '../config/database';
import { env } from '../config/environment';
import { RouteService } from './routeService';
import { configService } from '../config/supervisorConfig';

export interface VehicleData {
  id: string;
  licensePlate: string;
  capacity: number;
  model?: string;
  year?: number;
  color?: string;
  isActive: boolean;
  isAvailable: boolean;
  driver?: {
    id: string;
    cin: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    originGovernorateId?: string;
    originDelegationId?: string;
    originAddress?: string;
    accountStatus: string;
    isActive: boolean;
  };
  authorizedStations: Array<{
    stationId: string;
    createdAt: string;
  }>;
}

export class VehicleSyncService {
  private routeService: RouteService;

  constructor() {
    this.routeService = new RouteService();
  }
  /**
   * Check if vehicle data has changed compared to local version
   */
  private hasVehicleChanged(localVehicle: any, incomingVehicle: VehicleData): boolean {
    // Compare main vehicle properties
    if (
      localVehicle.licensePlate !== incomingVehicle.licensePlate ||
      localVehicle.capacity !== incomingVehicle.capacity ||
      localVehicle.model !== (incomingVehicle.model || null) ||
      localVehicle.year !== (incomingVehicle.year || null) ||
      localVehicle.color !== (incomingVehicle.color || null) ||
      localVehicle.isActive !== incomingVehicle.isActive ||
      localVehicle.isAvailable !== incomingVehicle.isAvailable
    ) {
      return true;
    }

    // Compare driver data if present
    if (incomingVehicle.driver && localVehicle.driver) {
      const localDriver = localVehicle.driver;
      const incomingDriver = incomingVehicle.driver;
      
      if (
        localDriver.cin !== incomingDriver.cin ||
        localDriver.phoneNumber !== incomingDriver.phoneNumber ||
        localDriver.firstName !== incomingDriver.firstName ||
        localDriver.lastName !== incomingDriver.lastName ||
        localDriver.originGovernorateId !== (incomingDriver.originGovernorateId || null) ||
        localDriver.originDelegationId !== (incomingDriver.originDelegationId || null) ||
        localDriver.originAddress !== (incomingDriver.originAddress || null) ||
        localDriver.accountStatus !== incomingDriver.accountStatus ||
        localDriver.isActive !== incomingDriver.isActive
      ) {
        return true;
      }
    } else if (!!incomingVehicle.driver !== !!localVehicle.driver) {
      // Driver existence has changed
      return true;
    }

    return false;
  }

  /**
   * Handle full vehicle sync from central server
   */
  async handleFullSync(vehicles: VehicleData[], stationId: string): Promise<{ 
    success: boolean; 
    processed: number; 
    skipped: number;
    errors: string[] 
  }> {
    console.log(`🚐 Processing full vehicle sync: ${vehicles.length} vehicles for station ${stationId}`);
    
    const errors: string[] = [];
    let processed = 0;
    let skipped = 0;

    try {
      // Get existing vehicles from local database
      const existingVehicles = await prisma.vehicle.findMany({
        where: {
          id: { in: vehicles.map(v => v.id) }
        },
        include: {
          driver: true,
          authorizedStations: true
        }
      });

      // Create a map for quick lookup
      const existingVehicleMap = new Map(existingVehicles.map(v => [v.id, v]));

      // Filter vehicles that need to be synced
      const vehiclesToSync = vehicles.filter(vehicleData => {
        // Check if this vehicle is authorized for this station
        const isAuthorizedForStation = vehicleData.authorizedStations.some(
          auth => auth.stationId === stationId
        );

        if (!isAuthorizedForStation) {
          console.warn(`⚠️ Vehicle ${vehicleData.licensePlate} not authorized for station ${stationId}, skipping`);
          skipped++;
          return false;
        }

        // Check if vehicle exists locally
        const existingVehicle = existingVehicleMap.get(vehicleData.id);
        if (!existingVehicle) {
          console.log(`📥 New vehicle to sync: ${vehicleData.licensePlate} (${vehicleData.id})`);
          return true; // New vehicle, needs sync
        }

        // Check if vehicle data has changed
        if (this.hasVehicleChanged(existingVehicle, vehicleData)) {
          console.log(`🔄 Vehicle data changed, updating: ${vehicleData.licensePlate} (${vehicleData.id})`);
          return true; // Vehicle changed, needs sync
        }

        console.log(`⏭️ Vehicle already up-to-date, skipping: ${vehicleData.licensePlate} (${vehicleData.id})`);
        skipped++;
        return false; // Vehicle unchanged, skip sync
      });

      console.log(`📊 Sync summary: ${vehiclesToSync.length} to sync, ${skipped} to skip`);

      // Process vehicles that need syncing (individually to prevent rollback issues)
      if (vehiclesToSync.length > 0) {
        for (const vehicleData of vehiclesToSync) {
          try {
            await prisma.$transaction(async (tx) => {
              // Check if vehicle exists by license plate first
              const existingByLicense = await tx.vehicle.findUnique({
                where: { licensePlate: vehicleData.licensePlate }
              });

              const existingById = await tx.vehicle.findUnique({
                where: { id: vehicleData.id }
              });

              // If there's a conflict (different ID but same license plate), handle it
              if (existingByLicense && existingByLicense.id !== vehicleData.id) {
                console.log(`🔄 License plate conflict detected for ${vehicleData.licensePlate}`);
                console.log(`   Existing ID: ${existingByLicense.id}, New ID: ${vehicleData.id}`);
                
                // Delete the old vehicle and create the new one
                await tx.vehicle.delete({
                  where: { id: existingByLicense.id }
                });
                console.log(`🗑️ Removed old vehicle with ID: ${existingByLicense.id}`);
              }

              // If there's an existing vehicle by ID but different license plate, update it
              if (existingById && existingById.licensePlate !== vehicleData.licensePlate) {
                console.log(`🔄 Vehicle ID exists with different license plate`);
                console.log(`   ID: ${vehicleData.id}, Old LP: ${existingById.licensePlate}, New LP: ${vehicleData.licensePlate}`);
              }

              // Determine default destination from authorized stations
              const currentStationId = configService.getStationId();
              const destinationAuth = vehicleData.authorizedStations.find(
                auth => auth.stationId !== currentStationId
              );
              
              // Get default destination name from route table if available
              let defaultDestinationName = null;
              if (destinationAuth?.stationId) {
                defaultDestinationName = await this.routeService.getStationNameById(destinationAuth.stationId);
              }

              // Now safely upsert the vehicle
              await tx.vehicle.upsert({
                where: { id: vehicleData.id },
                create: {
                  id: vehicleData.id,
                  licensePlate: vehicleData.licensePlate,
                  capacity: vehicleData.capacity,
                  model: vehicleData.model || null,
                  year: vehicleData.year || null,
                  color: vehicleData.color || null,
                  isActive: vehicleData.isActive,
                  isAvailable: vehicleData.isAvailable,
                  // Set default destination based on first non-current authorized station
                  defaultDestinationId: destinationAuth?.stationId || null,
                  defaultDestinationName, // Fetch from route table
                  syncedAt: new Date()
                },
                update: {
                  licensePlate: vehicleData.licensePlate,
                  capacity: vehicleData.capacity,
                  model: vehicleData.model || null,
                  year: vehicleData.year || null,
                  color: vehicleData.color || null,
                  isActive: vehicleData.isActive,
                  isAvailable: vehicleData.isAvailable,
                  syncedAt: new Date()
                  // Note: Don't update default destination on sync to preserve local settings
                }
              });

              // Sync driver AFTER vehicle exists (has foreign key to vehicle)
              if (vehicleData.driver) {
                // Check for existing driver with same CIN
                const existingDriverByCin = await tx.driver.findUnique({
                  where: { cin: vehicleData.driver.cin }
                });

                const existingDriverById = await tx.driver.findUnique({
                  where: { id: vehicleData.driver.id }
                });

                // Handle CIN conflict - if different driver ID has same CIN, we need to handle it
                if (existingDriverByCin && existingDriverByCin.id !== vehicleData.driver.id) {
                  console.log(`🔄 Driver CIN conflict detected for ${vehicleData.driver.cin}`);
                  console.log(`   Existing ID: ${existingDriverByCin.id}, New ID: ${vehicleData.driver.id}`);
                  
                  // Delete the old driver record
                  await tx.driver.delete({
                    where: { id: existingDriverByCin.id }
                  });
                  console.log(`🗑️ Removed old driver with ID: ${existingDriverByCin.id}`);
                }

                // If there's an existing driver by ID but different CIN, update it
                if (existingDriverById && existingDriverById.cin !== vehicleData.driver.cin) {
                  console.log(`🔄 Driver ID exists with different CIN`);
                  console.log(`   ID: ${vehicleData.driver.id}, Old CIN: ${existingDriverById.cin}, New CIN: ${vehicleData.driver.cin}`);
                }

                // Now safely upsert the driver
                await tx.driver.upsert({
                  where: { id: vehicleData.driver.id },
                  create: {
                    id: vehicleData.driver.id,
                    cin: vehicleData.driver.cin,
                    phoneNumber: vehicleData.driver.phoneNumber,
                    firstName: vehicleData.driver.firstName,
                    lastName: vehicleData.driver.lastName,
                    originGovernorateId: vehicleData.driver.originGovernorateId || null,
                    originDelegationId: vehicleData.driver.originDelegationId || null,
                    originAddress: vehicleData.driver.originAddress || null,
                    vehicleId: vehicleData.id,
                    accountStatus: vehicleData.driver.accountStatus,
                    isActive: vehicleData.driver.isActive,
                    syncedAt: new Date()
                  },
                  update: {
                    cin: vehicleData.driver.cin,
                    phoneNumber: vehicleData.driver.phoneNumber,
                    firstName: vehicleData.driver.firstName,
                    lastName: vehicleData.driver.lastName,
                    originGovernorateId: vehicleData.driver.originGovernorateId || null,
                    originDelegationId: vehicleData.driver.originDelegationId || null,
                    originAddress: vehicleData.driver.originAddress || null,
                    vehicleId: vehicleData.id,
                    accountStatus: vehicleData.driver.accountStatus,
                    isActive: vehicleData.driver.isActive,
                    syncedAt: new Date()
                  }
                });
              } else {
                // If no driver in incoming data, remove existing driver if any
                await tx.driver.deleteMany({
                  where: { vehicleId: vehicleData.id }
                });
              }

              // Sync authorized stations for this vehicle
              await tx.vehicleAuthorizedStation.deleteMany({
                where: { vehicleId: vehicleData.id }
              });

              const authorizedStationData = vehicleData.authorizedStations.map((auth, index) => ({
                id: `${vehicleData.id}_${auth.stationId}`, // Generate deterministic ID
                vehicleId: vehicleData.id,
                stationId: auth.stationId,
                stationName: null, // Will be populated later by route sync
                priority: auth.stationId === currentStationId ? 99 : index + 1, // Current station lowest priority
                isDefault: index === 0 && auth.stationId !== currentStationId, // First non-current station is default
                createdAt: new Date(auth.createdAt),
                syncedAt: new Date()
              }));

              await tx.vehicleAuthorizedStation.createMany({
                data: authorizedStationData
              });
            });

            processed++;
            console.log(`✅ Synced vehicle: ${vehicleData.licensePlate} (${vehicleData.id})`);

          } catch (error) {
            const errorMsg = `Failed to sync vehicle ${vehicleData.licensePlate}: ${error instanceof Error ? error.message : 'Unknown error'}`;
            console.error(`❌ ${errorMsg}`);
            errors.push(errorMsg);
          }
        }
      }

      console.log(`✅ Full vehicle sync completed: ${processed} processed, ${skipped} skipped, ${errors.length} errors`);
      return { success: true, processed, skipped, errors };

    } catch (error) {
      const errorMsg = `Full vehicle sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(`❌ ${errorMsg}`);
      return { success: false, processed: 0, skipped: 0, errors: [errorMsg] };
    }
  }

  /**
   * Handle vehicle update from central server
   */
  async handleVehicleUpdate(vehicleData: VehicleData, stationId: string): Promise<{ 
    success: boolean; 
    processed: boolean;
    error?: string 
  }> {
    console.log(`🚐 Processing vehicle update: ${vehicleData.licensePlate} for station ${stationId}`);

    try {
      // Check if this vehicle is authorized for this station
      const isAuthorizedForStation = vehicleData.authorizedStations.some(
        auth => auth.stationId === stationId
      );

      if (!isAuthorizedForStation) {
        // If vehicle is no longer authorized for this station, remove it from local database
        await this.handleVehicleDelete(vehicleData.id);
        return { success: true, processed: true };
      }

      // Check if vehicle exists locally and if it has changed
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleData.id },
        include: {
          driver: true,
          authorizedStations: true
        }
      });

      if (existingVehicle && !this.hasVehicleChanged(existingVehicle, vehicleData)) {
        console.log(`⏭️ Vehicle already up-to-date, skipping update: ${vehicleData.licensePlate} (${vehicleData.id})`);
        return { success: true, processed: false };
      }

      console.log(`${existingVehicle ? '🔄 Updating existing' : '📥 Creating new'} vehicle: ${vehicleData.licensePlate} (${vehicleData.id})`);

      await prisma.$transaction(async (tx) => {
        // Sync vehicle FIRST (no foreign key dependencies)
        await tx.vehicle.upsert({
          where: { id: vehicleData.id },
          create: {
            id: vehicleData.id,
            licensePlate: vehicleData.licensePlate,
            capacity: vehicleData.capacity,
            model: vehicleData.model || null,
            year: vehicleData.year || null,
            color: vehicleData.color || null,
            isActive: vehicleData.isActive,
            isAvailable: vehicleData.isAvailable,
            syncedAt: new Date()
          },
          update: {
            licensePlate: vehicleData.licensePlate,
            capacity: vehicleData.capacity,
            model: vehicleData.model || null,
            year: vehicleData.year || null,
            color: vehicleData.color || null,
            isActive: vehicleData.isActive,
            isAvailable: vehicleData.isAvailable,
            syncedAt: new Date()
          }
        });

        // Sync driver AFTER vehicle exists (has foreign key to vehicle)
        if (vehicleData.driver) {
          await tx.driver.upsert({
            where: { id: vehicleData.driver.id },
            create: {
              id: vehicleData.driver.id,
              cin: vehicleData.driver.cin,
              phoneNumber: vehicleData.driver.phoneNumber,
              firstName: vehicleData.driver.firstName,
              lastName: vehicleData.driver.lastName,
              originGovernorateId: vehicleData.driver.originGovernorateId || null,
              originDelegationId: vehicleData.driver.originDelegationId || null,
              originAddress: vehicleData.driver.originAddress || null,
              vehicleId: vehicleData.id,
              accountStatus: vehicleData.driver.accountStatus,
              isActive: vehicleData.driver.isActive,
              syncedAt: new Date()
            },
            update: {
              cin: vehicleData.driver.cin,
              phoneNumber: vehicleData.driver.phoneNumber,
              firstName: vehicleData.driver.firstName,
              lastName: vehicleData.driver.lastName,
              originGovernorateId: vehicleData.driver.originGovernorateId || null,
              originDelegationId: vehicleData.driver.originDelegationId || null,
              originAddress: vehicleData.driver.originAddress || null,
              vehicleId: vehicleData.id,
              accountStatus: vehicleData.driver.accountStatus,
              isActive: vehicleData.driver.isActive,
              syncedAt: new Date()
            }
          });
        } else {
          // If no driver in incoming data, remove existing driver if any
          await tx.driver.deleteMany({
            where: { vehicleId: vehicleData.id }
          });
        }

        // Update authorized stations for this vehicle
        await tx.vehicleAuthorizedStation.deleteMany({
          where: { vehicleId: vehicleData.id }
        });

        const stationId = configService.getStationId();
        
        // Fetch station names for all authorized stations
        const authorizedStationData = [];
        for (const [index, auth] of vehicleData.authorizedStations.entries()) {
          const stationName = await this.routeService.getStationNameById(auth.stationId);
          
          authorizedStationData.push({
            id: `${vehicleData.id}_${auth.stationId}`, // Generate deterministic ID
            vehicleId: vehicleData.id,
            stationId: auth.stationId,
            stationName, // Fetch from route table
            priority: auth.stationId === stationId ? 99 : index + 1, // Current station lowest priority
            isDefault: index === 0 && auth.stationId !== stationId, // First non-current station is default
            createdAt: new Date(auth.createdAt),
            syncedAt: new Date()
          });
        }

        await tx.vehicleAuthorizedStation.createMany({
          data: authorizedStationData
        });
      });

      console.log(`✅ Vehicle updated: ${vehicleData.licensePlate} (${vehicleData.id})`);
      return { success: true, processed: true };

    } catch (error) {
      const errorMsg = `Failed to update vehicle ${vehicleData.licensePlate}: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(`❌ ${errorMsg}`);
      return { success: false, processed: false, error: errorMsg };
    }
  }

  /**
   * Handle vehicle deletion from central server
   */
  async handleVehicleDelete(vehicleId: string): Promise<{ success: boolean; error?: string }> {
    console.log(`🚐 Processing vehicle deletion: ${vehicleId}`);

    try {
      await prisma.$transaction(async (tx) => {
        // Check if vehicle exists
        const vehicle = await tx.vehicle.findUnique({
          where: { id: vehicleId },
          include: { driver: true }
        });

        if (!vehicle) {
          console.log(`ℹ️ Vehicle ${vehicleId} not found in local database, skipping deletion`);
          return;
        }

        // Delete authorized stations first
        await tx.vehicleAuthorizedStation.deleteMany({
          where: { vehicleId }
        });

        // Delete driver if exists
        if (vehicle.driver) {
          await tx.driver.delete({
            where: { id: vehicle.driver.id }
          });
        }

        // Delete vehicle
        await tx.vehicle.delete({
          where: { id: vehicleId }
        });
      });

      console.log(`✅ Vehicle deleted: ${vehicleId}`);
      return { success: true };

    } catch (error) {
      const errorMsg = `Failed to delete vehicle ${vehicleId}: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(`❌ ${errorMsg}`);
      return { success: false, error: errorMsg };
    }
  }

  /**
   * Ban a vehicle locally and sync to central server
   */
  async banVehicle(vehicleId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Update local DB
      await prisma.vehicle.update({
        where: { id: vehicleId },
        data: { isBanned: true, isActive: false, syncedAt: new Date() }
      });
      // Sync ban status to central server
      try {
        await axios.post(`${env.CENTRAL_SERVER_URL}/api/v1/vehicles/${vehicleId}/ban`);
      } catch (err: any) {
        // Log but do not fail the local ban if central sync fails
        console.error('Failed to sync ban to central server:', err.message || err);
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to ban vehicle' };
    }
  }

  /**
   * Forward driver account request to central server
   */
  async forwardDriverRequest(data: any): Promise<any> {
    try {
      const response = await axios.post(`${env.CENTRAL_SERVER_URL}/api/v1/vehicles/request`, data);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }

  /**
   * Forward fetch pending requests to central server
   */
  async forwardPendingRequests(authHeader?: string): Promise<any> {
    try {
      const response = await axios.get(
        `${env.CENTRAL_SERVER_URL}/api/v1/vehicles/pending`,
        authHeader ? { headers: { Authorization: authHeader } } : undefined
      );
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }

  /**
   * Forward approve request to central server
   */
  async forwardApproveRequest(id: string, authHeader?: string): Promise<any> {
    try {
      const response = await axios.post(
        `${env.CENTRAL_SERVER_URL}/api/v1/vehicles/${id}/approve`,
        {},
        authHeader ? { headers: { Authorization: authHeader } } : undefined
      );
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }

  /**
   * Forward deny request to central server
   */
  async forwardDenyRequest(id: string, authHeader?: string): Promise<any> {
    try {
      const response = await axios.post(
        `${env.CENTRAL_SERVER_URL}/api/v1/vehicles/${id}/deny`,
        {},
        authHeader ? { headers: { Authorization: authHeader } } : undefined
      );
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }

  /**
   * Forward governorates request to central server
   */
  async forwardGovernorates(): Promise<any> {
    try {
      const response = await axios.get(`${env.CENTRAL_SERVER_URL}/api/v1/vehicles/governorates`);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }

  /**
   * Forward delegations request to central server
   */
  async forwardDelegations(governorateId: string): Promise<any> {
    try {
      const response = await axios.get(`${env.CENTRAL_SERVER_URL}/api/v1/vehicles/delegations/${governorateId}`);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }

  /**
   * Forward stations request to central server
   */
  async forwardStations(): Promise<any> {
    try {
      const response = await axios.get(`${env.CENTRAL_SERVER_URL}/api/v1/vehicles/stations`);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }

  /**
   * Forward create station request to central server and sync local DB
   */
  async forwardCreateStation(data: any, authHeader?: string): Promise<any> {
    try {
      const headers = authHeader ? { headers: { Authorization: authHeader } } : undefined;
      const response = await axios.post(`${env.CENTRAL_SERVER_URL}/api/v1/stations`, data, headers);
      // If success, sync the new station to local DB
      if (response.data && response.data.success && response.data.data) {
        // Upsert the station in the local DB
        const station = response.data.data;
        await prisma.stationConfig.upsert({
          where: { stationId: station.id },
          create: {
            stationId: station.id,
            stationName: station.name,
            governorate: station.governorate?.name || station.governorate || '',
            delegation: station.delegation?.name || station.delegation || '',
            address: station.address || '',
            openingTime: station.operatingHours?.openingTime || '06:00',
            closingTime: station.operatingHours?.closingTime || '22:00',
            isOperational: station.isOperational ?? true,
            isOnline: station.isOnline ?? true,
            serverVersion: station.serverVersion || '',
            lastSync: station.lastSync ? new Date(station.lastSync) : null,
            createdAt: station.createdAt ? new Date(station.createdAt) : new Date(),
            updatedAt: station.updatedAt ? new Date(station.updatedAt) : new Date(),
          },
          update: {
            stationName: station.name,
            governorate: station.governorate?.name || station.governorate || '',
            delegation: station.delegation?.name || station.delegation || '',
            address: station.address || '',
            openingTime: station.operatingHours?.openingTime || '06:00',
            closingTime: station.operatingHours?.closingTime || '22:00',
            isOperational: station.isOperational ?? true,
            isOnline: station.isOnline ?? true,
            serverVersion: station.serverVersion || '',
            lastSync: station.lastSync ? new Date(station.lastSync) : null,
            updatedAt: station.updatedAt ? new Date(station.updatedAt) : new Date(),
          }
        });
      }
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }

  /**
   * Get local vehicle statistics
   */
  async getVehicleStats(): Promise<{
    total: number;
    active: number;
    available: number;
    withDrivers: number;
    lastSync?: Date;
  }> {
    try {
      const [total, active, available, withDrivers, lastSyncResult] = await Promise.all([
        prisma.vehicle.count(),
        prisma.vehicle.count({ where: { isActive: true } }),
        prisma.vehicle.count({ where: { isAvailable: true } }),
        prisma.vehicle.count({ where: { driver: { isNot: null } } }),
        prisma.vehicle.findFirst({
          orderBy: { syncedAt: 'desc' },
          select: { syncedAt: true }
        })
      ]);

      return {
        total,
        active,
        available,
        withDrivers,
        ...(lastSyncResult?.syncedAt && { lastSync: lastSyncResult.syncedAt })
      };
    } catch (error) {
      console.error('❌ Error getting vehicle stats:', error);
      throw error;
    }
  }

  /**
   * Get vehicles authorized for current station
   */
  async getLocalVehicles(stationId: string, filters: {
    search?: string;
    isActive?: boolean;
    isAvailable?: boolean;
  } = {}) {
    try {
      const where: any = {
        authorizedStations: {
          some: {
            stationId: stationId
          }
        }
      };

      if (filters.search) {
        where.OR = [
          { licensePlate: { contains: filters.search, mode: 'insensitive' } },
          { model: { contains: filters.search, mode: 'insensitive' } },
          { driver: { 
            OR: [
              { firstName: { contains: filters.search, mode: 'insensitive' } },
              { lastName: { contains: filters.search, mode: 'insensitive' } },
              { cin: { contains: filters.search, mode: 'insensitive' } }
            ]
          }}
        ];
      }

      if (filters.isActive !== undefined) {
        where.isActive = filters.isActive;
      }

      if (filters.isAvailable !== undefined) {
        where.isAvailable = filters.isAvailable;
      }

      const vehicles = await prisma.vehicle.findMany({
        where,
        include: {
          driver: true,
          authorizedStations: true
        },
        orderBy: { syncedAt: 'desc' }
      });

      return vehicles;
    } catch (error) {
      console.error('❌ Error getting local vehicles:', error);
      throw error;
    }
  }
}

export const vehicleSyncService = new VehicleSyncService(); 