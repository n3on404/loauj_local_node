import { Router } from 'express';
import { routeController } from '../controllers/routeController';
import { authenticate, requireSupervisor } from '../middleware/auth';

const router = Router();

/**
 * GET /api/routes
 * Get all routes
 */
router.get('/', routeController.getAllRoutes.bind(routeController));

/**
 * GET /api/routes/:id
 * Get route by ID
 */
router.get('/:id', routeController.getRouteById.bind(routeController));

/**
 * PUT /api/routes/:id
 * Update route price (SUPERVISOR only)
 */
router.put('/:id', authenticate, requireSupervisor, routeController.updateRoutePrice.bind(routeController));

/**
 * GET /api/routes/station/:stationId
 * Get routes by station ID
 */
router.get('/station/:stationId', routeController.getRoutesByStation.bind(routeController));

export default router; 