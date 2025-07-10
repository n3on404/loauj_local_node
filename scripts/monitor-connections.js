const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function monitorConnections() {
  try {
    console.log('🔍 Monitoring database connections...');
    
    // Get active connections
    const result = await prisma.$queryRaw`SELECT 
      count(*) as active_connections,
      count(*) FILTER (WHERE state = 'idle') as idle_connections,
      count(*) FILTER (WHERE state = 'active') as active_connections_only
    FROM pg_stat_activity 
    WHERE datname = current_database()`;
    
    console.log('📊 Connection Statistics:');
    console.log(`   Total Connections: ${result[0].active_connections}`);
    console.log(`   Idle Connections: ${result[0].idle_connections}`);
    console.log(`   Active Connections: ${result[0].active_connections_only}`);
    
    // Get connection details
    const connections = await prisma.$queryRaw`SELECT 
      pid,
      usename,
      application_name,
      client_addr,
      state,
      query_start,
      state_change
    FROM pg_stat_activity 
    WHERE datname = current_database()
    ORDER BY state_change DESC`;
    
    console.log('\n🔗 Active Connection Details:');
    connections.forEach((conn, index) => {
      console.log(`   ${index + 1}. PID: ${conn.pid}, User: ${conn.usename}, State: ${conn.state}, App: ${conn.application_name}`);
    });
    
  } catch (error) {
    console.error('❌ Error monitoring connections:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function killIdleConnections() {
  try {
    console.log('🗑️ Killing idle connections...');
    
    const result = await prisma.$queryRaw`SELECT 
      pid,
      usename,
      application_name,
      state
    FROM pg_stat_activity 
    WHERE datname = current_database() 
    AND state = 'idle' 
    AND pid <> pg_backend_pid()`;
    
    console.log(`Found ${result.length} idle connections to terminate`);
    
    for (const conn of result) {
      try {
        await prisma.$executeRaw`SELECT pg_terminate_backend(${conn.pid})`;
        console.log(`   ✅ Terminated connection PID: ${conn.pid}`);
      } catch (error) {
        console.log(`   ❌ Failed to terminate PID: ${conn.pid}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error killing idle connections:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'monitor':
    monitorConnections();
    break;
  case 'kill-idle':
    killIdleConnections();
    break;
  default:
    console.log('Usage:');
    console.log('  node scripts/monitor-connections.js monitor    - Monitor connections');
    console.log('  node scripts/monitor-connections.js kill-idle   - Kill idle connections');
    break;
} 