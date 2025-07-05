import { Request, Response } from 'express';
import { createOvernightQueueService } from '../services/overnightQueueService';
import { WebSocketService } from '../websocket/webSocketService';

export class OvernightQueueController {
  private overnightQueueService: ReturnType<typeof createOvernightQueueService>;

  constructor(webSocketService: WebSocketService) {
    this.overnightQueueService = createOvernightQueueService(webSocketService);
  }

  /**
   * Add vehicle to overnight queue (Supervisor only)
   * POST /api/overnight-queue/add
   */
  async addToOvernightQueue(req: Request, res: Response): Promise<void> {
    try {
      const { licensePlate } = req.body;
      const supervisorId = req.staff?.id;

      // Validate input
      if (!licensePlate) {
        res.status(400).json({
          success: false,
          error: 'License plate is required'
        });
        return;
      }

      if (!supervisorId) {
        res.status(401).json({
          success: false,
          error: 'Supervisor authentication required'
        });
        return;
      }

      const result = await this.overnightQueueService.addToOvernightQueue(licensePlate, supervisorId);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: `Vehicle ${licensePlate} added to overnight queue successfully`,
          data: result.queueEntry
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in addToOvernightQueue controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Remove vehicle from overnight queue (Supervisor only)
   * POST /api/overnight-queue/remove
   */
  async removeFromOvernightQueue(req: Request, res: Response): Promise<void> {
    try {
      const { licensePlate } = req.body;
      const supervisorId = req.staff?.id;

      // Validate input
      if (!licensePlate) {
        res.status(400).json({
          success: false,
          error: 'License plate is required'
        });
        return;
      }

      if (!supervisorId) {
        res.status(401).json({
          success: false,
          error: 'Supervisor authentication required'
        });
        return;
      }

      const result = await this.overnightQueueService.removeFromOvernightQueue(licensePlate, supervisorId);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: `Vehicle ${licensePlate} removed from overnight queue successfully`
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in removeFromOvernightQueue controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get all overnight queues (Supervisor only)
   * GET /api/overnight-queue/all
   */
  async getAllOvernightQueues(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.overnightQueueService.getOvernightQueues();

      if (result.success) {
        res.status(200).json({
          success: true,
          data: result.queues
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in getAllOvernightQueues controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get overnight queue for specific destination (Supervisor only)
   * GET /api/overnight-queue/:destinationId
   */
  async getOvernightQueueByDestination(req: Request, res: Response): Promise<void> {
    try {
      const { destinationId } = req.params;

      if (!destinationId) {
        res.status(400).json({
          success: false,
          error: 'Destination ID is required'
        });
        return;
      }

      const result = await this.overnightQueueService.getOvernightQueueByDestination(destinationId);

      if (result.success) {
        res.status(200).json({
          success: true,
          data: result.queue
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in getOvernightQueueByDestination controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Manually trigger transfer of overnight queue to regular queue (Supervisor only)
   * POST /api/overnight-queue/transfer
   */
  async transferOvernightToRegular(req: Request, res: Response): Promise<void> {
    try {
      const supervisorId = req.staff?.id;

      if (!supervisorId) {
        res.status(401).json({
          success: false,
          error: 'Supervisor authentication required'
        });
        return;
      }

      const result = await this.overnightQueueService.transferOvernightToRegular();

      if (result.success) {
        res.status(200).json({
          success: true,
          message: `Successfully transferred ${result.transferred} vehicles from overnight to regular queue`,
          data: {
            transferred: result.transferred
          }
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in transferOvernightToRegular controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get overnight queue statistics (Supervisor only)
   * GET /api/overnight-queue/stats
   */
  async getOvernightQueueStats(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.overnightQueueService.getOvernightQueues();

      if (result.success && result.queues) {
        const stats = {
          totalVehicles: 0,
          destinationCount: 0,
          destinations: {} as { [destinationId: string]: { name: string; vehicles: number } }
        };

        for (const [destinationId, vehicles] of Object.entries(result.queues)) {
          stats.totalVehicles += vehicles.length;
          stats.destinationCount++;
          stats.destinations[destinationId] = {
            name: vehicles[0]?.destinationName || `Station ${destinationId}`,
            vehicles: vehicles.length
          };
        }

        res.status(200).json({
          success: true,
          data: stats
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error || 'Failed to get overnight queue statistics'
        });
      }

    } catch (error) {
      console.error('❌ Error in getOvernightQueueStats controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

export const createOvernightQueueController = (webSocketService: WebSocketService) => {
  return new OvernightQueueController(webSocketService);
}; 