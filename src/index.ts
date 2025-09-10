import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/environment';
import { getConnectionInfo, testConnection } from './config/database';
import { configService } from './config/supervisorConfig';

// Import routes
import authRoutes from './routes/auth';
import createQueueRouter from './routes/queue';
import createOvernightQueueRouter from './routes/overnightQueue';
import createQueueBookingRouter from './routes/queueBooking';
import createCashBookingRouter from './routes/cashBooking';
import createWebSocketRouter from './routes/websocket';
import bookingRoutes from './routes/booking';
import localBookingRoutes from './routes/localBooking';
import vehicleRoutes from './routes/vehicle';
import stationRoutes from './routes/station';
import syncRoutes from './routes/sync';
import createDashboardRouter from './routes/dashboard';
import staffRoutes from './routes/staff';
import dashboardRouter from './routes/dashboard';
import routeRoutes from './routes/route';
import driverTicketsRoutes from './routes/driverTickets';
import publicRoutes from './routes/public';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';

// Import services
import { SyncService } from './services/syncService';
import { WebSocketService } from './websocket/webSocketService';
import { AutoTripSyncService } from './services/autoTripSyncService';
import { EnhancedMQTTService } from './services/enhancedMqttService';
import { mqttConfig, validateMqttConfig } from './config/mqttConfig';
import { createAutoTripSyncRouter } from './routes/autoTripSync';
import { setEnhancedMqttService } from './services/simpleCashBookingService';

import * as dashboardController from './controllers/dashboardController';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
if (env.ENABLE_CORS) {
  app.use(cors({
    credentials: true,
    origin: true, // Allow all origins for Tauri app compatibility
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
let enhancedMqttService: EnhancedMQTTService;

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
    connectionInfo: await getConnectionInfo(),
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
    app.use('/api/bookings', localBookingRoutes);
    app.use('/api/vehicles', vehicleRoutes);
    app.use('/api/station', stationRoutes);
    app.use('/api/sync', syncRoutes);
    app.use('/api/staff', staffRoutes);
    app.use('/api/routes', routeRoutes);
    app.use('/api/driver-tickets', driverTicketsRoutes);
    app.use('/api/public', publicRoutes);
    // Initialize queue routes with WebSocket service
    const queueRoutes = createQueueRouter(webSocketService);
    app.use('/api/queue', queueRoutes);

    // Initialize overnight queue routes with WebSocket service
    const overnightQueueRoutes = createOvernightQueueRouter(webSocketService);
    app.use('/api/overnight-queue', overnightQueueRoutes);

    // Initialize queue booking routes with WebSocket service
    const queueBookingRoutes = createQueueBookingRouter(webSocketService);
    app.use('/api/queue-booking', queueBookingRoutes);

    // Initialize simplified cash booking routes with WebSocket service
    const cashBookingRoutes = createCashBookingRouter(webSocketService);
    app.use('/api/cash-booking', cashBookingRoutes);

    // Initialize dashboard routes
    const dashboardRoutes = createDashboardRouter();
    app.use('/api/dashboard', dashboardRoutes);

    // 404 handler - add after all routes
    app.use(notFound);

    // Error handling middleware - must be last
    app.use(errorHandler);

    // Start HTTP server - listen on all interfaces for public access
    const server = app.listen(env.PORT, '0.0.0.0', () => {
      console.log(`
🚀 Louaj Local Node Server Started (MQTT-Enhanced)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Server: http://localhost:${env.PORT}
🌐 Public: http://0.0.0.0:${env.PORT}
🏥 Health: http://localhost:${env.PORT}/health
� MQTT: ${mqttConfig.brokerUrl} (Enhanced Service)
🗄️  Database: ${env.DATABASE_URL}
⚙️  Environment: ${env.NODE_ENV}
📍 Station: ${configService.getStationName()}
🔗 Central Server: ${env.CENTRAL_SERVER_URL}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    });

    // Initialize Enhanced MQTT Service for desktop app communication (replacing WebSocket)
    if (validateMqttConfig()) {
      const { createQueueService } = await import('./services/queueService');
      const queueService = createQueueService(webSocketService);
      
      enhancedMqttService = new EnhancedMQTTService(mqttConfig, queueService);
      await enhancedMqttService.connect();
      
      // Set the MQTT service for cash booking service
      setEnhancedMqttService(enhancedMqttService);
      
      // Set up MQTT event listeners
      enhancedMqttService.on('plateDetected', (data: any) => {
        console.log('🚗 Plate detected via MQTT:', data.detection.licensePlate);
      });
      
      enhancedMqttService.on('connected', () => {
        console.log('✅ Enhanced MQTT Service connected and ready');
        // Publish initial station status
        enhancedMqttService.publishStationStatus();
      });
      
      enhancedMqttService.on('error', (error: any) => {
        console.error('❌ Enhanced MQTT Service error:', error);
      });
      
      enhancedMqttService.on('client_authenticated', (data: any) => {
        console.log('👤 Client authenticated via MQTT:', data.clientId);
      });
      
      enhancedMqttService.on('client_connected', (data: any) => {
        console.log('🔌 Client connected via MQTT:', data.clientId);
      });
      
      console.log('✅ Enhanced MQTT Service initialized successfully (replacing WebSocket)');
    } else {
      console.warn('⚠️ MQTT configuration invalid, cannot initialize Enhanced MQTT Service');
    }

    // Set up periodic dashboard data updates (every 5 seconds) - now broadcasts via MQTT
    const dashboardUpdateInterval = setInterval(async () => {
      try {
        // Import dashboard controller dynamically
        const dashboardModule = await import('./controllers/dashboardController');
        const dashboardData = await dashboardModule.getAllDashboardData();
        
        // Broadcast dashboard updates via MQTT instead of WebSocket
        if (enhancedMqttService && dashboardData) {
          enhancedMqttService.notifyDashboardUpdate(dashboardData);
        }
      } catch (error) {
        console.error('❌ Error updating dashboard data:', error);
      }
    }, 5000);

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      
      // Clear dashboard update interval
      clearInterval(dashboardUpdateInterval);
      
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

        if (enhancedMqttService) {
          await enhancedMqttService.disconnect();
          console.log('📡 Enhanced MQTT Service disconnected');
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