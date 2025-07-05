import { Router } from 'express';
import { createQueueBookingController } from '../controllers/queueBookingController';
import { authenticate, requireStaff } from '../middleware/auth';
import { WebSocketService } from '../websocket/webSocketService';

// Create a function that returns the router with the controller
export default function createQueueBookingRouter(webSocketService?: WebSocketService) {
  const router = Router();
  
  // Create controller with WebSocket service if available, otherwise create a mock one
  const queueBookingController = webSocketService 
    ? createQueueBookingController(webSocketService)
    : createQueueBookingController(new WebSocketService()); // Fallback

  // Apply authentication middleware to all routes
  router.use(authenticate);
  router.use(requireStaff);

  /**
   * @route GET /api/queue-booking/destinations
   * @desc Get all available destinations with seat counts
   * @access Private (Staff only)
   */
  router.get('/destinations', queueBookingController.getAvailableDestinations.bind(queueBookingController));

  /**
   * @route GET /api/queue-booking/destinations/:destinationId/seats
   * @desc Get available seats for a specific destination
   * @access Private (Staff only)
   * @param {string} destinationId - The destination station ID
   */
  router.get('/destinations/:destinationId/seats', queueBookingController.getAvailableSeats.bind(queueBookingController));

  /**
   * @route POST /api/queue-booking/book
   * @desc Create a new booking with intelligent seat allocation
   * @access Private (Staff only)
   * @body { destinationId: string, seatsRequested: number, customerName: string, customerPhone?: string, paymentMethod?: string }
   */
  router.post('/book', queueBookingController.createBooking.bind(queueBookingController));

  /**
   * @route GET /api/queue-booking/verify/:verificationCode
   * @desc Get booking details by verification code
   * @access Private (Staff only)
   * @param {string} verificationCode - The booking verification code
   */
  router.get('/verify/:verificationCode', queueBookingController.getBooking.bind(queueBookingController));

  /**
   * @route POST /api/queue-booking/verify
   * @desc Verify and mark ticket as used
   * @access Private (Staff only)
   * @body { verificationCode: string }
   */
  router.post('/verify', queueBookingController.verifyTicket.bind(queueBookingController));

  /**
   * @route GET /api/queue-booking/stats
   * @desc Get booking statistics for today
   * @access Private (Staff only)
   */
  router.get('/stats', queueBookingController.getBookingStats.bind(queueBookingController));

  return router;
} 