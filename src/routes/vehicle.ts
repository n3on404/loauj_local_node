import { Router, Request, Response } from 'express';
import { vehicleSyncService } from '../services/vehicleSyncService';
import { env } from '../config/environment';

const router = Router();

/**
 * GET /api/vehicles
 * Get vehicles authorized for this station
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, isActive, isAvailable } = req.query;
    
    const filters: any = {};
    
    if (search && typeof search === 'string') {
      filters.search = search;
    }
    
    if (isActive !== undefined) {
      filters.isActive = isActive === 'true';
    }
    
    if (isAvailable !== undefined) {
      filters.isAvailable = isAvailable === 'true';
  }

    const vehicles = await vehicleSyncService.getLocalVehicles(env.STATION_ID || 'station-001', filters);

    res.json({
      success: true,
      data: vehicles,
      count: vehicles.length,
      stationId: env.STATION_ID || 'station-001'
    });
  } catch (error) {
    console.error('❌ Error getting vehicles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vehicles',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/vehicles/stats
 * Get vehicle statistics for this station
 */
router.get('/stats', async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await vehicleSyncService.getVehicleStats();

    res.json({
      success: true,
      data: stats,
      stationId: env.STATION_ID || 'station-001'
    });
  } catch (error) {
    console.error('❌ Error getting vehicle stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vehicle statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/vehicles/:id
 * Get specific vehicle by ID
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const vehicles = await vehicleSyncService.getLocalVehicles(env.STATION_ID || 'station-001');
    const vehicle = vehicles.find(v => v.id === id);
    
    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found or not authorized for this station'
      });
      return;
    }
    
    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('❌ Error getting vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vehicle',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 