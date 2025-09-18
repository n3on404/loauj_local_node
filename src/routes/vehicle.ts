import { Router, Request, Response } from 'express';
import { vehicleSyncService } from '../services/vehicleSyncService';
import { env } from '../config/environment';
import { configService } from '../config/supervisorConfig';
import prisma from '../config/database';

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

/**
 * GET /api/vehicles/trips/daily?date=YYYY-MM-DD
 * Returns today's trips grouped by vehicle (only vehicles with at least one trip)
 */
router.get('/trips/daily', async (req: Request, res: Response) => {
  try {
    const { date } = req.query as { date?: string };
    const target = date ? new Date(`${date}T00:00:00`) : new Date();
    const startOfDay = new Date(target); startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(startOfDay); endOfDay.setDate(endOfDay.getDate() + 1);

    // Fetch trips for the day
    const trips = await prisma.trip.findMany({
      where: { startTime: { gte: startOfDay, lt: endOfDay } },
      orderBy: [{ vehicleId: 'asc' }, { startTime: 'asc' }],
      select: {
        vehicleId: true,
        licensePlate: true,
        destinationId: true,
        destinationName: true,
        queueId: true,
        seatsBooked: true,
        startTime: true,
      }
    });

    if (trips.length === 0) {
      res.json({ success: true, data: { date: startOfDay.toISOString().slice(0,10), vehicles: [] } });
      return;
    }

    // Gather maps for base price lookup
    const queueIds = Array.from(new Set(trips.map(t => t.queueId)));
    const queues = await prisma.vehicleQueue.findMany({ where: { id: { in: queueIds } }, select: { id: true, basePrice: true } });
    const queueMap = new Map(queues.map(q => [q.id, q.basePrice]));

    const destinationIds = Array.from(new Set(trips.map(t => t.destinationId)));
    const routes = await prisma.route.findMany({ where: { id: { in: destinationIds } }, select: { id: true, basePrice: true } });
    const routeMap = new Map(routes.map(r => [r.id, r.basePrice]));

    // Driver info for each vehicle
    const vehicleIds = Array.from(new Set(trips.map(t => t.vehicleId)));
    const drivers = await prisma.driver.findMany({ where: { vehicleId: { in: vehicleIds } }, select: { vehicleId: true, firstName: true, lastName: true, cin: true } });
    const driverMap = new Map(drivers.map(d => [d.vehicleId, d]));

    // Group trips by vehicle and aggregate per destination
    const vehicleIdToTrips = new Map<string, any[]>();
    const vehicleIdToDestAgg = new Map<string, Map<string, { destination: string; count: number; seats: number; revenue: number }>>();
    trips.forEach(t => {
      const basePrice = (routeMap.get(t.destinationId) || 0) || (queueMap.get(t.queueId) || 0);
      const cost = (basePrice || 0) * (t.seatsBooked || 0);
      const arr = vehicleIdToTrips.get(t.vehicleId) || [];
      arr.push({ time: t.startTime, destination: t.destinationName, seats: t.seatsBooked, basePrice: basePrice || 0, cost });
      vehicleIdToTrips.set(t.vehicleId, arr);

      const destMap = vehicleIdToDestAgg.get(t.vehicleId) || new Map();
      const key = t.destinationId;
      const prev = destMap.get(key) || { destination: t.destinationName, count: 0, seats: 0, revenue: 0 };
      prev.count += 1;
      prev.seats += t.seatsBooked || 0;
      prev.revenue += cost;
      destMap.set(key, prev);
      vehicleIdToDestAgg.set(t.vehicleId, destMap);
    });

    // Build response vehicles array (only with trips)
    const vehicles = await prisma.vehicle.findMany({ where: { id: { in: Array.from(vehicleIdToTrips.keys()) } }, select: { id: true, licensePlate: true } });
    const result = vehicles.map(v => {
      const t = vehicleIdToTrips.get(v.id) || [];
      const totals = t.reduce((acc, it) => { acc.totalSeats += it.seats || 0; acc.totalRevenue += it.cost || 0; return acc; }, { totalSeats: 0, totalRevenue: 0 });
      const drv = driverMap.get(v.id) || null;
      const destAggMap = vehicleIdToDestAgg.get(v.id) || new Map();
      const destinations = Array.from(destAggMap.values()).map(d => ({ destination: d.destination, count: d.count, seats: d.seats, revenue: d.revenue }));
      return {
        vehicle: {
          id: v.id,
          licensePlate: v.licensePlate,
          driver: drv ? { firstName: drv.firstName, lastName: drv.lastName, cin: drv.cin } : null,
        },
        totals,
        destinations,
      };
    });

    res.json({ success: true, data: { date: startOfDay.toISOString().slice(0,10), vehicles: result } });
  } catch (error: any) {
    console.error('Error fetching daily trips:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch daily trips', error: error?.message || 'Unknown error' });
  }
});
/**
 * GET /api/vehicles/:id/trips?date=YYYY-MM-DD
 * Returns today's trips for a vehicle with times and computed cost (basePrice * seatsBooked)
 */
router.get('/:id/trips', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date } = req.query as { date?: string };

    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      res.status(404).json({ success: false, message: 'Vehicle not found' });
      return;
    }

    // Try to fetch assigned driver (one-to-one)
    const driver = await prisma.driver.findFirst({
      where: { vehicleId: id },
      select: { firstName: true, lastName: true, cin: true }
    });

    const target = date ? new Date(`${date}T00:00:00`) : new Date();
    const startOfDay = new Date(target); startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(startOfDay); endOfDay.setDate(endOfDay.getDate() + 1);

    // Fetch trips for the vehicle today
    const trips = await prisma.trip.findMany({
      where: { vehicleId: id, startTime: { gte: startOfDay, lt: endOfDay } },
      orderBy: { startTime: 'asc' },
      select: {
        id: true,
        startTime: true,
        seatsBooked: true,
        destinationId: true,
        destinationName: true,
        queueId: true,
      }
    });

    // For each trip, determine base price from Route by destinationId, fallback to queue.basePrice
    const queueIds = trips.map(t => t.queueId);
    const queues = await prisma.vehicleQueue.findMany({
      where: { id: { in: queueIds } },
      select: { id: true, basePrice: true }
    });
    const queueMap = new Map(queues.map(q => [q.id, q.basePrice]));

    // Try to get Route base price by destinationId
    const destinationIds = Array.from(new Set(trips.map(t => t.destinationId)));
    const routes = await prisma.route.findMany({
      where: { id: { in: destinationIds } },
      select: { id: true, basePrice: true }
    });
    const routeMap = new Map(routes.map(r => [r.id, r.basePrice]));

    const items = trips.map(t => {
      const basePrice = (routeMap.get(t.destinationId) || 0) || (queueMap.get(t.queueId) || 0);
      const cost = (basePrice || 0) * (t.seatsBooked || 0);
      return {
        time: t.startTime,
        destination: t.destinationName,
        seats: t.seatsBooked,
        basePrice: basePrice || 0,
        cost,
      };
    });

    const totalSeats = items.reduce((s, it) => s + (it.seats || 0), 0);
    const totalRevenue = items.reduce((s, it) => s + (it.cost || 0), 0);

    res.json({
      success: true,
      data: {
        vehicle: {
          id: vehicle.id,
          licensePlate: vehicle.licensePlate,
          driver: driver ? {
            firstName: driver.firstName,
            lastName: driver.lastName,
            cin: driver.cin,
          } : null,
        },
        date: startOfDay.toISOString().slice(0,10),
        totals: { totalSeats, totalRevenue },
        trips: items,
      }
    });
  } catch (error: any) {
    console.error('Error fetching vehicle trips:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch vehicle trips', error: error?.message || 'Unknown error' });
  }
});