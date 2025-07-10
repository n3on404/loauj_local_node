import { Request, Response } from 'express';
import { createQueueBookingService } from '../services/queueBookingService';
import { WebSocketService } from '../websocket/webSocketService';
import { prisma } from '../config/database';

export class QueueBookingController {
  private queueBookingService: ReturnType<typeof createQueueBookingService>;

  constructor(webSocketService: WebSocketService) {
    this.queueBookingService = createQueueBookingService(webSocketService);
  }

  /**
   * Get available destinations with seat counts
   * GET /api/queue-booking/destinations
   */
  async getAvailableDestinations(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.queueBookingService.getAvailableDestinations();

      if (result.success) {
        res.status(200).json({
          success: true,
          data: result.destinations
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in getAvailableDestinations controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get available seats for a specific destination
   * GET /api/queue-booking/destinations/:destinationId/seats
   */
  async getAvailableSeats(req: Request, res: Response): Promise<void> {
    try {
      const { destinationId } = req.params;

      if (!destinationId) {
        res.status(400).json({
          success: false,
          error: 'Destination ID is required'
        });
        return;
      }

      const result = await this.queueBookingService.getAvailableSeats(destinationId);

      if (result.success) {
        res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in getAvailableSeats controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Create a new booking
   * POST /api/queue-booking/book
   */
  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const { destinationId, seatsRequested, customerName, customerPhone, paymentMethod } = req.body;
      const staffId = req.staff?.id;

      // Validate input
      if (!destinationId || !seatsRequested ) {
        res.status(400).json({
          success: false,
          error: 'Destination ID, seats requested are required'
        });
        return;
      }

      if (!staffId) {
        res.status(401).json({
          success: false,
          error: 'Staff authentication required'
        });
        return;
      }

      if (typeof seatsRequested !== 'number' || seatsRequested <= 0 || seatsRequested > 20) {
        res.status(400).json({
          success: false,
          error: 'Seats requested must be a number between 1 and 20'
        });
        return;
      }

      const bookingRequest = {
        destinationId,
        seatsRequested,
        customerName,
        customerPhone,
        staffId,
        paymentMethod
      };

      const result = await this.queueBookingService.createBooking(bookingRequest);

      if (result.success) {
        res.status(201).json({
          success: true,
          message: `Successfully booked ${seatsRequested} seat(s) for ${customerName}`,
          data: {
            bookings: result.bookings,
            totalAmount: result.totalAmount,
            verificationCodes: result.verificationCodes,
            summary: {
              totalSeats: seatsRequested,
              totalAmount: result.totalAmount,
              vehicleCount: result.bookings?.length || 0,
              customer: customerName
            }
          }
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in createBooking controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get booking by verification code
   * GET /api/queue-booking/verify/:verificationCode
   */
  async getBooking(req: Request, res: Response): Promise<void> {
    try {
      const { verificationCode } = req.params;

      if (!verificationCode) {
        res.status(400).json({
          success: false,
          error: 'Verification code is required'
        });
        return;
      }

      const result = await this.queueBookingService.getBookingByVerificationCode(verificationCode);

      if (result.success) {
        res.status(200).json({
          success: true,
          data: result.booking
        });
      } else {
        res.status(404).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in getBooking controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Verify and mark ticket as used
   * POST /api/queue-booking/verify
   */
  async verifyTicket(req: Request, res: Response): Promise<void> {
    try {
      const { verificationCode } = req.body;
      const staffId = req.staff?.id;

      if (!verificationCode) {
        res.status(400).json({
          success: false,
          error: 'Verification code is required'
        });
        return;
      }

      if (!staffId) {
        res.status(401).json({
          success: false,
          error: 'Staff authentication required'
        });
        return;
      }

      // Try to verify the ticket
      const result = await this.queueBookingService.verifyTicket(verificationCode, staffId);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'Ticket verified successfully',
          data: result.booking,
          justVerified: true
        });
        return;
      }

      // If already verified, fetch and return ticket details with a flag
      if (result.error === 'Ticket already verified') {
        const bookingResult = await this.queueBookingService.getBookingByVerificationCode(verificationCode);
        if (bookingResult.success) {
          res.status(200).json({
            success: true,
            message: 'Ticket was already verified',
            data: bookingResult.booking,
            justVerified: false
          });
        } else {
          res.status(404).json({
            success: false,
            error: bookingResult.error || 'Ticket not found'
          });
        }
        return;
      }

      // Other errors
      res.status(400).json({
        success: false,
        error: result.error
      });
    } catch (error) {
      console.error('❌ Error in verifyTicket controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get booking statistics
   * GET /api/queue-booking/stats
   */
  async getBookingStats(req: Request, res: Response): Promise<void> {
    try {
      // Get today's bookings
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const todayStats = await prisma.booking.groupBy({
        by: ['queueId'],
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow
          }
        },
        _sum: {
          seatsBooked: true,
          totalAmount: true
        },
        _count: {
          id: true
        }
      });

      const totalBookingsToday = todayStats.reduce((sum: number, stat: any) => sum + stat._count.id, 0);
      const totalSeatsBooked = todayStats.reduce((sum: number, stat: any) => sum + (stat._sum.seatsBooked || 0), 0);
      const totalRevenue = todayStats.reduce((sum: number, stat: any) => sum + (stat._sum.totalAmount || 0), 0);

      // Get pending verifications
      const pendingVerifications = await prisma.booking.count({
        where: {
          isVerified: false,
          createdAt: {
            gte: today,
            lt: tomorrow
          }
        }
      });

      res.status(200).json({
        success: true,
        data: {
          today: {
            totalBookings: totalBookingsToday,
            totalSeats: totalSeatsBooked,
            totalRevenue: totalRevenue,
            pendingVerifications
          },
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('❌ Error in getBookingStats controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Create online booking from central server
   * POST /api/queue-booking/online
   */
  async createOnlineBooking(req: Request, res: Response): Promise<void> {
    try {
      const { destinationId, seatsRequested, customerPhone, onlineTicketId, userId, totalAmount, vehicleAllocations } = req.body;

      // Validate input
      if (!destinationId || !seatsRequested || !customerPhone || !onlineTicketId || !userId || !totalAmount || !vehicleAllocations) {
        res.status(400).json({
          success: false,
          error: 'All fields are required: destinationId, seatsRequested, customerPhone, onlineTicketId, userId, totalAmount, vehicleAllocations'
        });
        return;
      }

      // Validate that this is coming from central server
      const isCentralServer = req.headers['x-central-server'] === 'true';
      if (!isCentralServer) {
        res.status(403).json({
          success: false,
          error: 'This endpoint is only accessible by the central server'
        });
        return;
      }

      const onlineBookingRequest = {
        destinationId,
        seatsRequested,
        customerPhone,
        onlineTicketId,
        userId, // Add user ID
        totalAmount, // Add total amount from central server
        vehicleAllocations
      };

      console.log(`🌐 Received online booking request from central server:`);
      console.log(`   User ID: ${userId}`);
      console.log(`   Total Amount: $${totalAmount}`);
      console.log(`   Seats: ${seatsRequested}`);
      console.log(`   Online Ticket ID: ${onlineTicketId}`);

      const result = await this.queueBookingService.createOnlineBooking(onlineBookingRequest);

      if (result.success) {
        res.status(201).json({
          success: true,
          message: `Online booking created successfully for ${seatsRequested} seat(s)`,
          data: {
            bookings: result.bookings,
            totalAmount: result.totalAmount,
            verificationCodes: result.verificationCodes
          }
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in createOnlineBooking controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Update online booking payment status
   * PUT /api/queue-booking/online/:onlineTicketId/payment
   */
  async updateOnlineBookingPaymentStatus(req: Request, res: Response): Promise<void> {
    try {
      const { onlineTicketId } = req.params;
      const { paymentStatus } = req.body;

      if (!onlineTicketId) {
        res.status(400).json({
          success: false,
          error: 'Online ticket ID is required'
        });
        return;
      }

      if (!paymentStatus || !['PAID', 'FAILED', 'CANCELLED'].includes(paymentStatus)) {
        res.status(400).json({
          success: false,
          error: 'Valid payment status is required (PAID, FAILED, or CANCELLED)'
        });
        return;
      }

      // Validate that this is coming from central server
      const isCentralServer = req.headers['x-central-server'] === 'true';
      if (!isCentralServer) {
        res.status(403).json({
          success: false,
          error: 'This endpoint is only accessible by the central server'
        });
        return;
      }

      const result = await this.queueBookingService.updateOnlineBookingPaymentStatus(onlineTicketId, paymentStatus);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: result.message
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.message
        });
      }

    } catch (error) {
      console.error('❌ Error in updateOnlineBookingPaymentStatus controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

export const createQueueBookingController = (webSocketService: WebSocketService) => {
  return new QueueBookingController(webSocketService);
};