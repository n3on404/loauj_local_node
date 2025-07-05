import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/environment';
import { testConnection } from './config/database';

// Import routes
import authRoutes from './routes/auth';
import createQueueRouter from './routes/queue';
import createOvernightQueueRouter from './routes/overnightQueue';
import createQueueBookingRouter from './routes/queueBooking';
import createCashBookingRouter from './routes/cashBooking';
import bookingRoutes from './routes/booking';
import vehicleRoutes from './routes/vehicle';
import stationRoutes from './routes/station';
import syncRoutes from './routes/sync';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';

// Import services
import { SyncService } from './services/syncService';
import { WebSocketService } from './websocket/webSocketService';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
if (env.ENABLE_CORS) {
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Desktop app ports
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
if (env.ENABLE_REQUEST_LOGGING) {
  app.use(morgan('combined'));
}

// Custom request logger
app.use(requestLogger);

// Health check endpoint
app.get('/health', async (req, res) => {
  const dbHealth = await import('./config/database').then(db => db.healthCheck());
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    database: dbHealth,
    environment: env.NODE_ENV,
    uptime: process.uptime(),
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/station', stationRoutes);
app.use('/api/sync', syncRoutes);

// Initialize queue routes (without WebSocket service initially)
const queueRoutes = createQueueRouter();
app.use('/api/queue', queueRoutes);

// Initialize overnight queue routes (without WebSocket service initially)
const overnightQueueRoutes = createOvernightQueueRouter();
app.use('/api/overnight-queue', overnightQueueRoutes);

// Initialize queue booking routes (without WebSocket service initially)
const queueBookingRoutes = createQueueBookingRouter();
app.use('/api/queue-booking', queueBookingRoutes);

// Initialize simplified cash booking routes (without WebSocket service initially)
const cashBookingRoutes = createCashBookingRouter();
app.use('/api/cash-booking', cashBookingRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Initialize services
let syncService: SyncService;
let webSocketService: WebSocketService;

const startServer = async () => {
  try {
    // Test database connection
    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      console.error('❌ Failed to connect to database');
      process.exit(1);
    }

    // Initialize sync service
    syncService = new SyncService();
    await syncService.initialize();

    // Initialize WebSocket service for central server communication
    webSocketService = new WebSocketService();
    await webSocketService.connect();

    // Update queue routes with WebSocket service for real-time updates
    // Note: Routes are already registered, this just updates the WebSocket reference

    // Start HTTP server
    const server = app.listen(env.PORT, () => {
      console.log(`
🚀 Louaj Local Node Server Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Server: http://localhost:${env.PORT}
🏥 Health: http://localhost:${env.PORT}/health
🗄️  Database: ${env.DATABASE_URL}
⚙️  Environment: ${env.NODE_ENV}
📍 Station: ${env.STATION_NAME || 'Not configured'}
🔗 Central Server: ${env.CENTRAL_SERVER_URL}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      
      server.close(async () => {
        console.log('📡 HTTP server closed');
        
        // Stop services
        if (syncService) {
          await syncService.stop();
          console.log('🔄 Sync service stopped');
        }
        
        if (webSocketService) {
          webSocketService.disconnect();
          console.log('🔌 WebSocket connection closed');
        }
        
        // Close database connection
        await import('./config/database').then(db => db.prisma.$disconnect());
        console.log('🗄️  Database connection closed');
        
        console.log('✅ Graceful shutdown complete');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 