import { Router } from 'express';
import { 
  generateEntryTicket, 
  generateExitTicket, 
  getDriverTickets,
  getVehiclesInQueue,
  getVehiclesForExit,
  searchVehicleByCIN,
  getDriverIncomeForDate
} from '../controllers/driverTicketController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Generate entry ticket for driver
router.post('/entry', authenticate, generateEntryTicket);

// Generate exit ticket for driver
router.post('/exit', authenticate, generateExitTicket);

// Get all tickets for a specific vehicle
router.get('/vehicle/:licensePlate', authenticate, getDriverTickets);

// Get vehicles in queue for entry tickets
router.get('/queue/vehicles', authenticate, getVehiclesInQueue);

// Get vehicles for exit tickets (from queue and trips)
router.get('/exit/vehicles', authenticate, getVehiclesForExit);

// Search vehicle by driver CIN
router.get('/search/cin/:cin', authenticate, searchVehicleByCIN);

// Get driver's income for a given date (based on exit passes)
router.get('/income/:licensePlate', authenticate, getDriverIncomeForDate);

export default router; 