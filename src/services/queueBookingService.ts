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
  bookingType: 'CASH' | 'ONLINE';
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
            customerPhone: bookingRequest.customerPhone || null,

            paymentStatus: bookingType === 'CASH' ? 'PAID' : 'PENDING',
            paymentMethod: bookingRequest.paymentMethod || (bookingType === 'CASH' ? 'CASH' : 'ONLINE'),
            verificationCode,
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
          
          // Get queue info for trip record
          const queueInfo = await prisma.vehicleQueue.findUnique({
            where: { id: vehicle.queueId },
            include: { vehicle: true }
          });
          
          if (queueInfo) {
            // Create trip record when vehicle is ready to start
            await this.createTripRecord(vehicle.queueId, queueInfo);
          }
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
          bookingType: (booking.bookingType || 'CASH') as 'CASH' | 'ONLINE',
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
        bookingType: (booking.bookingType || 'CASH') as 'CASH' | 'ONLINE',
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
        bookingType: (updatedBooking.bookingType || 'CASH') as 'CASH' | 'ONLINE',
        customerPhone: updatedBooking.customerPhone,
        onlineTicketId: updatedBooking.onlineTicketId,
        createdAt: updatedBooking.createdAt,
        queuePosition: updatedBooking.queue.queuePosition,
        estimatedDeparture: updatedBooking.queue.estimatedDeparture
      };

      console.log(`✅ Ticket verified: ${verificationCode} by staff ${staffId}`);

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
   * Create online booking from central server
   */
  async createOnlineBooking(onlineBookingRequest: {
    destinationId: string;
    seatsRequested: number;
    customerPhone: string;
    onlineTicketId: string;
    userId: string; // Add user ID
    totalAmount: number; // Add total amount from central server route pricing
    vehicleAllocations: Array<{
      queueId: string;
      seatsToBook: number;
      licensePlate: string;
    }>;
  }): Promise<BookingResult> {
    try {
      console.log(`🌐 Creating online booking from central server: ${onlineBookingRequest.onlineTicketId}`);
      console.log(`👤 User ID: ${onlineBookingRequest.userId}`);
      console.log(`💰 Total amount from central server: $${onlineBookingRequest.totalAmount}`);

      const bookings: QueueBooking[] = [];
      const verificationCodes: string[] = [];
      
      // Use total amount from central server (based on route pricing)
      const centralTotalAmount = onlineBookingRequest.totalAmount;
      
      // Calculate amount per seat based on central server pricing
      const amountPerSeat = centralTotalAmount / onlineBookingRequest.seatsRequested;

      // Create bookings for each vehicle allocation
      for (const allocation of onlineBookingRequest.vehicleAllocations) {
        const verificationCode = this.generateVerificationCode();
        
        // Get vehicle info to calculate pricing
        const queueInfo = await prisma.vehicleQueue.findUnique({
          where: { id: allocation.queueId },
          include: { vehicle: true }
        });

        if (!queueInfo) {
          console.error(`❌ Queue not found: ${allocation.queueId}`);
          continue;
        }

        // Calculate booking amount for this vehicle based on central server pricing
        const bookingAmount = allocation.seatsToBook * amountPerSeat;

        // Create booking in database
        const booking = await prisma.booking.create({
          data: {
            id: `online_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            queueId: allocation.queueId,
            seatsBooked: allocation.seatsToBook,
            totalAmount: bookingAmount,
            bookingSource: 'ONLINE',
            bookingType: 'ONLINE',
            userId: onlineBookingRequest.userId, // Store user ID from central server
            customerPhone: onlineBookingRequest.customerPhone,
            onlineTicketId: onlineBookingRequest.onlineTicketId,
            paymentStatus: 'PENDING',
            paymentMethod: 'ONLINE',
            verificationCode,
            createdBy: null // Online bookings from central server don't have a local staff creator
          }
        });

        // Update available seats in queue
        await prisma.vehicleQueue.update({
          where: { id: allocation.queueId },
          data: {
            availableSeats: queueInfo.availableSeats - allocation.seatsToBook
          }
        });

        // Check if vehicle is now full and update status
        const updatedAvailableSeats = queueInfo.availableSeats - allocation.seatsToBook;
        if (updatedAvailableSeats === 0) {
          await prisma.vehicleQueue.update({
            where: { id: allocation.queueId },
            data: { status: 'READY' }
          });
          console.log(`🚐 Vehicle ${allocation.licensePlate} is now READY (fully booked)`);
          
          // Create trip record when vehicle is ready to start
          await this.createTripRecord(allocation.queueId, queueInfo);
        }

        const queueBooking: QueueBooking = {
          id: booking.id,
          queueId: booking.queueId,
          vehicleLicensePlate: queueInfo.vehicle.licensePlate,
          destinationName: queueInfo.destinationName,
          seatsBooked: booking.seatsBooked,
          totalAmount: booking.totalAmount,
          verificationCode: booking.verificationCode,
          bookingType: 'ONLINE',
          customerPhone: booking.customerPhone,
          onlineTicketId: booking.onlineTicketId,
          createdAt: booking.createdAt,
          queuePosition: queueInfo.queuePosition,
          estimatedDeparture: queueInfo.estimatedDeparture
        };

        bookings.push(queueBooking);
        verificationCodes.push(verificationCode);

        console.log(`✅ Online booking created: ${allocation.seatsToBook} seats on vehicle ${allocation.licensePlate} - $${bookingAmount}`);
      }

      // Broadcast booking update
      this.broadcastBookingUpdate(onlineBookingRequest.destinationId);

      console.log(`🎉 Online booking completed: ${onlineBookingRequest.seatsRequested} seats across ${bookings.length} vehicle(s)`);
      console.log(`💰 Total amount: $${centralTotalAmount} (from central server route pricing)`);

      return {
        success: true,
        bookings,
        totalAmount: centralTotalAmount, // Use central server total amount
        verificationCodes,
        ticketIds: verificationCodes
      };

    } catch (error) {
      console.error('❌ Error creating online booking:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Update online booking payment status
   */
  async updateOnlineBookingPaymentStatus(onlineTicketId: string, paymentStatus: 'PAID' | 'FAILED' | 'CANCELLED'): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      console.log(`💳 Updating payment status for online ticket: ${onlineTicketId} to ${paymentStatus}`);

      const updatedBookings = await prisma.booking.updateMany({
        where: { onlineTicketId: onlineTicketId },
        data: { 
          paymentStatus: paymentStatus,
          ...(paymentStatus === 'PAID' && { paymentProcessedAt: new Date() })
        }
      });

      if (updatedBookings.count === 0) {
        return {
          success: false,
          message: 'No bookings found for online ticket ID'
        };
      }

      console.log(`✅ Updated ${updatedBookings.count} booking(s) payment status to ${paymentStatus}`);

      return {
        success: true,
        message: `Payment status updated successfully for ${updatedBookings.count} booking(s)`
      };

    } catch (error) {
      console.error('❌ Error updating online booking payment status:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
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

  /**
   * Create trip record when vehicle is ready to start
   */
  private async createTripRecord(queueId: string, queueInfo: any): Promise<void> {
    try {
      console.log(`🚛 Creating trip record for vehicle ${queueInfo.vehicle.licensePlate}`);
      
      // Count total booked seats for this queue
      const bookedSeatsCount = await prisma.booking.aggregate({
        where: { 
          queueId: queueId,
          paymentStatus: { in: ['PAID', 'PENDING'] } // Include both paid and pending bookings
        },
        _sum: {
          seatsBooked: true
        }
      });

      const totalSeatsBooked = bookedSeatsCount._sum.seatsBooked || 0;

      const trip = await prisma.trip.create({
        data: {
          vehicleId: queueInfo.vehicleId,
          licensePlate: queueInfo.vehicle.licensePlate,
          destinationId: queueInfo.destinationId,
          destinationName: queueInfo.destinationName,
          queueId: queueId,
          seatsBooked: totalSeatsBooked,
          startTime: new Date(),
          syncStatus: 'PENDING'
        }
      });

      console.log(`✅ Trip record created: ${trip.id} for vehicle ${queueInfo.vehicle.licensePlate} to ${queueInfo.destinationName}`);
      console.log(`🎫 Total seats booked: ${totalSeatsBooked}`);

      // Try to sync to central server if online
      await this.syncTripToCentralServer(trip);

    } catch (error) {
      console.error('❌ Error creating trip record:', error);
    }
  }

  /**
   * Sync trip record to central server
   */
  private async syncTripToCentralServer(trip: any): Promise<void> {
    try {
      // Check if we're online by trying to reach central server
      const centralServerUrl = process.env.CENTRAL_SERVER_URL || 'http://localhost:5000';
      const stationId = process.env.STATION_ID || 'station-001';
      
      console.log(`🌐 Syncing trip ${trip.id} to central server...`);

      const axios = require('axios');
      const response = await axios.post(`${centralServerUrl}/api/v1/trips/sync`, {
        tripId: trip.id,
        vehicleId: trip.vehicleId,
        licensePlate: trip.licensePlate,
        departureStationId: stationId, // Add departure station from local config
        destinationStationId: trip.destinationId,
        destinationName: trip.destinationName,
        queueId: trip.queueId,
        seatsBooked: trip.seatsBooked,
        startTime: trip.startTime
      }, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'X-Station-ID': stationId
        }
      });

      if (response.status === 201 && response.data.success) {
        // Mark as synced
        await prisma.trip.update({
          where: { id: trip.id },
          data: { 
            syncStatus: 'SYNCED',
            syncedAt: new Date()
          }
        });

        console.log(`✅ Trip ${trip.id} synced successfully to central server`);
      } else {
        console.error(`❌ Failed to sync trip to central server:`, response.data);
      }

    } catch (error: any) {
      console.error('❌ Error syncing trip to central server:', error.message);
      
      // If offline, the trip will remain with PENDING sync status
      // We can retry later when connection is restored
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        console.log('📡 Central server unreachable - trip will sync when online');
      }
    }
  }

  /**
   * Retry syncing pending trips to central server
   */
  async syncPendingTrips(): Promise<void> {
    try {
      console.log('🔄 Syncing pending trips to central server...');

      const pendingTrips = await prisma.trip.findMany({
        where: { syncStatus: 'PENDING' },
        orderBy: { createdAt: 'asc' }
      });

      if (pendingTrips.length === 0) {
        console.log('✅ No pending trips to sync');
        return;
      }

      console.log(`📋 Found ${pendingTrips.length} pending trip(s) to sync`);

      for (const trip of pendingTrips) {
        await this.syncTripToCentralServer(trip);
        // Add small delay between syncs to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }

    } catch (error) {
      console.error('❌ Error syncing pending trips:', error);
    }
  }
}

export const createQueueBookingService = (webSocketService: WebSocketService) => {
  return new QueueBookingService(webSocketService);
};