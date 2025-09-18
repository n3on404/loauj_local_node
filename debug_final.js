const { PrismaClient } = require('@prisma/client');

async function debugFinal() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Final system check...');
    
    // Check vehicles
    const vehicles = await prisma.vehicle.count();
    console.log(`🚗 Total vehicles: ${vehicles}`);
    
    // Check drivers
    const drivers = await prisma.driver.count();
    console.log(`👨‍💼 Total drivers: ${drivers}`);
    
    // Check vehicle queues
    const queues = await prisma.vehicleQueue.count();
    console.log(`🚌 Total vehicle queues: ${queues}`);
    
    // Check staff
    const staff = await prisma.staff.count();
    console.log(`👮 Total staff: ${staff}`);
    
    // Check bookings
    const bookings = await prisma.booking.count();
    console.log(`📊 Total bookings: ${bookings}`);
    
    // Check recent vehicle queues (without createdAt)
    const recentQueues = await prisma.vehicleQueue.findMany({
      take: 5,
      orderBy: {
        id: 'desc'
      },
      include: {
        vehicle: true
      }
    });
    console.log('🚌 Recent vehicle queues:', recentQueues.map(q => ({
      id: q.id,
      licensePlate: q.vehicle?.licensePlate,
      destination: q.destinationName,
      status: q.status,
      availableSeats: q.availableSeats,
      totalSeats: q.totalSeats
    })));
    
    // Check all bookings
    const allBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: {
        id: 'desc'
      }
    });
    console.log(`📊 All bookings (first 10): ${allBookings.length}`);
    if (allBookings.length > 0) {
      console.log('📊 Sample bookings:', allBookings.map(b => ({
        id: b.id,
        paymentStatus: b.paymentStatus,
        totalAmount: b.totalAmount,
        bookingType: b.bookingType,
        createdAt: b.createdAt
      })));
    }
    
    // Check if there are any PAID bookings specifically
    const paidBookings = await prisma.booking.findMany({
      where: {
        paymentStatus: 'PAID'
      }
    });
    console.log(`💰 PAID bookings: ${paidBookings.length}`);
    
    // Check if there are any PENDING bookings
    const pendingBookings = await prisma.booking.findMany({
      where: {
        paymentStatus: 'PENDING'
      }
    });
    console.log(`⏳ PENDING bookings: ${pendingBookings.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugFinal();