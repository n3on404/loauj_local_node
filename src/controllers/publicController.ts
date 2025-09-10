import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { EnhancedLocalWebSocketServer } from '../websocket/EnhancedLocalWebSocketServer';

// Import ETD prediction function from localBooking
import { getETDPrediction } from './localBooking';

// Reference to WebSocket server for real-time updates
let localWebSocketServer: EnhancedLocalWebSocketServer | null = null;

// Function to set the WebSocket server instance
export function setPublicControllerWebSocket(wsServer: EnhancedLocalWebSocketServer) {
  localWebSocketServer = wsServer;
}

/**
 * Get ETD prediction for a specific destination
 */
async function getDestinationETD(destinationId: string, seatsNeeded: number = 1, isOvernight: boolean = false): Promise<any> {
  try {
    console.log(`🤖 Getting ETD prediction for ${destinationId} (${seatsNeeded} seats, overnight: ${isOvernight})`);
    const etdPrediction = await getETDPrediction(destinationId, seatsNeeded, undefined, isOvernight);

    return {
      estimatedDepartureTime: etdPrediction.estimated_etd,
      etdHours: etdPrediction.etd_hours,
      confidenceLevel: etdPrediction.confidence_level,
      modelUsed: etdPrediction.model_used,
      queueVehicles: etdPrediction.queue_info?.total_vehicles || 0,
      ...(etdPrediction.overnight_info && {
        overnightInfo: {
          isOvernight: etdPrediction.overnight_info.is_overnight,
          stationOpeningTime: etdPrediction.overnight_info.station_opening_time,
          stationClosingTime: etdPrediction.overnight_info.station_closing_time,
          waitHours: etdPrediction.overnight_info.wait_hours
        }
      })
    };
  } catch (error) {
    console.warn(`⚠️ Could not get ETD for ${destinationId}:`, error);
    return {
      estimatedDepartureTime: null,
      etdHours: null,
      confidenceLevel: 0,
      modelUsed: 'unavailable',
      error: 'ETD prediction unavailable'
    };
  }
}

/**
 * Broadcast real-time updates for route discovery
 */
function broadcastRouteUpdate(type: 'destinations' | 'queue', data: any) {
  if (localWebSocketServer) {
    localWebSocketServer.broadcast({
      type: 'route_discovery_update',
      payload: {
        updateType: type,
        data,
        timestamp: new Date().toISOString()
      },
      timestamp: Date.now()
    });
    
    console.log(`📡 Broadcasted ${type} update to connected clients`);
  }
}

/**
 * Public controller for external API access (called by Central Server)
 */
export class PublicController {

  /**
   * GET /api/public/destinations
   * Get available destination stations based on vehicles currently in queue
   * Called by Central Server to check what destinations are available from this station
   */
  async getAvailableDestinations(req: Request, res: Response): Promise<void> {
    try {
      console.log('📍 Getting available destinations with queued vehicles');

      // Get all destinations that have vehicles in queue with available seats
      const availableDestinations = await prisma.vehicleQueue.groupBy({
        by: ['destinationId', 'destinationName'],
        where: {
          status: { in: ['WAITING', 'LOADING', 'READY'] },
          availableSeats: { gt: 0 } // Only destinations with available seats
        },
        _sum: {
          availableSeats: true,
        },
        _count: {
          vehicleId: true
        }
      });

      // Get station config for this local node
      const stationConfig = await prisma.stationConfig.findFirst();

   

      // Get ETD predictions for each destination
      const destinations = await Promise.all(availableDestinations.map(async (dest) => {
        const etdPrediction = await getDestinationETD(dest.destinationId, 1); // Default 1 seat ETD
        const pricePerSeat = await prisma.route.findFirst({
          where: {
            stationId: dest.destinationId
          },
          select: {
            basePrice: true
          }
        });
        return {
          destinationId: dest.destinationId,
          destinationName: dest.destinationName,
          totalAvailableSeats: dest._sum.availableSeats || 0,
          vehicleCount: dest._count.vehicleId,
          isOnline: true, // This station is online since it's responding
          lastUpdate: new Date().toISOString(),
          // AI-powered ETD predictions
          basePrice: pricePerSeat?.basePrice || 0,
          etdPrediction
        };
      }));

      res.json({
        success: true,
        data: {
          stationId: stationConfig?.stationId,
          stationName: stationConfig?.stationName,
          isOnline: stationConfig?.isOnline || true,
          destinations,
          totalDestinations: destinations.length,
          timestamp: new Date().toISOString()
        }
      });

      // Broadcast real-time update
      broadcastRouteUpdate('destinations', {
        stationId: stationConfig?.stationId,
        stationName: stationConfig?.stationName,
        destinations,
        totalDestinations: destinations.length
      });

    } catch (error) {
      console.error('❌ Error getting available destinations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get available destinations',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * GET /api/public/queue/:destinationId
   * Get vehicles in queue for a specific destination with seat availability
   * Called by Central Server when user selects a specific route
   */
  async getQueueForDestination(req: Request, res: Response): Promise<void> {
    try {
      const { destinationId } = req.params;
      
      if (!destinationId) {
        res.status(400).json({
          success: false,
          error: 'Destination ID is required'
        });
        return;
      }

      console.log(`🚍 Getting queue details for destination: ${destinationId}`);

      // Get all vehicles in queue for this destination
      const queueEntries = await prisma.vehicleQueue.findMany({
        where: {
          destinationId,
          status: { in: ['WAITING', 'LOADING', 'READY'] },
          availableSeats: { gt: 0 }
        },
        include: {
          vehicle: {
            include: {
              driver: true
            }
          }
        },
        orderBy: [
          { queueType: 'desc' }, // OVERNIGHT first
          { queuePosition: 'asc' }
        ]
      });

      if (queueEntries.length === 0) {
        res.json({
          success: true,
          data: {
            destinationId,
            destinationName: 'Unknown',
            vehicles: [],
            totalAvailableSeats: 0,
            totalVehicles: 0,
            message: 'No vehicles available for this destination'
          }
        });
        return;
      }

      // Calculate totals
      const totalAvailableSeats = queueEntries.reduce((sum, entry) => sum + entry.availableSeats, 0);
      const destinationName = queueEntries[0]?.destinationName;

      // Get ETD predictions for the destination
      const destinationETD = await getDestinationETD(destinationId, 1); // Default 1 seat ETD

      // Format vehicle data with ETD predictions
      const vehicles = await Promise.all(queueEntries.map(async (entry) => {
        // Get vehicle-specific ETD (based on its position and available seats)
        const vehicleETD = await getDestinationETD(destinationId, entry.availableSeats);

        return {
          queueId: entry.id,
          vehicleId: entry.vehicleId,
          licensePlate: entry.vehicle.licensePlate,
          capacity: entry.vehicle.capacity,
          model: entry.vehicle.model,
          color: entry.vehicle.color,

          // Driver info
          driverName: entry.vehicle.driver ?
            `${entry.vehicle.driver.firstName} ${entry.vehicle.driver.lastName}` : 'Unknown',
          driverPhone: entry.vehicle.driver?.phoneNumber,

          // Queue info
          queuePosition: entry.queuePosition,
          queueType: entry.queueType,
          status: entry.status,
          enteredAt: entry.enteredAt.toISOString(),

          // Seating info
          availableSeats: entry.availableSeats,
          totalSeats: entry.totalSeats,
          occupiedSeats: entry.totalSeats - entry.availableSeats,
          occupancyRate: Math.round(((entry.totalSeats - entry.availableSeats) / entry.totalSeats) * 100),

          // Pricing and schedule
          pricePerSeat: entry.basePrice,
          estimatedDeparture: entry.estimatedDeparture?.toISOString(),

          // Status indicators
          isLoading: entry.status === 'LOADING',
          isReady: entry.status === 'READY',
          isPriority: entry.queueType === 'OVERNIGHT',

          // AI-powered ETD predictions
          etdPrediction: vehicleETD
        };
      }));

      // Get station info
      const stationConfig = await prisma.stationConfig.findFirst();

      res.json({
        success: true,
        data: {
          // Route info
          departureStationId: stationConfig?.stationId,
          departureStationName: stationConfig?.stationName,
          destinationId,
          destinationName,

          // Vehicle data
          vehicles,
          totalVehicles: vehicles.length,
          totalAvailableSeats,

          // Queue statistics
          queueStats: {
            waitingVehicles: vehicles.filter(v => v.status === 'WAITING').length,
            loadingVehicles: vehicles.filter(v => v.status === 'LOADING').length,
            readyVehicles: vehicles.filter(v => v.status === 'READY').length,
            overnightVehicles: vehicles.filter(v => v.queueType === 'OVERNIGHT').length,
            averageOccupancy: Math.round(vehicles.reduce((sum, v) => sum + v.occupancyRate, 0) / vehicles.length) || 0
          },

          // Pricing info
          priceRange: {
            min: Math.min(...vehicles.map(v => v.pricePerSeat)),
            max: Math.max(...vehicles.map(v => v.pricePerSeat)),
            average: vehicles.reduce((sum, v) => sum + v.pricePerSeat, 0) / vehicles.length
          },

          // AI-powered ETD predictions for the destination
          destinationETD,

          // Meta info
          lastUpdate: new Date().toISOString(),
          isRealTime: true
        }
      });

      // Broadcast real-time queue update
      broadcastRouteUpdate('queue', {
        destinationId,
        destinationName,
        vehicles,
        totalVehicles: vehicles.length,
        totalAvailableSeats
      });

    } catch (error) {
      console.error('❌ Error getting queue for destination:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get queue information',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * GET /api/public/station/status
   * Get station status and basic info
   * Called by Central Server to check if station is online and operational
   */
  async getStationStatus(req: Request, res: Response): Promise<void> {
    try {
      const stationConfig = await prisma.stationConfig.findFirst();
      
      if (!stationConfig) {
        res.status(404).json({
          success: false,
          error: 'Station not configured'
        });
        return;
      }

      // Get quick stats
      const [totalVehicles, totalQueues, totalAvailableSeats] = await Promise.all([
        prisma.vehicle.count({ where: { isActive: true } }),
        prisma.vehicleQueue.count({ where: { status: { in: ['WAITING', 'LOADING', 'READY'] } } }),
        prisma.vehicleQueue.aggregate({
          where: { status: { in: ['WAITING', 'LOADING', 'READY'] } },
          _sum: { availableSeats: true }
        })
      ]);

      res.json({
        success: true,
        data: {
          stationId: stationConfig.stationId,
          stationName: stationConfig.stationName,
          governorate: stationConfig.governorate,
          delegation: stationConfig.delegation,
          isOnline: stationConfig.isOnline,
          isOperational: stationConfig.isOperational,
          
          // Quick stats
          stats: {
            totalVehicles,
            totalQueues,
            totalAvailableSeats: totalAvailableSeats._sum.availableSeats || 0
          },
          
          // Status info
          lastSync: stationConfig.lastSync?.toISOString(),
          serverVersion: stationConfig.serverVersion,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('❌ Error getting station status:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get station status',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getAvailableOvernightDestinations(req: Request, res: Response): Promise<void> {
    try {
      console.log('📍 Getting available overnight destinations');

      // Get all destinations that have vehicles in queue with available seats
      const availableDestinations = await prisma.vehicleQueue.groupBy({
        by: ['destinationId', 'destinationName'],
        where: {
          queueType: 'OVERNIGHT',
          status: { in: ['WAITING', 'LOADING', 'READY'] },
          availableSeats: { gt: 0 } // Only destinations with available seats
        },
        _sum: {
          availableSeats: true,
        },
        _count: {
          vehicleId: true
        }
      });

      // Get station config for this local node
      const stationConfig = await prisma.stationConfig.findFirst();

      const destinations = await Promise.all(availableDestinations.map(async (dest) => ({
        destinationId: dest.destinationId,
        destinationName: dest.destinationName,
        totalAvailableSeats: dest._sum.availableSeats || 0,
        vehicleCount: dest._count.vehicleId,
        isOnline: true, // This station is online since it's responding
        lastUpdate: new Date().toISOString(),
        // Get overnight ETD prediction
        etdPrediction: await getDestinationETD(dest.destinationId, 1, true) // Overnight ETD
      })));

      res.json({
        success: true,
        data: {
          stationId: stationConfig?.stationId,
          stationName: stationConfig?.stationName,
          isOnline: stationConfig?.isOnline || true,
          destinations,
          totalDestinations: destinations.length,
          timestamp: new Date().toISOString()
        }
      });

      // Broadcast real-time update
      broadcastRouteUpdate('destinations', {
        stationId: stationConfig?.stationId,
        stationName: stationConfig?.stationName,
        destinations,
        totalDestinations: destinations.length
      });

    } catch (error) {
      console.error('❌ Error getting available overnight destinations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get available overnight destinations',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getOvernightQueueForDestination(req: Request, res: Response): Promise<void> {
    try {
      const { destinationId } = req.params;
      
      if (!destinationId) {
        res.status(400).json({
          success: false,
          error: 'Destination ID is required'
        });
        return;
      }

      // Get all vehicles in queue for this destination
      const queueEntries = await prisma.vehicleQueue.findMany({
        where: {
          destinationId,
          queueType: 'OVERNIGHT',
          status: { in: ['WAITING', 'LOADING', 'READY'] },
          availableSeats: { gt: 0 }
        },
        include: {
          vehicle: {
            include: {
              driver: true
            }
          }
        },
        orderBy: [
          { queuePosition: 'asc' }
        ]
      });

      if (queueEntries.length === 0) {
        res.json({
          success: true,
          data: {
            destinationId,
            destinationName: 'Unknown',
            vehicles: [],
            totalAvailableSeats: 0,
            totalVehicles: 0,
            message: 'No vehicles in overnight queue for this destination'
          }
        });
        return;
      }

      // Calculate totals
      const totalAvailableSeats = queueEntries.reduce((sum, entry) => sum + entry.availableSeats, 0);
      const destinationName = queueEntries[0]?.destinationName;

      // Get overnight ETD prediction for the destination
      const destinationETD = await getDestinationETD(destinationId, 1, true); // Overnight ETD

      // Format vehicle data with overnight ETD predictions
      const vehicles = await Promise.all(queueEntries.map(async (entry) => {
        // Get vehicle-specific overnight ETD
        const vehicleETD = await getDestinationETD(destinationId, entry.availableSeats, true);

        return {
          queueId: entry.id,
          vehicleId: entry.vehicleId,
          licensePlate: entry.vehicle.licensePlate,
          capacity: entry.vehicle.capacity,
          model: entry.vehicle.model,
          
          // Driver info
          driverName: entry.vehicle.driver ? 
            `${entry.vehicle.driver.firstName} ${entry.vehicle.driver.lastName}` : 'Unknown',
          driverPhone: entry.vehicle.driver?.phoneNumber,
          
          // Queue info
          queuePosition: entry.queuePosition,
          queueType: entry.queueType,
          status: entry.status,
          enteredAt: entry.enteredAt.toISOString(),
          
          // Seating info
          availableSeats: entry.availableSeats,
          totalSeats: entry.totalSeats,
          occupiedSeats: entry.totalSeats - entry.availableSeats,
          occupancyRate: Math.round(((entry.totalSeats - entry.availableSeats) / entry.totalSeats) * 100),
          
          // Pricing and schedule
          pricePerSeat: entry.basePrice,
          estimatedDeparture: entry.estimatedDeparture?.toISOString(),
          
          // Status indicators
          isLoading: entry.status === 'LOADING',
          isReady: entry.status === 'READY',
          isPriority: entry.queueType === 'OVERNIGHT',

          // AI-powered overnight ETD predictions
          etdPrediction: vehicleETD
        };
      }));

      // Get station info
      const stationConfig = await prisma.stationConfig.findFirst();

      res.json({
        success: true,
        data: {
          // Route info
          departureStationId: stationConfig?.stationId,
          departureStationName: stationConfig?.stationName,
          destinationId,
          destinationName,
          openingTime: stationConfig?.openingTime,
          // Vehicle data
          vehicles,
          totalVehicles: vehicles.length,
          totalAvailableSeats,
          
          // Queue statistics
          queueStats: {
            waitingVehicles: vehicles.filter(v => v.status === 'WAITING').length,
            loadingVehicles: vehicles.filter(v => v.status === 'LOADING').length,
            readyVehicles: vehicles.filter(v => v.status === 'READY').length,
            overnightVehicles: vehicles.filter(v => v.queueType === 'OVERNIGHT').length,
            averageOccupancy: Math.round(vehicles.reduce((sum, v) => sum + v.occupancyRate, 0) / vehicles.length) || 0
          },
          
          // Pricing info
          priceRange: {
            min: Math.min(...vehicles.map(v => v.pricePerSeat)),
            max: Math.max(...vehicles.map(v => v.pricePerSeat)),
            average: vehicles.reduce((sum, v) => sum + v.pricePerSeat, 0) / vehicles.length
          },
          
          // AI-powered overnight ETD predictions for the destination
          destinationETD,
          
          // Meta info
          lastUpdate: new Date().toISOString(),
          isRealTime: true
        }
      });

      // Broadcast real-time queue update
      broadcastRouteUpdate('queue', {
        destinationId,
        destinationName,
        vehicles,
        totalVehicles: vehicles.length,
        totalAvailableSeats
      });

    } catch (error) {
      console.error('❌ Error getting queue for destination:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get queue information',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getStationConfig(req: Request, res: Response): Promise<void> {
    try {
      const stationConfig = await prisma.stationConfig.findFirst();
      res.json({
        success: true,
        data: stationConfig
      });
    } catch (error) {
      console.error('❌ Error getting station config:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get station config',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

// Export controller instance
export const publicController = new PublicController();
