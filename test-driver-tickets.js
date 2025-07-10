const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

// Test data
const testData = {
  licensePlate: 'TEST123',
  destinationId: 'tunis',
  destinationName: 'Tunis',
  staffId: 'test-staff-id'
};

async function testDriverTickets() {
  try {
    console.log('🧪 Testing Driver Tickets API...\n');

    // Test 1: Generate Entry Ticket
    console.log('1. Testing Entry Ticket Generation...');
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

    console.log('\n2. Testing Exit Ticket Generation...');
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

    console.log('\n3. Testing Get Driver Tickets...');
    try {
      const ticketsResponse = await axios.get(`${BASE_URL}/driver-tickets/vehicle/${testData.licensePlate}`);
      
      if (ticketsResponse.data.success) {
        console.log('✅ Driver tickets retrieved successfully');
        console.log('   Entry Tickets:', ticketsResponse.data.data.totalEntryTickets);
        console.log('   Exit Tickets:', ticketsResponse.data.data.totalExitTickets);
      } else {
        console.log('❌ Get driver tickets failed:', ticketsResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Get driver tickets error:', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 Driver Tickets API test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testDriverTickets(); 