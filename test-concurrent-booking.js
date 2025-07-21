const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklkIjoiY21jazJmenQyMDAxNWlpNzRjNDkxOWc1dyIsImNpbiI6IjEyMzQ1Njc4Iiwicm9sZSI6IlNVUEVSVklTT1IiLCJzdGF0aW9uSWQiOiJtb25hc3Rpci1tYWluLXN0YXRpb24iLCJpYXQiOjE3NTE0MzExNDAsImV4cCI6MTc1NDAyMzE0MH0.RjJnn5mZbBKOLUubvDXhfH7NSNfZh160avXq92TfAFQ';

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

async function makeRequest(method, url, data = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers,
      data
    };
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
}

async function testConcurrentBooking() {
  console.log('🚀 Starting Concurrent Booking Test\n');
  
  // Step 1: Check current destinations
  console.log('1️⃣ Checking available destinations...');
  const destinations = await makeRequest('GET', '/queue/destinations');
  console.log('Current destinations:', JSON.stringify(destinations, null, 2));
  
  // Step 2: Add a test vehicle if no destinations exist
  if (!destinations.success || !destinations.data || destinations.data.length === 0) {
    console.log('\n2️⃣ No destinations found, adding a test vehicle...');
    const vehicleData = {
      licensePlate: 'TEST-001',
      destinationId: 'tunis-central-station',
      destinationName: 'Tunis Central',
      availableSeats: 1, // Only 1 seat to test race condition
      totalSeats: 8,
      basePrice: 15.5
    };
    
    const addVehicle = await makeRequest('POST', '/queue/enter', vehicleData);
    console.log('Add vehicle result:', JSON.stringify(addVehicle, null, 2));
    
    if (!addVehicle.success) {
      console.log('❌ Failed to add vehicle, cannot proceed with test');
      return;
    }
  }
  
  // Step 3: Get updated destinations
  console.log('\n3️⃣ Getting updated destinations...');
  const updatedDestinations = await makeRequest('GET', '/queue/destinations');
  console.log('Updated destinations:', JSON.stringify(updatedDestinations, null, 2));
  
  if (!updatedDestinations.success || !updatedDestinations.data || updatedDestinations.data.length === 0) {
    console.log('❌ Still no destinations available, cannot test');
    return;
  }
  
  const destinationId = updatedDestinations.data[0].destinationId;
  
  // Step 4: Get available seats for the destination
  console.log(`\n4️⃣ Getting available seats for destination: ${destinationId}...`);
  const availableSeats = await makeRequest('GET', `/queue/seats/${destinationId}`);
  console.log('Available seats:', JSON.stringify(availableSeats, null, 2));
  
  if (!availableSeats.success || !availableSeats.data || availableSeats.data.totalAvailableSeats === 0) {
    console.log('❌ No seats available, cannot test');
    return;
  }
  
  // Step 5: Test concurrent booking (simulate 2 staff members)
  console.log('\n5️⃣ Testing concurrent booking scenario...');
  console.log(`Available seats: ${availableSeats.data.totalAvailableSeats}`);
  console.log('Simulating 2 staff members trying to book the last seat simultaneously...\n');
  
  const bookingData = {
    destinationId: destinationId,
    seatsRequested: 1,
    staffId: 'cmck2fzt20015ii74c4919g5w' // From the token
  };
  
  // Simulate concurrent requests
  const booking1Promise = makeRequest('POST', '/queue/book', bookingData);
  const booking2Promise = makeRequest('POST', '/queue/book', bookingData);
  
  const [booking1, booking2] = await Promise.all([booking1Promise, booking2Promise]);
  
  console.log('📊 CONCURRENT BOOKING RESULTS:');
  console.log('=====================================');
  console.log('Booking 1 (Staff Member A):');
  console.log(JSON.stringify(booking1, null, 2));
  console.log('\nBooking 2 (Staff Member B):');
  console.log(JSON.stringify(booking2, null, 2));
  
  // Step 6: Verify results
  console.log('\n6️⃣ Analyzing results...');
  const successCount = [booking1, booking2].filter(b => b.success).length;
  const failureCount = [booking1, booking2].filter(b => !b.success).length;
  
  console.log(`✅ Successful bookings: ${successCount}`);
  console.log(`❌ Failed bookings: ${failureCount}`);
  
  if (successCount === 1 && failureCount === 1) {
    console.log('🎉 SUCCESS: Race condition properly handled!');
    console.log('✅ Only one booking succeeded (as expected)');
    console.log('✅ One booking failed with conflict message (as expected)');
    
    // Check the error message
    const failedBooking = [booking1, booking2].find(b => !b.success);
    if (failedBooking && failedBooking.error?.includes('conflict')) {
      console.log('✅ Proper conflict error message received');
    }
  } else if (successCount === 2) {
    console.log('❌ FAILURE: Race condition NOT handled!');
    console.log('❌ Both bookings succeeded (overbooking occurred)');
  } else if (successCount === 0) {
    console.log('⚠️ UNEXPECTED: Both bookings failed');
  }
  
  // Step 7: Check final state
  console.log('\n7️⃣ Checking final state...');
  const finalDestinations = await makeRequest('GET', '/queue/destinations');
  console.log('Final destinations:', JSON.stringify(finalDestinations, null, 2));
  
  const finalSeats = await makeRequest('GET', `/queue/seats/${destinationId}`);
  console.log('Final available seats:', JSON.stringify(finalSeats, null, 2));
}

// Run the test
testConcurrentBooking().catch(console.error); 