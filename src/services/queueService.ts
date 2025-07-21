import { prisma } from '../config/database';
import { WebSocketService } from '../websocket/webSocketService';
import { EnhancedLocalWebSocketServer } from '../websocket/LocalWebSocketServer';
import * as dashboardController from '../controllers/dashboardController';
import { RouteService } from './routeService';

export interface QueueEntry {
  id: string;
  vehicleId: string;
  licensePlate: string;
  destinationId: string;
  destinationName: string;
  queuePosition: number;
  status: 'WAITING' | 'LOADING' | 'READY' | 'DEPARTED';
  enteredAt: Date;
  availableSeats: number;
  totalSeats: number;
  basePrice: number;
  estimatedDeparture?: Date;
  actualDeparture?: Date;
  vehicle?: {
    model?: string | undefined;
    color?: string | undefined;
    driver?: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
    } | undefined;
  } | undefined;
}

export interface QueueSummary {
  destinationId: string;
  destinationName: string;
  totalVehicles: number;
  waitingVehicles: number;
  loadingVehicles: number;
  readyVehicles: number;
  estimatedNextDeparture?: Date | undefined;
}

// Add a reference to the EnhancedLocalWebSocketServer
let localWebSocketServer: EnhancedLocalWebSocketServer | null = null;

// Function to set the EnhancedLocalWebSocketServer instance
export function setLocalWebSocketServer(wsServer: EnhancedLocalWebSocketServer) {
  localWebSocketServer = wsServer;
}

// Function to notify about queue updates
async function notifyQueueUpdate(queue: any) {
  if (localWebSocketServer) {
    try {
      // Get updated statistics
      const stats = await dashboardController.getDashboardStats();
      
      // Notify clients
      localWebSocketServer.notifyQueueUpdate({
        queue,
        statistics: stats
      });
    } catch (error) {
      console.error('❌ Error notifying queue update:', error);
    }
  }
}

export class QueueService {
  private currentStationId: string;
  private webSocketService: WebSocketService;
  private routeService: RouteService;

  constructor(webSocketService: WebSocketService) {
    this.currentStationId = process.env.STATION_ID || 'station-001';
    this.webSocketService = webSocketService;
    this.routeService = new RouteService();
  }

  /**
   * Enter a vehicle into a queue with specified parameters
   */
  async enterQueue(
    licensePlate: string, 
    options?: {
      destinationId?: string;
      destinationName?: string;
      availableSeats?: number;
      totalSeats?: number;
      basePrice?: number;
      driverInfo?: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
      };
      vehicleInfo?: {
        model?: string;
        color?: string;
      };
    }
  ): Promise<{
    success: boolean;
    queueEntry?: QueueEntry;
    error?: string;
    movedFromQueue?: boolean;
    previousDestination?: string;
  }> {
    try {
      console.log(`🚗 Vehicle ${licensePlate} entering queue`);
      
      // Find or create the vehicle in local database
      let vehicle = await prisma.vehicle.findUnique({
        where: { licensePlate },
        include: {
          driver: true,
          authorizedStations: true
        }
      });

      // If vehicle doesn't exist and we have driver info, create it
      if (!vehicle && options?.driverInfo) {
        console.log(`Creating new vehicle ${licensePlate}`);
        
        // Generate IDs for new records
        const driverId = `driver_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const vehicleId = `vehicle_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        
        // Create driver first
        const driver = await prisma.driver.create({
          data: {
            id: driverId,
            cin: `CIN_${Date.now()}`, // Required field
            firstName: options.driverInfo.firstName || 'Unknown',
            lastName: options.driverInfo.lastName || 'Unknown',
            phoneNumber: options.driverInfo.phoneNumber || 'Unknown',
            isActive: true,
            accountStatus: 'APPROVED',
            syncedAt: new Date()
          }
        });
        
        // Then create vehicle
        vehicle = await prisma.vehicle.create({
          data: {
            id: vehicleId,
            licensePlate,
            model: options.vehicleInfo?.model || 'Unknown',
            color: options.vehicleInfo?.color || 'White',
            capacity: options.totalSeats || 4,
            isActive: true,
            isAvailable: true,
            // Set default destination if provided
            defaultDestinationId: options.destinationId || null,
            defaultDestinationName: options.destinationName || null,
            syncedAt: new Date(),
            driver: {
              connect: {
                id: driver.id
              }
            },
            // Authorize for current station and destination
            authorizedStations: {
              create: [
                { 
                  stationId: this.currentStationId,
                  stationName: await this.getDestinationName(this.currentStationId),
                  priority: 99, // Current station has lowest priority for destinations
                  isDefault: false,
                  syncedAt: new Date()
                },
                ...(options.destinationId ? [{ 
                  stationId: options.destinationId,
                  stationName: options.destinationName || await this.getDestinationName(options.destinationId),
                  priority: 1, // First authorized destination has highest priority
                  isDefault: true,
                  syncedAt: new Date()
                }] : [])
              ]
            }
          },
          include: {
            driver: true,
            authorizedStations: true
          }
        });
        
        console.log(`✅ Created new vehicle ${licensePlate} with driver ${driver.firstName} ${driver.lastName}`);
      }

      if (!vehicle) {
        return {
          success: false,
          error: `Vehicle with license plate ${licensePlate} not found and couldn't be created`
        };
      }

      // Check if vehicle is active and available
      if (!vehicle.isActive) {
        return {
          success: false,
          error: `Vehicle ${licensePlate} is not active`
        };
      }

      // Determine destination with enhanced logic FIRST
      let destinationId: string | undefined;
      let destinationName: string | undefined;
      
      if (options?.destinationId) {
        // Use provided destination (staff override)
        destinationId = options.destinationId;
        destinationName = options.destinationName || await this.getDestinationName(destinationId);
        
        // Ensure vehicle is authorized for this destination
        const isAuthorized = vehicle.authorizedStations.some(auth => auth.stationId === destinationId);
        
        if (!isAuthorized) {
          return {
            success: false,
            error: `Vehicle ${licensePlate} is not authorized for destination ${destinationName}. Please contact a supervisor to add this authorization.`
          };
        }
      } else {
        // Use smart destination selection logic
        
        // First, try to use vehicle's default destination
        if (vehicle.defaultDestinationId) {
          const defaultAuth = vehicle.authorizedStations.find(
            auth => auth.stationId === vehicle.defaultDestinationId && auth.stationId !== this.currentStationId
          );
          
          if (defaultAuth) {
            destinationId = vehicle.defaultDestinationId;
            destinationName = vehicle.defaultDestinationName || await this.getDestinationName(destinationId);
            console.log(`📍 Using vehicle's default destination: ${destinationName}`);
          }
        }
        
        // If no default destination or it's not available, use priority-based selection
        if (!destinationId) {
          // Get authorized stations excluding current station, ordered by priority
          const availableDestinations = vehicle.authorizedStations
            .filter(auth => auth.stationId !== this.currentStationId)
            .sort((a, b) => a.priority - b.priority); // Lower priority number = higher priority
          
          if (availableDestinations.length === 0) {
            return {
              success: false,
              error: `Vehicle ${licensePlate} has no authorized destination stations (other than current station)`
            };
          }
          
          const selectedAuth = availableDestinations[0];
          destinationId = selectedAuth.stationId;
          destinationName = selectedAuth.stationName || await this.getDestinationName(destinationId);
          console.log(`🎯 Using highest priority destination: ${destinationName} (priority ${selectedAuth.priority})`);
                 }
      }

      // Ensure we have a valid destination
      if (!destinationId || !destinationName) {
        return {
          success: false,
          error: `Unable to determine destination for vehicle ${licensePlate}`
        };
      }

      // Now check if vehicle is already in a queue (after destination is determined)
      const existingQueueEntry = await prisma.vehicleQueue.findFirst({
        where: {
          vehicleId: vehicle.id,
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        },
        include: {
          bookings: {
            where: {
              paymentStatus: { in: ['PAID', 'PENDING'] }
            }
          }
        }
      });

      let movedFromQueue = false;
      let previousDestination = '';

      if (existingQueueEntry) {
        // If trying to enter same destination queue, return error
        if (existingQueueEntry.destinationId === destinationId) {
          return {
            success: false,
            error: `Vehicle ${licensePlate} is already in queue for ${existingQueueEntry.destinationName}`
          };
        }

        // Check if vehicle has active bookings
        if (existingQueueEntry.bookings.length > 0) {
          const totalBookedSeats = existingQueueEntry.bookings.reduce((sum, booking) => sum + booking.seatsBooked, 0);
          return {
            success: false,
            error: `Cannot move vehicle ${licensePlate} from ${existingQueueEntry.destinationName} queue: ${totalBookedSeats} seats are already booked. Please handle existing bookings first.`
          };
        }

        // Vehicle is in different queue with no bookings - move it
        console.log(`🔄 Moving vehicle ${licensePlate} from ${existingQueueEntry.destinationName} to ${destinationName} queue`);
        previousDestination = existingQueueEntry.destinationName;
        const previousDestinationId = existingQueueEntry.destinationId;

        // Remove from current queue
        await prisma.vehicleQueue.delete({
          where: { id: existingQueueEntry.id }
        });

        // Reorder the queue it was removed from
        await this.reorderQueue(previousDestinationId);
        
        // Broadcast update for the queue it left
        this.broadcastQueueUpdate(previousDestinationId);

        movedFromQueue = true;
        console.log(`✅ Vehicle ${licensePlate} removed from ${previousDestination} queue`);
      }

      // At this point we have a valid destination and have handled any queue moves

      // Get the correct base price from the route table
      let basePrice = options?.basePrice || 0;
      
      if (!options?.basePrice) {
        // Try to get base price from route table for this destination
        try {
          const route = await prisma.route.findUnique({
            where: { stationId: destinationId }
          });
          
          if (route && route.basePrice > 0) {
            basePrice = route.basePrice;
            console.log(`✅ Found base price for ${destinationName}: ${basePrice} TND`);
          } else {
            console.warn(`⚠️ No route found for destination ${destinationName} (${destinationId}), using default price`);
          }
        } catch (error) {
          console.error(`❌ Error fetching route price for ${destinationName}:`, error);
        }
      }

      // Get the next position in the queue for this destination
      const nextPosition = await this.getNextQueuePosition(destinationId);

      // Create queue entry
      const queueEntry = await prisma.vehicleQueue.create({
        data: {
          id: `queue_${Date.now()}_${vehicle.id}`,
          vehicleId: vehicle.id,
          destinationId,
          destinationName,
          queuePosition: nextPosition,
          status: 'WAITING',
          enteredAt: new Date(),
          availableSeats: options?.availableSeats || vehicle.capacity,
          totalSeats: options?.totalSeats || vehicle.capacity,
          basePrice: basePrice,
          syncedAt: new Date()
        },
        include: {
          vehicle: {
            include: {
              driver: true
            }
          }
        }
      });

      if (movedFromQueue) {
        console.log(`✅ Vehicle ${licensePlate} moved from ${previousDestination} to ${destinationName} queue at position ${nextPosition} with base price ${basePrice} TND`);
      } else {
      console.log(`✅ Vehicle ${licensePlate} entered queue at position ${nextPosition} for ${destinationName} with base price ${basePrice} TND`);
      }

      // Broadcast queue update
      this.broadcastQueueUpdate(destinationId);

      // Notify clients about queue updates
      notifyQueueUpdate(queueEntry);

      const result: {
        success: true;
        queueEntry: QueueEntry;
        movedFromQueue?: boolean;
        previousDestination?: string;
      } = {
        success: true,
        queueEntry: this.formatQueueEntry(queueEntry)
      };

      if (movedFromQueue) {
        result.movedFromQueue = true;
        result.previousDestination = previousDestination;
      }

      return result;

    } catch (error) {
      console.error('❌ Error entering queue:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Exit a vehicle from the queue
   */
  async exitQueue(licensePlate: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      console.log(`🚗 Vehicle ${licensePlate} exiting queue`);

      // Find the vehicle
      const vehicle = await prisma.vehicle.findUnique({
        where: { licensePlate }
      });

      if (!vehicle) {
        return {
          success: false,
          error: `Vehicle with license plate ${licensePlate} not found`
        };
      }

      // Find active queue entry
      const queueEntry = await prisma.vehicleQueue.findFirst({
        where: {
          vehicleId: vehicle.id,
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        }
      });

      if (!queueEntry) {
        return {
          success: false,
          error: `Vehicle ${licensePlate} is not in any active queue`
        };
      }

      // Check for active bookings
      const activeBookings = await prisma.booking.count({
        where: {
          queueId: queueEntry.id,
          paymentStatus: { in: ['PAID', 'PENDING'] }
        }
      });

      if (activeBookings > 0) {
        return {
          success: false,
          error: `Vehicle ${licensePlate} cannot exit queue: there are active bookings`
        };
      }

      const destinationId = queueEntry.destinationId;

      // Delete the queue entry
      await prisma.vehicleQueue.delete({
        where: { id: queueEntry.id }
      });

      // Reorder remaining vehicles in the same destination queue
      await this.reorderQueue(destinationId);

      console.log(`✅ Vehicle ${licensePlate} exited queue for ${queueEntry.destinationName}`);

      // Broadcast queue update
      this.broadcastQueueUpdate(destinationId);

      return { success: true };

    } catch (error) {
      console.error('❌ Error exiting queue:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get all available destination queues
   */
  async getAvailableQueues(): Promise<{
    success: boolean;
    queues?: QueueSummary[];
    error?: string;
  }> {
    try {
      const queues = await prisma.vehicleQueue.groupBy({
        by: ['destinationId', 'destinationName'],
        where: {
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        },
        _count: {
          id: true
        },
        _min: {
          estimatedDeparture: true
        }
      });

      const queueSummaries: QueueSummary[] = [];

      for (const queue of queues) {
        const statusCounts = await prisma.vehicleQueue.groupBy({
          by: ['status'],
          where: {
            destinationId: queue.destinationId,
            status: { in: ['WAITING', 'LOADING', 'READY'] }
          },
          _count: {
            id: true
          }
        });

        const summary: QueueSummary = {
          destinationId: queue.destinationId,
          destinationName: queue.destinationName,
          totalVehicles: queue._count.id,
          waitingVehicles: 0,
          loadingVehicles: 0,
          readyVehicles: 0,
          estimatedNextDeparture: queue._min.estimatedDeparture || undefined
        };

        // Count vehicles by status
        for (const statusCount of statusCounts) {
          switch (statusCount.status) {
            case 'WAITING':
              summary.waitingVehicles = statusCount._count.id;
              break;
            case 'LOADING':
              summary.loadingVehicles = statusCount._count.id;
              break;
            case 'READY':
              summary.readyVehicles = statusCount._count.id;
              break;
          }
        }

        queueSummaries.push(summary);
      }

      return {
        success: true,
        queues: queueSummaries
      };

    } catch (error) {
      console.error('❌ Error getting available queues:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get detailed queue for a specific destination
   */
  async getDestinationQueue(destinationId: string): Promise<{
    success: boolean;
    queue?: QueueEntry[];
    error?: string;
  }> {
    try {
      console.log(`🔍 Getting queue for destination: ${destinationId}`);

      // Get queue entries for this destination
      const queueEntries = await prisma.vehicleQueue.findMany({
        where: {
          destinationId,
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        },
        include: {
          vehicle: {
            include: {
              driver: true
            }
          }
        },
        orderBy: {
          queuePosition: 'asc'
        }
      });

      // Format queue entries
      const formattedQueue = queueEntries.map(entry => this.formatQueueEntry(entry));

      console.log(`✅ Found ${formattedQueue.length} vehicles in queue for destination ${destinationId}`);

      return {
        success: true,
        queue: formattedQueue
      };

    } catch (error) {
      console.error('❌ Error getting destination queue:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Update vehicle status in queue
   */
  async updateVehicleStatus(licensePlate: string, status: 'WAITING' | 'LOADING' | 'READY' | 'DEPARTED'): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      console.log(`🔄 Updating vehicle ${licensePlate} status to ${status}`);

      const vehicle = await prisma.vehicle.findUnique({
        where: { licensePlate }
      });

      if (!vehicle) {
        return {
          success: false,
          error: `Vehicle with license plate ${licensePlate} not found`
        };
      }

      const queueEntry = await prisma.vehicleQueue.findFirst({
        where: {
          vehicleId: vehicle.id,
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        }
      });

      if (!queueEntry) {
        return {
          success: false,
          error: `Vehicle ${licensePlate} is not in any active queue`
        };
      }

      // Update status
      await prisma.vehicleQueue.update({
        where: { id: queueEntry.id },
        data: {
          status,
          ...(status === 'DEPARTED' && { actualDeparture: new Date() })
        }
      });

      // If vehicle departed, remove from queue and reorder
      if (status === 'DEPARTED') {
        await prisma.vehicleQueue.delete({
          where: { id: queueEntry.id }
        });
        await this.reorderQueue(queueEntry.destinationId);
      }

      console.log(`✅ Vehicle ${licensePlate} status updated to ${status}`);

      // Broadcast queue update
      this.broadcastQueueUpdate(queueEntry.destinationId);

      // Notify clients about queue updates
      notifyQueueUpdate(queueEntry);

      return { success: true };

    } catch (error) {
      console.error('❌ Error updating vehicle status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get next position in queue for a destination
   */
  private async getNextQueuePosition(destinationId: string): Promise<number> {
    const lastEntry = await prisma.vehicleQueue.findFirst({
      where: {
        destinationId,
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      },
      orderBy: {
        queuePosition: 'desc'
      }
    });

    return (lastEntry?.queuePosition || 0) + 1;
  }

  /**
   * Reorder queue after vehicle removal
   */
  private async reorderQueue(destinationId: string): Promise<void> {
    const queueEntries = await prisma.vehicleQueue.findMany({
      where: {
        destinationId,
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      },
      orderBy: {
        enteredAt: 'asc'
      }
    });

    // Update positions
    for (let i = 0; i < queueEntries.length; i++) {
      await prisma.vehicleQueue.update({
        where: { id: queueEntries[i].id },
        data: { queuePosition: i + 1 }
      });
    }
  }

  /**
   * Get destination name from route table
   */
  private async getDestinationName(destinationId: string): Promise<string> {
    return await this.routeService.getStationNameById(destinationId);
  }

  /**
   * Format queue entry for API response
   */
  private formatQueueEntry(entry: any): QueueEntry {
    return {
      id: entry.id,
      vehicleId: entry.vehicleId,
      licensePlate: entry.vehicle.licensePlate,
      destinationId: entry.destinationId,
      destinationName: entry.destinationName,
      queuePosition: entry.queuePosition,
      status: entry.status,
      enteredAt: entry.enteredAt,
      availableSeats: entry.availableSeats,
      totalSeats: entry.totalSeats,
      basePrice: entry.basePrice,
      estimatedDeparture: entry.estimatedDeparture,
      actualDeparture: entry.actualDeparture,
      vehicle: entry.vehicle ? {
        model: entry.vehicle.model || undefined,
        color: entry.vehicle.color || undefined,
        driver: entry.vehicle.driver ? {
          firstName: entry.vehicle.driver.firstName,
          lastName: entry.vehicle.driver.lastName,
          phoneNumber: entry.vehicle.driver.phoneNumber
        } : undefined
      } : undefined
    };
  }

  /**
   * Broadcast queue update via WebSocket
   */
  private broadcastQueueUpdate(destinationId: string): void {
    // Emit multiple event types for real-time updates
    this.webSocketService.emit('queue_updated', {
      destinationId,
      timestamp: new Date().toISOString()
    });
    
    this.webSocketService.emit('queue_update', {
      destinationId,
      stationId: this.currentStationId,
      timestamp: new Date().toISOString()
    });

    // Emit specific seat availability change event
    this.webSocketService.emit('seat_availability_changed', {
      destinationId,
      stationId: this.currentStationId,
      updateType: 'queue_changed',
      timestamp: new Date().toISOString()
    });

    // Also send to central server if needed
    this.webSocketService.sendQueueUpdate({
      destinationId,
      stationId: this.currentStationId,
      timestamp: new Date().toISOString()
    });
    
    // Also try to get the local WebSocket server directly and broadcast
    try {
      const { getLocalWebSocketServer } = require('../websocket/LocalWebSocketServer');
      const localWebSocketServer = getLocalWebSocketServer();
      if (localWebSocketServer) {
        // Broadcast specific seat availability update
        localWebSocketServer.broadcastSeatAvailabilityUpdate(destinationId);
        // Also broadcast general destination list update
        localWebSocketServer.broadcastDestinationListUpdate();
        
        console.log(`📡 Triggered specific seat availability updates for destination: ${destinationId}`);
      }
    } catch (error) {
      console.warn('⚠️ Could not access local WebSocket server directly:', error);
    }
  }

  /**
   * Get available destinations for a vehicle (for staff to choose from)
   */
  async getVehicleAvailableDestinations(licensePlate: string): Promise<{
    success: boolean;
    destinations?: Array<{
      stationId: string;
      stationName: string;
      priority: number;
      isDefault: boolean;
      basePrice: number;
    }>;
    defaultDestination?: {
      stationId: string;
      stationName: string;
    };
    error?: string;
  }> {
    try {
      console.log(`🔍 Getting available destinations for vehicle ${licensePlate}`);

      // Find the vehicle
      const vehicle = await prisma.vehicle.findUnique({
        where: { licensePlate },
        include: {
          authorizedStations: {
            orderBy: {
              priority: 'asc' // Lower priority number = higher priority
            }
          }
        }
      });

      if (!vehicle) {
        return {
          success: false,
          error: `Vehicle with license plate ${licensePlate} not found`
        };
      }

      // Filter out current station and prepare destinations with route pricing
      const availableDestinations = [];
      
      for (const auth of vehicle.authorizedStations) {
        if (auth.stationId === this.currentStationId) continue;
        
        // Get route pricing for this destination
        let basePrice = 0;
        try {
          const route = await prisma.route.findUnique({
            where: { stationId: auth.stationId }
          });
          basePrice = route?.basePrice || 0;
        } catch (error) {
          console.warn(`⚠️ Could not fetch price for station ${auth.stationId}`);
        }

        availableDestinations.push({
          stationId: auth.stationId,
          stationName: auth.stationName || await this.getDestinationName(auth.stationId),
          priority: auth.priority,
          isDefault: auth.isDefault,
          basePrice
        });
      }

      const result: {
        success: boolean;
        destinations: Array<{
          stationId: string;
          stationName: string;
          priority: number;
          isDefault: boolean;
          basePrice: number;
        }>;
        defaultDestination?: {
          stationId: string;
          stationName: string;
        };
      } = {
        success: true,
        destinations: availableDestinations
      };

      if (vehicle.defaultDestinationId) {
        result.defaultDestination = {
          stationId: vehicle.defaultDestinationId,
          stationName: vehicle.defaultDestinationName || await this.getDestinationName(vehicle.defaultDestinationId)
        };
      }

      console.log(`✅ Found ${availableDestinations.length} available destinations for ${licensePlate}`);
      return result;

    } catch (error) {
      console.error('❌ Error getting vehicle destinations:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export a function to create queue service instance
export const createQueueService = (webSocketService: WebSocketService) => {
  return new QueueService(webSocketService);
}; 