import { Server as WebSocketServer, WebSocket } from 'ws';
import { Server as HTTPServer } from 'http';
import { EventEmitter } from 'events';
import { prisma } from '../config/database';
import * as dashboardController from '../controllers/dashboardController';
import { WebSocketService } from './webSocketService';
import { ConnectionManager, ClientConnection } from './connectionManager';
import { ConcurrencyManager } from '../services/concurrencyManager';
import { RealTimeSyncService } from '../services/realTimeSyncService';

interface WebSocketMessage {
  type: string;
  payload?: any;
  timestamp: number;
  messageId?: string;
  priority?: number;
  clientId?: string;
}

interface ServerMetrics {
  totalConnections: number;
  authenticatedConnections: number;
  messagesSent: number;
  messagesReceived: number;
  averageLatency: number;
  uptime: number;
  connectionPools: any;
  concurrencyMetrics: any;
  syncMetrics: any;
}

export class EnhancedLocalWebSocketServer extends EventEmitter {
  private wss: WebSocketServer;
  private connectionManager: ConnectionManager;
  private concurrencyManager: ConcurrencyManager;
  private realTimeSyncService: RealTimeSyncService;
  private webSocketService: WebSocketService;
  
  // Static instance for global access
  private static instance: EnhancedLocalWebSocketServer | null = null;

  // Server metrics
  private metrics: ServerMetrics = {
    totalConnections: 0,
    authenticatedConnections: 0,
    messagesSent: 0,
    messagesReceived: 0,
    averageLatency: 0,
    uptime: Date.now(),
    connectionPools: {},
    concurrencyMetrics: {},
    syncMetrics: {}
  };

  constructor(server: HTTPServer, webSocketService: WebSocketService) {
    super();
    
    this.webSocketService = webSocketService;
    
    // Initialize managers
    this.concurrencyManager = new ConcurrencyManager();
    this.realTimeSyncService = new RealTimeSyncService(this.concurrencyManager);
    this.connectionManager = new ConnectionManager();
    
    // Set static instance
    EnhancedLocalWebSocketServer.instance = this;
    
    this.wss = new WebSocketServer({ 
      server,
      path: '/ws',
      clientTracking: true,
      perMessageDeflate: {
        zlibDeflateOptions: {
          memLevel: 7
        }
      }
    });
    
    console.log('🚀 Enhanced Local WebSocket Server initializing with advanced services...');
    
    this.setupWebSocketServer();
    this.setupServiceIntegration();
    this.startMetricsUpdate();
    
    console.log('✅ Enhanced Local WebSocket Server initialized with all services');
  }

  // Static getter for global access
  public static getLocalWebSocketServer(): EnhancedLocalWebSocketServer | null {
    return EnhancedLocalWebSocketServer.instance;
  }

  private setupWebSocketServer(): void {
    this.wss.on('connection', (ws: WebSocket, request) => {
      const clientId = this.generateClientId();
      
      console.log(`🔌 New enhanced WebSocket connection: ${clientId}`);

      // Add client to connection manager
      const client = this.connectionManager.addClient(clientId, ws, request);
      if (!client) {
        console.warn('⚠️ Connection rejected by connection manager');
        ws.close(1008, 'Server at capacity');
        return;
      }

      // Send enhanced welcome message
      this.connectionManager.sendToClient(clientId, {
        type: 'connected',
        payload: {
          clientId,
          serverVersion: '3.0.0',
          features: [
            'advanced-load-balancing',
            'race-condition-handling',
            'real-time-sync',
            'connection-pooling',
            'priority-messaging',
            'health-monitoring'
          ],
          serverCapabilities: {
            maxMessageSize: 1024 * 1024, // 1MB
            compression: true,
            heartbeat: true,
            subscriptions: true,
            priorityLevels: 10,
            batchProcessing: true
          },
          serverTime: new Date().toISOString()
        },
        timestamp: Date.now()
      });

      // Setup message handlers
      ws.on('message', (data: Buffer) => {
        this.handleMessage(clientId, data);
      });

      ws.on('close', (code: number, reason: Buffer) => {
        this.handleDisconnection(clientId, code, reason.toString());
      });

      ws.on('error', (error: Error) => {
        console.error(`❌ WebSocket error for client ${clientId}:`, error.message);
        this.connectionManager.updateClientQuality(clientId, 'critical');
      });

      ws.on('pong', (data: Buffer) => {
        this.handlePongReceived(clientId, data);
      });

      // Set up ping interval for this specific client
      this.setupClientPing(clientId);
    });

    this.wss.on('error', (error: Error) => {
      console.error('❌ Enhanced WebSocket Server error:', error);
      this.emit('server_error', error);
    });

    console.log('✅ Enhanced WebSocket Server setup complete');
  }

  private setupServiceIntegration(): void {
    // Listen to connection manager events
    this.connectionManager.on('client_added', (data) => {
      this.metrics.totalConnections = this.connectionManager.getClientCount();
      this.emit('client_added', data);
    });

    this.connectionManager.on('client_removed', (data) => {
      this.metrics.totalConnections = this.connectionManager.getClientCount();
      this.emit('client_removed', data);
    });

    this.connectionManager.on('client_authenticated', (data) => {
      this.metrics.authenticatedConnections = this.connectionManager.getAuthenticatedClientCount();
      
      // Subscribe client to real-time sync service
      this.realTimeSyncService.subscribeClient(
        data.clientId,
        ['queues', 'bookings', 'vehicles', 'destinations'],
        new Map(),
        5000 // 5 second sync interval
      );
      
      this.emit('client_authenticated', data);
    });

    // Listen to concurrency manager events
    this.concurrencyManager.on('operation_completed', (data) => {
      // Trigger real-time sync for completed operations
      this.emit('concurrency_operation_completed', data);
    });

    this.concurrencyManager.on('operation_conflict', (data) => {
      // Handle operation conflicts
      this.emit('operation_conflict', data);
    });

    // Listen to real-time sync service events
    this.realTimeSyncService.on('client_update', (data) => {
      // Send updates to specific clients
      this.connectionManager.sendToClient(data.clientId, {
        type: 'data_update',
        payload: {
          entityType: data.entityType,
          entityId: data.entityId,
          data: data.data,
          version: data.version,
          timestamp: data.timestamp
        },
        timestamp: Date.now(),
        priority: 5 // Medium priority for data updates
      });
    });

    console.log('✅ Service integration setup complete');
  }

  private async handleMessage(clientId: string, data: Buffer): Promise<void> {
    const client = this.connectionManager.getClient(clientId);
    if (!client) return;

    try {
      const message: WebSocketMessage = JSON.parse(data.toString());
      
      // Update client activity
      this.connectionManager.updateClientActivity(clientId);
      
      console.log(`📨 Enhanced message from ${clientId}: ${message.type}`);

      // Handle message based on type
      switch (message.type) {
        case 'authenticate':
          console.log(`🔐 Authentication request from ${clientId}:`, message.payload);
          await this.handleAuthentication(clientId, message.payload);
          break;
        
        case 'heartbeat':
          await this.handleHeartbeat(clientId, message.payload);
          break;
        
        case 'subscribe':
          this.handleSubscription(clientId, message.payload);
          break;
        
        case 'unsubscribe':
          this.handleUnsubscription(clientId, message.payload);
          break;

        case 'dashboard_data_request':
          await this.handleDashboardDataRequest(clientId);
          break;

        case 'connection_test':
          this.handleConnectionTest(clientId, message.payload);
          break;

        case 'client_info':
          this.handleClientInfo(clientId, message.payload);
          break;
        
        case 'metrics_request':
          this.handleMetricsRequest(clientId);
          break;

        case 'concurrency_operation':
          await this.handleConcurrencyOperation(clientId, message.payload);
          break;

        case 'sync_request':
          await this.handleSyncRequest(clientId, message.payload);
          break;

        case 'priority_message':
          this.handlePriorityMessage(clientId, message);
          break;
        
        default:
          console.warn(`❓ Unknown message type: ${message.type} from ${clientId}`);
          this.connectionManager.sendToClient(clientId, {
            type: 'error',
            payload: { message: 'Unknown message type' },
            timestamp: Date.now()
          });
      }

      // Send response for messages with messageId
      if (message.messageId) {
        this.connectionManager.sendToClient(clientId, {
          type: `${message.type}_response`,
          payload: { success: true },
          messageId: message.messageId,
          timestamp: Date.now()
        });
      }

    } catch (error) {
      console.error(`❌ Error processing message from ${clientId}:`, error);
      this.connectionManager.sendToClient(clientId, {
        type: 'error',
        payload: { message: 'Invalid message format' },
        timestamp: Date.now()
      });
    }
  }

  private async handleAuthentication(clientId: string, payload: any): Promise<void> {
    try {
      // Handle both token-based and feature-based authentication
      if (payload.token) {
        // Token-based authentication (from enhanced WebSocket)
        console.log(`🔐 Token-based authentication for client ${clientId}`);
        
        // Verify token with database
        const session = await prisma.session.findFirst({
          where: { 
            token: payload.token,
            isActive: true,
            expiresAt: { gt: new Date() }
          },
          include: { staff: true }
        });

        if (session && session.staff) {
          // Token is valid, authenticate client
          const authSuccess = this.connectionManager.authenticateClient(clientId, {
            clientType: 'desktop-app',
            version: '3.0.0',
            features: ['enhanced-system', 'real-time-sync', 'priority-messaging'],
            staffId: session.staff.id,
            staffName: `${session.staff.firstName} ${session.staff.lastName}`,
            authenticatedAt: new Date()
          });

          if (authSuccess) {
            console.log(`✅ Client ${clientId} authenticated with token for staff: ${session.staff.firstName} ${session.staff.lastName}`);
            
            // Send authentication success response
            this.connectionManager.sendToClient(clientId, {
              type: 'authenticated',
              payload: {
                success: true,
                staff: session.staff,
                message: 'Authentication successful'
              },
              timestamp: Date.now()
            });
            
            // Emit authentication event
            this.emit('client_authenticated', { clientId, staff: session.staff });
            return;
          }
        } else {
          console.warn(`❌ Invalid or expired token for client ${clientId}`);
          this.connectionManager.sendToClient(clientId, {
            type: 'authentication_failed',
            payload: { message: 'Invalid or expired token' },
            timestamp: Date.now()
          });
          return;
        }
      }

      // Fallback to feature-based authentication
      const { clientType, version, features } = payload;

      // Authenticate client in connection manager
      const authSuccess = this.connectionManager.authenticateClient(clientId, {
        clientType: clientType || 'desktop-app',
        version,
        features
      });

      if (authSuccess) {
        // Send enhanced authentication response
        this.connectionManager.sendToClient(clientId, {
          type: 'authenticated',
          payload: {
            clientId,
            clientType: payload.clientType || 'desktop-app',
            features: [
              'real-time-updates',
              'advanced-load-balancing',
              'race-condition-handling',
              'priority-messaging',
              'connection-pooling'
            ],
            serverCapabilities: {
              maxMessageSize: 1024 * 1024,
              compression: true,
              heartbeat: true,
              subscriptions: true,
              priorityLevels: 10,
              batchProcessing: true
            },
            serverTime: new Date().toISOString()
          },
          timestamp: Date.now()
        });
        
        // Send initial data
        await this.sendInitialData(clientId);

        this.emit('client_authenticated', { clientId, clientType: payload.clientType });

      } else {
        this.connectionManager.sendToClient(clientId, {
          type: 'auth_error',
          payload: { message: 'Authentication failed' },
          timestamp: Date.now()
        });
      }

    } catch (error) {
      console.error(`❌ Authentication error for ${clientId}:`, error);
      
      this.connectionManager.sendToClient(clientId, {
        type: 'auth_error',
        payload: { message: 'Authentication failed' },
        timestamp: Date.now()
      });
    }
  }

  private async handleHeartbeat(clientId: string, payload: any): Promise<void> {
    const now = Date.now();
    const heartbeatTimestamp = payload?.timestamp;
    
    if (heartbeatTimestamp) {
      const latency = now - heartbeatTimestamp;
      this.connectionManager.updateClientLatency(clientId, latency);
    }

    // Send heartbeat acknowledgment
    this.connectionManager.sendToClient(clientId, {
      type: 'heartbeat_ack',
      payload: { 
        timestamp: heartbeatTimestamp,
        serverTime: now,
        latency: this.connectionManager.getClient(clientId)?.latency || 0
      },
      timestamp: now
    });
  }

  private handleSubscription(clientId: string, payload: any): void {
    if (!payload) {
      console.warn(`⚠️ Subscription request from ${clientId} has no payload`);
      return;
    }
    
    // Handle both old format (topics) and new format (entityTypes)
    const topics = payload.topics || payload.entityTypes;
    
    if (Array.isArray(topics)) {
      this.connectionManager.addSubscription(clientId, topics);
      
      this.connectionManager.sendToClient(clientId, {
        type: 'subscription_confirmed',
        payload: { topics, entityTypes: topics },
        timestamp: Date.now()
      });
      
      console.log(`📡 Client ${clientId} subscribed to: ${topics.join(', ')}`);
    } else {
      console.warn(`⚠️ Invalid subscription payload from ${clientId}:`, payload);
    }
  }

  private handleUnsubscription(clientId: string, payload: any): void {
    if (!payload) {
      console.warn(`⚠️ Unsubscription request from ${clientId} has no payload`);
      return;
    }
    
    // Handle both old format (topics) and new format (entityTypes)
    const topics = payload.topics || payload.entityTypes;
    
    if (Array.isArray(topics)) {
      this.connectionManager.removeSubscription(clientId, topics);
      console.log(`📡 Client ${clientId} unsubscribed from: ${topics.join(', ')}`);
    } else {
      console.warn(`⚠️ Invalid unsubscription payload from ${clientId}:`, payload);
    }
  }

  private async handleDashboardDataRequest(clientId: string): Promise<void> {
    try {
      const dashboardData = await this.collectDashboardData();
      
      this.connectionManager.sendToClient(clientId, {
        type: 'dashboard_data',
        payload: dashboardData,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('❌ Error collecting dashboard data:', error);
      
      this.connectionManager.sendToClient(clientId, {
        type: 'data_error',
        payload: { message: 'Failed to collect dashboard data' },
        timestamp: Date.now()
      });
    }
  }

  private handleConnectionTest(clientId: string, payload: any): void {
    const client = this.connectionManager.getClient(clientId);
    if (!client) return;

    this.connectionManager.sendToClient(clientId, {
      type: 'connection_test_response',
      payload: {
        received: payload,
        serverTime: new Date().toISOString(),
        latency: client.latency,
        quality: client.connectionQuality,
        poolInfo: {
          poolId: client.connectionPool,
          poolHealth: this.connectionManager.getConnectionPool(client.connectionPool)?.healthScore || 0
        }
      },
      timestamp: Date.now()
    });
  }

  private handleClientInfo(clientId: string, payload: any): void {
    if (payload.clientType) {
      const client = this.connectionManager.getClient(clientId);
      if (client) {
        client.clientType = payload.clientType as any;
        console.log(`ℹ️ Client ${clientId} identified as ${client.clientType}`);
      }
    }
  }

  private async handleConcurrencyOperation(clientId: string, payload: any): Promise<void> {
    try {
      const { type, resourceId, data, priority = 1 } = payload;
      
      // Submit operation to concurrency manager
      const result = await this.concurrencyManager.submitOperation(
        type,
        resourceId,
        clientId,
        data,
        priority
      );

      // Send response to client
      this.connectionManager.sendToClient(clientId, {
        type: 'concurrency_operation_response',
        payload: {
          operationId: result.operationId,
          status: result.status,
          message: result.status === 'immediate' ? 'Operation processed immediately' :
                  result.status === 'queued' ? 'Operation queued for processing' :
                  'Operation rejected due to conflict'
        },
        timestamp: Date.now()
      });

    } catch (error) {
      console.error(`❌ Error handling concurrency operation for ${clientId}:`, error);
      
      this.connectionManager.sendToClient(clientId, {
        type: 'concurrency_operation_error',
        payload: { message: 'Failed to process operation' },
        timestamp: Date.now()
      });
    }
  }

  private async handleSyncRequest(clientId: string, payload: any): Promise<void> {
    try {
      const { entityType, entityId, data, priority = 1 } = payload;
      
      // Submit sync operation
      const result = await this.realTimeSyncService.submitSyncOperation(
        'sync',
        entityType,
        entityId,
        data,
        clientId,
        priority
      );

      // Send response to client
      this.connectionManager.sendToClient(clientId, {
        type: 'sync_response',
        payload: {
          operationId: result.operationId,
          status: result.status,
          message: result.status === 'immediate' ? 'Sync completed immediately' :
                  result.status === 'queued' ? 'Sync queued for processing' :
                  'Sync rejected'
        },
        timestamp: Date.now()
      });

    } catch (error) {
      console.error(`❌ Error handling sync request for ${clientId}:`, error);
      
      this.connectionManager.sendToClient(clientId, {
        type: 'sync_error',
        payload: { message: 'Failed to process sync request' },
        timestamp: Date.now()
      });
    }
  }

  private handlePriorityMessage(clientId: string, message: WebSocketMessage): void {
    const priority = message.priority || 1;
    
    // Send message with specified priority
    this.connectionManager.sendToClient(clientId, {
      type: message.type,
      payload: message.payload,
      timestamp: Date.now()
    }, priority);
  }

  private handlePongReceived(clientId: string, data: Buffer): void {
    try {
      const pongData = JSON.parse(data.toString());
      const latency = Date.now() - pongData.timestamp;
      this.connectionManager.updateClientLatency(clientId, latency);
    } catch (error) {
      // Ignore malformed pong data
    }
  }

  private setupClientPing(clientId: string): void {
    const pingInterval = setInterval(() => {
      const client = this.connectionManager.getClient(clientId);
      if (!client || client.ws.readyState !== WebSocket.OPEN) {
        clearInterval(pingInterval);
        return;
      }

      try {
        const pingData = JSON.stringify({ timestamp: Date.now(), clientId });
        client.ws.ping(pingData);
      } catch (error) {
        console.error(`❌ Error sending ping to ${clientId}:`, error);
        clearInterval(pingInterval);
      }
    }, 30000); // 30 seconds
  }

  private handleDisconnection(clientId: string, code: number, reason: string): void {
    console.log(`❌ Client disconnected: ${clientId} - Code: ${code}, Reason: ${reason}`);
    
    // Remove client from connection manager
    this.connectionManager.removeClient(clientId);
    
    // Unsubscribe from real-time sync
    this.realTimeSyncService.unsubscribeClient(clientId);
    
    this.emit('client_disconnected', { clientId, code, reason });
  }

  private startMetricsUpdate(): void {
    setInterval(() => {
      // Update metrics from all services
      this.metrics.connectionPools = this.connectionManager.getConnectionStats();
      this.metrics.concurrencyMetrics = this.concurrencyManager.getMetrics();
      this.metrics.syncMetrics = this.realTimeSyncService.getMetrics();
      
      // Emit metrics update
      this.emit('metrics_update', this.metrics);
      
    }, 10000); // Every 10 seconds

    console.log('📊 Metrics update started (interval: 10s)');
  }

  private async sendInitialData(clientId: string): Promise<void> {
    try {
      const dashboardData = await this.collectDashboardData();
      
      this.connectionManager.sendToClient(clientId, {
        type: 'initial_data',
        payload: dashboardData,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('❌ Error sending initial data:', error);
    }
  }

  private async collectDashboardData(): Promise<any> {
    try {
      // Dashboard data is now available via REST API endpoints
      return { message: 'Dashboard data available via /api/dashboard/* endpoints' };
    } catch (error) {
      console.error('❌ Error collecting dashboard data:', error);
      throw error;
    }
  }

  private generateClientId(): string {
    return `client-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  }

  // Enhanced public methods

  public broadcastToSubscribers(topic: string, message: WebSocketMessage): void {
    this.connectionManager.broadcastToSubscribers(topic, message);
  }

  public broadcast(message: WebSocketMessage): void {
    this.connectionManager.broadcast(message);
  }

  public sendToClient(clientId: string, message: WebSocketMessage): boolean {
    return this.connectionManager.sendToClient(clientId, message);
  }

  public getServerMetrics(): ServerMetrics {
    return { ...this.metrics };
  }

  public getConnectionStats(): any {
    return this.connectionManager.getConnectionStats();
  }

  public getConcurrencyMetrics(): any {
    return this.concurrencyManager.getMetrics();
  }

  public getSyncMetrics(): any {
    return this.realTimeSyncService.getMetrics();
  }

  public getClientInfo(clientId: string): ClientConnection | null {
    return this.connectionManager.getClient(clientId);
  }

  public getAllClients(): Array<{ id: string; info: any }> {
    const clients = this.connectionManager.getAllClients();
    return clients.map(client => ({
      id: client.id,
      info: {
        isAuthenticated: client.isAuthenticated,
        clientType: client.clientType,
        connectionQuality: client.connectionQuality,
        lastActivity: client.lastActivity,
        connectedAt: client.connectedAt
      }
    }));
  }

  // Enhanced notification methods
  public notifyFinancialUpdate(financialData: any): void {
    this.connectionManager.broadcastToSubscribers('financial', {
      type: 'financial_update',
      payload: financialData,
      timestamp: Date.now()
    });
  }

  public notifyBookingUpdate(bookingData: any): void {
    this.connectionManager.broadcastToSubscribers('bookings', {
      type: 'booking_update',
      payload: bookingData,
      timestamp: Date.now()
    });
  }

  public notifyQueueUpdate(queueData: any): void {
    this.connectionManager.broadcastToSubscribers('queues', {
      type: 'queue_update',
      payload: queueData,
      timestamp: Date.now()
    });
  }

  public notifyOvernightQueueUpdate(overnightQueueData: any): void {
    this.connectionManager.broadcastToSubscribers('overnight_queue', {
      type: 'overnight_queue_update',
      payload: overnightQueueData,
      timestamp: Date.now()
    });
  }

  public notifyStaffUpdate(staffData: any): void {
    this.connectionManager.broadcastToSubscribers('staff', {
      type: 'staff_update',
      payload: staffData,
      timestamp: Date.now()
    });
  }

  public notifyDashboardUpdate(dashboardData: any, includeFinancial: boolean = false): void {
    let payload = dashboardData;
    
    if (includeFinancial) {
      payload = {
        ...dashboardData,
        hasFinancialData: true
      };
    }

    this.connectionManager.broadcast({
      type: 'dashboard_update',
      payload,
      timestamp: Date.now()
    });
  }

  // Get client count
  public getClientCount(): number {
    return this.connectionManager.getClientCount();
  }

  // Get authenticated client count
  public getAuthenticatedClientCount(): number {
    return this.connectionManager.getAuthenticatedClientCount();
  }

  // Close all connections
  public async close(): Promise<void> {
    // Cleanup all services
    this.connectionManager.cleanup();
    this.concurrencyManager.cleanup();
    this.realTimeSyncService.cleanup();
    
    // Close the WebSocket server
    return new Promise((resolve) => {
      this.wss.close(() => {
        console.log('✅ Enhanced WebSocket server closed');
        resolve();
      });
    });
  }

  /**
   * Handle metrics request from client
   */
  private handleMetricsRequest(clientId: string): void {
    try {
      const client = this.connectionManager.getClient(clientId);
      if (!client) return;

      const metrics = {
        server: this.metrics,
        connection: this.connectionManager.getConnectionStats(),
        concurrency: this.concurrencyManager.getMetrics(),
        sync: this.realTimeSyncService.getMetrics()
      };

      this.connectionManager.sendToClient(clientId, {
        type: 'metrics_response',
        payload: metrics,
        timestamp: Date.now()
      });

      console.log(`📊 Sent metrics to client ${clientId}`);
    } catch (error) {
      console.error(`❌ Error handling metrics request from ${clientId}:`, error);
    }
  }
  
  // Static method to get the current instance
  public static getInstance(): EnhancedLocalWebSocketServer | null {
    return EnhancedLocalWebSocketServer.instance;
  }

  /**
   * Broadcast seat availability update for a specific destination
   */
  public async broadcastSeatAvailabilityUpdate(destinationId: string): Promise<void> {
    try {
      // Import the queue booking service dynamically to avoid circular dependency
      const QueueBookingServiceModule = await import('../services/queueBookingService');
      const queueBookingService = new QueueBookingServiceModule.QueueBookingService(this.webSocketService);
      
      // Get current seat availability for the destination
      const seatInfo = await queueBookingService.getAvailableSeats(destinationId);
      
      if (seatInfo.success && seatInfo.data) {
        const updatePayload = {
          destinationId,
          availableSeats: seatInfo.data.totalAvailableSeats,
          totalCapacity: seatInfo.data.vehicles.reduce((sum, v) => sum + v.totalSeats, 0),
          vehicleCount: seatInfo.data.vehicles.length,
          destinationName: seatInfo.data.destinationName,
          timestamp: new Date().toISOString()
        };

        // Broadcast to all subscribed clients
        this.connectionManager.broadcast({
          type: 'seat_availability_changed',
          payload: updatePayload,
          timestamp: Date.now()
        });

        console.log(`📡 Broadcasted seat availability update for destination: ${destinationId} (${seatInfo.data.totalAvailableSeats} seats available)`);
      }
    } catch (error) {
      console.error(`❌ Error broadcasting seat availability update for destination ${destinationId}:`, error);
    }
  }

  /**
   * Broadcast destination list update with current availability
   */
  public async broadcastDestinationListUpdate(): Promise<void> {
    try {
      // Import the queue booking service dynamically to avoid circular dependency
      const QueueBookingServiceModule = await import('../services/queueBookingService');
      const queueBookingService = new QueueBookingServiceModule.QueueBookingService(this.webSocketService);
      
      // Get current destinations with availability
      const destinationsResult = await queueBookingService.getAvailableDestinations();
      
      if (destinationsResult.success && destinationsResult.destinations) {
        // Filter out destinations with no available seats
        const availableDestinations = destinationsResult.destinations.filter((dest: any) => dest.totalAvailableSeats > 0);
        
        const updatePayload = {
          destinations: availableDestinations,
          timestamp: new Date().toISOString()
        };

        // Broadcast to all subscribed clients
        this.connectionManager.broadcast({
          type: 'destinations_updated',
          payload: updatePayload,
          timestamp: Date.now()
        });

        console.log(`📡 Broadcasted destination list update: ${availableDestinations.length} destinations available`);
      }
    } catch (error) {
      console.error('❌ Error broadcasting destination list update:', error);
    }
  }

  /**
   * Broadcast booking conflict notification to all clients
   */
  public broadcastBookingConflict(conflictData: {
    destinationId: string;
    destinationName: string;
    conflictType: 'insufficient_seats' | 'booking_conflict' | 'seat_taken';
    message: string;
    affectedSeats?: number;
  }): void {
    const message = {
      type: 'booking_conflict',
      payload: {
        ...conflictData,
        timestamp: new Date().toISOString()
      },
      timestamp: Date.now()
    };

    // Broadcast to all authenticated clients
    this.connectionManager.broadcast(message);
    
    console.log(`🚨 Broadcasted booking conflict: ${conflictData.conflictType} for destination ${conflictData.destinationName}`);
  }

  /**
   * Broadcast immediate booking success notification
   */
  public broadcastBookingSuccess(bookingData: {
    destinationId: string;
    destinationName: string;
    seatsBooked: number;
    remainingSeats: number;
    bookingId: string;
    vehicleLicensePlate?: string;
  }): void {
    const message = {
      type: 'booking_success',
      payload: {
        ...bookingData,
        timestamp: new Date().toISOString()
      },
      timestamp: Date.now()
    };

    // Broadcast to all authenticated clients
    this.connectionManager.broadcast(message);
    
    console.log(`🎉 Broadcasted booking success: ${bookingData.seatsBooked} seats booked for ${bookingData.destinationName}`);
  }
}

// Export function for external access
export function getLocalWebSocketServer(): EnhancedLocalWebSocketServer | null {
  return EnhancedLocalWebSocketServer.getInstance();
} 