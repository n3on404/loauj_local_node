import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

const prisma = new PrismaClient();

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Get total vehicles count
    const totalVehicles = await prisma.vehicle.count({
      where: { isActive: true }
    });

    // Get active queues (vehicles currently in queue)
    const activeQueues = await prisma.vehicleQueue.count({
      where: {
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      }
    });

    // Get unique destinations with active vehicles
    const activeDestinations = await prisma.vehicleQueue.groupBy({
      by: ['destinationId'],
      where: {
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      }
    });
    
    // Get today's bookings
    const todayBookings = await prisma.booking.count({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd
        }
      }
    });
    
    // Get today's revenue
    const todayRevenueResult = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd
        },
        paymentStatus: 'PAID'
      }
    });

    // Get total bookings
    const totalBookings = await prisma.booking.count();

    // Get online vs cash bookings today
    const onlineBookingsToday = await prisma.booking.count({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd
        },
        bookingType: 'ONLINE'
      }
    });

    const cashBookingsToday = await prisma.booking.count({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd
        },
        bookingType: 'CASH'
      }
    });

    // System health checks
    const systemHealth = {
      database: true, // If we reach this point, DB is working
      websocket: true, // TODO: implement proper websocket health check
      centralServer: false // TODO: implement central server connectivity check
    };

    const stats = {
      totalVehicles,
      totalQueues: activeQueues,
      totalBookings,
      todayBookings,
      todayRevenue: todayRevenueResult._sum.totalAmount || 0,
      onlineBookings: onlineBookingsToday,
      cashBookings: cashBookingsToday,
      activeDestinations: activeDestinations.length,
      systemHealth
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get active vehicle queues grouped by destination
 */
export const getDashboardQueues = async (req: Request, res: Response) => {
  try {
    const queues = await prisma.vehicleQueue.groupBy({
      by: ['destinationId', 'destinationName'],
      _count: {
        id: true
      },
      _sum: {
        availableSeats: true,
        totalSeats: true
      },
      _avg: {
        basePrice: true
      },
      where: {
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      }
    });

    // Get detailed breakdown by status for each destination
    const queueDetails = await Promise.all(
      queues.map(async (queue) => {
        const statusBreakdown = await prisma.vehicleQueue.groupBy({
          by: ['status'],
          _count: {
            id: true
          },
      where: {
            destinationId: queue.destinationId,
            status: { in: ['WAITING', 'LOADING', 'READY'] }
          }
        });

        const waitingVehicles = statusBreakdown.find(s => s.status === 'WAITING')?._count.id || 0;
        const loadingVehicles = statusBreakdown.find(s => s.status === 'LOADING')?._count.id || 0;
        const readyVehicles = statusBreakdown.find(s => s.status === 'READY')?._count.id || 0;
      
      return {
          destinationId: queue.destinationId,
          destinationName: queue.destinationName,
          vehicleCount: queue._count.id,
        waitingVehicles,
        loadingVehicles,
        readyVehicles,
          totalSeats: queue._sum.totalSeats || 0,
          availableSeats: queue._sum.availableSeats || 0,
          basePrice: queue._avg.basePrice || 0
        };
      })
    );

    res.json({
      success: true,
      data: queueDetails
    });

  } catch (error) {
    console.error('Error fetching dashboard queues:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch queue data',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get current vehicles in the system
 */
export const getDashboardVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicleQueue.findMany({
      where: {
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      },
      include: {
        vehicle: {
          include: {
            driver: true
          }
        }
      },
      orderBy: [
        { destinationName: 'asc' },
        { queuePosition: 'asc' }
      ]
    });

    const vehicleData = vehicles.map(queue => ({
      id: queue.id,
      licensePlate: queue.vehicle.licensePlate,
      destinationName: queue.destinationName,
      queuePosition: queue.queuePosition,
      status: queue.status,
      availableSeats: queue.availableSeats,
      totalSeats: queue.totalSeats,
      basePrice: queue.basePrice,
      enteredAt: queue.enteredAt.toISOString(),
      estimatedDeparture: queue.estimatedDeparture?.toISOString(),
      driver: queue.vehicle.driver ? {
        cin: queue.vehicle.driver.cin,
        accountStatus: queue.vehicle.driver.accountStatus
      } : null
    }));

    res.json({
      success: true,
      data: vehicleData
    });

  } catch (error) {
    console.error('Error fetching dashboard vehicles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicle data',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get recent bookings for activity feed
 */
export const getDashboardBookings = async (req: Request, res: Response) => {
  try {
    const recentBookings = await prisma.booking.findMany({
      take: 20,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        queue: {
          include: {
            vehicle: true
          }
        },
        createdByStaff: true
      }
    });

    const bookingData = recentBookings.map(booking => ({
      id: booking.id,
      vehicleLicensePlate: booking.queue.vehicle.licensePlate,
      destinationName: booking.queue.destinationName,
      seatsBooked: booking.seatsBooked,
      totalAmount: booking.totalAmount,
      bookingType: booking.bookingType,
      createdAt: booking.createdAt.toISOString(),
      verificationCode: booking.verificationCode,
      staffName: booking.createdByStaff ? 
        `${booking.createdByStaff.firstName} ${booking.createdByStaff.lastName}` : 
        'Unknown',
      customerPhone: booking.customerPhone
    }));

    res.json({
      success: true,
      data: bookingData
    });

  } catch (error) {
    console.error('Error fetching dashboard bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking data',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get real-time activity log
 */
export const getActivityLog = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    
    // Get recent operation logs
    const operationLogs = await prisma.operationLog.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        staff: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    // Get recent bookings as activities
    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        queue: {
          include: {
            vehicle: true
          }
        },
        createdByStaff: true
      }
    });

    // Get recent vehicle entries
    const recentEntries = await prisma.driverEntryTicket.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        vehicle: {
          include: {
            driver: true
          }
        },
        createdByStaff: true
      }
    });

    // Get recent vehicle exits
    const recentExits = await prisma.driverExitTicket.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        vehicle: {
          include: {
            driver: true
          }
        },
        createdByStaff: true
      }
    });

    // Combine all activities
    const activities: any[] = [];

    // Add operation logs
    operationLogs.forEach(log => {
      activities.push({
        id: `op-${log.id}`,
        type: 'operation',
        action: log.operation,
        description: getOperationDescription(log.operation, log.details || undefined),
        timestamp: log.createdAt,
        staffName: log.staff ? `${log.staff.firstName} ${log.staff.lastName}` : 'Unknown',
        success: log.success,
        details: log.details ? JSON.parse(log.details) : null
      });
    });

    // Add booking activities
    recentBookings.forEach(booking => {
      activities.push({
        id: `booking-${booking.id}`,
        type: 'booking',
        action: 'BOOKING_CREATED',
        description: `Nouvelle réservation de ${booking.seatsBooked} place(s) pour ${booking.queue.destinationName} (${booking.queue.vehicle.licensePlate})`,
        timestamp: booking.createdAt,
        staffName: booking.createdByStaff ? 
          `${booking.createdByStaff.firstName} ${booking.createdByStaff.lastName}` : 
          'System',
      success: true,
        details: {
          vehicleLicensePlate: booking.queue.vehicle.licensePlate,
          destinationName: booking.queue.destinationName,
          seatsBooked: booking.seatsBooked,
          totalAmount: booking.totalAmount,
          bookingType: booking.bookingType,
          verificationCode: booking.verificationCode
        }
      });
    });

    // Add vehicle entry activities
    recentEntries.forEach(entry => {
      activities.push({
        id: `entry-${entry.id}`,
        type: 'vehicle_entry',
        action: 'VEHICLE_ENTERED',
        description: `Véhicule ${entry.licensePlate} entré en position ${entry.queuePosition} pour ${entry.stationName}`,
        timestamp: entry.createdAt,
        staffName: `${entry.createdByStaff.firstName} ${entry.createdByStaff.lastName}`,
        success: true,
        details: {
          licensePlate: entry.licensePlate,
          stationName: entry.stationName,
          queuePosition: entry.queuePosition,
          ticketNumber: entry.ticketNumber,
          driverName: entry.vehicle.driver ? 
            `Driver ${entry.vehicle.driver.cin}` : 
            'Unknown'
        }
      });
    });

    // Add vehicle exit activities
    recentExits.forEach(exit => {
      activities.push({
        id: `exit-${exit.id}`,
        type: 'vehicle_exit',
        action: 'VEHICLE_DEPARTED',
        description: `Véhicule ${exit.licensePlate} parti de ${exit.departureStationName} vers ${exit.destinationStationName}`,
        timestamp: exit.createdAt,
        staffName: `${exit.createdByStaff.firstName} ${exit.createdByStaff.lastName}`,
        success: true,
        details: {
          licensePlate: exit.licensePlate,
          departureStationName: exit.departureStationName,
          destinationStationName: exit.destinationStationName,
          ticketNumber: exit.ticketNumber,
          driverName: exit.vehicle.driver ? 
            `Driver ${exit.vehicle.driver.cin}` : 
            'Unknown'
        }
      });
    });

    // Sort all activities by timestamp (newest first)
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Limit to requested number
    const limitedActivities = activities.slice(0, limit);

    res.json({
      success: true,
      data: limitedActivities
    });

  } catch (error) {
    console.error('Error fetching activity log:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity log',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Helper function to generate human-readable operation descriptions
 */
function getOperationDescription(operation: string, details?: string): string {
  const parsedDetails = details ? JSON.parse(details) : {};
  
  switch (operation) {
    case 'LOGIN':
      return `Connexion au système`;
    case 'BOOK_TICKET':
      return `Réservation de ${parsedDetails.seatsBooked || 1} place(s) pour ${parsedDetails.destinationName || 'destination inconnue'}`;
    case 'VERIFY_TICKET':
      return `Vérification du ticket ${parsedDetails.verificationCode || 'N/A'}`;
    case 'ADD_VEHICLE':
      return `Ajout du véhicule ${parsedDetails.licensePlate || 'N/A'} à la file d'attente`;
    case 'REMOVE_VEHICLE':
      return `Retrait du véhicule ${parsedDetails.licensePlate || 'N/A'} de la file d'attente`;
    case 'UPDATE_VEHICLE_STATUS':
      return `Mise à jour du statut du véhicule ${parsedDetails.licensePlate || 'N/A'} vers ${parsedDetails.newStatus || 'N/A'}`;
    default:
      return `Opération: ${operation}`;
  }
}

/**
 * Get supervisor dashboard data (financial overview)
 */
export const getSupervisorDashboard = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Today's financial data
    const todayStats = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true
      },
      _count: {
        id: true
      },
      _avg: {
        totalAmount: true
      },
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd
        },
        paymentStatus: 'PAID'
      }
    });

    // Month's financial data
    const monthStats = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true
      },
      _count: {
        id: true
      },
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd
        },
        paymentStatus: 'PAID'
      }
    });

    // Total transactions
    const totalStats = await prisma.booking.aggregate({
      _count: {
        id: true
      },
      _avg: {
        totalAmount: true
      },
      where: {
        paymentStatus: 'PAID'
      }
    });

    // Recent transactions for supervisor view
    const recentTransactions = await prisma.booking.findMany({
      take: 50,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        queue: {
          include: {
            vehicle: true
          }
        },
        createdByStaff: true
      },
      where: {
        paymentStatus: 'PAID'
      }
    });

    const transactions = recentTransactions.map(booking => ({
      id: booking.id,
      destinationName: booking.queue.destinationName,
      vehicleLicensePlate: booking.queue.vehicle.licensePlate,
      seatsBooked: booking.seatsBooked,
      amount: booking.totalAmount,
      bookingType: booking.bookingType,
      staffName: booking.createdByStaff ? 
        `${booking.createdByStaff.firstName} ${booking.createdByStaff.lastName}` : 
        'System',
      staffRole: booking.createdByStaff?.role || 'UNKNOWN',
      createdAt: booking.createdAt,
      verificationCode: booking.verificationCode
    }));

    const financial = {
      todayIncome: todayStats._sum.totalAmount || 0,
      todayTransactions: todayStats._count.id || 0,
      monthIncome: monthStats._sum.totalAmount || 0,
      monthTransactions: monthStats._count.id || 0,
      totalTransactions: totalStats._count.id || 0,
      avgTransactionAmount: totalStats._avg.totalAmount || 0
    };

    res.json({
      success: true,
      data: {
        financial,
        transactions
      }
    });

  } catch (error) {
    console.error('Error fetching supervisor dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch supervisor dashboard data',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 