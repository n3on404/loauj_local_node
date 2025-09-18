const { PrismaClient } = require('@prisma/client');

async function debugDashboard() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking database connection...');
    
    // Check total bookings
    const totalBookings = await prisma.booking.count();
    console.log(`📊 Total bookings: ${totalBookings}`);
    
    // Check bookings by payment status
    const bookingsByStatus = await prisma.booking.groupBy({
      by: ['paymentStatus'],
      _count: {
        id: true
      }
    });
    console.log('📊 Bookings by payment status:', bookingsByStatus);
    
    // Check recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        paymentStatus: true,
        totalAmount: true,
        createdAt: true,
        bookingType: true
      }
    });
    console.log('📊 Recent bookings:', recentBookings);
    
    // Check if there are any PAID bookings
    const paidBookings = await prisma.booking.findMany({
      where: {
        paymentStatus: 'PAID'
      },
      take: 5
    });
    console.log(`📊 PAID bookings: ${paidBookings.length}`);
    console.log('📊 Sample PAID bookings:', paidBookings);
    
    // Test the exact query used in dashboard
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    
    console.log('📅 Today range:', { todayStart, todayEnd });
    
    const todayStats = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true
      },
      _count: {
        id: true
      },
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd
        },
        paymentStatus: 'PAID'
      }
    });
    
    console.log('📊 Today stats (PAID only):', todayStats);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugDashboard();