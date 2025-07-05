const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';
let authToken = '';

async function login() {
  try {
    console.log('🔐 Logging in...');
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'supervisor1',
      password: 'password123'
    });
    
    authToken = response.data.token;
    console.log('✅ Login successful');
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    return false;
  }
}

async function getAvailableDestinations() {
  try {
    console.log('\n📍 Getting available destinations...');
    const response = await axios.get(`${BASE_URL}/cash-booking/destinations`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Available destinations:');
    response.data.data.forEach(dest => {
      console.log(`   📍 ${dest.destinationName} (${dest.destinationId}): ${dest.totalAvailableSeats} seats across ${dest.vehicleCount} vehicles`);
    });
    
    return response.data.data;
  } catch (error) {
    console.error('❌ Failed to get destinations:', error.response?.data || error.message);
    return [];
  }
}

async function getAvailableSeats(destinationId) {
  try {
    console.log(`\n🪑 Getting available seats for destination: ${destinationId}`);
    const response = await axios.get(`${BASE_URL}/cash-booking/destinations/${destinationId}/seats`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const data = response.data.data;
    console.log(`✅ Destination: ${data.destinationName}`);
    console.log(`   Total available seats: ${data.totalAvailableSeats}`);
    console.log('   Vehicles:');
    
    data.vehicles.forEach(vehicle => {
      console.log(`     🚐 ${vehicle.licensePlate} (Position ${vehicle.queuePosition}): ${vehicle.availableSeats}/${vehicle.totalSeats} seats, $${vehicle.basePrice}/seat`);
    });
    
    return data;
  } catch (error) {
    console.error('❌ Failed to get seats:', error.response?.data || error.message);
    return null;
  }
}

async function createCashBooking(destinationId, seatsRequested) {
  try {
    console.log(`\n💳 Creating cash booking: ${seatsRequested} seats to ${destinationId}`);
    const response = await axios.post(`${BASE_URL}/cash-booking/book`, {
      destinationId,
      seatsRequested
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const data = response.data.data;
    console.log('✅ Cash booking created successfully!');
    console.log(`   Total amount: $${data.totalAmount}`);
    console.log(`   Vehicles booked: ${data.vehicleCount}`);
    console.log('   Booking Details:');
    
    data.bookings.forEach((booking, index) => {
      console.log(`     🎫 Ticket ${index + 1}:`);
      console.log(`        Ticket ID: ${booking.ticketId}`);
      console.log(`        Vehicle: ${booking.vehicleLicensePlate}`);
      console.log(`        Route: ${booking.startStationName} → ${booking.destinationName}`);
      console.log(`        Seats: ${booking.seatsBooked} @ $${booking.pricePerSeat}/seat`);
      console.log(`        Amount: $${booking.totalAmount}`);
      console.log(`        Booking Time: ${new Date(booking.bookingTime).toLocaleString()}`);
      console.log(`        Queue Position: ${booking.queuePosition}`);
      if (booking.routeId) {
        console.log(`        Route ID: ${booking.routeId}`);
      }
      if (booking.estimatedDeparture) {
        console.log(`        Estimated Departure: ${new Date(booking.estimatedDeparture).toLocaleString()}`);
      }
    });
    
    return data;
  } catch (error) {
    console.error('❌ Failed to create booking:', error.response?.data || error.message);
    return null;
  }
}

async function verifyCashTicket(ticketId) {
  try {
    console.log(`\n🎫 Verifying cash ticket: ${ticketId}`);
    const response = await axios.post(`${BASE_URL}/cash-booking/verify`, {
      ticketId
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const booking = response.data.data;
    console.log('✅ Cash ticket verified successfully!');
    console.log('   Ticket Details:');
    console.log(`     Ticket ID: ${booking.ticketId}`);
    console.log(`     Vehicle: ${booking.vehicleLicensePlate}`);
    console.log(`     Route: ${booking.startStationName} → ${booking.destinationName}`);
    console.log(`     Seats: ${booking.seatsBooked} @ $${booking.pricePerSeat}/seat`);
    console.log(`     Total Amount: $${booking.totalAmount}`);
    console.log(`     Booking Time: ${new Date(booking.bookingTime).toLocaleString()}`);
    console.log(`     Queue Position: ${booking.queuePosition}`);
    if (booking.routeId) {
      console.log(`     Route ID: ${booking.routeId}`);
    }
    if (booking.estimatedDeparture) {
      console.log(`     Estimated Departure: ${new Date(booking.estimatedDeparture).toLocaleString()}`);
    }
    
    return booking;
  } catch (error) {
    console.error('❌ Failed to verify ticket:', error.response?.data || error.message);
    return null;
  }
}

async function getCashBookingStats() {
  try {
    console.log('\n📊 Getting cash booking statistics...');
    const response = await axios.get(`${BASE_URL}/cash-booking/stats`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const stats = response.data.data.today;
    console.log('✅ Today\'s cash booking statistics:');
    console.log(`   Total bookings: ${stats.totalCashBookings}`);
    console.log(`   Total seats: ${stats.totalSeats}`);
    console.log(`   Total revenue: $${stats.totalCashRevenue}`);
    console.log(`   Pending verifications: ${stats.pendingVerifications}`);
    
    return stats;
  } catch (error) {
    console.error('❌ Failed to get stats:', error.response?.data || error.message);
    return null;
  }
}

async function testCashBookingSystem() {
  console.log('🧪 Testing Simplified Cash Booking System');
  console.log('=' .repeat(50));
  
  // 1. Login
  const loginSuccess = await login();
  if (!loginSuccess) return;
  
  // 2. Get available destinations
  const destinations = await getAvailableDestinations();
  if (destinations.length === 0) {
    console.log('❌ No destinations available for testing');
    return;
  }
  
  // 3. Get detailed seat information for first destination
  const firstDestination = destinations[0];
  const seatInfo = await getAvailableSeats(firstDestination.destinationId);
  if (!seatInfo) return;
  
  // 4. Create a cash booking for 3 seats
  const seatsToBook = Math.min(3, seatInfo.totalAvailableSeats);
  const booking = await createCashBooking(firstDestination.destinationId, seatsToBook);
  if (!booking) return;
  
  // 5. Verify the first ticket
  const firstTicketId = booking.ticketIds[0];
  await verifyCashTicket(firstTicketId);
  
  // 6. Get statistics
  await getCashBookingStats();
  
  console.log('\n🎉 Cash booking system test completed successfully!');
}

// Run the test
testCashBookingSystem().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
}); 