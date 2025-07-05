import { prisma } from '../config/database';
import { WebSocketService } from '../websocket/webSocketService';

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

export class QueueService {
  private currentStationId: string;
  private webSocketService: WebSocketService;

  constructor(webSocketService: WebSocketService) {
    this.currentStationId = process.env.STATION_ID || 'station-001';
    this.webSocketService = webSocketService;
  }

  /**
   * Enter a vehicle into a queue for the first authorized destination (not current station)
   */
  async enterQueue(licensePlate: string): Promise<{
    success: boolean;
    queueEntry?: QueueEntry;
    error?: string;
  }> {
    try {
      console.log(`🚗 Vehicle ${licensePlate} entering queue (auto destination)`);

      // Find the vehicle in local database
      const vehicle = await prisma.vehicle.findUnique({
        where: { licensePlate },
        include: {
          driver: true,
          authorizedStations: true
        }
      });

      if (!vehicle) {
        return {
          success: false,
          error: `Vehicle with license plate ${licensePlate} not found in local database`
        };
      }

      // Check if vehicle is active and available
      if (!vehicle.isActive) {
        return {
          success: false,
          error: `Vehicle ${licensePlate} is not active`
        };
      }

      if (!vehicle.isAvailable) {
        return {
          success: false,
          error: `Vehicle ${licensePlate} is not available for trips`
        };
      }

      // Check if vehicle is authorized for current station
      const isAuthorizedForCurrentStation = vehicle.authorizedStations.some(
        auth => auth.stationId === this.currentStationId
      );

      if (!isAuthorizedForCurrentStation) {
        return {
          success: false,
          error: `Vehicle ${licensePlate} is not authorized for current station`
        };
      }

      // Find the first authorized station that is NOT the current station
      const destinationAuth = vehicle.authorizedStations.find(
        auth => auth.stationId !== this.currentStationId
      );

      if (!destinationAuth) {
        return {
          success: false,
          error: `Vehicle ${licensePlate} has no authorized destination station (other than current station)`
        };
      }

      const destinationId = destinationAuth.stationId;

      // Check if vehicle is already in a queue
      const existingQueueEntry = await prisma.vehicleQueue.findFirst({
        where: {
          vehicleId: vehicle.id,
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        }
      });

      if (existingQueueEntry) {
        return {
          success: false,
          error: `Vehicle ${licensePlate} is already in queue for ${existingQueueEntry.destinationName}`
        };
      }

      // Get destination name (you might want to cache this or get from central server)
      const destinationName = await this.getDestinationName(destinationId);

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
          availableSeats: vehicle.capacity,
          totalSeats: vehicle.capacity,
          basePrice: 0,
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

      console.log(`✅ Vehicle ${licensePlate} entered queue at position ${nextPosition} for ${destinationName}`);

      // Broadcast queue update
      this.broadcastQueueUpdate(destinationId);

      return {
        success: true,
        queueEntry: this.formatQueueEntry(queueEntry)
      };

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

      const formattedEntries = queueEntries.map(entry => this.formatQueueEntry(entry));

      return {
        success: true,
        queue: formattedEntries
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
   * Get destination name (placeholder - you might want to cache this)
   */
  private async getDestinationName(destinationId: string): Promise<string> {
    // This is a placeholder - you might want to:
    // 1. Cache destination names from central server
    // 2. Query central server for destination info
    // 3. Store destination mapping locally
    
    // For now, return a formatted version of the ID
    return destinationId.replace('station-', 'Station ').toUpperCase();
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
    // Emit real-time update for queue changes
    this.webSocketService.emit('queue_updated', {
      destinationId,
      timestamp: new Date().toISOString()
    });

    // Also send to central server if needed
    this.webSocketService.sendQueueUpdate({
      destinationId,
      stationId: this.currentStationId,
      timestamp: new Date().toISOString()
    });
  }
}

// Export a function to create queue service instance
export const createQueueService = (webSocketService: WebSocketService) => {
  return new QueueService(webSocketService);
}; 