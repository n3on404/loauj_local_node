import { Router } from 'express';
import { AutoTripSyncController } from '../controllers/autoTripSyncController';
import { AutoTripSyncService } from '../services/autoTripSyncService';

export const createAutoTripSyncRouter = (autoSyncService: AutoTripSyncService): Router => {
  const router = Router();
  const controller = new AutoTripSyncController(autoSyncService);

  // Get sync status
  router.get('/status', controller.getStatus.bind(controller));

  // Force sync now
  router.post('/sync-now', controller.forceSyncNow.bind(controller));

  // Start auto sync service
  router.post('/start', controller.start.bind(controller));

  // Stop auto sync service
  router.post('/stop', controller.stop.bind(controller));

  return router;
};
