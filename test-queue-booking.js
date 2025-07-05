const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

// Test user credentials
const testStaff = {
  cin: '12345678',
  password: 'password123'
};

async function login() {
  try {
    console.log('🔐 Logging in as staff...');
    const response = await axios.post(`${BASE_URL}/api/auth/login`, testStaff);
    
    if (response.data.success) {
      console.log('✅ Login successful');
      console.log(`   Token: ${response.data.data.token.substring(0, 20)}...`);
      console.log(`   Staff: ${response.data.data.staff.firstName} ${response.data.data.staff.lastName}`);
      console.log(`   Role: ${response.data.data.staff.role}`);
      return response.data.data.token;
    } else {
      throw new Error(response.data.error || 'Login failed');
    }
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.error || error.message);
    throw error;
  }
}

async function getAvailableDestinations(token) {
  try {
    console.log('\n📊 Getting available destinations...');
    const response = await axios.get(`${BASE_URL}/api/queue-booking/destinations`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      console.log('✅ Available destinations:');
      response.data.data.forEach(dest => {
        console.log(`   • ${dest.destinationName} (ID: ${dest.destinationId})`);
        console.log(`     Available seats: ${dest.totalAvailableSeats}`);
        console.log(`     Vehicles: ${dest.vehicleCount}`);
      });
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to get destinations');
    }
  } catch (error) {
    console.error('❌ Failed to get destinations:', error.response?.data?.error || error.message);
    throw error;
  }
}

async function getAvailableSeats(token, destinationId) {
  try {
    console.log(`\n🚗 Getting available seats for destination ${destinationId}...`);
    const response = await axios.get(`${BASE_URL}/api/queue-booking/destinations/${destinationId}/seats`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      const data = response.data.data;
      console.log('✅ Available seats details:');
      console.log(`   Destination: ${data.destinationName}`);
      console.log(`   Total available seats: ${data.totalAvailableSeats}`);
      console.log(`   Vehicles in queue:`);
      
      data.vehicles.forEach((vehicle, index) => {
        console.log(`   ${index + 1}. ${vehicle.licensePlate} (Position ${vehicle.queuePosition})`);
        console.log(`      Available: ${vehicle.availableSeats}/${vehicle.totalSeats} seats`);
        console.log(`      Price: $${vehicle.basePrice}/seat`);
        console.log(`      Status: ${vehicle.status}`);
        if (vehicle.estimatedDeparture) {
          console.log(`      Departure: ${new Date(vehicle.estimatedDeparture).toLocaleString()}`);
        }
      });
      
      return data;
    } else {
      throw new Error(response.data.error || 'Failed to get seats');
    }
  } catch (error) {
    console.error('❌ Failed to get available seats:', error.response?.data?.error || error.message);
    throw error;
  }
}

async function createBooking(token, destinationId, seatsRequested, customerName, customerPhone) {
  try {
    console.log(`\n🎫 Creating booking for ${seatsRequested} seat(s)...`);
    const response = await axios.post(`${BASE_URL}/api/queue-booking/book`, {
      destinationId,
      seatsRequested,
      customerName,
      customerPhone,
      paymentMethod: 'CASH'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      console.log('✅ Booking created successfully!');
      const data = response.data.data;
      
      console.log(`   Customer: ${data.summary.customer}`);
      console.log(`   Total seats: ${data.summary.totalSeats}`);
      console.log(`   Total amount: $${data.summary.totalAmount}`);
      console.log(`   Vehicles used: ${data.summary.vehicleCount}`);
      console.log(`   Verification codes: ${data.verificationCodes.join(', ')}`);
      
      console.log('\n📋 Booking details:');
      data.bookings.forEach((booking, index) => {
        console.log(`   Booking ${index + 1}:`);
        console.log(`     ID: ${booking.id}`);
        console.log(`     Vehicle: ${booking.vehicleLicensePlate}`);
        console.log(`     Destination: ${booking.destinationName}`);
        console.log(`     Seats: ${booking.seatsBooked}`);
        console.log(`     Amount: $${booking.totalAmount}`);
        console.log(`     Verification: ${booking.verificationCode}`);
        console.log(`     Queue position: ${booking.queuePosition}`);
      });
      
      return data;
    } else {
      throw new Error(response.data.error || 'Booking failed');
    }
  } catch (error) {
    console.error('❌ Booking failed:', error.response?.data?.error || error.message);
    throw error;
  }
}

async function verifyTicket(token, verificationCode) {
  try {
    console.log(`\n🔍 Verifying ticket with code: ${verificationCode}...`);
    const response = await axios.post(`${BASE_URL}/api/queue-booking/verify`, {
      verificationCode
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      console.log('✅ Ticket verified successfully!');
      const booking = response.data.data;
      console.log(`   Customer: ${booking.customerName}`);
      console.log(`   Vehicle: ${booking.vehicleLicensePlate}`);
      console.log(`   Destination: ${booking.destinationName}`);
      console.log(`   Seats: ${booking.seatsBooked}`);
      console.log(`   Amount: $${booking.totalAmount}`);
      return booking;
    } else {
      throw new Error(response.data.error || 'Verification failed');
    }
  } catch (error) {
    console.error('❌ Ticket verification failed:', error.response?.data?.error || error.message);
    throw error;
  }
}

async function getBookingStats(token) {
  try {
    console.log('\n📊 Getting booking statistics...');
    const response = await axios.get(`${BASE_URL}/api/queue-booking/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      console.log('✅ Today\'s booking statistics:');
      const stats = response.data.data.today;
      console.log(`   Total bookings: ${stats.totalBookings}`);
      console.log(`   Total seats booked: ${stats.totalSeats}`);
      console.log(`   Total revenue: $${stats.totalRevenue}`);
      console.log(`   Pending verifications: ${stats.pendingVerifications}`);
      return stats;
    } else {
      throw new Error(response.data.error || 'Failed to get stats');
    }
  } catch (error) {
    console.error('❌ Failed to get booking stats:', error.response?.data?.error || error.message);
    throw error;
  }
}

async function testBookingSystem() {
  try {
    console.log('🚀 Starting Queue Booking System Test\n');
    console.log('=' .repeat(50));

    // 1. Login
    const token = await login();

    // 2. Get available destinations
    const destinations = await getAvailableDestinations(token);
    
    if (destinations.length === 0) {
      console.log('\n⚠️ No destinations available. Please add vehicles to queue first.');
      return;
    }

    // 3. Get detailed seat information for first destination
    const firstDestination = destinations[0];
    const seatsInfo = await getAvailableSeats(token, firstDestination.destinationId);

    if (seatsInfo.totalAvailableSeats === 0) {
      console.log('\n⚠️ No seats available for booking.');
      return;
    }

    // 4. Test different booking scenarios
    console.log('\n' + '=' .repeat(50));
    console.log('🧪 Testing Booking Scenarios');
    console.log('=' .repeat(50));

    // Scenario 1: Book 1 seat
    console.log('\n📝 Scenario 1: Single seat booking');
    const booking1 = await createBooking(
      token,
      firstDestination.destinationId,
      1,
      'Ahmed Ben Ali',
      '+216 20 123 456'
    );

    // Scenario 2: Book multiple seats (if available)
    if (seatsInfo.totalAvailableSeats >= 3) {
      console.log('\n📝 Scenario 2: Multiple seats booking');
      const booking2 = await createBooking(
        token,
        firstDestination.destinationId,
        3,
        'Fatma Trabelsi',
        '+216 25 987 654'
      );

      // 5. Verify one of the tickets
      if (booking2.verificationCodes.length > 0) {
        await verifyTicket(token, booking2.verificationCodes[0]);
      }
    }

    // Scenario 3: Try to book more seats than available
    console.log('\n📝 Scenario 3: Overbook test (should fail)');
    try {
      await createBooking(
        token,
        firstDestination.destinationId,
        100, // Intentionally too many
        'Test Customer',
        '+216 11 111 111'
      );
    } catch (error) {
      console.log('✅ Overbooking correctly prevented');
    }

    // 6. Get updated statistics
    await getBookingStats(token);

    // 7. Check updated seat availability
    console.log('\n📊 Updated seat availability:');
    await getAvailableSeats(token, firstDestination.destinationId);

    console.log('\n' + '=' .repeat(50));
    console.log('✅ Queue Booking System Test Completed Successfully!');
    console.log('=' .repeat(50));

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testBookingSystem();
}

module.exports = {
  login,
  getAvailableDestinations,
  getAvailableSeats,
  createBooking,
  verifyTicket,
  getBookingStats
}; 