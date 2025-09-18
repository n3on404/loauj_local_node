const { PrismaClient } = require('@prisma/client');

async function testDriversWithoutDayPass() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testing drivers without day pass query...');
    
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
    
    console.log('📅 Today:', today);
    console.log('📅 Start of day:', startOfDay);
    console.log('📅 End of day:', endOfDay);

    // Get all active drivers
    const drivers = await prisma.driver.findMany({
      where: {
        isActive: true,
        accountStatus: 'APPROVED'
      },
      include: {
        vehicle: {
          select: {
            id: true,
            licensePlate: true,
            capacity: true
          }
        }
      }
    });

    console.log('👥 Total active drivers:', drivers.length);
    drivers.forEach((driver, index) => {
      console.log(`  ${index + 1}. ${driver.firstName} ${driver.lastName} (${driver.cin}) - Vehicle: ${driver.vehicle?.licensePlate || 'None'}`);
    });

    // Get drivers who have valid day passes today
    const driversWithDayPass = await prisma.dayPass.findMany({
      where: {
        purchaseDate: {
          gte: startOfDay,
          lt: endOfDay
        },
        isActive: true,
        isExpired: false
      },
      select: {
        driverId: true
      }
    });

    console.log('🎫 Drivers with day passes today:', driversWithDayPass.length);
    driversWithDayPass.forEach((dp, index) => {
      console.log(`  ${index + 1}. Driver ID: ${dp.driverId}`);
    });

    const driversWithDayPassIds = new Set(driversWithDayPass.map(dp => dp.driverId));

    // Filter out drivers who have valid day passes
    const driversWithoutDayPass = drivers.filter(driver => 
      !driversWithDayPassIds.has(driver.id)
    );

    console.log('❌ Drivers WITHOUT day passes:', driversWithoutDayPass.length);
    driversWithoutDayPass.forEach((driver, index) => {
      console.log(`  ${index + 1}. ${driver.firstName} ${driver.lastName} (${driver.cin}) - Vehicle: ${driver.vehicle?.licensePlate || 'None'}`);
    });

    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDriversWithoutDayPass();