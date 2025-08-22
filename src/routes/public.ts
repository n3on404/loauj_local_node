import { Router } from 'express';
import { publicController } from '../controllers/publicController';

const router = Router();

/**
 * @route GET /api/public/destinations
 * @desc Get available destination stations based on vehicles currently in queue
 * @access Public (Called by Central Server)
 */
router.get('/destinations', publicController.getAvailableDestinations.bind(publicController));

/**
 * @route GET /api/public/queue/:destinationId
 * @desc Get vehicles in queue for a specific destination with seat availability
 * @access Public (Called by Central Server)
 * @param {string} destinationId - The destination station ID
 */
router.get('/queue/:destinationId', publicController.getQueueForDestination.bind(publicController));

/**
 * @route GET /api/public/station/status
 * @desc Get station status and basic info
 * @access Public (Called by Central Server)
 */
router.get('/station/status', publicController.getStationStatus.bind(publicController));

/**
 * @route GET /api/public/health
 * @desc Health check endpoint for Central Server monitoring
 * @access Public
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Louaj Local Node - Public API'
  });
});

export default router;
