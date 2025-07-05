import { prisma } from '../config/database';
import { WebSocketService } from '../websocket/webSocketService';

export interface BookingRequest {
  destinationId: string;
  seatsRequested: number;
  bookingType?: 'CASH' | 'ONLINE'; // Default to CASH
  // Optional customer info (only for online bookings)
  customerName?: string;
  customerPhone?: string;
  onlineTicketId?: string; // For online bookings from central server
  staffId: string;
  paymentMethod?: string;
}

export interface BookingResult {
  success: boolean;
  bookings?: QueueBooking[];
  error?: string;
  totalAmount?: number;
  verificationCodes?: string[];
  ticketIds?: string[]; // For cash bookings, these are the verification codes
}

export interface QueueBooking {
  id: string;
  queueId: string;
  vehicleLicensePlate: string;
  destinationName: string;
  seatsBooked: number;
  totalAmount: number;
  verificationCode: string;
  qrCode: string;
  bookingType: 'CASH' | 'ONLINE';
  customerName?: string | null | undefined;
  customerPhone?: string | null | undefined;
  onlineTicketId?: string | null | undefined;
  createdAt: Date;
  queuePosition: number;
  estimatedDeparture?: Date | null;
}

export interface AvailableSeats {
  destinationId: string;
  destinationName: string;
  totalAvailableSeats: number;
  vehicles: VehicleSeatingInfo[];
}

export interface VehicleSeatingInfo {
  queueId: string;
  vehicleId: string;
  licensePlate: string;
  queuePosition: number;
  availableSeats: number;
  totalSeats: number;
  basePrice: number;
  status: string;
  estimatedDeparture?: Date | null;
}

export class QueueBookingService {
  private currentStationId: string;
  private webSocketService: WebSocketService;

  constructor(webSocketService: WebSocketService) {
    this.currentStationId = process.env.STATION_ID || 'station-001';
    this.webSocketService = webSocketService;
  }

  /**
   * Get available seats for a destination
   */
  async getAvailableSeats(destinationId: string): Promise<{
    success: boolean;
    data?: AvailableSeats;
    error?: string;
  }> {
    try {
      console.log(`📊 Getting available seats for destination: ${destinationId}`);

      // Get all vehicles in queue for this destination (both regular and overnight)
      const queueEntries = await prisma.vehicleQueue.findMany({
        where: {
          destinationId,
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        },
        include: {
          vehicle: true
        },
        orderBy: [
          { queueType: 'desc' }, // REGULAR comes after OVERNIGHT alphabetically, so we want OVERNIGHT first
          { queuePosition: 'asc' }
        ]
      });

      if (queueEntries.length === 0) {
        return {
          success: false,
          error: `No vehicles available for destination ${destinationId}`
        };
      }

      const vehicles: VehicleSeatingInfo[] = [];
      let totalAvailableSeats = 0;

      for (const entry of queueEntries) {
        const vehicleInfo: VehicleSeatingInfo = {
          queueId: entry.id,
          vehicleId: entry.vehicleId,
          licensePlate: entry.vehicle.licensePlate,
          queuePosition: entry.queuePosition,
          availableSeats: entry.availableSeats,
          totalSeats: entry.totalSeats,
          basePrice: entry.basePrice,
          status: entry.status,
          estimatedDeparture: entry.estimatedDeparture
        };

        vehicles.push(vehicleInfo);
        totalAvailableSeats += entry.availableSeats;
      }

      return {
        success: true,
        data: {
          destinationId,
          destinationName: queueEntries[0].destinationName,
          totalAvailableSeats,
          vehicles
        }
      };

    } catch (error) {
      console.error('❌ Error getting available seats:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create booking with intelligent seat allocation
   */
  async createBooking(bookingRequest: BookingRequest): Promise<BookingResult> {
    try {
      console.log(`🎫 Creating booking for ${bookingRequest.seatsRequested} seats to ${bookingRequest.destinationId}`);

      // Get available seats
      const availableSeatsResult = await this.getAvailableSeats(bookingRequest.destinationId);
      
      if (!availableSeatsResult.success || !availableSeatsResult.data) {
        return {
          success: false,
          error: availableSeatsResult.error || 'No vehicles available'
        };
      }

      const { data: availableSeats } = availableSeatsResult;

      // Check if we have enough total seats
      if (availableSeats.totalAvailableSeats < bookingRequest.seatsRequested) {
        return {
          success: false,
          error: `Not enough seats available. Requested: ${bookingRequest.seatsRequested}, Available: ${availableSeats.totalAvailableSeats}`
        };
      }

      // Distribute seats across vehicles using intelligent allocation
      const allocation = this.allocateSeats(availableSeats.vehicles, bookingRequest.seatsRequested);
      
      if (allocation.length === 0) {
        return {
          success: false,
          error: 'Unable to allocate seats across available vehicles'
        };
      }

      // Create bookings for each vehicle
      const bookings: QueueBooking[] = [];
      const verificationCodes: string[] = [];
      let totalAmount = 0;

      for (const { vehicle, seatsToBook } of allocation) {
        const verificationCode = this.generateVerificationCode();
        const qrCode = this.generateQRCode(verificationCode);
        const bookingAmount = seatsToBook * vehicle.basePrice;

        // Create booking in database
        const bookingType = bookingRequest.bookingType || 'CASH';
        const booking = await prisma.booking.create({
          data: {
            id: `booking_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            queueId: vehicle.queueId,
            seatsBooked: seatsToBook,
            totalAmount: bookingAmount,
            bookingSource: bookingType === 'CASH' ? 'CASH_STATION' : 'ONLINE',
            bookingType: bookingType,
            customerName: bookingRequest.customerName || 'Cash Customer',
            customerPhone: bookingRequest.customerPhone || null,

            paymentStatus: bookingType === 'CASH' ? 'PAID' : 'PENDING',
            paymentMethod: bookingRequest.paymentMethod || (bookingType === 'CASH' ? 'CASH' : 'ONLINE'),
            verificationCode,
            qrCode,
            createdBy: bookingRequest.staffId
          }
        });

        // Update available seats in queue
        await prisma.vehicleQueue.update({
          where: { id: vehicle.queueId },
          data: {
            availableSeats: vehicle.availableSeats - seatsToBook
          }
        });

        // Check if vehicle is now full and update status
        const updatedAvailableSeats = vehicle.availableSeats - seatsToBook;
        if (updatedAvailableSeats === 0) {
          await prisma.vehicleQueue.update({
            where: { id: vehicle.queueId },
            data: { status: 'READY' }
          });
          console.log(`🚐 Vehicle ${vehicle.licensePlate} is now READY (fully booked)`);
        }

        // Get queue and vehicle info for response
        const queueInfo = await prisma.vehicleQueue.findUnique({
          where: { id: vehicle.queueId },
          include: { vehicle: true }
        });

        const queueBooking: QueueBooking = {
          id: booking.id,
          queueId: booking.queueId,
          vehicleLicensePlate: queueInfo?.vehicle.licensePlate || '',
          destinationName: queueInfo?.destinationName || '',
          seatsBooked: booking.seatsBooked,
          totalAmount: booking.totalAmount,
          verificationCode: booking.verificationCode,
          qrCode: booking.qrCode || '',
          bookingType: (booking.bookingType || 'CASH') as 'CASH' | 'ONLINE',
          customerName: booking.customerName,
          customerPhone: booking.customerPhone,
          onlineTicketId: booking.onlineTicketId,
          createdAt: booking.createdAt,
          queuePosition: queueInfo?.queuePosition || 0,
          estimatedDeparture: queueInfo?.estimatedDeparture || null
        };

        bookings.push(queueBooking);
        verificationCodes.push(verificationCode);
        totalAmount += bookingAmount;

        console.log(`✅ Booked ${seatsToBook} seats on vehicle ${vehicle.licensePlate} (${updatedAvailableSeats} seats remaining)`);
      }

      // Broadcast booking update
      this.broadcastBookingUpdate(bookingRequest.destinationId);

      console.log(`🎉 Booking completed: ${bookingRequest.seatsRequested} seats across ${bookings.length} vehicle(s), Total: $${totalAmount}`);

      return {
        success: true,
        bookings,
        totalAmount,
        verificationCodes,
        ticketIds: verificationCodes
      };

    } catch (error) {
      console.error('❌ Error creating booking:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Intelligent seat allocation across vehicles
   */
  private allocateSeats(vehicles: VehicleSeatingInfo[], seatsRequested: number): Array<{
    vehicle: VehicleSeatingInfo;
    seatsToBook: number;
  }> {
    const allocation: Array<{ vehicle: VehicleSeatingInfo; seatsToBook: number }> = [];
    let remainingSeats = seatsRequested;

    // Sort vehicles by queue position to prioritize earlier vehicles
    const sortedVehicles = [...vehicles].sort((a, b) => {
      return a.queuePosition - b.queuePosition;
    });

    for (const vehicle of sortedVehicles) {
      if (remainingSeats <= 0) break;
      if (vehicle.availableSeats <= 0) continue;

      const seatsToBook = Math.min(remainingSeats, vehicle.availableSeats);
      
      allocation.push({
        vehicle,
        seatsToBook
      });

      remainingSeats -= seatsToBook;

      console.log(`📋 Allocated ${seatsToBook} seats to vehicle ${vehicle.licensePlate} (position ${vehicle.queuePosition})`);
    }

    if (remainingSeats > 0) {
      console.warn(`⚠️ Unable to allocate ${remainingSeats} seats`);
      return []; // Return empty if we can't fulfill the complete request
    }

    return allocation;
  }

  /**
   * Get booking by verification code
   */
  async getBookingByVerificationCode(verificationCode: string): Promise<{
    success: boolean;
    booking?: QueueBooking;
    error?: string;
  }> {
    try {
      const booking = await prisma.booking.findUnique({
        where: { verificationCode },
        include: {
          queue: {
            include: {
              vehicle: true
            }
          }
        }
      });

      if (!booking) {
        return {
          success: false,
          error: 'Booking not found'
        };
      }

      const queueBooking: QueueBooking = {
        id: booking.id,
        queueId: booking.queueId,
        vehicleLicensePlate: booking.queue.vehicle.licensePlate,
        destinationName: booking.queue.destinationName,
        seatsBooked: booking.seatsBooked,
        totalAmount: booking.totalAmount,
        verificationCode: booking.verificationCode,
        qrCode: booking.qrCode || '',
        bookingType: (booking.bookingType || 'CASH') as 'CASH' | 'ONLINE',
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        onlineTicketId: booking.onlineTicketId,
        createdAt: booking.createdAt,
        queuePosition: booking.queue.queuePosition,
        estimatedDeparture: booking.queue.estimatedDeparture
      };

      return {
        success: true,
        booking: queueBooking
      };

    } catch (error) {
      console.error('❌ Error getting booking:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Verify and mark ticket as used
   */
  async verifyTicket(verificationCode: string, staffId: string): Promise<{
    success: boolean;
    booking?: QueueBooking;
    error?: string;
  }> {
    try {
      const booking = await prisma.booking.findUnique({
        where: { verificationCode },
        include: {
          queue: {
            include: {
              vehicle: true
            }
          }
        }
      });

      if (!booking) {
        return {
          success: false,
          error: 'Invalid verification code'
        };
      }

      if (booking.isVerified) {
        return {
          success: false,
          error: 'Ticket already verified'
        };
      }

      // Mark as verified
      const updatedBooking = await prisma.booking.update({
        where: { id: booking.id },
        data: {
          isVerified: true,
          verifiedAt: new Date(),
          verifiedById: staffId
        },
        include: {
          queue: {
            include: {
              vehicle: true
            }
          }
        }
      });

      const queueBooking: QueueBooking = {
        id: updatedBooking.id,
        queueId: updatedBooking.queueId,
        vehicleLicensePlate: updatedBooking.queue.vehicle.licensePlate,
        destinationName: updatedBooking.queue.destinationName,
        seatsBooked: updatedBooking.seatsBooked,
        totalAmount: updatedBooking.totalAmount,
        verificationCode: updatedBooking.verificationCode,
        qrCode: updatedBooking.qrCode || '',
        bookingType: (updatedBooking.bookingType || 'CASH') as 'CASH' | 'ONLINE',
        customerName: updatedBooking.customerName,
        customerPhone: updatedBooking.customerPhone,
        onlineTicketId: updatedBooking.onlineTicketId,
        createdAt: updatedBooking.createdAt,
        queuePosition: updatedBooking.queue.queuePosition,
        estimatedDeparture: updatedBooking.queue.estimatedDeparture
      };

      console.log(`✅ Ticket verified: ${verificationCode} for ${booking.customerName}`);

      return {
        success: true,
        booking: queueBooking
      };

    } catch (error) {
      console.error('❌ Error verifying ticket:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get all destinations with available seats
   */
  async getAvailableDestinations(): Promise<{
    success: boolean;
    destinations?: Array<{
      destinationId: string;
      destinationName: string;
      totalAvailableSeats: number;
      vehicleCount: number;
    }>;
    error?: string;
  }> {
    try {
      const destinations = await prisma.vehicleQueue.groupBy({
        by: ['destinationId', 'destinationName'],
        where: {
          status: { in: ['WAITING', 'LOADING', 'READY'] },
          availableSeats: { gt: 0 }
        },
        _sum: {
          availableSeats: true
        },
        _count: {
          id: true
        }
      });

      const result = destinations.map(dest => ({
        destinationId: dest.destinationId,
        destinationName: dest.destinationName,
        totalAvailableSeats: dest._sum.availableSeats || 0,
        vehicleCount: dest._count.id
      }));

      return {
        success: true,
        destinations: result
      };

    } catch (error) {
      console.error('❌ Error getting available destinations:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate verification code
   */
  private generateVerificationCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  /**
   * Generate QR code string
   */
  private generateQRCode(verificationCode: string): string {
    return `LOUAJ_TICKET_${verificationCode}_${Date.now()}`;
  }

  /**
   * Broadcast booking update via WebSocket
   */
  private broadcastBookingUpdate(destinationId: string): void {
    try {
      this.webSocketService.emit('booking_updated', {
        destinationId,
        timestamp: new Date().toISOString()
      });

      // Add WebSocket method for booking updates
      if (typeof (this.webSocketService as any).sendBookingUpdate === 'function') {
        (this.webSocketService as any).sendBookingUpdate({
          destinationId,
          stationId: this.currentStationId,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('❌ Error broadcasting booking update:', error);
    }
  }
}

export const createQueueBookingService = (webSocketService: WebSocketService) => {
  return new QueueBookingService(webSocketService);
}; 