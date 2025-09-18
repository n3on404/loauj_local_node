import express from 'express';
import {
  getDashboardStats,
  getDashboardQueues,
  getDashboardVehicles,
  getDashboardBookings,
  getActivityLog,
  getSupervisorDashboard
} from '../controllers/dashboardController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Apply authentication to all dashboard routes
router.use(authenticate);

// Dashboard statistics
router.get('/stats', getDashboardStats);

// Queue information
router.get('/queues', getDashboardQueues);

// Vehicle information
router.get('/vehicles', getDashboardVehicles);

// Recent bookings
router.get('/bookings', getDashboardBookings);

// Activity log
router.get('/activity', getActivityLog);

// Supervisor dashboard
router.get('/supervisor', getSupervisorDashboard);

export default router;

// Export the function expected by the main server
export function createDashboardRouter() {
  return router;
}