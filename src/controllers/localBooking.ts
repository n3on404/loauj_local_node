import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { EnhancedLocalWebSocketServer } from '../websocket/EnhancedLocalWebSocketServer';

// Reference to WebSocket server for real-time updates
let localWebSocketServer: EnhancedLocalWebSocketServer | null = null;

// Function to set the WebSocket server instance
export function setBookingControllerWebSocket(wsServer: EnhancedLocalWebSocketServer) {
  localWebSocketServer = wsServer;
}

/**
 * Generate a unique verification code
 */
function generateVerificationCode(): string {
  return Math.floor(Math.random() * 900000 + 100000).toString(); // 6-digit code
}



/**
 * Broadcast real-time booking updates
 */
function broadcastBookingUpdate(type: 'booking_created' | 'seats_updated' | 'vehicle_queue_updated' | 'vehicle_status_changed', data: any) {
  if (localWebSocketServer) {
    localWebSocketServer.broadcast({
      type: 'booking_update',
      payload: {
        updateType: type,
        data,
        timestamp: new Date().toISOString()
      },
      timestamp: Date.now()
    });
    
    console.log(`📡 Broadcasted ${type} update to connected clients`);
  }
}

// ETA Prediction Service Configuration
const ETD_SERVICE_BASE_URL = process.env.ETD_SERVICE_URL || 'http://localhost:8000';

/**
 * ETD Prediction Service Integration
 *
 * This service provides AI-powered ETD predictions using:
 * - Facebook Prophet for time series forecasting
 * - Scikit-learn for advanced ML features
 * - Real-time queue data integration
 * - Separate endpoints for regular and overnight queues
 * - Station operating hours consideration
 *
 * Environment Variables:
 * - ETD_SERVICE_URL: Base URL for ETD prediction service (default: http://localhost:8000)
 *
 * API Endpoints Used:
 * - POST /api/v1/etd/predict: Get ETD prediction for regular queue
 * - POST /api/v1/etd/predict-overnight: Get ETD prediction for overnight queue
 *
 * Features:
 * - Automatic fallback if service unavailable
 * - Confidence level reporting
 * - Queue status integration
 * - Separate logic for regular and overnight queues
 * - Real-time model updates based on historical data
 */

// TypeScript interfaces for ETD service responses
interface ETDQueueInfo {
  total_vehicles: number;
  available_seats?: number;
  total_seats?: number;
}

interface ETDOvernightInfo {
  is_overnight: boolean;
  station_opening_time: string;
  station_closing_time: string;
  next_opening?: string;
  wait_hours: number;
}

interface ETDPredictionResponse {
  estimated_etd: string;
  etd_hours: number;
  confidence_level: number;
  model_used: string;
  destination_id: string;
  seats_requested: number;
  prediction_time: string;
  queue_info?: ETDQueueInfo;
  overnight_info?: ETDOvernightInfo;
  ai_details?: {
    method: string;
    prophet_prediction?: number;
    sklearn_prediction?: number;
    ensemble_weights?: Record<string, number>;
    training_metrics?: Record<string, any>;
  };
  error?: string;
}

/**
 * Call ETD Prediction Service for real-time predictions
 * @param destinationId - ID of the destination station
 * @param seatsNeeded - Number of seats being booked
 * @param departureStationId - ID of the departure station (optional)
 * @param isOvernight - Whether this is an overnight queue request (default: false)
 * @returns ETD prediction from AI service
 */
export async function getETDPrediction(destinationId: string, seatsNeeded: number = 1, departureStationId?: string, isOvernight: boolean = false): Promise<ETDPredictionResponse> {
  try {
    // Choose endpoint based on whether this is an overnight request
    const endpoint = isOvernight ? '/api/v1/etd/predict-overnight' : '/api/v1/etd/predict';
    const etdServiceUrl = `${ETD_SERVICE_BASE_URL}${endpoint}`;

    console.log(`🤖 Calling ETD Prediction Service:`);
    console.log(`   📍 Destination: ${destinationId}`);
    console.log(`   💺 Seats needed: ${seatsNeeded}`);
    console.log(`   🏛️ Departure station: ${departureStationId || 'local'}`);
    console.log(`   🌙 Overnight queue: ${isOvernight ? 'Yes' : 'No'}`);

    const response = await fetch(etdServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination_id: destinationId,
        seats_needed: seatsNeeded,
        // Optionally include departure station for overnight calculations
        ...(departureStationId && { departure_station_id: departureStationId })
      })
    });

    if (!response.ok) {
      throw new Error(`ETD Service responded with status: ${response.status}`);
    }

    const etdResult = await response.json() as ETDPredictionResponse;

    console.log(`✅ ETD Prediction Service Response:`);
    console.log(`   🎯 ETD: ${etdResult.estimated_etd}`);
    console.log(`   ⏱️ Hours: ${etdResult.etd_hours}`);
    console.log(`   📊 Confidence: ${etdResult.confidence_level}`);
    console.log(`   🤖 Model: ${etdResult.model_used}`);

    // Convert the ETD string to Date object for compatibility
    const etdDate = new Date(etdResult.estimated_etd);

    // Add additional information for logging/monitoring
    console.log(`🕐 AI-Enhanced ETD Calculation for ${destinationId}:`);
    console.log(`   - AI Model Used: ${etdResult.model_used}`);
    console.log(`   - Confidence Level: ${(etdResult.confidence_level * 100).toFixed(1)}%`);
    console.log(`   - Queue Vehicles: ${etdResult.queue_info?.total_vehicles || 0}`);
    console.log(`   - ETD: ${etdDate.toISOString()}`);

    return etdResult;

  } catch (error) {
    console.error(`❌ Error calling ETD Prediction Service:`, error);

    // Fallback to a basic estimation if service is unavailable
    console.log(`⚠️ Falling back to basic ETD estimation`);
    const now = new Date();
    const basicETD = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours fallback

    return {
      estimated_etd: basicETD.toISOString(),
      etd_hours: 2,
      confidence_level: 0.3,
      model_used: 'fallback_basic',
      destination_id: destinationId,
      seats_requested: seatsNeeded,
      prediction_time: now.toISOString(),
      queue_info: { total_vehicles: 0 },
      error: 'ETD service unavailable'
    };
  }
}

/**
 * Legacy function for backward compatibility - now uses AI service
 * @param destinationId - ID of the destination station
 * @returns ETD as a Date object from AI service
 */
async function calculateETD(destinationId: string): Promise<Date> {
  console.log(`🔄 Legacy calculateETD called - redirecting to AI service`);

  const etdResult = await getETDPrediction(destinationId, 1); // Default 1 seat
  return new Date(etdResult.estimated_etd);
}
/**
 * Local Node Booking Controller
 * Handles booking creation at the station level
 */
export class LocalBookingController {

  /**
   * POST /api/bookings/create
   * Create a booking in the local station
   * Called by Central Server when user creates a booking
   */
  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        userFullName,
        userPhoneNumber,
        userEmail,
        departureStationId,
        destinationStationId,
        numberOfSeats,
        selectedVehicles
      } = req.body;

      // Validate input
      if (!userId || !userFullName || !departureStationId || !destinationStationId || !numberOfSeats || !selectedVehicles) {
        res.status(400).json({
          success: false,
          error: 'Missing required booking information'
        });
        return;
      }

      console.log(`🎫 Creating local booking: ${userFullName} (${numberOfSeats} seats)`);

      // Start transaction
      const result = await prisma.$transaction(async (tx) => {
        // Generate verification code
        const verificationCode = generateVerificationCode();
        
        let totalAmount = 0;
        const bookedVehicles = [];

        // Process each selected vehicle
        for (const vehicleBooking of selectedVehicles) {
          const { vehicleQueueId, seatsToBook, pricePerSeat } = vehicleBooking;

          // Get the vehicle queue entry with vehicle details
          const vehicleQueue = await tx.vehicleQueue.findUnique({
            where: { id: vehicleQueueId },
            include: {
              vehicle: {
                select: {
                  id: true,
                  licensePlate: true,
                  model: true
                }
              }
            }
          });

          if (!vehicleQueue) {
            throw new Error(`Vehicle queue entry ${vehicleQueueId} not found`);
          }

          if (vehicleQueue.availableSeats < seatsToBook) {
            throw new Error(`Insufficient seats in vehicle ${vehicleQueue.vehicle.licensePlate}`);
          }

          // Calculate new seat availability
          const newAvailableSeats = vehicleQueue.availableSeats - seatsToBook;
          const isNowFull = newAvailableSeats === 0;
          
          // Determine new queue status
          let newStatus = vehicleQueue.status;
          if (isNowFull && vehicleQueue.status === 'WAITING') {
            newStatus = 'LOADING'; // Vehicle is full and ready for loading
          }

          // Update vehicle queue with comprehensive data
          await tx.vehicleQueue.update({
            where: { id: vehicleQueueId },
            data: {
              availableSeats: newAvailableSeats,
              status: newStatus,
              syncedAt: new Date(), // Update sync timestamp
              // If vehicle becomes full, set estimated departure
              ...(isNowFull && !vehicleQueue.estimatedDeparture && {
                estimatedDeparture: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
              })
            }
          });

          console.log(`🚌 Updated vehicle ${vehicleQueue.vehicle.licensePlate}: ${vehicleQueue.availableSeats} → ${newAvailableSeats} seats available`);
          if (isNowFull) {
            console.log(`🔥 Vehicle ${vehicleQueue.vehicle.licensePlate} is now FULL and marked for LOADING`);
          }

          // Create booking entry
          const booking = await tx.booking.create({
            data: {
              id: `${userId}_${vehicleQueueId}_${Date.now()}`, // Generate unique ID
              queueId: vehicleQueueId,
              seatsBooked: seatsToBook,
              totalAmount: seatsToBook * pricePerSeat,
              bookingSource: 'ONLINE',
              bookingType: 'ONLINE',
              userId,
              customerPhone: userPhoneNumber,
              onlineTicketId: verificationCode, // Use verification code as ticket ID
              verificationCode,
              paymentStatus: 'PENDING',
              paymentMethod: 'ONLINE'
            }
          });

          totalAmount += seatsToBook * pricePerSeat;
          bookedVehicles.push({
            bookingId: booking.id,
            vehicleId: vehicleQueue.vehicleId,
            licensePlate: vehicleQueue.vehicle.licensePlate,
            seatsBooked: seatsToBook,
            pricePerSeat,
            queuePosition: vehicleQueue.queuePosition,
            estimatedDeparture: vehicleQueue.estimatedDeparture,
            newAvailableSeats: newAvailableSeats,
            newStatus: newStatus,
            isNowFull: isNowFull
          });
        }

        return {
          verificationCode,
          totalAmount,
          numberOfSeats,
          bookedVehicles
        };
      });

      // Get station configuration for response
      const stationConfig = await prisma.stationConfig.findFirst({
        select: {
          stationId: true,
          stationName: true
        }
      });

      // Calculate estimated departure time using AI-powered ETD service
      console.log(`🎫 Calculating AI-enhanced ETD for ${result.numberOfSeats} seats to ${destinationStationId}`);
      const etdPrediction = await getETDPrediction(destinationStationId, result.numberOfSeats, departureStationId);

      // Use the AI-predicted ETD
      const estimatedDepartureTime = new Date(etdPrediction.estimated_etd);

      // Prepare response with enhanced ETD information
      const bookingResponse = {
        id: result.verificationCode, // Using verification code as ID for simplicity
        ticketNumber: result.verificationCode, // Using verification code as ticket number
        verificationCode: result.verificationCode,
        totalAmount: result.totalAmount,
        numberOfSeats: result.numberOfSeats,
        status: 'CONFIRMED',
        estimatedDepartureTime: estimatedDepartureTime.toISOString(),
        // Include AI prediction details for transparency
        etdPrediction: {
          modelUsed: etdPrediction.model_used,
          confidenceLevel: etdPrediction.confidence_level,
          etdHours: etdPrediction.etd_hours,
          queueVehicles: etdPrediction.queue_info?.total_vehicles || 0,
          ...(etdPrediction.overnight_info && {
            overnightInfo: {
              isOvernight: etdPrediction.overnight_info.is_overnight,
              stationHours: `${etdPrediction.overnight_info.station_opening_time} - ${etdPrediction.overnight_info.station_closing_time}`,
              waitHours: etdPrediction.overnight_info.wait_hours
            }
          })
        },
        createdAt: new Date().toISOString(),
        vehicles: result.bookedVehicles
      };

      res.json({
        success: true,
        data: bookingResponse
      });

      // Broadcast real-time updates with AI-enhanced ETD information
      broadcastBookingUpdate('booking_created', {
        verificationCode: result.verificationCode,
        userFullName,
        numberOfSeats: result.numberOfSeats,
        totalAmount: result.totalAmount,
        stationName: stationConfig?.stationName,
        aiEnhancedETD: {
          estimatedDepartureTime: etdPrediction.estimated_etd,
          modelUsed: etdPrediction.model_used,
          confidenceLevel: etdPrediction.confidence_level,
          queueVehicles: etdPrediction.queue_info?.total_vehicles || 0
        }
      });

      // Broadcast detailed queue updates for each affected vehicle
      for (const vehicle of result.bookedVehicles) {
        broadcastBookingUpdate('vehicle_queue_updated', {
          vehicleId: vehicle.vehicleId,
          licensePlate: vehicle.licensePlate,
          previousAvailableSeats: vehicle.newAvailableSeats + vehicle.seatsBooked,
          newAvailableSeats: vehicle.newAvailableSeats,
          seatsBooked: vehicle.seatsBooked,
          newStatus: vehicle.newStatus,
          isNowFull: vehicle.isNowFull,
          queuePosition: vehicle.queuePosition,
          estimatedDeparture: vehicle.estimatedDeparture,
          timestamp: new Date().toISOString()
        });

        // Special broadcast for vehicles that become full
        if (vehicle.isNowFull) {
          broadcastBookingUpdate('vehicle_status_changed', {
            vehicleId: vehicle.vehicleId,
            licensePlate: vehicle.licensePlate,
            oldStatus: 'WAITING',
            newStatus: vehicle.newStatus,
            reason: 'VEHICLE_FULL',
            estimatedDeparture: vehicle.estimatedDeparture,
            message: `Vehicle ${vehicle.licensePlate} is now full and ready for departure`
          });
        }
      }

      // Broadcast summary of seats updated
      broadcastBookingUpdate('seats_updated', {
        totalSeatsBooked: result.numberOfSeats,
        affectedVehicles: result.bookedVehicles.map(v => ({
          licensePlate: v.licensePlate,
          seatsBooked: v.seatsBooked,
          newAvailableSeats: v.newAvailableSeats,
          status: v.newStatus
        })),
        summary: {
          totalVehiclesAffected: result.bookedVehicles.length,
          vehiclesNowFull: result.bookedVehicles.filter(v => v.isNowFull).length
        }
      });

      console.log(`✅ Booking created successfully: ${result.verificationCode}`);

    } catch (error) {
      console.error('❌ Error creating local booking:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create booking',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * GET /api/bookings/verify/:verificationCode
   * Verify and complete a booking (mark as used/completed)
   * This is called when passenger shows ticket at station
   */
  async verifyBooking(req: Request, res: Response): Promise<void> {
    try {
      const { verificationCode } = req.params;
      const { staffId } = req.body; // Optional: staff member who verified the ticket

      console.log(`🎫 Verifying ticket: ${verificationCode}`);

      const booking = await prisma.booking.findUnique({
        where: {
          verificationCode
        },
        include: {
          queue: {
            include: {
              vehicle: {
                select: {
                  licensePlate: true,
                  model: true
                }
              }
            }
          }
        }
      });

      if (!booking) {
        res.status(404).json({
          success: false,
          error: 'Booking not found',
          message: 'Invalid verification code'
        });
        return;
      }

      // Check if booking is paid
      if (booking.paymentStatus !== 'PAID') {
        res.status(400).json({
          success: false,
          error: 'Payment not completed',
          message: `Booking payment status is ${booking.paymentStatus}. Payment must be completed before verification.`,
          data: {
            verificationCode: booking.verificationCode,
            paymentStatus: booking.paymentStatus,
            totalAmount: booking.totalAmount
          }
        });
        return;
      }

      // Check if already verified
      if (booking.isVerified) {
        res.json({
          success: true,
          message: 'Ticket already verified',
          data: {
            booking: {
              verificationCode: booking.verificationCode,
              seatsBooked: booking.seatsBooked,
              totalAmount: booking.totalAmount,
              bookingType: booking.bookingType,
              paymentStatus: booking.paymentStatus,
              isVerified: booking.isVerified,
              verifiedAt: booking.verifiedAt,
              createdAt: booking.createdAt
            },
            vehicle: {
              licensePlate: booking.queue.vehicle.licensePlate,
              model: booking.queue.vehicle.model,
              queuePosition: booking.queue.queuePosition,
              estimatedDeparture: booking.queue.estimatedDeparture
            },
            alreadyVerified: true
          }
        });
        return;
      }

      // Mark ticket as verified/completed
      const verifiedBooking = await prisma.booking.update({
        where: { verificationCode },
        data: {
          paymentStatus: 'COMPLETED', // Final status: ticket used/completed
          isVerified: true,
          verifiedAt: new Date(),
          verifiedById: staffId || null
        },
        include: {
          queue: {
            include: {
              vehicle: {
                select: {
                  licensePlate: true,
                  model: true
                }
              }
            }
          },
          verifiedByStaff: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      });

      console.log(`✅ Ticket verified successfully: ${verificationCode}`);

      // Broadcast ticket verification update
      broadcastBookingUpdate('booking_created', {
        bookingId: verifiedBooking.id,
        verificationCode: verifiedBooking.verificationCode,
        onlineTicketId: verifiedBooking.onlineTicketId,
        userId: verifiedBooking.userId,
        paymentStatus: verifiedBooking.paymentStatus,
        isVerified: verifiedBooking.isVerified,
        verifiedAt: verifiedBooking.verifiedAt,
        totalAmount: verifiedBooking.totalAmount,
        seatsBooked: verifiedBooking.seatsBooked,
        vehicle: {
          licensePlate: verifiedBooking.queue.vehicle.licensePlate,
          destination: verifiedBooking.queue.destinationName
        },
        source: 'ticket_verification'
      });

      res.json({
        success: true,
        message: 'Ticket verified successfully',
        data: {
          booking: {
            verificationCode: verifiedBooking.verificationCode,
            seatsBooked: verifiedBooking.seatsBooked,
            totalAmount: verifiedBooking.totalAmount,
            bookingType: verifiedBooking.bookingType,
            paymentStatus: verifiedBooking.paymentStatus, // Now "COMPLETED"
            isVerified: verifiedBooking.isVerified,
            verifiedAt: verifiedBooking.verifiedAt,
            createdAt: verifiedBooking.createdAt
          },
          vehicle: {
            licensePlate: verifiedBooking.queue.vehicle.licensePlate,
            model: verifiedBooking.queue.vehicle.model,
            queuePosition: verifiedBooking.queue.queuePosition,
            estimatedDeparture: verifiedBooking.queue.estimatedDeparture
          },
          staff: verifiedBooking.verifiedByStaff,
          verificationTimestamp: verifiedBooking.verifiedAt
        }
      });

    } catch (error) {
      console.error('❌ Error verifying booking:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to verify booking',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * GET /api/bookings/check/:verificationCode
   * Check booking details without verifying/completing it
   * This is for just viewing ticket information
   */
  async checkBooking(req: Request, res: Response): Promise<void> {
    try {
      const { verificationCode } = req.params;

      console.log(`🔍 Checking booking details: ${verificationCode}`);

      const booking = await prisma.booking.findUnique({
        where: {
          verificationCode
        },
        include: {
          queue: {
            include: {
              vehicle: {
                select: {
                  licensePlate: true,
                  model: true
                }
              }
            }
          },
          verifiedByStaff: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      });

      if (!booking) {
        res.status(404).json({
          success: false,
          error: 'Booking not found',
          message: 'Invalid verification code'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Booking details retrieved',
        data: {
          booking: {
            verificationCode: booking.verificationCode,
            seatsBooked: booking.seatsBooked,
            totalAmount: booking.totalAmount,
            bookingType: booking.bookingType,
            paymentStatus: booking.paymentStatus,
            isVerified: booking.isVerified,
            verifiedAt: booking.verifiedAt,
            createdAt: booking.createdAt,
            paymentProcessedAt: booking.paymentProcessedAt
          },
          vehicle: {
            licensePlate: booking.queue.vehicle.licensePlate,
            model: booking.queue.vehicle.model,
            queuePosition: booking.queue.queuePosition,
            estimatedDeparture: booking.queue.estimatedDeparture
          },
          staff: booking.verifiedByStaff,
          statusFlow: {
            created: booking.createdAt,
            paid: booking.paymentProcessedAt,
            verified: booking.verifiedAt,
            currentStatus: booking.paymentStatus
          }
        }
      });

    } catch (error) {
      console.error('❌ Error checking booking:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to check booking',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * GET /api/bookings/station/summary
   * Get booking summary for the station
   */
  async getStationBookingSummary(req: Request, res: Response): Promise<void> {
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const bookingStats = await prisma.booking.groupBy({
        by: ['bookingType'],
        where: {
          createdAt: {
            gte: todayStart,
            lte: todayEnd
          }
        },
        _count: {
          id: true
        },
        _sum: {
          seatsBooked: true,
          totalAmount: true
        }
      });

      const totalBookings = bookingStats.reduce((sum, stat) => sum + (stat._count?.id || 0), 0);
      const totalSeats = bookingStats.reduce((sum, stat) => sum + (stat._sum?.seatsBooked || 0), 0);
      const totalRevenue = bookingStats.reduce((sum, stat) => sum + (stat._sum?.totalAmount || 0), 0);

      // Get current queue status to show real-time impact
      const queueStatus = await prisma.vehicleQueue.findMany({
        select: {
          id: true,
          vehicleId: true,
          destinationName: true,
          status: true,
          availableSeats: true,
          totalSeats: true,
          queuePosition: true,
          vehicle: {
            select: {
              licensePlate: true,
              model: true
            }
          },
          _count: {
            select: {
              bookings: true
            }
          }
        },
        orderBy: [
          { destinationName: 'asc' },
          { queuePosition: 'asc' }
        ]
      });

      res.json({
        success: true,
        data: {
          summary: {
            totalBookings,
            totalSeats,
            totalRevenue,
            date: new Date().toISOString().split('T')[0]
          },
          typeBreakdown: bookingStats.map(stat => ({
            type: stat.bookingType,
            count: stat._count?.id || 0,
            seats: stat._sum?.seatsBooked || 0,
            revenue: stat._sum?.totalAmount || 0
          })),
          currentQueueStatus: {
            totalVehicles: queueStatus.length,
            vehiclesByStatus: queueStatus.reduce((acc, vehicle) => {
              acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
            totalAvailableSeats: queueStatus.reduce((sum, v) => sum + v.availableSeats, 0),
            totalOccupiedSeats: queueStatus.reduce((sum, v) => sum + (v.totalSeats - v.availableSeats), 0),
            vehicles: queueStatus.map(v => ({
              licensePlate: v.vehicle.licensePlate,
              destination: v.destinationName,
              status: v.status,
              availableSeats: v.availableSeats,
              totalSeats: v.totalSeats,
              occupancyRate: Math.round(((v.totalSeats - v.availableSeats) / v.totalSeats) * 100),
              bookingsCount: v._count.bookings,
              queuePosition: v.queuePosition
            }))
          }
        }
      });

    } catch (error) {
      console.error('❌ Error getting booking summary:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get booking summary',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * POST /api/bookings/confirm-payment
   * Confirm payment and update booking status
   * Called by Central Server after payment webhook confirmation
   */
  async confirmPayment(req: Request, res: Response): Promise<void> {
    try {
      const { 
        verificationCode, 
        paymentReference, 
        status, 
        paymentProcessedAt,
        centralBookingId,
        updateData 
      } = req.body;

      console.log(`💰 Payment confirmation received for booking: ${verificationCode}`);
      console.log(`Payment reference: ${paymentReference}, Status: ${status}`);

      if (!verificationCode || !paymentReference || !status) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: verificationCode, paymentReference, status'
        });
        return;
      }

      // Find the booking by verification code
      const booking = await prisma.booking.findUnique({
        where: { verificationCode },
        include: {
          queue: {
            include: {
              vehicle: true
            }
          },
          createdByStaff: {
            select: { id: true, firstName: true, lastName: true }
          }
        }
      });

      if (!booking) {
        console.warn(`⚠️ Booking not found with verification code: ${verificationCode}`);
        res.status(404).json({
          success: false,
          error: 'Booking not found',
          verificationCode
        });
        return;
      }

      // Check if payment was already confirmed
      if (booking.paymentStatus === 'PAID' || booking.paymentStatus === 'COMPLETED') {
        console.log(`ℹ️ Booking ${verificationCode} is already confirmed as ${booking.paymentStatus}`);
        res.json({
          success: true,
          message: 'Booking already confirmed',
          data: {
            verificationCode: booking.verificationCode,
            paymentStatus: booking.paymentStatus,
            alreadyConfirmed: true
          }
        });
        return;
      }

      // Start a transaction to update booking and related data
      const updatedBooking = await prisma.$transaction(async (tx) => {
        // Update the booking payment status and verification
        const updatedBooking = await tx.booking.update({
          where: { verificationCode },
          data: {
            paymentStatus: status === 'PAID' ? 'PAID' : 'FAILED', // Set to PAID when payment successful
            paymentMethod: 'ONLINE',
            paymentProcessedAt: paymentProcessedAt ? new Date(paymentProcessedAt) : new Date(),
            onlineTicketId: centralBookingId || booking.onlineTicketId,
            // Don't set isVerified to true yet - that happens during ticket verification
            syncStatus: 'SYNCED' // Mark as synced with central server
          },
          include: {
            queue: {
              include: {
                vehicle: true
              }
            },
            createdByStaff: {
              select: { id: true, firstName: true, lastName: true }
            }
          }
        });

        // If payment successful, update vehicle seat availability
        if (status === 'PAID' && booking.queue.vehicle) {
          const vehicle = booking.queue.vehicle;
          
          console.log(`✅ Confirming ${booking.seatsBooked} seats for vehicle ${vehicle.licensePlate}`);

          // Update the vehicle queue availability
          await tx.vehicleQueue.update({
            where: { id: booking.queueId },
            data: {
              availableSeats: Math.max(0, booking.queue.availableSeats - booking.seatsBooked)
            }
          });

          // Check if vehicle is now full
          const updatedQueue = await tx.vehicleQueue.findUnique({
            where: { id: booking.queueId }
          });

          if (updatedQueue && updatedQueue.availableSeats <= 0) {
            await tx.vehicleQueue.update({
              where: { id: booking.queueId },
              data: {
                status: 'READY' // Vehicle is ready to depart when full
              }
            });

            console.log(`🚌 Vehicle queue ${vehicle.licensePlate} is now READY to depart`);
            
            // Broadcast vehicle status change
            broadcastBookingUpdate('vehicle_status_changed', {
              queueId: booking.queueId,
              licensePlate: vehicle.licensePlate,
              oldStatus: booking.queue.status,
              newStatus: 'READY',
              availableSeats: 0,
              totalSeats: updatedQueue.totalSeats
            });
          }

          console.log(`🎯 Booking ${verificationCode} confirmed with ${booking.seatsBooked} seats`);
        }

        return updatedBooking;
      });

      // Broadcast the payment confirmation update
      broadcastBookingUpdate('booking_created', {
        bookingId: updatedBooking.id,
        verificationCode: updatedBooking.verificationCode,
        onlineTicketId: updatedBooking.onlineTicketId,
        userId: updatedBooking.userId,
        paymentStatus: updatedBooking.paymentStatus,
        totalAmount: updatedBooking.totalAmount,
        seatsBooked: updatedBooking.seatsBooked,
        paymentMethod: updatedBooking.paymentMethod,
        isVerified: updatedBooking.isVerified,
        verifiedAt: updatedBooking.verifiedAt,
        vehicle: {
          licensePlate: updatedBooking.queue.vehicle.licensePlate,
          destination: updatedBooking.queue.destinationName,
          seatsBooked: updatedBooking.seatsBooked
        },
        source: 'payment_confirmation'
      });

      res.json({
        success: true,
        message: 'Payment confirmation processed successfully',
        data: {
          verificationCode: updatedBooking.verificationCode,
          onlineTicketId: updatedBooking.onlineTicketId,
          paymentStatus: updatedBooking.paymentStatus,
          totalAmount: updatedBooking.totalAmount,
          seatsBooked: updatedBooking.seatsBooked,
          paymentMethod: updatedBooking.paymentMethod,
          isVerified: updatedBooking.isVerified,
          verifiedAt: updatedBooking.verifiedAt,
          paymentProcessedAt: updatedBooking.paymentProcessedAt,
          vehicle: {
            licensePlate: updatedBooking.queue.vehicle.licensePlate,
            destination: updatedBooking.queue.destinationName,
            queuePosition: updatedBooking.queue.queuePosition,
            availableSeats: updatedBooking.queue.availableSeats,
            totalSeats: updatedBooking.queue.totalSeats
          },
          staff: updatedBooking.createdByStaff
        }
      });

      console.log(`✅ Payment confirmation completed for booking ${verificationCode}`);

    } catch (error) {
      console.error('❌ Error confirming payment:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to confirm payment',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const localBookingController = new LocalBookingController();
export { calculateETD };
