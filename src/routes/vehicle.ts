import { Router, Request, Response } from 'express';
import { vehicleSyncService } from '../services/vehicleSyncService';
import { env } from '../config/environment';
import { configService } from '../config/supervisorConfig';

const router = Router();

// ================== PROXY ENDPOINTS TO CENTRAL SERVER ==================

/**
 * POST /api/vehicles/request
 * Forward driver account request to central server, sync local DB on success
 */
router.post('/request', async (req: Request, res: Response) => {
  try {
    const result = await vehicleSyncService.forwardDriverRequest(req.body);
    if (result.success && result.vehicle) {
      // Sync new vehicle to local DB
      await vehicleSyncService.handleVehicleUpdate(result.vehicle, configService.getStationId());
      // Optionally notify clients via WebSocket here
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to forward driver request', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

/**
 * GET /api/vehicles/pending
 * Forward pending requests fetch to central server
 */
router.get('/pending', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const result = await vehicleSyncService.forwardPendingRequests(authHeader);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch pending requests', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

/**
 * POST /api/vehicles/:id/approve
 * Forward approve request to central server, sync local DB on success
 */
router.post('/:id/approve', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers['authorization'];
    const result = await vehicleSyncService.forwardApproveRequest(id, authHeader);
    if (result.success && result.vehicle) {
      await vehicleSyncService.handleVehicleUpdate(result.vehicle, configService.getStationId());
      // Optionally notify clients via WebSocket here
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to approve vehicle', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

/**
 * POST /api/vehicles/:id/deny
 * Forward deny request to central server, update local DB if needed
 */
router.post('/:id/deny', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers['authorization'];
    const result = await vehicleSyncService.forwardDenyRequest(id, authHeader);
    // Optionally update local DB or notify clients
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to deny vehicle', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

/**
 * POST /api/vehicles/:id/ban
 * Ban a vehicle locally and sync to central server
 */
router.post('/:id/ban', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await vehicleSyncService.banVehicle(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to ban vehicle', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// ================== PUBLIC PROXY ENDPOINTS TO CENTRAL SERVER ==================

/**
 * GET /api/vehicles/governorates
 * Forward to central server
 */
router.get('/governorates', async (req: Request, res: Response) => {
  try {
    const result = await vehicleSyncService.forwardGovernorates();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch governorates', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

/**
 * GET /api/vehicles/delegations/:governorateId
 * Forward to central server
 */
router.get('/delegations/:governorateId', async (req: Request, res: Response) => {
  try {
    const { governorateId } = req.params;
    const result = await vehicleSyncService.forwardDelegations(governorateId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch delegations', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

/**
 * GET /api/vehicles/stations
 * Forward to central server
 */
router.get('/stations', async (req: Request, res: Response) => {
  try {
    const result = await vehicleSyncService.forwardStations();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stations', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

/**
 * POST /api/vehicles/stations/create
 * Forward station creation request to central server, sync local DB on success
 */
router.post('/stations/create', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const result = await vehicleSyncService.forwardCreateStation(req.body, authHeader);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create station', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// ================== EXISTING LOCAL ENDPOINTS ==================

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

    const vehicles = await vehicleSyncService.getLocalVehicles(configService.getStationId(), filters);

    res.json({
      success: true,
      data: vehicles,
      count: vehicles.length,
      stationId: configService.getStationId()
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
      stationId: configService.getStationId()
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
    
    const vehicles = await vehicleSyncService.getLocalVehicles(configService.getStationId());
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

/**
 * GET /api/vehicles/driver/:cin
 * Get vehicle by driver CIN
 */
router.get('/driver/:cin', async (req: Request, res: Response): Promise<void> => {
  try {
    const { cin } = req.params;
    
    if (!cin) {
      res.status(400).json({
        success: false,
        message: 'Driver CIN is required'
      });
      return;
    }
    
    const vehicles = await vehicleSyncService.getLocalVehicles(configService.getStationId());
    const vehicle = vehicles.find(v => v.driver?.cin === cin);
    
    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: `No vehicle found for driver with CIN: ${cin}`
      });
      return;
    }
    
    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('❌ Error getting vehicle by driver CIN:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get vehicle by driver CIN',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 