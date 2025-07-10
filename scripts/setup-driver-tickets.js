const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function setupDriverTickets() {
  try {
    console.log('🚀 Setting up driver tickets tables...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'create-driver-tickets-tables.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Split SQL into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.trim().substring(0, 50)}...`);
        await prisma.$executeRawUnsafe(statement);
      }
    }
    
    console.log('✅ Driver tickets tables created successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up driver tickets tables:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupDriverTickets(); 