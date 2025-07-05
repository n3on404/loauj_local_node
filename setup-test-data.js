const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupTestData() {
  try {
    console.log('🚀 Setting up test data for booking system...');

    // Clean existing data
    console.log('🧹 Cleaning existing test data...');
    await prisma.booking.deleteMany({});
    await prisma.vehicleQueue.deleteMany({});
    await prisma.vehicleAuthorizedStation.deleteMany({});
    await prisma.vehicle.deleteMany({});
    await prisma.driver.deleteMany({});

    // Create test vehicles
    console.log('🚗 Creating test vehicles...');
    const vehicles = [
      {
        id: 'vehicle-001',
        licensePlate: 'TN-2024-001',
        capacity: 15,
        model: 'Toyota Hiace',
        year: 2024,
        color: 'White',
        isActive: true,
        isAvailable: true,
        syncedAt: new Date()
      },
      {
        id: 'vehicle-002',
        licensePlate: 'TN-2024-002',
        capacity: 12,
        model: 'Mercedes Sprinter',
        year: 2023,
        color: 'Blue',
        isActive: true,
        isAvailable: true,
        syncedAt: new Date()
      },
      {
        id: 'vehicle-003',
        licensePlate: 'TN-2024-003',
        capacity: 20,
        model: 'Iveco Daily',
        year: 2024,
        color: 'Silver',
        isActive: true,
        isAvailable: true,
        syncedAt: new Date()
      }
    ];

    for (const vehicle of vehicles) {
      await prisma.vehicle.create({ data: vehicle });
      console.log(`   ✅ Created vehicle: ${vehicle.licensePlate}`);
    }

    // Create test drivers
    console.log('👨‍💼 Creating test drivers...');
    const drivers = [
      {
        id: 'driver-001',
        cin: 'DRV001',
        firstName: 'Ahmed',
        lastName: 'Ben Salem',
        phoneNumber: '+216 20 111 111',
        licenseNumber: 'LIC001',
        vehicleId: 'vehicle-001',
        accountStatus: 'APPROVED',
        isActive: true,
        syncedAt: new Date()
      },
      {
        id: 'driver-002',
        cin: 'DRV002',
        firstName: 'Mohamed',
        lastName: 'Trabelsi',
        phoneNumber: '+216 20 222 222',
        licenseNumber: 'LIC002',
        vehicleId: 'vehicle-002',
        accountStatus: 'APPROVED',
        isActive: true,
        syncedAt: new Date()
      },
      {
        id: 'driver-003',
        cin: 'DRV003',
        firstName: 'Karim',
        lastName: 'Bouazizi',
        phoneNumber: '+216 20 333 333',
        licenseNumber: 'LIC003',
        vehicleId: 'vehicle-003',
        accountStatus: 'APPROVED',
        isActive: true,
        syncedAt: new Date()
      }
    ];

    for (const driver of drivers) {
      await prisma.driver.create({ data: driver });
      console.log(`   ✅ Created driver: ${driver.firstName} ${driver.lastName}`);
    }

    // Create authorized stations
    console.log('🏢 Creating authorized stations...');
    const authorizedStations = [
      { vehicleId: 'vehicle-001', stationId: 'station-tunis' },
      { vehicleId: 'vehicle-001', stationId: 'station-gafsa' },
      { vehicleId: 'vehicle-002', stationId: 'station-tunis' },
      { vehicleId: 'vehicle-002', stationId: 'station-sfax' },
      { vehicleId: 'vehicle-003', stationId: 'station-gafsa' },
      { vehicleId: 'vehicle-003', stationId: 'station-sfax' }
    ];

    for (const station of authorizedStations) {
      await prisma.vehicleAuthorizedStation.create({
        data: {
          id: `auth_${station.vehicleId}_${station.stationId}`,
          vehicleId: station.vehicleId,
          stationId: station.stationId,
          syncedAt: new Date()
        }
      });
      console.log(`   ✅ Authorized vehicle ${station.vehicleId} for ${station.stationId}`);
    }

    // Create queue entries
    console.log('📋 Creating queue entries...');
    const queueEntries = [
      {
        id: 'queue-001',
        vehicleId: 'vehicle-001',
        destinationId: 'station-tunis',
        destinationName: 'Tunis',
        queueType: 'REGULAR',
        queuePosition: 1,
        status: 'WAITING',
        availableSeats: 15,
        totalSeats: 15,
        basePrice: 25.5,
        estimatedDeparture: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        enteredAt: new Date(),
        syncedAt: new Date()
      },
      {
        id: 'queue-002',
        vehicleId: 'vehicle-002',
        destinationId: 'station-tunis',
        destinationName: 'Tunis',
        queueType: 'REGULAR',
        queuePosition: 2,
        status: 'WAITING',
        availableSeats: 12,
        totalSeats: 12,
        basePrice: 25.5,
        estimatedDeparture: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        enteredAt: new Date(),
        syncedAt: new Date()
      },
      {
        id: 'queue-003',
        vehicleId: 'vehicle-003',
        destinationId: 'station-gafsa',
        destinationName: 'Gafsa',
        queueType: 'REGULAR',
        queuePosition: 1,
        status: 'WAITING',
        availableSeats: 20,
        totalSeats: 20,
        basePrice: 35.0,
        estimatedDeparture: new Date(Date.now() + 1.5 * 60 * 60 * 1000), // 1.5 hours from now
        enteredAt: new Date(),
        syncedAt: new Date()
      },
      {
        id: 'queue-004',
        vehicleId: 'vehicle-002',
        destinationId: 'station-sfax',
        destinationName: 'Sfax',
        queueType: 'OVERNIGHT',
        queuePosition: 1,
        status: 'WAITING',
        availableSeats: 12,
        totalSeats: 12,
        basePrice: 30.0,
        estimatedDeparture: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now (morning)
        enteredAt: new Date(),
        syncedAt: new Date()
      }
    ];

    for (const entry of queueEntries) {
      await prisma.vehicleQueue.create({ data: entry });
      console.log(`   ✅ Added ${entry.destinationName} queue: ${entry.vehicleId} (${entry.queueType})`);
    }

    console.log('\n📊 Test data summary:');
    console.log(`   Vehicles: ${vehicles.length}`);
    console.log(`   Drivers: ${drivers.length}`);
    console.log(`   Queue entries: ${queueEntries.length}`);
    console.log(`   Destinations: Tunis (2 vehicles), Gafsa (1 vehicle), Sfax (1 overnight)`);

    console.log('\n✅ Test data setup completed successfully!');
    console.log('\nAvailable for booking:');
    console.log(`   • Tunis: 27 seats (15 + 12) at $25.5/seat`);
    console.log(`   • Gafsa: 20 seats at $35.0/seat`);
    console.log(`   • Sfax: 12 seats (overnight) at $30.0/seat`);

  } catch (error) {
    console.error('❌ Error setting up test data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup
if (require.main === module) {
  setupTestData();
}

module.exports = { setupTestData }; 