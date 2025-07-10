import { prisma } from '../config/database';
import { Request, Response } from 'express';

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  try {
    // Get queue statistics
    const queueCount = await prisma.vehicleQueue.count({
      where: {
        status: 'WAITING'
      }
    });
    
    // Get vehicle statistics
    const totalVehicles = await prisma.vehicle.count();
    const activeVehicles = await prisma.vehicle.count({
      where: {
        isActive: true
      }
    });
    
    // Get booking statistics
    const todayBookings = await prisma.booking.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    });
    
    const todayRevenue = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    });

    // Get booking type statistics
    const onlineBookings = await prisma.booking.count({
      where: {
        bookingType: 'ONLINE',
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    });

    const cashBookings = await prisma.booking.count({
      where: {
        bookingType: 'CASH',
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    });

    // Get active destinations count
    const activeDestinations = await prisma.vehicleQueue.groupBy({
      by: ['destinationName'],
      where: {
        status: 'WAITING'
      }
    });

    // System health check (simplified for now)
    const systemHealth = {
      database: true, // Assume database is healthy if we can query
      websocket: true, // Will be updated by WebSocket service
      centralServer: true // Will be updated by connection status
    };
    
    return {
      totalVehicles,
      totalQueues: queueCount,
      totalBookings: todayBookings,
      todayBookings,
      todayRevenue: todayRevenue._sum.totalAmount || 0,
      onlineBookings,
      cashBookings,
      activeDestinations: activeDestinations.length,
      systemHealth
    };
  } catch (error) {
    console.error('❌ Error fetching dashboard stats:', error);
    throw error;
  }
}

/**
 * Get financial statistics for supervisor dashboard
 */
export async function getFinancialStats() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Today's income
    const todayIncome = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true
      },
      _count: {
        id: true
      },
      where: {
        createdAt: {
          gte: today
        },
        paymentStatus: 'PAID'
      }
    });
    
    // This month's income
    const monthIncome = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true
      },
      _count: {
        id: true
      },
      where: {
        createdAt: {
          gte: startOfMonth
        },
        paymentStatus: 'PAID'
      }
    });
    
    // Total transactions count
    const totalTransactions = await prisma.booking.count({
      where: {
        paymentStatus: 'PAID'
      }
    });
    
    // Average transaction amount
    const avgTransaction = await prisma.booking.aggregate({
      _avg: {
        totalAmount: true
      },
      where: {
        paymentStatus: 'PAID'
      }
    });
    
    return {
      todayIncome: todayIncome._sum.totalAmount || 0,
      todayTransactions: todayIncome._count || 0,
      monthIncome: monthIncome._sum.totalAmount || 0,
      monthTransactions: monthIncome._count || 0,
      totalTransactions,
      avgTransactionAmount: avgTransaction._avg.totalAmount || 0
    };
  } catch (error) {
    console.error('❌ Error fetching financial stats:', error);
    throw error;
  }
}

/**
 * Get transaction history for supervisor dashboard
 */
export async function getTransactionHistory(limit = 50) {
  try {
    const transactions = await prisma.booking.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        paymentStatus: 'PAID'
      },
      select: {
        id: true,
        seatsBooked: true,
        totalAmount: true,
        bookingSource: true,
        bookingType: true,
        customerPhone: true,
        paymentMethod: true,
        createdAt: true,
        queue: {
          select: {
            destinationName: true,
            vehicle: {
              select: {
                licensePlate: true
              }
            }
          }
        },
        createdByStaff: {
          select: {
            firstName: true,
            lastName: true,
            role: true
          }
        }
      }
    });
    
    // Transform the data to match the expected format
    const formattedTransactions = transactions.map(transaction => ({
      id: transaction.id,
      amount: transaction.totalAmount,
      seatsBooked: transaction.seatsBooked,
      bookingType: transaction.bookingType,
      paymentMethod: transaction.paymentMethod,
      customerPhone: transaction.customerPhone,
      destinationName: transaction.queue.destinationName,
      vehicleLicensePlate: transaction.queue.vehicle.licensePlate,
      staffName: transaction.createdByStaff ? 
        `${transaction.createdByStaff.firstName} ${transaction.createdByStaff.lastName}` : 
        'System',
      staffRole: transaction.createdByStaff?.role || 'SYSTEM',
      createdAt: transaction.createdAt,
      bookingSource: transaction.bookingSource
    }));
    
    return formattedTransactions;
  } catch (error) {
    console.error('❌ Error fetching transaction history:', error);
    throw error;
  }
}

/**
 * Get supervisor dashboard data
 */
export async function getSupervisorDashboardData() {
  try {
    const financial = await getFinancialStats();
    const transactions = await getTransactionHistory(20);
    const recentBookings = await getDashboardBookings();
    
    return {
      financial,
      transactions,
      recentBookings,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error collecting supervisor dashboard data:', error);
    throw error;
  }
}

/**
 * Get enhanced queue details for dashboard with statistics
 */
export async function getDashboardQueues() {
  try {
    // Get all queues grouped by destination with statistics
    const queuesByDestination = await prisma.vehicleQueue.groupBy({
      by: ['destinationName'],
      where: {
        status: 'WAITING'
      },
      _count: {
        id: true
      },
      _sum: {
        availableSeats: true,
        totalSeats: true
      }
    });

    // Get detailed queue information
    const detailedQueues = await prisma.vehicleQueue.findMany({
      where: {
        status: 'WAITING'
      },
      select: {
        id: true,
        destinationName: true,
        queuePosition: true,
        availableSeats: true,
        totalSeats: true,
        basePrice: true,
        estimatedDeparture: true,
        status: true,
        vehicle: {
          select: {
            licensePlate: true,
            driver: {
              select: {
                firstName: true,
                lastName: true,
                phoneNumber: true
              }
            }
          }
        }
      },
      orderBy: [
        { destinationName: 'asc' },
        { queuePosition: 'asc' }
      ]
    });

    // Transform into the expected format
    const enhancedQueues = queuesByDestination.map(dest => {
      const destinationQueues = detailedQueues.filter(q => q.destinationName === dest.destinationName);
      
      // Get route information for base price
      const firstQueue = destinationQueues[0];
      const basePrice = firstQueue?.basePrice || 0;
      
      // Calculate status counts
      const waitingVehicles = destinationQueues.filter(q => q.status === 'WAITING').length;
      const loadingVehicles = destinationQueues.filter(q => q.status === 'LOADING').length;
      const readyVehicles = destinationQueues.filter(q => q.status === 'READY').length;
      
      return {
        destinationId: dest.destinationName, // Using name as ID for now
        destinationName: dest.destinationName,
        vehicleCount: dest._count.id,
        waitingVehicles,
        loadingVehicles,
        readyVehicles,
        totalSeats: dest._sum.totalSeats || 0,
        availableSeats: dest._sum.availableSeats || 0,
        basePrice,
        estimatedNextDeparture: firstQueue?.estimatedDeparture
      };
    });
    
    return enhancedQueues;
  } catch (error) {
    console.error('❌ Error fetching queue details:', error);
    throw error;
  }
}

/**
 * Get vehicle details for dashboard
 */
export async function getDashboardVehicles() {
  try {
    const vehicles = await prisma.vehicleQueue.findMany({
      where: {
        status: {
          in: ['WAITING', 'LOADING', 'READY']
        }
      },
      select: {
        id: true,
        destinationName: true,
        queuePosition: true,
        availableSeats: true,
        totalSeats: true,
        basePrice: true,
        estimatedDeparture: true,
        status: true,
        enteredAt: true,
        vehicle: {
          select: {
            licensePlate: true,
            driver: {
              select: {
                firstName: true,
                lastName: true,
                phoneNumber: true
              }
            }
          }
        }
      },
      orderBy: [
        { destinationName: 'asc' },
        { queuePosition: 'asc' }
      ]
    });

    // Transform to match frontend interface
    const enhancedVehicles = vehicles.map(queue => ({
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
        firstName: queue.vehicle.driver.firstName,
        lastName: queue.vehicle.driver.lastName,
        phoneNumber: queue.vehicle.driver.phoneNumber
      } : undefined
    }));

    return enhancedVehicles;
  } catch (error) {
    console.error('❌ Error fetching vehicle details:', error);
    throw error;
  }
}

/**
 * Get recent bookings for dashboard
 */
export async function getDashboardBookings() {
  try {
    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        seatsBooked: true,
        totalAmount: true,
        bookingSource: true,
        bookingType: true,
        customerPhone: true,
        paymentStatus: true,
        paymentMethod: true,
        isVerified: true,
        createdAt: true,
        verificationCode: true,
        queue: {
          select: {
            destinationName: true,
            vehicle: {
              select: {
                licensePlate: true
              }
            }
          }
        }
      }
    });
    
    // Transform to match frontend interface
    const enhancedBookings = recentBookings.map(booking => ({
      id: booking.id,
      vehicleLicensePlate: booking.queue.vehicle.licensePlate,
      destinationName: booking.queue.destinationName,
      seatsBooked: booking.seatsBooked,
      totalAmount: booking.totalAmount,
      bookingType: booking.bookingType,
      createdAt: booking.createdAt.toISOString(),
      verificationCode: booking.verificationCode
    }));
    
    return enhancedBookings;
  } catch (error) {
    console.error('❌ Error fetching recent bookings:', error);
    throw error;
  }
}

/**
 * Get all dashboard data
 */
export async function getAllDashboardData() {
  try {
    const stats = await getDashboardStats();
    const queues = await getDashboardQueues();
    const vehicles = await getDashboardVehicles();
    const recentBookings = await getDashboardBookings();
    
    return {
      statistics: stats,
      queues: queues,
      vehicles: vehicles,
      recentBookings: recentBookings,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error collecting all dashboard data:', error);
    throw error;
  }
}

/**
 * Update the LocalWebSocketServer with the latest dashboard data
 */
export async function updateDashboardData(wsServer: any) {
  try {
    const dashboardData = await getAllDashboardData();
    
    wsServer.broadcast({
      type: 'dashboard_data',
      payload: dashboardData,
      timestamp: Date.now()
    });
    
    return dashboardData;
  } catch (error) {
    console.error('❌ Error updating dashboard data:', error);
    throw error;
  }
}

// HTTP Handlers
export const getDashboardStatsHandler = async (req: Request, res: Response) => {
  try {
    const stats = await getDashboardStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('❌ Error in getDashboardStatsHandler:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats'
    });
  }
};

export const getDashboardQueuesHandler = async (req: Request, res: Response) => {
  try {
    const queues = await getDashboardQueues();
    res.json({
      success: true,
      data: queues
    });
  } catch (error) {
    console.error('❌ Error in getDashboardQueuesHandler:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch queue data'
    });
  }
};

export const getDashboardVehiclesHandler = async (req: Request, res: Response) => {
  try {
    const vehicles = await getDashboardVehicles();
    res.json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    console.error('❌ Error in getDashboardVehiclesHandler:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicle data'
    });
  }
};

export const getDashboardBookingsHandler = async (req: Request, res: Response) => {
  try {
    const bookings = await getDashboardBookings();
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('❌ Error in getDashboardBookingsHandler:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking data'
    });
  }
};

export const getSupervisorDashboardHandler = async (req: Request, res: Response) => {
  try {
    const data = await getSupervisorDashboardData();
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('❌ Error in getSupervisorDashboardHandler:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch supervisor dashboard data'
    });
  }
};

// For demo: emit WebSocket events (to be called from queue/booking logic)
export const emitVehicleQueueEvent = (io: any, vehicle: any, queue: any) => {
  io.emit('vehicle_queue_event', {
    type: 'VEHICLE_ENTERED_QUEUE',
    vehicle,
    queue
  });
};

export const emitBookingEvent = (io: any, booking: any) => {
  io.emit('booking_event', {
    type: 'NEW_BOOKING',
    booking
  });
}; 