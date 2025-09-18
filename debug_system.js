const { PrismaClient } = require('@prisma/client');

async function debugSystem() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Checking system data...');
    
    // Check vehicles
    const vehicles = await prisma.vehicle.count();
    console.log(`🚗 Total vehicles: ${vehicles}`);
    
    // Check drivers
    const drivers = await prisma.driver.count();
    console.log(`👨‍💼 Total drivers: ${drivers}`);
    
    // Check vehicle queues
    const queues = await prisma.vehicleQueue.count();
    console.log(`🚌 Total vehicle queues: ${queues}`);
    
    // Check stations
    const stations = await prisma.station.count();
    console.log(`🏢 Total stations: ${stations}`);
    
    // Check routes
    const routes = await prisma.route.count();
    console.log(`🛣️ Total routes: ${routes}`);
    
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
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugSystem();