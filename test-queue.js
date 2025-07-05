const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/queue/enter',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const postData = JSON.stringify({
  licensePlate: 'TN-2024-002'
});

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end(); 