import { Request, Response } from 'express';
import { createSimpleCashBookingService } from '../services/simpleCashBookingService';
import { WebSocketService } from '../websocket/webSocketService';
import { prisma } from '../config/database';

export class SimpleCashBookingController {
  private cashBookingService: ReturnType<typeof createSimpleCashBookingService>;

  constructor(webSocketService: WebSocketService) {
    this.cashBookingService = createSimpleCashBookingService(webSocketService);
  }

  /**
   * Get available destinations with seat counts
   * GET /api/cash-booking/destinations
   */
  async getAvailableDestinations(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.cashBookingService.getAvailableDestinations();

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
   * GET /api/cash-booking/destinations/:destinationId/seats
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

      const result = await this.cashBookingService.getAvailableSeats(destinationId);

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
   * Create a new cash booking
   * POST /api/cash-booking/book
   */
  async createCashBooking(req: Request, res: Response): Promise<void> {
    try {
      const { destinationId, seatsRequested } = req.body;
      const staffId = req.staff?.id;

      // Validate input
      if (!destinationId || !seatsRequested) {
        res.status(400).json({
          success: false,
          error: 'Destination ID and seats requested are required'
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
        staffId
      };

      const result = await this.cashBookingService.createCashBooking(bookingRequest);

      if (result.success) {
        res.status(201).json({
          success: true,
          message: `Successfully booked ${seatsRequested} seat(s) for cash payment`,
          data: {
            bookings: result.bookings,
            totalAmount: result.totalAmount,
            ticketIds: result.ticketIds,
            summary: {
              totalSeats: seatsRequested,
              totalAmount: result.totalAmount,
              vehicleCount: result.bookings?.length || 0,
              paymentMethod: 'CASH'
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
      console.error('❌ Error in createCashBooking controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Verify cash ticket by ticket ID
   * POST /api/cash-booking/verify
   */
  async verifyCashTicket(req: Request, res: Response): Promise<void> {
    try {
      const { ticketId } = req.body;
      const staffId = req.staff?.id;

      if (!ticketId) {
        res.status(400).json({
          success: false,
          error: 'Ticket ID is required'
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

      const result = await this.cashBookingService.verifyCashTicket(ticketId, staffId);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'Cash ticket verified successfully',
          data: result.booking
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error
        });
      }

    } catch (error) {
      console.error('❌ Error in verifyCashTicket controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get cash booking statistics
   * GET /api/cash-booking/stats
   */
  async getCashBookingStats(req: Request, res: Response): Promise<void> {
    try {
      // Get today's cash bookings
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
          },
          paymentMethod: 'CASH'
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

      // Get pending verifications (cash tickets)
      const pendingVerifications = await prisma.booking.count({
        where: {
          isVerified: false,
          paymentMethod: 'CASH',
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
            totalCashBookings: totalBookingsToday,
            totalSeats: totalSeatsBooked,
            totalCashRevenue: totalRevenue,
            pendingVerifications
          },
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('❌ Error in getCashBookingStats controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}

export const createSimpleCashBookingController = (webSocketService: WebSocketService) => {
  return new SimpleCashBookingController(webSocketService);
}; 