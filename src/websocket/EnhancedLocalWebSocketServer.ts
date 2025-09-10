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
  source?: 'client' | 'server';
  target?: string;
  broadcast?: boolean;
  retryCount?: number;
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
  tunnelMetrics: any;
}

interface TunnelConfig {
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  priorityLevels: number;
  batchProcessing: boolean;
  healthMonitoring: boolean;
  autoReconnection: boolean;
  compressionLevel: number;
  batchSize: number;
  heartbeatInterval: number;
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
    syncMetrics: {},
    tunnelMetrics: {
      activeTunnels: 0,
      tunnelEstablishments: 0,
      tunnelFailures: 0,
      averageTunnelLatency: 0,
      tunnelHealthScore: 100
    }
  };

  // Tunnel management
  private tunnelConnections: Map<string, {
    clientId: string;
    config: TunnelConfig;
    establishedAt: Date;
    lastHeartbeat: Date;
    healthScore: number;
    messageQueue: WebSocketMessage[];
    processingQueue: boolean;
  }> = new Map();

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
    
    console.log('🚀 Enhanced Local WebSocket Server initializing with tunnel capabilities...');
    
    this.setupWebSocketServer();
    this.setupServiceIntegration();
    this.startMetricsUpdate();
    this.startTunnelHealthMonitoring();
    
    console.log('✅ Enhanced Local WebSocket Server initialized with tunnel support');
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

      // Send enhanced welcome message with tunnel capabilities
      this.connectionManager.sendToClient(clientId, {
        type: 'connected',
        payload: {
          clientId,
          serverVersion: '4.0.0',
          features: [
            'tunnel-protocol',
            'advanced-load-balancing',
            'race-condition-handling',
            'real-time-sync',
            'connection-pooling',
            'priority-messaging',
            'health-monitoring',
            'batch-processing',
            'auto-reconnection',
            'message-retry'
          ],
          serverCapabilities: {
            maxMessageSize: 1024 * 1024, // 1MB
            compression: true,
            heartbeat: true,
            subscriptions: true,
            priorityLevels: 10,
            batchProcessing: true,
            tunnelProtocol: true,
            healthMonitoring: true,
            messageRetry: true
          },
          serverTime: new Date().toISOString()
        },
        timestamp: Date.now(),
        source: 'server'
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
      console.error('❌ WebSocket server error:', error.message);
      this.emit('server_error', error);
    });
  }

  private async handleMessage(clientId: string, data: Buffer): Promise<void> {
    try {
      const message: WebSocketMessage = JSON.parse(data.toString());
      
      // Update metrics
      this.metrics.messagesReceived++;
      
      // Add source information
      message.source = 'client';
      message.clientId = clientId;
      
      console.log(`📨 Received message from ${clientId}:`, message.type);
      
      // Handle tunnel-specific messages
      if (message.type === 'tunnel_establish') {
        await this.handleTunnelEstablishment(clientId, message);
        return;
      }
      
      if (message.type === 'tunnel_optimize') {
        await this.handleTunnelOptimization(clientId, message);
        return;
      }
      
      if (message.type === 'tunnel_confirmed') {
        await this.handleTunnelConfirmation(clientId, message);
        return;
      }
      
      if (message.type === 'batch') {
        await this.handleBatchMessage(clientId, message);
        return;
      }
      
      // Handle other message types
      await this.processMessage(clientId, message);
      
    } catch (error) {
      console.error(`❌ Error handling message from ${clientId}:`, error);
      this.connectionManager.updateClientQuality(clientId, 'poor');
    }
  }

  /**
   * Handle tunnel establishment
   */
  private async handleTunnelEstablishment(clientId: string, message: WebSocketMessage): Promise<void> {
    try {
      console.log(`🔄 Establishing tunnel for client ${clientId}...`);
      
      const clientCapabilities = message.payload?.clientCapabilities;
      
      // Create tunnel configuration
      const tunnelConfig: TunnelConfig = {
        compressionEnabled: clientCapabilities?.compression || false,
        encryptionEnabled: clientCapabilities?.encryption || false,
        priorityLevels: clientCapabilities?.priorityLevels || 10,
        batchProcessing: clientCapabilities?.batchProcessing || false,
        healthMonitoring: clientCapabilities?.healthMonitoring || false,
        autoReconnection: clientCapabilities?.autoReconnection || false,
        compressionLevel: 6,
        batchSize: 50,
        heartbeatInterval: 30000
      };
      
      // Store tunnel connection
      this.tunnelConnections.set(clientId, {
        clientId,
        config: tunnelConfig,
        establishedAt: new Date(),
        lastHeartbeat: new Date(),
        healthScore: 100,
        messageQueue: [],
        processingQueue: false
      });
      
      // Update metrics
      this.metrics.tunnelMetrics.activeTunnels++;
      this.metrics.tunnelMetrics.tunnelEstablishments++;
      
      // Send tunnel confirmation
      const confirmationMessage: WebSocketMessage = {
        type: 'tunnel_confirmed',
        payload: {
          tunnelId: clientId,
          serverConfig: {
            compressionLevel: tunnelConfig.compressionLevel,
            batchSize: tunnelConfig.batchSize,
            heartbeatInterval: tunnelConfig.heartbeatInterval,
            priorityLevels: tunnelConfig.priorityLevels
          },
          timestamp: new Date().toISOString()
        },
        timestamp: Date.now(),
        source: 'server',
        target: clientId
      };
      
      this.connectionManager.sendToClient(clientId, confirmationMessage);
      
      console.log(`✅ Tunnel established for client ${clientId}`);
      this.emit('tunnel_established', { clientId, config: tunnelConfig });
      
    } catch (error) {
      console.error(`❌ Tunnel establishment failed for client ${clientId}:`, error);
      this.metrics.tunnelMetrics.tunnelFailures++;
      this.emit('tunnel_establishment_failed', { clientId, error });
    }
  }

  /**
   * Handle tunnel optimization
   */
  private async handleTunnelOptimization(clientId: string, message: WebSocketMessage): Promise<void> {
    try {
      console.log(`⚡ Optimizing tunnel for client ${clientId}...`);
      
      const tunnel = this.tunnelConnections.get(clientId);
      if (!tunnel) {
        console.warn(`⚠️ No tunnel found for client ${clientId}`);
        return;
      }
      
      const requestedSettings = message.payload?.requestedSettings;
      const clientPreferences = message.payload?.clientPreferences;
      
      // Update tunnel configuration based on client preferences
      if (requestedSettings) {
        tunnel.config.compressionLevel = requestedSettings.compressionLevel || tunnel.config.compressionLevel;
        tunnel.config.batchSize = requestedSettings.batchSize || tunnel.config.batchSize;
        tunnel.config.heartbeatInterval = requestedSettings.heartbeatInterval || tunnel.config.heartbeatInterval;
        tunnel.config.priorityLevels = requestedSettings.priorityLevels || tunnel.config.priorityLevels;
      }
      
      // Send optimization confirmation
      const optimizationMessage: WebSocketMessage = {
        type: 'tunnel_optimized',
        payload: {
          tunnelId: clientId,
          optimizedSettings: tunnel.config,
          serverMetrics: this.getServerMetrics(),
          timestamp: new Date().toISOString()
        },
        timestamp: Date.now(),
        source: 'server',
        target: clientId
      };
      
      this.connectionManager.sendToClient(clientId, optimizationMessage);
      
      console.log(`✅ Tunnel optimized for client ${clientId}`);
      this.emit('tunnel_optimized', { clientId, config: tunnel.config });
      
    } catch (error) {
      console.error(`❌ Tunnel optimization failed for client ${clientId}:`, error);
    }
  }

  /**
   * Handle tunnel confirmation
   */
  private async handleTunnelConfirmation(clientId: string, message: WebSocketMessage): Promise<void> {
    console.log(`✅ Tunnel confirmation received from client ${clientId}`);
    this.emit('tunnel_confirmation_received', { clientId, message });
  }

  /**
   * Handle batch messages
   */
  private async handleBatchMessage(clientId: string, message: WebSocketMessage): Promise<void> {
    try {
      const batchData = message.payload;
      const messages = batchData?.messages || [];
      
      console.log(`📦 Processing batch of ${messages.length} messages from client ${clientId}`);
      
      // Process each message in the batch
      for (const batchMessage of messages) {
        batchMessage.clientId = clientId;
        batchMessage.source = 'client';
        await this.processMessage(clientId, batchMessage);
      }
      
      // Send batch confirmation
      const batchConfirmation: WebSocketMessage = {
        type: 'batch_confirmed',
        payload: {
          batchId: batchData?.batchId,
          processedCount: messages.length,
          timestamp: new Date().toISOString()
        },
        timestamp: Date.now(),
        source: 'server',
        target: clientId
      };
      
      this.connectionManager.sendToClient(clientId, batchConfirmation);
      
    } catch (error) {
      console.error(`❌ Batch processing failed for client ${clientId}:`, error);
    }
  }

  /**
   * Process individual messages
   */
  private async processMessage(clientId: string, message: WebSocketMessage): Promise<void> {
    try {
      // Handle authentication
      if (message.type === 'authenticate') {
        await this.handleAuthentication(clientId, message);
        return;
      }
      
      // Handle heartbeat
      if (message.type === 'heartbeat') {
        await this.handleHeartbeat(clientId, message);
        return;
      }
      
      // Handle subscriptions
      if (message.type === 'subscribe') {
        await this.handleSubscription(clientId, message);
        return;
      }
      
      // Handle other message types
      switch (message.type) {
        case 'cash_booking_updated':
          await this.handleCashBookingUpdate(clientId, message);
          break;
        case 'seat_availability_changed':
          await this.handleSeatAvailabilityChange(clientId, message);
          break;
        case 'queue_update':
          await this.handleQueueUpdate(clientId, message);
          break;
        case 'financial_update':
          await this.handleFinancialUpdate(clientId, message);
          break;
        case 'concurrency_operation_synced':
          await this.handleConcurrencySync(clientId, message);
          break;
        case 'real_time_sync_update':
          await this.handleRealTimeSync(clientId, message);
          break;
        case 'test_message':
          await this.handleTestMessage(clientId, message);
          break;
        case 'performance_test':
          await this.handlePerformanceTest(clientId, message);
          break;
        default:
          console.log(`📨 Unknown message type: ${message.type}`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing message from ${clientId}:`, error);
    }
  }

  /**
   * Handle authentication with enhanced security
   */
  private async handleAuthentication(clientId: string, message: WebSocketMessage): Promise<void> {
    try {
      const authData = message.payload;
      const token = authData?.token;
      const securityLevel = authData?.securityLevel || 'standard';
      
      console.log(`🔐 Authenticating client ${clientId} with ${securityLevel} security...`);
      
      // Validate token (implement your token validation logic here)
      const isValid = await this.validateToken(token);
      
      if (isValid) {
        // Mark client as authenticated
        this.connectionManager.authenticateClient(clientId, { clientType: 'desktop-app' });
        this.metrics.authenticatedConnections++;
        
        // Send authentication confirmation
        const authConfirmation: WebSocketMessage = {
          type: 'authenticated',
          payload: {
            clientId,
            securityLevel,
            timestamp: new Date().toISOString()
          },
          timestamp: Date.now(),
          source: 'server',
          target: clientId
        };
        
        this.connectionManager.sendToClient(clientId, authConfirmation);
        
        console.log(`✅ Client ${clientId} authenticated successfully`);
        this.emit('client_authenticated', { clientId, securityLevel });
        
      } else {
        // Send authentication failure
        const authFailure: WebSocketMessage = {
          type: 'auth_failed',
          payload: {
            reason: 'Invalid token',
            timestamp: new Date().toISOString()
          },
          timestamp: Date.now(),
          source: 'server',
          target: clientId
        };
        
        this.connectionManager.sendToClient(clientId, authFailure);
        
        console.log(`❌ Authentication failed for client ${clientId}`);
        this.emit('client_auth_failed', { clientId, reason: 'Invalid token' });
      }
      
    } catch (error) {
      console.error(`❌ Authentication error for client ${clientId}:`, error);
    }
  }

  /**
   * Handle heartbeat with tunnel health monitoring
   */
  private async handleHeartbeat(clientId: string, message: WebSocketMessage): Promise<void> {
    try {
      const clientMetrics = message.payload?.clientMetrics;
      const tunnelHealth = message.payload?.tunnelHealth;
      
      // Update tunnel health
      const tunnel = this.tunnelConnections.get(clientId);
      if (tunnel) {
        tunnel.lastHeartbeat = new Date();
        
        if (tunnelHealth) {
          // Calculate health score based on various metrics
          const queueSize = tunnelHealth.messageQueueSize || 0;
          const failedMessages = tunnelHealth.failedMessagesCount || 0;
          const connectionQuality = tunnelHealth.connectionQuality || 'fair';
          
          let healthScore = 100;
          
          // Reduce score based on queue size
          if (queueSize > 100) healthScore -= 20;
          else if (queueSize > 50) healthScore -= 10;
          
          // Reduce score based on failed messages
          if (failedMessages > 10) healthScore -= 30;
          else if (failedMessages > 5) healthScore -= 15;
          
          // Reduce score based on connection quality
          if (connectionQuality === 'poor') healthScore -= 25;
          else if (connectionQuality === 'fair') healthScore -= 10;
          
          tunnel.healthScore = Math.max(0, healthScore);
        }
      }
      
      // Send heartbeat response
      const heartbeatResponse: WebSocketMessage = {
        type: 'heartbeat_response',
        payload: {
          serverTime: new Date().toISOString(),
          serverMetrics: this.getServerMetrics(),
          tunnelHealth: tunnel ? {
            healthScore: tunnel.healthScore,
            uptime: Date.now() - tunnel.establishedAt.getTime(),
            lastHeartbeat: tunnel.lastHeartbeat.toISOString()
          } : null
        },
        timestamp: Date.now(),
        source: 'server',
        target: clientId
      };
      
      this.connectionManager.sendToClient(clientId, heartbeatResponse);
      
    } catch (error) {
      console.error(`❌ Heartbeat error for client ${clientId}:`, error);
    }
  }

  /**
   * Handle subscription requests
   */
  private async handleSubscription(clientId: string, message: WebSocketMessage): Promise<void> {
    try {
      const entityTypes = message.payload?.entityTypes || [];
      const filters = message.payload?.filters || {};
      const subscriptionId = message.payload?.subscriptionId;
      
      console.log(`📡 Client ${clientId} subscribing to: ${entityTypes.join(', ')}`);
      
      // Add subscriptions to client
      entityTypes.forEach((type: string) => {
        this.connectionManager.addSubscription(clientId, [type]);
      });
      
      // Send subscription confirmation
      const subscriptionConfirmation: WebSocketMessage = {
        type: 'subscribed',
        payload: {
          subscriptionId,
          entityTypes,
          filters,
          timestamp: new Date().toISOString()
        },
        timestamp: Date.now(),
        source: 'server',
        target: clientId
      };
      
      this.connectionManager.sendToClient(clientId, subscriptionConfirmation);
      
      console.log(`✅ Client ${clientId} subscribed successfully`);
      this.emit('client_subscribed', { clientId, entityTypes, filters });
      
    } catch (error) {
      console.error(`❌ Subscription error for client ${clientId}:`, error);
    }
  }

  /**
   * Handle various update types
   */
  private async handleCashBookingUpdate(clientId: string, message: WebSocketMessage): Promise<void> {
    console.log(`🎫 Cash booking update from client ${clientId}:`, message.payload);
    this.broadcastToSubscribers('cash_booking_updated', message.payload, clientId);
  }

  private async handleSeatAvailabilityChange(clientId: string, message: WebSocketMessage): Promise<void> {
    console.log(`💺 Seat availability change from client ${clientId}:`, message.payload);
    this.broadcastToSubscribers('seat_availability_changed', message.payload, clientId);
  }

  private async handleQueueUpdate(clientId: string, message: WebSocketMessage): Promise<void> {
    console.log(`📋 Queue update from client ${clientId}:`, message.payload);
    this.broadcastToSubscribers('queue_update', message.payload, clientId);
  }

  private async handleFinancialUpdate(clientId: string, message: WebSocketMessage): Promise<void> {
    console.log(`💰 Financial update from client ${clientId}:`, message.payload);
    this.broadcastToSubscribers('financial_update', message.payload, clientId);
  }

  private async handleConcurrencySync(clientId: string, message: WebSocketMessage): Promise<void> {
    console.log(`🔄 Concurrency sync from client ${clientId}:`, message.payload);
    this.broadcastToSubscribers('concurrency_operation_synced', message.payload, clientId);
  }

  private async handleRealTimeSync(clientId: string, message: WebSocketMessage): Promise<void> {
    console.log(`🔄 Real-time sync from client ${clientId}:`, message.payload);
    this.broadcastToSubscribers('real_time_sync_update', message.payload, clientId);
  }

  /**
   * Handle test message for testing purposes
   */
  private async handleTestMessage(clientId: string, message: WebSocketMessage): Promise<void> {
    console.log(`🧪 Test message from client ${clientId}:`, message.payload);
    
    // Send test message response
    const testResponse: WebSocketMessage = {
      type: 'test_message_response',
      payload: {
        received: message.payload,
        serverTime: new Date().toISOString(),
        clientId,
        message: 'Test message received and processed successfully'
      },
      timestamp: Date.now(),
      source: 'server',
      target: clientId
    };
    
    this.connectionManager.sendToClient(clientId, testResponse);
    console.log(`✅ Test message response sent to client ${clientId}`);
  }

  /**
   * Handle performance test message
   */
  private async handlePerformanceTest(clientId: string, message: WebSocketMessage): Promise<void> {
    console.log(`⚡ Performance test message from client ${clientId}:`, message.payload);
    
    // Send performance test response
    const performanceResponse: WebSocketMessage = {
      type: 'performance_test_response',
      payload: {
        received: message.payload,
        serverTime: new Date().toISOString(),
        clientId,
        message: 'Performance test message processed successfully',
        latency: Date.now() - new Date(message.payload.timestamp).getTime()
      },
      timestamp: Date.now(),
      source: 'server',
      target: clientId
    };
    
    this.connectionManager.sendToClient(clientId, performanceResponse);
    console.log(`✅ Performance test response sent to client ${clientId}`);
  }

     /**
    * Broadcast to subscribers
    */
   private broadcastToSubscribers(eventType: string, data: any, excludeClientId?: string): void {
     const subscribers: string[] = [];
     
     // Get clients subscribed to this event type
     const allClients = this.connectionManager.getAllClients();
     allClients.forEach((client) => {
       if (client.subscriptions.has(eventType) && client.id !== excludeClientId) {
         subscribers.push(client.id);
       }
     });
     
     const broadcastMessage: WebSocketMessage = {
       type: eventType,
       payload: data,
       timestamp: Date.now(),
       source: 'server',
       broadcast: true
     };
     
     subscribers.forEach((clientId: string) => {
       this.connectionManager.sendToClient(clientId, broadcastMessage);
     });
     
     console.log(`📡 Broadcasted ${eventType} to ${subscribers.length} subscribers`);
   }

  /**
   * Start tunnel health monitoring
   */
  private startTunnelHealthMonitoring(): void {
    setInterval(() => {
      const now = new Date();
      let totalHealthScore = 0;
      let activeTunnels = 0;
      
      // Check each tunnel's health
      for (const [clientId, tunnel] of this.tunnelConnections.entries()) {
        const timeSinceHeartbeat = now.getTime() - tunnel.lastHeartbeat.getTime();
        
        // Reduce health score if no recent heartbeat
        if (timeSinceHeartbeat > 60000) { // 1 minute
          tunnel.healthScore = Math.max(0, tunnel.healthScore - 10);
        }
        
        totalHealthScore += tunnel.healthScore;
        activeTunnels++;
        
        // Remove unhealthy tunnels
        if (tunnel.healthScore <= 0) {
          console.log(`💀 Removing unhealthy tunnel for client ${clientId}`);
          this.tunnelConnections.delete(clientId);
          this.metrics.tunnelMetrics.activeTunnels--;
        }
      }
      
      // Update tunnel metrics
      if (activeTunnels > 0) {
        this.metrics.tunnelMetrics.tunnelHealthScore = totalHealthScore / activeTunnels;
        this.metrics.tunnelMetrics.averageTunnelLatency = this.calculateAverageTunnelLatency();
      }
      
    }, 30000); // Check every 30 seconds
  }

  /**
   * Calculate average tunnel latency
   */
  private calculateAverageTunnelLatency(): number {
    // This would be calculated based on actual latency measurements
    return this.metrics.averageLatency;
  }

  /**
   * Validate token (implement your validation logic)
   */
  private async validateToken(token: string): Promise<boolean> {
    // Implement your token validation logic here
    // For now, return true if token exists
    return !!token;
  }

  /**
   * Get server metrics
   */
  public getServerMetrics(): any {
    return {
      ...this.metrics,
      uptime: Date.now() - this.metrics.uptime,
      activeConnections: this.connectionManager.getAllClients().length,
      tunnelConnections: this.tunnelConnections.size
    };
  }

  /**
   * Get tunnel information
   */
  public getTunnelInfo(clientId: string): any {
    return this.tunnelConnections.get(clientId);
  }

  /**
   * Get all tunnel connections
   */
  public getAllTunnels(): Map<string, any> {
    return new Map(this.tunnelConnections);
  }

  /**
   * Handle pong received
   */
  private handlePongReceived(clientId: string, data: Buffer): void {
    try {
      const pongData = JSON.parse(data.toString());
      const latency = Date.now() - pongData.timestamp;
      this.connectionManager.updateClientLatency(clientId, latency);
    } catch (error) {
      // Ignore malformed pong data
    }
  }

  /**
   * Setup client ping
   */
  private setupClientPing(clientId: string): void {
    const pingInterval = setInterval(() => {
      const client = this.connectionManager.getClient(clientId);
      if (!client) {
        clearInterval(pingInterval);
        return;
      }

      try {
        client.ws.ping(JSON.stringify({ timestamp: Date.now() }));
      } catch (error) {
        console.error(`❌ Ping failed for client ${clientId}:`, error);
      }
    }, 30000); // Ping every 30 seconds
  }

  /**
   * Handle disconnection
   */
  private handleDisconnection(clientId: string, code: number, reason: string): void {
    console.log(`🔌 Client ${clientId} disconnected: ${code} - ${reason}`);
    
    // Remove tunnel connection
    this.tunnelConnections.delete(clientId);
    this.metrics.tunnelMetrics.activeTunnels--;
    
    // Remove from connection manager
    this.connectionManager.removeClient(clientId);
    
    this.emit('client_disconnected', { clientId, code, reason });
  }

  /**
   * Setup service integration
   */
  private setupServiceIntegration(): void {
    // Integration with other services
    console.log('🔗 Setting up service integration...');
  }

  /**
   * Start metrics update
   */
  private startMetricsUpdate(): void {
    setInterval(() => {
      // Update metrics
      this.metrics.averageLatency = this.calculateAverageLatency();
    }, 10000); // Update every 10 seconds
  }

     /**
    * Calculate average latency
    */
   private calculateAverageLatency(): number {
     let totalLatency = 0;
     let clientCount = 0;
     
     const allClients = this.connectionManager.getAllClients();
     allClients.forEach(client => {
       totalLatency += client.latency;
       clientCount++;
     });
     
     return clientCount > 0 ? totalLatency / clientCount : 0;
   }

  /**
   * Generate client ID
   */
  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  // Public methods for external access

  /**
   * Broadcast message to all authenticated clients
   */
  public broadcast(message: WebSocketMessage): void {
    const allClients = this.connectionManager.getAllClients();
    allClients.forEach(client => {
      if (client.isAuthenticated) {
        this.connectionManager.sendToClient(client.id, message);
      }
    });
    console.log(`📡 Broadcasted message to ${allClients.filter(c => c.isAuthenticated).length} authenticated clients`);
  }

  /**
   * Get total client count
   */
  public getClientCount(): number {
    return this.connectionManager.getAllClients().length;
  }

  /**
   * Get authenticated client count
   */
  public getAuthenticatedClientCount(): number {
    return this.connectionManager.getAllClients().filter(client => client.isAuthenticated).length;
  }

  /**
   * Close the WebSocket server
   */
  public async close(): Promise<void> {
    return new Promise((resolve) => {
      this.wss.close(() => {
        console.log('✅ Enhanced WebSocket server closed');
        resolve();
      });
    });
  }

  /**
   * Notify queue update
   */
  public notifyQueueUpdate(queueData: any): void {
    this.broadcastToSubscribers('queue_update', queueData);
  }

  /**
   * Notify booking update
   */
  public notifyBookingUpdate(bookingData: any): void {
    this.broadcastToSubscribers('cash_booking_updated', bookingData);
  }

  /**
   * Notify financial update
   */
  public notifyFinancialUpdate(financialData: any): void {
    this.broadcastToSubscribers('financial_update', financialData);
  }

  /**
   * Notify seat availability update
   */
  public notifySeatAvailabilityUpdate(seatData: any): void {
    this.broadcastToSubscribers('seat_availability_changed', seatData);
  }

  /**
   * Notify dashboard update
   */
  public notifyDashboardUpdate(dashboardData: any): void {
    this.broadcastToSubscribers('dashboard_update', dashboardData);
  }

  /**
   * Get client information
   */
  public getClientInfo(clientId: string): ClientConnection | null {
    return this.connectionManager.getClient(clientId);
  }

  /**
   * Get all clients with info
   */
  public getAllClientsInfo(): Array<{ id: string; info: any }> {
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
} 