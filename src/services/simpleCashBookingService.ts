import { prisma } from '../config/database';
import { WebSocketService } from '../websocket/webSocketService';

export interface SimpleCashBookingRequest {
  destinationId: string;
  seatsRequested: number;
  staffId: string;
}

export interface SimpleCashBookingResult {
  success: boolean;
  bookings?: SimpleCashBooking[];
  error?: string;
  totalAmount?: number;
  ticketIds?: string[]; // Verification codes for cash tickets
}

export interface SimpleCashBooking {
  id: string;
  queueId: string;
  vehicleLicensePlate: string; // Vehicle number plate
  destinationName: string;
  destinationStationId: string; // Destination station ID
  startStationId: string; // Start/origin station ID
  startStationName: string; // Start/origin station name
  seatsBooked: number;
  pricePerSeat: number; // Price per seat from route
  totalAmount: number;
  routeId?: string | undefined; // Route ID if available
  ticketId: string; // This is the verification code
  qrCode: string;
  bookingTime: Date; // Time when booking was created
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

export class SimpleCashBookingService {
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

      // Get all vehicles in queue for this destination
      const queueEntries = await prisma.vehicleQueue.findMany({
        where: {
          destinationId,
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        },
        include: {
          vehicle: true
        },
        orderBy: [
          { queueType: 'desc' }, // OVERNIGHT first
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
   * Create cash booking (simplified - no customer info needed)
   */
  async createCashBooking(bookingRequest: SimpleCashBookingRequest): Promise<SimpleCashBookingResult> {
    try {
      console.log(`🎫 Creating cash booking for ${bookingRequest.seatsRequested} seats to ${bookingRequest.destinationId}`);

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

      // Distribute seats across vehicles
      const allocation = this.allocateSeats(availableSeats.vehicles, bookingRequest.seatsRequested);
      
      if (allocation.length === 0) {
        return {
          success: false,
          error: 'Unable to allocate seats across available vehicles'
        };
      }

      // Create bookings for each vehicle
      const bookings: SimpleCashBooking[] = [];
      const ticketIds: string[] = [];
      let totalAmount = 0;

      for (const { vehicle, seatsToBook } of allocation) {
        const ticketId = this.generateTicketId();
        const qrCode = this.generateQRCode(ticketId);

        // Get station config for start station information
        const stationConfig = await prisma.stationConfig.findFirst();
        const startStationId = stationConfig?.stationId || this.currentStationId;

        // Find the route to get correct pricing
        const route = await prisma.route.findFirst({
          where: {
            departureStationId: startStationId,
            destinationStationId: bookingRequest.destinationId,
            isActive: true
          }
        });

        // Use route price if available, otherwise fall back to vehicle queue basePrice
        const pricePerSeat = route?.basePrice || vehicle.basePrice;
        const bookingAmount = seatsToBook * pricePerSeat;

        // Create booking in database
        const booking = await prisma.booking.create({
          data: {
            id: `cash_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            queueId: vehicle.queueId,
            seatsBooked: seatsToBook,
            totalAmount: bookingAmount,
            bookingSource: 'STATION',
            customerName: 'Cash Customer',
            customerPhone: null,
            paymentStatus: 'PAID',
            paymentMethod: 'CASH',
            verificationCode: ticketId,
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

        // Get queue info for response
        const queueInfo = await prisma.vehicleQueue.findUnique({
          where: { id: vehicle.queueId },
          include: { vehicle: true }
        });

        const cashBooking: SimpleCashBooking = {
          id: booking.id,
          queueId: booking.queueId,
          vehicleLicensePlate: queueInfo?.vehicle.licensePlate || vehicle.licensePlate,
          destinationName: queueInfo?.destinationName || '',
          destinationStationId: queueInfo?.destinationId || bookingRequest.destinationId,
          startStationId: startStationId,
          startStationName: stationConfig?.stationName || 'Local Station',
          seatsBooked: booking.seatsBooked,
          pricePerSeat: pricePerSeat,
          totalAmount: booking.totalAmount,
          routeId: route?.id,
          ticketId: booking.verificationCode,
          qrCode: booking.qrCode || '',
          bookingTime: new Date(),
          createdAt: booking.createdAt,
          queuePosition: queueInfo?.queuePosition || 0,
          estimatedDeparture: queueInfo?.estimatedDeparture || null
        };

        bookings.push(cashBooking);
        ticketIds.push(ticketId);
        totalAmount += bookingAmount;

        console.log(`✅ Booked ${seatsToBook} seats on vehicle ${vehicle.licensePlate} at $${pricePerSeat}/seat (${updatedAvailableSeats} seats remaining)`);
      }

      // Broadcast booking update
      this.broadcastBookingUpdate(bookingRequest.destinationId);

      console.log(`🎉 Cash booking completed: ${bookingRequest.seatsRequested} seats across ${bookings.length} vehicle(s), Total: $${totalAmount}`);

      return {
        success: true,
        bookings,
        totalAmount,
        ticketIds
      };

    } catch (error) {
      console.error('❌ Error creating cash booking:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Verify cash ticket by ticket ID
   */
  async verifyCashTicket(ticketId: string, staffId: string): Promise<{
    success: boolean;
    booking?: SimpleCashBooking;
    error?: string;
  }> {
    try {
      const booking = await prisma.booking.findUnique({
        where: { verificationCode: ticketId },
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
          error: 'Invalid ticket ID'
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

      // Get station config for start station information
      const stationConfig = await prisma.stationConfig.findFirst();
      const startStationId = stationConfig?.stationId || this.currentStationId;

      // Find the route to get correct pricing
      const route = await prisma.route.findFirst({
        where: {
          departureStationId: startStationId,
          destinationStationId: updatedBooking.queue.destinationId,
          isActive: true
        }
      });

      // Use route price if available, otherwise fall back to queue basePrice
      const pricePerSeat = route?.basePrice || updatedBooking.queue.basePrice;

      const cashBooking: SimpleCashBooking = {
        id: updatedBooking.id,
        queueId: updatedBooking.queueId,
        vehicleLicensePlate: updatedBooking.queue.vehicle.licensePlate,
        destinationName: updatedBooking.queue.destinationName,
        destinationStationId: updatedBooking.queue.destinationId,
        startStationId: startStationId,
        startStationName: stationConfig?.stationName || 'Local Station',
        seatsBooked: updatedBooking.seatsBooked,
        pricePerSeat: pricePerSeat,
        totalAmount: updatedBooking.totalAmount,
        routeId: route?.id,
        ticketId: updatedBooking.verificationCode,
        qrCode: updatedBooking.qrCode || '',
        bookingTime: new Date(),
        createdAt: updatedBooking.createdAt,
        queuePosition: updatedBooking.queue.queuePosition,
        estimatedDeparture: updatedBooking.queue.estimatedDeparture
      };

      console.log(`✅ Cash ticket verified: ${ticketId}`);

      return {
        success: true,
        booking: cashBooking
      };

    } catch (error) {
      console.error('❌ Error verifying cash ticket:', error);
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
   * Intelligent seat allocation across vehicles
   */
  private allocateSeats(vehicles: VehicleSeatingInfo[], seatsRequested: number): Array<{
    vehicle: VehicleSeatingInfo;
    seatsToBook: number;
  }> {
    const allocation: Array<{ vehicle: VehicleSeatingInfo; seatsToBook: number }> = [];
    let remainingSeats = seatsRequested;

    // Sort vehicles by queue position
    const sortedVehicles = [...vehicles].sort((a, b) => a.queuePosition - b.queuePosition);

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
      return [];
    }

    return allocation;
  }

  /**
   * Generate ticket ID (same as verification code)
   */
  private generateTicketId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  /**
   * Generate QR code string
   */
  private generateQRCode(ticketId: string): string {
    return `LOUAJ_CASH_${ticketId}_${Date.now()}`;
  }

  /**
   * Broadcast booking update via WebSocket
   */
  private broadcastBookingUpdate(destinationId: string): void {
    try {
      this.webSocketService.emit('cash_booking_updated', {
        destinationId,
        timestamp: new Date().toISOString()
      });

      // Send to central server if method exists
      if (typeof (this.webSocketService as any).sendBookingUpdate === 'function') {
        (this.webSocketService as any).sendBookingUpdate({
          destinationId,
          stationId: this.currentStationId,
          bookingType: 'CASH',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('❌ Error broadcasting booking update:', error);
    }
  }
}

export const createSimpleCashBookingService = (webSocketService: WebSocketService) => {
  return new SimpleCashBookingService(webSocketService);
}; 