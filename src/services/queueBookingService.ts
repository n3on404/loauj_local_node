import { prisma } from '../config/database';
import { WebSocketService } from '../websocket/webSocketService';
import * as dashboardController from '../controllers/dashboardController';
import { env } from '../config/environment';
import { configService } from '../config/supervisorConfig';

/**
 * Queue Booking Service
 * 
 * Handles bookings for REGULAR queue vehicles only.
 * Overnight queue vehicles are excluded from booking operations.
 * 
 * This ensures that:
 * - Staff can only book seats on vehicles in the regular daily queue
 * - Overnight queue vehicles remain separate for next-day operations
 * - Booking flow is simplified for current day operations
 */

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
  vehicleFullyBooked?: boolean;
  exitPasses?: ExitPassSummary[] | null;
}

export interface ExitPassSummary {
  currentExitPass: any;
}

export interface QueueBooking {
  id: string;
  queueId: string;
  vehicleLicensePlate: string;
  destinationName: string;
  startStationName: string; // Add current station name
  seatsBooked: number;
  baseAmount: number; // Base price from route
  serviceFeeAmount: number; // Service fee amount
  totalAmount: number; // Total amount (base + service fee)
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
    this.currentStationId = configService.getStationId();
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
      console.log(`📊 Getting available seats for destination: ${destinationId} (REGULAR queue only)`);

      // Get only REGULAR queue vehicles for booking (exclude overnight queue)
      const queueEntries = await prisma.vehicleQueue.findMany({
        where: {
          destinationId,
          queueType: 'REGULAR', // Only regular queue for booking
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        },
        include: {
          vehicle: true
        },
        orderBy: [
          { queuePosition: 'asc' }
        ]
      });

      if (queueEntries.length === 0) {
        return {
          success: false,
          error: `No regular queue vehicles available for destination ${destinationId}`
        };
      }

      // Get the base price from route table for this destination
      let basePrice = 0;
      try {
        const route = await prisma.route.findUnique({
          where: { stationId: destinationId }
        });
        
        if (route && route.basePrice > 0) {
          basePrice = route.basePrice;
          console.log(`✅ Found base price for destination ${destinationId}: ${basePrice} TND`);
        } else {
          console.warn(`⚠️ No route found for destination ${destinationId}, using default price`);
        }
      } catch (error) {
        console.error(`❌ Error fetching route price for ${destinationId}:`, error);
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
          basePrice: basePrice || entry.basePrice,
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
   * Create booking with intelligent seat allocation and race condition protection
   */
  async createBooking(bookingRequest: BookingRequest): Promise<BookingResult> {
    try {
      console.log(`🎫 Creating booking for ${bookingRequest.seatsRequested} seats to ${bookingRequest.destinationId} (REGULAR queue only)`);

      // Use a database transaction to prevent race conditions
      const result = await prisma.$transaction(async (tx) => {
        // Get available seats within the transaction for consistency (REGULAR queue only)
        const queueEntries = await tx.vehicleQueue.findMany({
          where: {
            destinationId: bookingRequest.destinationId,
            queueType: 'REGULAR', // Only regular queue for booking
            status: { in: ['WAITING', 'LOADING', 'READY'] }
          },
          include: {
            vehicle: true
          },
          orderBy: [
            { queuePosition: 'asc' }
          ]
        });

        if (queueEntries.length === 0) {
          throw new Error('No regular queue vehicles available for this destination');
        }

        // Calculate total available seats within transaction
        const totalAvailableSeats = queueEntries.reduce((sum, entry) => sum + entry.availableSeats, 0);

        // Check if we have enough seats (atomic check)
        if (totalAvailableSeats < bookingRequest.seatsRequested) {
          throw new Error(`Not enough seats available. Requested: ${bookingRequest.seatsRequested}, Available: ${totalAvailableSeats}`);
        }

        // Get base price for this destination
        let basePrice = 0;
        try {
          const route = await tx.route.findUnique({
            where: { stationId: bookingRequest.destinationId }
          });
          if (route && route.basePrice > 0) {
            basePrice = route.basePrice;
          }
        } catch (error) {
          console.warn('⚠️ Could not fetch route price, using queue base price');
        }

        // Prepare vehicles data for allocation
        const vehicles: VehicleSeatingInfo[] = queueEntries.map(entry => ({
          queueId: entry.id,
          vehicleId: entry.vehicleId,
          licensePlate: entry.vehicle.licensePlate,
          queuePosition: entry.queuePosition,
          availableSeats: entry.availableSeats,
          totalSeats: entry.totalSeats,
          basePrice: basePrice || entry.basePrice,
          status: entry.status,
          estimatedDeparture: entry.estimatedDeparture
        }));

        // Allocate seats across vehicles
        const allocation = this.allocateSeats(vehicles, bookingRequest.seatsRequested);
        
        if (allocation.length === 0) {
          throw new Error('Unable to allocate seats across available vehicles');
        }

        // Create bookings and update seats atomically
        const bookings: QueueBooking[] = [];
        const verificationCodes: string[] = [];
        let totalAmount = 0;
        for (const { vehicle, seatsToBook } of allocation) {
          // Double-check seat availability before booking (optimistic locking)
          const currentQueueEntry = await tx.vehicleQueue.findUnique({
            where: { id: vehicle.queueId },
            select: { availableSeats: true, id: true }
          });

          if (!currentQueueEntry) {
            throw new Error(`Vehicle queue ${vehicle.queueId} no longer exists`);
          }

          if (currentQueueEntry.availableSeats < seatsToBook) {
            throw new Error(`Insufficient seats on vehicle ${vehicle.licensePlate}. Available: ${currentQueueEntry.availableSeats}, Requested: ${seatsToBook}`);
          }

          const verificationCode = this.generateVerificationCode();
          
          // Get station config for service fee
          const stationConfig = await tx.stationConfig.findFirst();
          const serviceFee = Number(stationConfig?.serviceFee || 0.200); // Convert Decimal to number, default to 0.200 TND if not set
          
          // Calculate base amount and total amount with service fee
          const baseAmount = seatsToBook * vehicle.basePrice;
          const serviceFeeAmount = seatsToBook * serviceFee;
          const bookingAmount = baseAmount + serviceFeeAmount;

          // Create booking
          const bookingType = bookingRequest.bookingType || 'CASH';
          const booking = await tx.booking.create({
            data: {
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

          // Atomically update available seats with additional safety check
          const updatedQueue = await tx.vehicleQueue.updateMany({
            where: { 
              id: vehicle.queueId,
              availableSeats: { gte: seatsToBook } // Ensure we still have enough seats
            },
            data: {
              availableSeats: { decrement: seatsToBook }
            }
          });

          // Check if the update actually happened (no rows updated means conflict)
          if (updatedQueue.count === 0) {
            throw new Error(`Booking conflict: Seats on vehicle ${vehicle.licensePlate} were just booked by another user. Please try again.`);
          }

          // Get updated queue info to check if vehicle is now full
          const updatedQueueEntry = await tx.vehicleQueue.findUnique({
            where: { id: vehicle.queueId },
            include: { vehicle: true }
          });

          if (!updatedQueueEntry) {
            throw new Error('Vehicle queue entry not found after update');
          }

          // Fully-booked handling moved to queueService.updateVehicleStatusBasedOnBookings

          // Note: Status may be updated automatically after transaction by calling updateVehicleStatusBasedOnBookings

          const queueBooking: QueueBooking = {
            id: booking.id,
            queueId: booking.queueId,
            vehicleLicensePlate: updatedQueueEntry.vehicle.licensePlate,
            destinationName: updatedQueueEntry.destinationName,
            startStationName: configService.getStationName(),
            seatsBooked: booking.seatsBooked,
            baseAmount: baseAmount,
            serviceFeeAmount: serviceFeeAmount,
            totalAmount: booking.totalAmount,
            verificationCode: booking.verificationCode,
            bookingType: (booking.bookingType || 'CASH') as 'CASH' | 'ONLINE',
            customerPhone: booking.customerPhone,
            onlineTicketId: booking.onlineTicketId,
            createdAt: booking.createdAt,
            queuePosition: updatedQueueEntry.queuePosition,
            estimatedDeparture: updatedQueueEntry.estimatedDeparture
          };

          bookings.push(queueBooking);
          verificationCodes.push(verificationCode);
          totalAmount += bookingAmount;

          console.log(`✅ Atomically booked ${seatsToBook} seats on vehicle ${vehicle.licensePlate} (${updatedQueueEntry.availableSeats} seats remaining)`);
        }

        return {
          success: true,
          bookings,
          totalAmount,
          verificationCodes,
          ticketIds: verificationCodes,
        };
      });

      // Update vehicle statuses based on new bookings (outside transaction to avoid conflicts)
      for (const booking of result.bookings) {
        try {
          const { createQueueService } = await import('./queueService');
          const queueService = createQueueService(this.webSocketService);
          await queueService.updateVehicleStatusBasedOnBookings(booking.queueId, bookingRequest.staffId);
        } catch (error) {
          console.error('❌ Error updating vehicle status after booking:', error);
        }
      }

      // Create trip records for fully booked vehicles (outside transaction to avoid conflicts)
      for (const booking of result.bookings) {
        const queueInfo = await prisma.vehicleQueue.findUnique({
          where: { id: booking.queueId },
          include: { vehicle: true }
        });
        
        if (queueInfo && queueInfo.status === 'READY' && queueInfo.availableSeats === 0) {
          await this.createTripRecord(booking.queueId, queueInfo);
        }
      }

      // Broadcast booking update AFTER successful transaction
      this.broadcastBookingUpdate(bookingRequest.destinationId, result);

      // After booking, update statuses and collect any exit passes generated by READY vehicles
      const exitPassesCollected: any[] = [];
      for (const booking of result.bookings) {
        try {
          const { createQueueService } = await import('./queueService');
          const queueService = createQueueService(this.webSocketService);
          const upd = await queueService.updateVehicleStatusBasedOnBookings(booking.queueId, bookingRequest.staffId);
          if (upd.exitPass) {
            exitPassesCollected.push(upd.exitPass);
          }
        } catch (err) {
          console.error('❌ Error updating status/collecting exit pass after booking:', err);
        }
      }

      console.log(`🎉 Booking completed: ${bookingRequest.seatsRequested} seats across ${result.bookings.length} vehicle(s), Total: $${result.totalAmount}`);

      return {
        ...result,
        vehicleFullyBooked: exitPassesCollected.length > 0,
        exitPasses: exitPassesCollected.length > 0 ? exitPassesCollected : null
      };

    } catch (error) {
      console.error('❌ Error creating booking:', error);
      
      // Determine conflict type and broadcast appropriate notification
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred during booking';
      
      if (errorMessage.includes('Booking conflict') || errorMessage.includes('were just booked by another user')) {
        this.broadcastBookingConflict(bookingRequest.destinationId, errorMessage, 'booking_conflict');
      } else if (errorMessage.includes('Not enough seats available') || errorMessage.includes('Insufficient seats')) {
        this.broadcastBookingConflict(bookingRequest.destinationId, errorMessage, 'insufficient_seats');
      } else if (errorMessage.includes('no longer exists') || errorMessage.includes('Seats on vehicle')) {
        this.broadcastBookingConflict(bookingRequest.destinationId, errorMessage, 'seat_taken');
      }
      
      // Broadcast immediate update to refresh all clients on failure
      this.broadcastBookingUpdate(bookingRequest.destinationId);
      
      return {
        success: false,
        error: errorMessage
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

      // Calculate breakdown from existing data
      const pricePerSeat = booking.queue.basePrice;
      const baseAmount = booking.seatsBooked * pricePerSeat;
      const serviceFeeAmount = booking.totalAmount - baseAmount; // Calculate service fee as difference
      
      const queueBooking: QueueBooking = {
        id: booking.id,
        queueId: booking.queueId,
        vehicleLicensePlate: booking.queue.vehicle.licensePlate,
        destinationName: booking.queue.destinationName,
        startStationName: configService.getStationName(),
        seatsBooked: booking.seatsBooked,
        baseAmount: baseAmount,
        serviceFeeAmount: serviceFeeAmount,
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

      // Calculate breakdown from existing data
      const pricePerSeat = updatedBooking.queue.basePrice;
      const baseAmount = updatedBooking.seatsBooked * pricePerSeat;
      const serviceFeeAmount = updatedBooking.totalAmount - baseAmount; // Calculate service fee as difference
      
      const queueBooking: QueueBooking = {
        id: updatedBooking.id,
        queueId: updatedBooking.queueId,
        vehicleLicensePlate: updatedBooking.queue.vehicle.licensePlate,
        destinationName: updatedBooking.queue.destinationName,
        startStationName: configService.getStationName(),
        seatsBooked: updatedBooking.seatsBooked,
        baseAmount: baseAmount,
        serviceFeeAmount: serviceFeeAmount,
        totalAmount: updatedBooking.totalAmount,
        verificationCode: updatedBooking.verificationCode,
        bookingType: (updatedBooking.bookingType || 'CASH') as 'CASH' | 'ONLINE',
        customerPhone: updatedBooking.customerPhone,
        onlineTicketId: updatedBooking.onlineTicketId,
        createdAt: updatedBooking.createdAt,
        queuePosition: updatedBooking.queue.queuePosition,
        estimatedDeparture: updatedBooking.queue.estimatedDeparture
      };

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
   * Get all destinations with available seats (filters out fully booked destinations)
   */
  async getAvailableDestinations(filters?: {
    governorate?: string;
    delegation?: string;
  }): Promise<{
    success: boolean;
    destinations?: Array<{
      destinationId: string;
      destinationName: string;
      totalAvailableSeats: number;
      vehicleCount: number;
      governorate?: string | undefined;
      governorateAr?: string | undefined;
      delegation?: string | undefined;
      delegationAr?: string | undefined;
    }>;
    error?: string;
  }> {
    try {
      console.log('📊 Getting available destinations for booking (REGULAR queue only, filtering fully booked)...');
      
      // First get all unique destinations from routes table to avoid duplication
      const allRoutes = await prisma.route.findMany({
        where: {
          isActive: true
        },
        select: {
          stationId: true,
          stationName: true,
          governorate: true,
          governorateAr: true,
          delegation: true,
          delegationAr: true
        }
      });

      // Get available seats for each destination from regular queue only
      const destinationsWithSeats = await Promise.all(
        allRoutes.map(async (route) => {
          const queueEntries = await prisma.vehicleQueue.findMany({
            where: {
              destinationId: route.stationId,
              queueType: 'REGULAR', // Only regular queue for booking
              status: { in: ['WAITING', 'LOADING'] }
            },
            select: {
              availableSeats: true,
              id: true
            }
          });

          const totalAvailableSeats = queueEntries.reduce((sum, entry) => sum + entry.availableSeats, 0);
          const vehicleCount = queueEntries.length;

          return {
            destinationId: route.stationId,
            destinationName: route.stationName,
            totalAvailableSeats,
            vehicleCount,
            governorate: route.governorate || undefined,
            governorateAr: route.governorateAr || undefined,
            delegation: route.delegation || undefined,
            delegationAr: route.delegationAr || undefined
          };
        })
      );

      // Filter out destinations with no available seats
      const destinationsWithRoutes = destinationsWithSeats.filter(dest => 
        dest.totalAvailableSeats > 0
      );

      // Remove duplicates based on destinationId (in case there are multiple routes with same station)
      const uniqueDestinations = destinationsWithRoutes.reduce((acc, dest) => {
        const existing = acc.find(d => d.destinationId === dest.destinationId);
        if (!existing) {
          acc.push(dest);
        } else {
          // If duplicate found, merge the seat counts
          existing.totalAvailableSeats += dest.totalAvailableSeats;
          existing.vehicleCount += dest.vehicleCount;
        }
        return acc;
      }, [] as typeof destinationsWithRoutes);

      // Apply filters if provided
      let filteredDestinations = uniqueDestinations;
      
      if (filters?.governorate) {
        filteredDestinations = filteredDestinations.filter(dest => 
          dest.governorate === filters.governorate
        );
      }
      
      if (filters?.delegation) {
        filteredDestinations = filteredDestinations.filter(dest => 
          dest.delegation === filters.delegation
        );
      }

      const totalRoutes = allRoutes.length;
      const availableCount = destinationsWithRoutes.length;
      const uniqueCount = uniqueDestinations.length;
      const filteredOut = totalRoutes - availableCount;
      const duplicatesRemoved = availableCount - uniqueCount;
      
      console.log(`✅ Found ${filteredDestinations.length} destinations with available seats`);
      console.log(`📊 Total routes: ${totalRoutes}, Available: ${availableCount}, Unique: ${uniqueCount}, Duplicates removed: ${duplicatesRemoved}`);

      return {
        success: true,
        destinations: filteredDestinations
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
   * Cancel booking or remove specific number of seats
   */
  async cancelBooking(bookingId: string, seatsToCancel?: number, staffId?: string): Promise<{
    success: boolean;
    message: string;
    updatedBooking?: QueueBooking;
    cancelledCompletely?: boolean;
    seatsRestored?: number;
    error?: string;
  }> {
    try {
      console.log(`🚫 Cancelling booking: ${bookingId}, seats to cancel: ${seatsToCancel || 'all'}`);

      // Use a database transaction to ensure consistency
      const result = await prisma.$transaction(async (tx) => {
        // Get the booking with queue and vehicle info
        const booking = await tx.booking.findUnique({
          where: { id: bookingId },
          include: {
            queue: {
              include: {
                vehicle: true
              }
            }
          }
        });

        if (!booking) {
          throw new Error('Booking not found');
        }

        // Check if booking can be cancelled (only if not yet verified/used)
        if (booking.isVerified) {
          throw new Error('Cannot cancel a booking that has already been verified/used');
        }

        // Determine how many seats to cancel
        const totalSeatsBooked = booking.seatsBooked;
        const actualSeatsToCancel = seatsToCancel && seatsToCancel < totalSeatsBooked 
          ? seatsToCancel 
          : totalSeatsBooked;

        if (seatsToCancel && seatsToCancel > totalSeatsBooked) {
          throw new Error(`Cannot cancel ${seatsToCancel} seats. Booking only has ${totalSeatsBooked} seats.`);
        }

        const remainingSeats = totalSeatsBooked - actualSeatsToCancel;
        const isCancellingCompletely = remainingSeats === 0;

        // Calculate refund amount proportionally
        const refundAmount = (booking.totalAmount / totalSeatsBooked) * actualSeatsToCancel;

        let updatedBooking: any;

        if (isCancellingCompletely) {
          // Mark booking as cancelled completely
          updatedBooking = await tx.booking.update({
            where: { id: bookingId },
            data: {
              paymentStatus: 'CANCELLED',
              verificationCode: `CANCELLED_${booking.verificationCode}`,
              // Keep original data for audit trail
            },
            include: {
              queue: {
                include: {
                  vehicle: true
                }
              }
            }
          });
        } else {
          // Update booking with reduced seats and amount
          const newTotalAmount = booking.totalAmount - refundAmount;
          updatedBooking = await tx.booking.update({
            where: { id: bookingId },
            data: {
              seatsBooked: remainingSeats,
              totalAmount: newTotalAmount
            },
            include: {
              queue: {
                include: {
                  vehicle: true
                }
              }
            }
          });
        }

        // Restore seats to the vehicle queue
        const updatedQueue = await tx.vehicleQueue.update({
          where: { id: booking.queueId },
          data: {
            availableSeats: { increment: actualSeatsToCancel }
          }
        });

        // If the vehicle was READY (fully booked) and now has available seats, change status back to LOADING
        if (booking.queue.status === 'READY' && updatedQueue.availableSeats > 0) {
          await tx.vehicleQueue.update({
            where: { id: booking.queueId },
            data: { status: 'LOADING' }
          });
          console.log(`🔄 Vehicle ${booking.queue.vehicle.licensePlate} status changed from READY to LOADING (seats available again)`);
        }

        return {
          updatedBooking,
          actualSeatsToCancel,
          refundAmount,
          isCancellingCompletely,
          vehicleLicensePlate: booking.queue.vehicle.licensePlate,
          destinationId: booking.queue.destinationId,
          destinationName: booking.queue.destinationName
        };
      });

      // Update vehicle statuses based on new seat availability (outside transaction)
      try {
        const { createQueueService } = await import('./queueService');
        const queueService = createQueueService(this.webSocketService);
        await queueService.updateVehicleStatusBasedOnBookings(result.updatedBooking.queueId);
      } catch (error) {
        console.error('❌ Error updating vehicle status after cancellation:', error);
      }

      // Broadcast the cancellation update
      this.broadcastBookingUpdate(result.destinationId);

      // Create the response booking object
      let queueBooking: QueueBooking | undefined;
      if (!result.isCancellingCompletely) {
        const pricePerSeat = result.updatedBooking.queue.basePrice;
        const baseAmount = result.updatedBooking.seatsBooked * pricePerSeat;
        const serviceFeeAmount = result.updatedBooking.totalAmount - baseAmount;

        queueBooking = {
          id: result.updatedBooking.id,
          queueId: result.updatedBooking.queueId,
          vehicleLicensePlate: result.updatedBooking.queue.vehicle.licensePlate,
          destinationName: result.updatedBooking.queue.destinationName,
          startStationName: configService.getStationName(),
          seatsBooked: result.updatedBooking.seatsBooked,
          baseAmount: baseAmount,
          serviceFeeAmount: serviceFeeAmount,
          totalAmount: result.updatedBooking.totalAmount,
          verificationCode: result.updatedBooking.verificationCode,
          bookingType: (result.updatedBooking.bookingType || 'CASH') as 'CASH' | 'ONLINE',
          customerPhone: result.updatedBooking.customerPhone,
          onlineTicketId: result.updatedBooking.onlineTicketId,
          createdAt: result.updatedBooking.createdAt,
          queuePosition: result.updatedBooking.queue.queuePosition,
          estimatedDeparture: result.updatedBooking.queue.estimatedDeparture
        };
      }

      const message = result.isCancellingCompletely 
        ? `Booking cancelled completely. ${result.actualSeatsToCancel} seats restored to vehicle ${result.vehicleLicensePlate}. Refund: ${result.refundAmount.toFixed(3)} TND`
        : `${result.actualSeatsToCancel} seats cancelled from booking. ${result.actualSeatsToCancel} seats restored to vehicle ${result.vehicleLicensePlate}. Refund: ${result.refundAmount.toFixed(3)} TND`;

      console.log(`✅ ${message}`);

      return {
        success: true,
        message,
        ...(queueBooking && { updatedBooking: queueBooking }),
        cancelledCompletely: result.isCancellingCompletely,
        seatsRestored: result.actualSeatsToCancel
      };

    } catch (error) {
      console.error('❌ Error cancelling booking:', error);
      return {
        success: false,
        message: 'Failed to cancel booking',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get available governments and delegations for filtering
   */
  async getAvailableLocations(): Promise<{
    success: boolean;
    governments?: Array<{
      name: string;
      nameAr?: string | undefined;
      delegations: Array<{
        name: string;
        nameAr?: string | undefined;
      }>;
    }>;
    error?: string;
  }> {
    try {
      console.log('📍 Getting available locations for filtering...');
      
      // Get all unique governments and delegations from routes
      const routes = await prisma.route.findMany({
        where: {
          isActive: true,
          governorate: { not: null },
          delegation: { not: null }
        },
        select: {
          governorate: true,
          governorateAr: true,
          delegation: true,
          delegationAr: true
        },
        distinct: ['governorate', 'delegation'] // Ensure unique combinations
      });

      // Group by government
      const governmentMap = new Map<string, {
        name: string;
        nameAr?: string | undefined;
        delegations: Map<string, { name: string; nameAr?: string | undefined; }>;
      }>();

      routes.forEach(route => {
        if (!route.governorate || !route.delegation) return;

        if (!governmentMap.has(route.governorate)) {
          governmentMap.set(route.governorate, {
            name: route.governorate,
            nameAr: route.governorateAr ? route.governorateAr : undefined,
            delegations: new Map()
          });
        }

        const government = governmentMap.get(route.governorate)!;
        if (!government.delegations.has(route.delegation)) {
          government.delegations.set(route.delegation, {
            name: route.delegation,
            nameAr: route.delegationAr ? route.delegationAr : undefined
          });
        }
      });

      // Convert to array format
      const governments = Array.from(governmentMap.values()).map(gov => ({
        name: gov.name,
        nameAr: gov.nameAr ? gov.nameAr : undefined,
        delegations: Array.from(gov.delegations.values())
      }));

      console.log(`✅ Found ${governments.length} governments with locations`);

      return {
        success: true,
        governments
      };

    } catch (error) {
      console.error('❌ Error getting available locations:', error);
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

        // Calculate breakdown from existing data
        const pricePerSeat = queueInfo.basePrice;
        const baseAmount = booking.seatsBooked * pricePerSeat;
        const serviceFeeAmount = booking.totalAmount - baseAmount; // Calculate service fee as difference
        
        const queueBooking: QueueBooking = {
          id: booking.id,
          queueId: booking.queueId,
          vehicleLicensePlate: queueInfo.vehicle.licensePlate,
          destinationName: queueInfo.destinationName,
          startStationName: configService.getStationName(),
          seatsBooked: booking.seatsBooked,
          baseAmount: baseAmount,
          serviceFeeAmount: serviceFeeAmount,
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
   * Broadcast booking update with enhanced conflict and success notifications
   */
  private broadcastBookingUpdate(destinationId: string, result?: BookingResult): void {
    try {
      // Emit multiple event types for real-time updates
      this.webSocketService.emit('queue_updated', {
        destinationId,
        timestamp: new Date().toISOString()
      });
      
      this.webSocketService.emit('booking_update', {
        destinationId,
        stationId: this.currentStationId,
        timestamp: new Date().toISOString()
      });
      
      this.webSocketService.emit('queue_update', {
        destinationId,
        stationId: this.currentStationId,
        updateType: 'booking_created',
        timestamp: new Date().toISOString()
      });

      // Emit specific seat availability change event
      this.webSocketService.emit('seat_availability_changed', {
        destinationId,
        stationId: this.currentStationId,
        updateType: 'seat_availability_changed',
        timestamp: new Date().toISOString()
      });

      // Send queue update to central server
      this.webSocketService.sendQueueUpdate({
        destinationId,
        stationId: this.currentStationId,
        timestamp: new Date().toISOString()
      });

      console.log(`📡 Broadcast queue update for destination: ${destinationId}`);

      // Try to get the local WebSocket server directly and broadcast specific updates
      try {
        const { getLocalWebSocketServer } = require('../websocket/EnhancedLocalWebSocketServer');
        const localWebSocketServer = getLocalWebSocketServer();
        if (localWebSocketServer) {
          // Broadcast specific seat availability update
          localWebSocketServer.broadcastSeatAvailabilityUpdate(destinationId);
          // Also broadcast general destination list update
          localWebSocketServer.broadcastDestinationListUpdate();
          
          // If booking was successful, broadcast success notification
          if (result && result.success && result.bookings && result.bookings.length > 0) {
            const firstBooking = result.bookings[0];
            const totalSeatsBooked = result.bookings.reduce((sum, b) => sum + b.seatsBooked, 0);
            
            localWebSocketServer.broadcastBookingSuccess({
              destinationId,
              destinationName: firstBooking.destinationName,
              seatsBooked: totalSeatsBooked,
              remainingSeats: 0, // Will be updated by seat availability broadcast
              bookingId: firstBooking.id,
              vehicleLicensePlate: firstBooking.vehicleLicensePlate
            });
          }
          
          console.log(`📡 Triggered specific seat availability updates for destination: ${destinationId}`);
        }
      } catch (error) {
        console.warn('⚠️ Could not access local WebSocket server directly:', error);
      }

    } catch (error) {
      console.error('❌ Error broadcasting booking update:', error);
    }
  }

  /**
   * Broadcast booking conflict notification
   */
  private broadcastBookingConflict(destinationId: string, errorMessage: string, conflictType: 'insufficient_seats' | 'booking_conflict' | 'seat_taken' = 'booking_conflict'): void {
    try {
      // Get destination name
      prisma.vehicleQueue.findFirst({
        where: { destinationId },
        select: { destinationName: true }
      }).then(queue => {
        const destinationName = queue?.destinationName || 'Unknown Destination';
        
        // Try to get the local WebSocket server and broadcast conflict
        try {
          const { getLocalWebSocketServer } = require('../websocket/EnhancedLocalWebSocketServer');
          const localWebSocketServer = getLocalWebSocketServer();
          if (localWebSocketServer) {
            localWebSocketServer.broadcastBookingConflict({
              destinationId,
              destinationName,
              conflictType,
              message: errorMessage
            });
          }
        } catch (error) {
          console.warn('⚠️ Could not broadcast booking conflict:', error);
        }
      });
    } catch (error) {
      console.error('❌ Error broadcasting booking conflict:', error);
    }
  }

  /**
   * Emit financial updates for real-time supervisor dashboard
   */
  private async emitFinancialUpdate(): Promise<void> {
    try {
      // Get updated financial stats
      // const financialStats = await dashboardController.getFinancialStats();
      // const recentTransactions = await dashboardController.getTransactionHistory(10);
      
      // Emit via WebSocket service for broadcasting to clients
      this.webSocketService.emit('financial_update', {
        financial: null, // Will be fetched by dashboard API
        recentTransactions: null,
        timestamp: new Date().toISOString()
      });
      
      console.log('📊 Sent real-time financial update from queue booking');
    } catch (error) {
      console.error('❌ Error sending financial update:', error);
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
      const stationId = configService.getStationId();
      
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