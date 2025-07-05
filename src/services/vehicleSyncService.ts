import { prisma } from '../config/database';

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

      // Process vehicles that need syncing
      if (vehiclesToSync.length > 0) {
        await prisma.$transaction(async (tx) => {
          for (const vehicleData of vehiclesToSync) {
            try {
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

              // Sync authorized stations for this vehicle
              await tx.vehicleAuthorizedStation.deleteMany({
                where: { vehicleId: vehicleData.id }
              });

              const authorizedStationData = vehicleData.authorizedStations.map(auth => ({
                id: `${vehicleData.id}_${auth.stationId}`, // Generate deterministic ID
                vehicleId: vehicleData.id,
                stationId: auth.stationId,
                createdAt: new Date(auth.createdAt),
                syncedAt: new Date()
              }));

              await tx.vehicleAuthorizedStation.createMany({
                data: authorizedStationData
              });

              processed++;
              console.log(`✅ Synced vehicle: ${vehicleData.licensePlate} (${vehicleData.id})`);

            } catch (error) {
              const errorMsg = `Failed to sync vehicle ${vehicleData.licensePlate}: ${error instanceof Error ? error.message : 'Unknown error'}`;
              console.error(`❌ ${errorMsg}`);
              errors.push(errorMsg);
            }
          }
        });
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

        const authorizedStationData = vehicleData.authorizedStations.map(auth => ({
          id: `${vehicleData.id}_${auth.stationId}`, // Generate deterministic ID
          vehicleId: vehicleData.id,
          stationId: auth.stationId,
          createdAt: new Date(auth.createdAt),
          syncedAt: new Date()
        }));

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