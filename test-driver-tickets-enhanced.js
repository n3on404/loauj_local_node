const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

// Test data
const testData = {
  licensePlate: 'TEST123',
  destinationId: 'tunis',
  destinationName: 'Tunis',
  staffId: 'test-staff-id'
};

async function testEnhancedDriverTickets() {
  try {
    console.log('🧪 Testing Enhanced Driver Tickets API...\n');

    // Test 1: Get vehicles in queue for entry tickets
    console.log('1. Testing Get Vehicles in Queue...');
    try {
      const queueResponse = await axios.get(`${BASE_URL}/driver-tickets/queue/vehicles`);
      
      if (queueResponse.data.success) {
        console.log('✅ Vehicles in queue retrieved successfully');
        console.log('   Total vehicles:', queueResponse.data.data.totalVehicles);
        console.log('   Destinations:', Object.keys(queueResponse.data.data.vehiclesByDestination || {}));
      } else {
        console.log('❌ Get vehicles in queue failed:', queueResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Get vehicles in queue error:', error.response?.data?.message || error.message);
    }

    // Test 2: Get vehicles for exit tickets
    console.log('\n2. Testing Get Vehicles for Exit...');
    try {
      const exitResponse = await axios.get(`${BASE_URL}/driver-tickets/exit/vehicles`);
      
      if (exitResponse.data.success) {
        console.log('✅ Vehicles for exit retrieved successfully');
        console.log('   Total vehicles:', exitResponse.data.data.totalVehicles);
        console.log('   Queue vehicles:', exitResponse.data.data.queueVehicles);
        console.log('   Trip vehicles:', exitResponse.data.data.tripVehicles);
      } else {
        console.log('❌ Get vehicles for exit failed:', exitResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Get vehicles for exit error:', error.response?.data?.message || error.message);
    }

    // Test 3: Search by CIN
    console.log('\n3. Testing Search by CIN...');
    try {
      const searchResponse = await axios.get(`${BASE_URL}/driver-tickets/search/cin/TEST123`);
      
      if (searchResponse.data.success) {
        console.log('✅ Search by CIN successful');
        console.log('   Driver:', searchResponse.data.data.driver?.firstName, searchResponse.data.data.driver?.lastName);
        console.log('   Vehicle:', searchResponse.data.data.vehicle?.licensePlate);
        console.log('   Has queue entry:', !!searchResponse.data.data.queueEntry);
        console.log('   Has recent trip:', !!searchResponse.data.data.recentTrip);
      } else {
        console.log('❌ Search by CIN failed:', searchResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Search by CIN error:', error.response?.data?.message || error.message);
    }

    // Test 4: Generate Entry Ticket
    console.log('\n4. Testing Entry Ticket Generation...');
    try {
      const entryResponse = await axios.post(`${BASE_URL}/driver-tickets/entry`, {
        ...testData,
        staffId: 'test-staff-id'
      });
      
      if (entryResponse.data.success) {
        console.log('✅ Entry ticket generated successfully');
        console.log('   Ticket Number:', entryResponse.data.data.ticket.ticketNumber);
        console.log('   Queue Position:', entryResponse.data.data.queuePosition);
        console.log('   Next Vehicle:', entryResponse.data.data.nextVehicle);
      } else {
        console.log('❌ Entry ticket generation failed:', entryResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Entry ticket generation error:', error.response?.data?.message || error.message);
    }

    // Test 5: Generate Exit Ticket
    console.log('\n5. Testing Exit Ticket Generation...');
    try {
      const exitResponse = await axios.post(`${BASE_URL}/driver-tickets/exit`, {
        ...testData,
        staffId: 'test-staff-id'
      });
      
      if (exitResponse.data.success) {
        console.log('✅ Exit ticket generated successfully');
        console.log('   Ticket Number:', exitResponse.data.data.ticket.ticketNumber);
        console.log('   Destination:', exitResponse.data.data.destination);
      } else {
        console.log('❌ Exit ticket generation failed:', exitResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Exit ticket generation error:', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 Enhanced Driver Tickets API test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testEnhancedDriverTickets(); 