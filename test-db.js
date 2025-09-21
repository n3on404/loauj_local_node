const { PrismaClient } = require('@prisma/client');

async function testDB() {
  const prisma = new PrismaClient();
  
  try {
    const configs = await prisma.stationConfig.findMany();
    console.log('All station configs:');
    configs.forEach(config => {
      console.log(`ID: ${config.id}, StationID: ${config.stationId}, Name: ${config.stationName}`);
    });
    
    const first = await prisma.stationConfig.findFirst();
    console.log('\nFirst config:');
    console.log(`ID: ${first?.id}, StationID: ${first?.stationId}, Name: ${first?.stationName}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();