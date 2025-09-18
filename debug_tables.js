const { PrismaClient } = require('@prisma/client');

async function debugTables() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking available tables...');
    
    // Check what models are available
    console.log('Available models:', Object.keys(prisma));
    
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
    
    // Check recent vehicle queues
    const recentQueues = await prisma.vehicleQueue.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
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
      totalSeats: q.totalSeats,
      createdAt: q.createdAt
    })));
    
    // Check if there are any bookings at all
    const allBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      }
    });
    console.log(`📊 All bookings (first 10): ${allBookings.length}`);
    console.log('📊 Sample bookings:', allBookings);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugTables();