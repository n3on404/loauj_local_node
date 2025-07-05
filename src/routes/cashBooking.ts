import { Router } from 'express';
import { createSimpleCashBookingController } from '../controllers/simpleCashBookingController';
import { authenticate, requireStaff } from '../middleware/auth';
import { WebSocketService } from '../websocket/webSocketService';

// Create a function that returns the router with the controller
export default function createCashBookingRouter(webSocketService?: WebSocketService) {
  const router = Router();
  
  // Create controller with WebSocket service if available, otherwise create a mock one
  const cashBookingController = webSocketService 
    ? createSimpleCashBookingController(webSocketService)
    : createSimpleCashBookingController(new WebSocketService()); // Fallback

  // Apply authentication middleware to all routes
  router.use(authenticate);
  router.use(requireStaff);

  /**
   * @route GET /api/cash-booking/destinations
   * @desc Get all available destinations with seat counts
   * @access Private (Staff only)
   */
  router.get('/destinations', cashBookingController.getAvailableDestinations.bind(cashBookingController));

  /**
   * @route GET /api/cash-booking/destinations/:destinationId/seats
   * @desc Get available seats for a specific destination
   * @access Private (Staff only)
   * @param {string} destinationId - The destination station ID
   */
  router.get('/destinations/:destinationId/seats', cashBookingController.getAvailableSeats.bind(cashBookingController));

  /**
   * @route POST /api/cash-booking/book
   * @desc Create a new cash booking (simplified - no customer info)
   * @access Private (Staff only)
   * @body { destinationId: string, seatsRequested: number }
   */
  router.post('/book', cashBookingController.createCashBooking.bind(cashBookingController));

  /**
   * @route POST /api/cash-booking/verify
   * @desc Verify cash ticket by ticket ID
   * @access Private (Staff only)
   * @body { ticketId: string }
   */
  router.post('/verify', cashBookingController.verifyCashTicket.bind(cashBookingController));

  /**
   * @route GET /api/cash-booking/stats
   * @desc Get cash booking statistics for today
   * @access Private (Staff only)
   */
  router.get('/stats', cashBookingController.getCashBookingStats.bind(cashBookingController));

  return router;
} 