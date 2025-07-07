import { Request, Response } from 'express';
import { AutoTripSyncService } from '../services/autoTripSyncService';

export class AutoTripSyncController {
  private autoSyncService: AutoTripSyncService;

  constructor(autoSyncService: AutoTripSyncService) {
    this.autoSyncService = autoSyncService;
  }

  /**
   * Get sync status
   */
  async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const detailedStatus = await this.autoSyncService.getDetailedStatus();
      
      res.json({
        success: true,
        data: detailedStatus
      });
    } catch (error) {
      console.error('❌ Error getting sync status:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Force sync now
   */
  async forceSyncNow(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.autoSyncService.forceSyncNow();
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message,
          syncedCount: result.syncedCount
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.message
        });
      }
    } catch (error) {
      console.error('❌ Error during force sync:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Start auto sync service
   */
  async start(req: Request, res: Response): Promise<void> {
    try {
      if (this.autoSyncService.running) {
        res.status(400).json({
          success: false,
          error: 'Auto sync service is already running'
        });
        return;
      }

      await this.autoSyncService.start();
      
      res.json({
        success: true,
        message: 'Auto sync service started successfully'
      });
    } catch (error) {
      console.error('❌ Error starting auto sync service:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Stop auto sync service
   */
  async stop(req: Request, res: Response): Promise<void> {
    try {
      if (!this.autoSyncService.running) {
        res.status(400).json({
          success: false,
          error: 'Auto sync service is not running'
        });
        return;
      }

      await this.autoSyncService.stop();
      
      res.json({
        success: true,
        message: 'Auto sync service stopped successfully'
      });
    } catch (error) {
      console.error('❌ Error stopping auto sync service:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
