import { PrismaClient } from '@prisma/client';
import { env } from './environment';

// Initialize Prisma Client with connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
  log: ['error'],
  //log: env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Handle graceful shutdown
process.on('beforeExit', async () => {
  console.log('🔄 Disconnecting from database...');
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  console.log('🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  console.error('❌ Uncaught Exception:', error);
  await prisma.$disconnect();
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  await prisma.$disconnect();
  process.exit(1);
});

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

// Database health check
export const healthCheck = async (): Promise<{ status: string; timestamp: Date }> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: 'healthy',
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      timestamp: new Date(),
    };
  }
};

// Connection pool monitoring
export const getConnectionInfo = async (): Promise<{ activeConnections: number; idleConnections: number }> => {
  try {
    // This is a simplified version - in production you might want to use database-specific queries
    const result = await prisma.$queryRaw`SELECT count(*) as active_connections FROM pg_stat_activity WHERE state = 'active'` as any[];
    return {
      activeConnections: Number(result[0]?.active_connections || 0),
      idleConnections: 0, // This would need a more specific query for PostgreSQL
    };
  } catch (error) {
    console.error('Error getting connection info:', error);
    return { activeConnections: 0, idleConnections: 0 };
  }
};

export { prisma };
export default prisma; 