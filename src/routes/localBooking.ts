import { Router } from 'express';
import { localBookingController, calculateETD } from '../controllers/localBooking';

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
 * @route GET /api/bookings/eta/:destinationId
 * @desc Test route to calculate Estimated Time of Arrival for a destination
 * @access Public (for testing purposes)
 * @param {string} destinationId - The destination station ID
 * @returns {object} ETA calculation result with queue information
 */
router.get('/eta/:destinationId', async (req, res) => {
  try {
    const { destinationId } = req.params;

    if (!destinationId) {
      res.status(400).json({
        success: false,
        error: 'Destination ID is required'
      });
      return;
    }

    console.log(`🕐 Calculating ETA for destination: ${destinationId}`);

    // Calculate the estimated departure time
    const etd = await calculateETD(destinationId);

    // Get additional queue information for debugging
    const { prisma } = await import('../config/database');
    const vehiclesInQueue = await prisma.vehicleQueue.findMany({
      where: {
        destinationId,
        status: { in: ["WAITING", "LOADING", "READY"] },
        vehicle: {
          isActive: true,
          isBanned: false,
        },
      },
      orderBy: { queuePosition: "asc" },
      include: {
        vehicle: {
          select: {
            licensePlate: true,
            model: true,
            isActive: true
          }
        },
        bookings: {
          select: {
            seatsBooked: true,
            paymentStatus: true
          }
        }
      },
    });

    const queueSummary = vehiclesInQueue.map(v => {
      // Only count confirmed bookings (PAID, COMPLETED)
      const confirmedBookings = v.bookings.filter(b =>
        ['PAID', 'COMPLETED'].includes(b.paymentStatus)
      );
      const confirmedBookedSeats = confirmedBookings.reduce((sum, b) => sum + b.seatsBooked, 0);
      const allBookedSeats = v.bookings.reduce((sum, b) => sum + b.seatsBooked, 0);

      return {
        licensePlate: v.vehicle.licensePlate,
        queuePosition: v.queuePosition,
        status: v.status,
        totalSeats: v.totalSeats,
        availableSeats: v.availableSeats,
        passengers: v.totalSeats - v.availableSeats,
        confirmedBookedSeats,
        totalBookedSeats: allBookedSeats,
        estimatedDeparture: v.estimatedDeparture
      };
    });

    res.json({
      success: true,
      data: {
        destinationId,
        estimatedDepartureTime: etd.toISOString(),
        calculatedAt: new Date().toISOString(),
        queueInformation: {
          totalVehicles: vehiclesInQueue.length,
          vehicles: queueSummary
        }
      }
    });

    console.log(`✅ ETD calculated for ${destinationId}: ${etd.toISOString()}`);

  } catch (error) {
    console.error('❌ Error calculating ETA:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate ETA',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

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
      check_booking: 'GET /api/bookings/check/:verificationCode',
      test_eta: 'GET /api/bookings/eta/:destinationId',
      station_summary: 'GET /api/bookings/station/summary',
      confirm_payment: 'POST /api/bookings/confirm-payment'
    }
  });
});

export default router;
