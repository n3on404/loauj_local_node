const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function setupStationConfig() {
  try {
    console.log('Setting up station configuration...');
    
    // Create or update station configuration
    const stationConfig = await prisma.stationConfig.upsert({
      where: {
        stationId: 'local'
      },
      update: {
        stationName: 'Louaj Gafsa Station',
        governorate: 'Gafsa',
        delegation: 'Gafsa Ville',
        address: '123 Avenue Habib Bourguiba, Gafsa',
        openingTime: '06:00',
        closingTime: '22:00',
        isOperational: true,
        serverVersion: '1.0.0',
        isOnline: true
      },
      create: {
        stationId: 'local',
        stationName: 'Louaj Gafsa Station',
        governorate: 'Gafsa',
        delegation: 'Gafsa Ville',
        address: '123 Avenue Habib Bourguiba, Gafsa',
        openingTime: '06:00',
        closingTime: '22:00',
        isOperational: true,
        serverVersion: '1.0.0',
        isOnline: true
      }
    });

    console.log('✅ Station configuration created/updated:', stationConfig);
  } catch (error) {
    console.error('❌ Error setting up station config:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupStationConfig(); 