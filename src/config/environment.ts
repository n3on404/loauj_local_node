import { config } from 'dotenv';

// Load environment variables from .env file
config();

interface EnvironmentConfig {
  // Database
  DATABASE_URL: string;
  
  // Server Configuration
  PORT: number;
  NODE_ENV: string;
  
  // Station Configuration
  STATION_ID: string;
  STATION_NAME: string;
  GOVERNORATE: string;
  DELEGATION: string;
  
  // Central Server Connection
  CENTRAL_SERVER_URL: string;
  CENTRAL_SERVER_WS_URL: string;
  API_SECRET: string;
  
  // Authentication
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  SESSION_TIMEOUT_HOURS: number;
  
  // Sync Configuration
  SYNC_INTERVAL_SECONDS: number;
  MAX_RETRY_ATTEMPTS: number;
  BATCH_SYNC_SIZE: number;
  
  // Auto Trip Sync Configuration
  TRIP_SYNC_INTERVAL_MS: number;
  CONNECTION_CHECK_INTERVAL_MS: number;
  MAX_SYNC_RETRY_ATTEMPTS: number;
  SYNC_RETRY_DELAY_MS: number;
  
  // Logging
  LOG_LEVEL: string;
  LOG_TO_FILE: boolean;
  LOG_FILE_PATH: string;
  
  // Development
  DEBUG: boolean;
  ENABLE_CORS: boolean;
  ENABLE_REQUEST_LOGGING: boolean;
}

export const env: EnvironmentConfig = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL || 'file:./prisma/local.db',
  
  // Server Configuration
  PORT: parseInt(process.env.PORT || '3001', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Station Configuration
  STATION_ID: process.env.STATION_ID || 'monastir-main-station',
  STATION_NAME: process.env.STATION_NAME || 'Monastir Main Station',
  GOVERNORATE: process.env.GOVERNORATE || '',
  DELEGATION: process.env.DELEGATION || '',
  
  // Central Server Connection
  CENTRAL_SERVER_URL: process.env.CENTRAL_SERVER_URL || 'http://localhost:5000',
  CENTRAL_SERVER_WS_URL: process.env.CENTRAL_SERVER_WS_URL || 'ws://localhost:5000/ws',
  API_SECRET: process.env.API_SECRET || 'your-api-secret-key',
  
  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-key-for-local-sessions',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  SESSION_TIMEOUT_HOURS: parseInt(process.env.SESSION_TIMEOUT_HOURS || '8', 10),
  
  // Sync Configuration
  SYNC_INTERVAL_SECONDS: parseInt(process.env.SYNC_INTERVAL_SECONDS || '30', 10),
  MAX_RETRY_ATTEMPTS: parseInt(process.env.MAX_RETRY_ATTEMPTS || '3', 10),
  BATCH_SYNC_SIZE: parseInt(process.env.BATCH_SYNC_SIZE || '50', 10),
  
  // Auto Trip Sync Configuration
  TRIP_SYNC_INTERVAL_MS: parseInt(process.env.TRIP_SYNC_INTERVAL_MS || '30000', 10), // 30 seconds
  CONNECTION_CHECK_INTERVAL_MS: parseInt(process.env.CONNECTION_CHECK_INTERVAL_MS || '10000', 10), // 10 seconds
  MAX_SYNC_RETRY_ATTEMPTS: parseInt(process.env.MAX_SYNC_RETRY_ATTEMPTS || '3', 10),
  SYNC_RETRY_DELAY_MS: parseInt(process.env.SYNC_RETRY_DELAY_MS || '5000', 10), // 5 seconds
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_TO_FILE: process.env.LOG_TO_FILE === 'true',
  LOG_FILE_PATH: process.env.LOG_FILE_PATH || './logs/local-node.log',
  
  // Development
  DEBUG: process.env.DEBUG === 'true',
  ENABLE_CORS: process.env.ENABLE_CORS !== 'false',
  ENABLE_REQUEST_LOGGING: process.env.ENABLE_REQUEST_LOGGING !== 'false',
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(varName => !env[varName as keyof EnvironmentConfig]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

export default env; 