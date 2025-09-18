import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LoggingService {
  /**
   * Log an operation performed by staff
   */
  static async logOperation(
    staffId: string,
    operation: string,
    details?: any,
    success: boolean = true,
    error?: string
  ): Promise<void> {
    try {
      await prisma.operationLog.create({
        data: {
          staffId,
          operation,
          details: details ? JSON.stringify(details) : null,
          success,
          error: error || null,
          createdAt: new Date()
        }
      });
    } catch (logError) {
      console.error('Failed to log operation:', logError);
      // Don't throw error to prevent breaking the main operation
    }
  }

  /**
   * Simple log method for general logging
   */
  async log(operation: string, details?: any): Promise<void> {
    try {
      await prisma.operationLog.create({
        data: {
          staffId: 'system',
          operation,
          details: details ? JSON.stringify(details) : null,
          success: true,
          error: null,
          createdAt: new Date()
        }
      });
    } catch (logError) {
      console.error('Failed to log operation:', logError);
      // Don't throw error to prevent breaking the main operation
    }
  }

  /**
   * Log a booking operation
   */
  static async logBooking(
    staffId: string,
    vehicleLicensePlate: string,
    destinationName: string,
    seatsBooked: number,
    totalAmount: number,
    bookingType: string,
    verificationCode: string
  ): Promise<void> {
    await this.logOperation(
      staffId,
      'BOOK_TICKET',
      {
        vehicleLicensePlate,
        destinationName,
        seatsBooked,
        totalAmount,
        bookingType,
        verificationCode
      }
    );
  }

  /**
   * Log a vehicle entry
   */
  static async logVehicleEntry(
    staffId: string,
    licensePlate: string,
    stationName: string,
    queuePosition: number,
    ticketNumber: string
  ): Promise<void> {
    await this.logOperation(
      staffId,
      'ADD_VEHICLE',
      {
        licensePlate,
        stationName,
        queuePosition,
        ticketNumber,
        action: 'VEHICLE_ENTERED'
      }
    );
  }

  /**
   * Log a vehicle exit
   */
  static async logVehicleExit(
    staffId: string,
    licensePlate: string,
    departureStationName: string,
    destinationStationName: string,
    ticketNumber: string
  ): Promise<void> {
    await this.logOperation(
      staffId,
      'REMOVE_VEHICLE',
      {
        licensePlate,
        departureStationName,
        destinationStationName,
        ticketNumber,
        action: 'VEHICLE_DEPARTED'
      }
    );
  }

  /**
   * Log a vehicle status update
   */
  static async logVehicleStatusUpdate(
    staffId: string,
    licensePlate: string,
    oldStatus: string,
    newStatus: string
  ): Promise<void> {
    await this.logOperation(
      staffId,
      'UPDATE_VEHICLE_STATUS',
      {
        licensePlate,
        oldStatus,
        newStatus
      }
    );
  }

  /**
   * Log a login
   */
  static async logLogin(
    staffId: string,
    staffName: string,
    success: boolean = true,
    error?: string
  ): Promise<void> {
    await this.logOperation(
      staffId,
      'LOGIN',
      {
        staffName,
        timestamp: new Date().toISOString()
      },
      success,
      error
    );
  }

  /**
   * Log a ticket verification
   */
  static async logTicketVerification(
    staffId: string,
    verificationCode: string,
    success: boolean = true,
    error?: string
  ): Promise<void> {
    await this.logOperation(
      staffId,
      'VERIFY_TICKET',
      {
        verificationCode
      },
      success,
      error
    );
  }
}

export default LoggingService;