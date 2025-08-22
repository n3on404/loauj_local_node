import { Router } from 'express';
import { localBookingController } from '../controllers/localBooking';

const router = Router();

/**
 * @route POST /api/bookings/create
 * @desc Create a new booking at the local station
 * @access Internal (Called by Central Server)
 * @body {
 *   userId: string,
 *   userFullName: string,
 *   userPhoneNumber: string,
 *   userEmail: string,
 *   departureStationId: string,
 *   destinationStationId: string,
 *   numberOfSeats: number,
 *   selectedVehicles: Array<{
 *     vehicleQueueId: string,
 *     licensePlate: string,
 *     seatsToBook: number,
 *     pricePerSeat: number
 *   }>
 * }
 */
router.post('/create', localBookingController.createBooking.bind(localBookingController));

/**
 * @route GET /api/bookings/verify/:verificationCode
 * @desc Verify and complete a booking (mark as used/completed)
 * @access Staff (when passenger shows ticket at station)
 * @param {string} verificationCode - The verification code
 * @body {staffId?: string} - Optional staff member ID who verified the ticket
 */
router.post('/verify/:verificationCode', localBookingController.verifyBooking.bind(localBookingController));

/**
 * @route GET /api/bookings/check/:verificationCode
 * @desc Check booking details without verifying it
 * @access Public (for checking ticket status)
 * @param {string} verificationCode - The verification code
 */
router.get('/check/:verificationCode', localBookingController.checkBooking.bind(localBookingController));

/**
 * @route GET /api/bookings/station/summary
 * @desc Get booking summary for the station
 * @access Internal
 */
router.get('/station/summary', localBookingController.getStationBookingSummary.bind(localBookingController));

/**
 * @route POST /api/bookings/confirm-payment
 * @desc Confirm payment and update booking status
 * @access Internal (Called by Central Server after payment webhook)
 * @body {
 *   verificationCode: string,
 *   paymentReference: string,
 *   status: 'PAID' | 'FAILED',
 *   paymentProcessedAt?: string,
 *   centralBookingId?: string,
 *   updateData?: any
 * }
 */
router.post('/confirm-payment', localBookingController.confirmPayment.bind(localBookingController));

/**
 * Health check for local booking service
 * GET /api/bookings/health
 */
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Local Booking service is healthy',
    timestamp: new Date().toISOString(),
    endpoints: {
      create_booking: 'POST /api/bookings/create',
      verify_booking: 'GET /api/bookings/verify/:verificationCode',
      station_summary: 'GET /api/bookings/station/summary'
    }
  });
});

export default router;
