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
import createWebSocketRouter from './routes/websocket';
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
import { AutoTripSyncService } from './services/autoTripSyncService';
import { createAutoTripSyncRouter } from './routes/autoTripSync';

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

// Initialize services
let syncService: SyncService;
let webSocketService: WebSocketService;
let autoTripSyncService: AutoTripSyncService;

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
    
    // Initialize auto trip sync service
    autoTripSyncService = new AutoTripSyncService(webSocketService);
    await autoTripSyncService.start();
    
    // Create and register WebSocket routes
    const websocketRoutes = createWebSocketRouter(webSocketService);
    app.use('/api/websocket', websocketRoutes);
    console.log('✅ WebSocket routes registered successfully');

    // Create and register auto trip sync routes
    const autoTripSyncRoutes = createAutoTripSyncRouter(autoTripSyncService);
    app.use('/api/auto-sync', autoTripSyncRoutes);
    console.log('✅ Auto trip sync routes registered successfully');

    // API routes - register after WebSocket is initialized
    app.use('/api/auth', authRoutes);
    app.use('/api/bookings', bookingRoutes);
    app.use('/api/vehicles', vehicleRoutes);
    app.use('/api/station', stationRoutes);
    app.use('/api/sync', syncRoutes);

    // Initialize queue routes
    const queueRoutes = createQueueRouter();
    app.use('/api/queue', queueRoutes);

    // Initialize overnight queue routes
    const overnightQueueRoutes = createOvernightQueueRouter();
    app.use('/api/overnight-queue', overnightQueueRoutes);

    // Initialize queue booking routes
    const queueBookingRoutes = createQueueBookingRouter();
    app.use('/api/queue-booking', queueBookingRoutes);

    // Initialize simplified cash booking routes
    const cashBookingRoutes = createCashBookingRouter();
    app.use('/api/cash-booking', cashBookingRoutes);

    // 404 handler - add after all routes
    app.use(notFound);

    // Error handling middleware - must be last
    app.use(errorHandler);

    // Start HTTP server
    const server = app.listen(env.PORT, () => {
      console.log(`
🚀 Louaj Local Node Server Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Server: http://localhost:${env.PORT}
🏥 Health: http://localhost:${env.PORT}/health
🔌 WebSocket: http://localhost:${env.PORT}/api/websocket/status
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
        
        if (autoTripSyncService) {
          await autoTripSyncService.stop();
          console.log('🔄 Auto trip sync service stopped');
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