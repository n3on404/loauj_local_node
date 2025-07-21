import { Server as WebSocketServer, WebSocket } from 'ws';
import { Server as HTTPServer } from 'http';
import { EventEmitter } from 'events';
import { prisma } from '../config/database';
import * as dashboardController from '../controllers/dashboardController';
import { WebSocketService } from './webSocketService';

interface ClientConnection {
  id: string;
  ws: WebSocket;
  isAuthenticated: boolean;
  lastHeartbeat: Date;
  lastActivity: Date;
  clientType: 'desktop-app' | 'mobile-app' | 'admin' | 'unknown';
  ipAddress: string;
  userAgent?: string | undefined;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'critical';
  latency: number;
  messageCount: number;
  connectedAt: Date;
  subscriptions: Set<string>;
}

interface WebSocketMessage {
  type: string;
  payload?: any;
  timestamp: number;
  messageId?: string;
}

interface ServerMetrics {
  totalConnections: number;
  authenticatedConnections: number;
  messagesSent: number;
  messagesReceived: number;
  averageLatency: number;
  uptime: number;
}

export class EnhancedLocalWebSocketServer extends EventEmitter {
  private wss: WebSocketServer;
  private clients: Map<string, ClientConnection> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private metricsInterval: NodeJS.Timeout | null = null;
  private cleanupInterval: NodeJS.Timeout | null = null;
  private webSocketService: WebSocketService;
  
  // Static instance for global access
  private static instance: EnhancedLocalWebSocketServer | null = null;

  // Connection limits and timeouts
  private readonly HEARTBEAT_INTERVAL = 30000; // 30 seconds
  private readonly CONNECTION_TIMEOUT = 60000; // 1 minute
  private readonly CLEANUP_INTERVAL = 300000; // 5 minutes
  private readonly MAX_CONNECTIONS = 100; // Max concurrent connections
  private readonly MESSAGE_RATE_LIMIT = 100; // Messages per minute per client

  // Metrics
  private metrics: ServerMetrics = {
    totalConnections: 0,
    authenticatedConnections: 0,
    messagesSent: 0,
    messagesReceived: 0,
    averageLatency: 0,
    uptime: Date.now()
  };

  constructor(server: HTTPServer, webSocketService: WebSocketService) {
    super();
    
    this.webSocketService = webSocketService;
    
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
    
    console.log('🚀 Enhanced Local WebSocket Server initializing...');
    
    this.setupWebSocketServer();
    this.startHeartbeatMonitor();
    this.startMetricsCollection();
    this.startPeriodicCleanup();
    this.setupFinancialUpdates();
    
    console.log('✅ Enhanced Local WebSocket Server initialized');
  }

  // Static getter for global access
  public static getLocalWebSocketServer(): EnhancedLocalWebSocketServer | null {
    return EnhancedLocalWebSocketServer.instance;
  }

  private setupWebSocketServer(): void {
    this.wss.on('connection', (ws: WebSocket, request) => {
      // Check connection limits
      if (this.clients.size >= this.MAX_CONNECTIONS) {
        console.warn('⚠️ Connection limit reached, rejecting new connection');
        ws.close(1008, 'Server at capacity');
        return;
      }

      const clientId = this.generateClientId();
      const ipAddress = this.getClientIpAddress(request);
      const userAgent = request.headers['user-agent'];
      
      console.log(`🔌 New enhanced WebSocket connection: ${clientId} from ${ipAddress}`);

      const client: ClientConnection = {
        id: clientId,
        ws,
        isAuthenticated: false,
        lastHeartbeat: new Date(),
        lastActivity: new Date(),
        clientType: 'unknown',
        ipAddress,
        userAgent: userAgent || undefined,
        connectionQuality: 'excellent',
        latency: 0,
        messageCount: 0,
        connectedAt: new Date(),
        subscriptions: new Set()
      };

      this.clients.set(clientId, client);
      this.metrics.totalConnections++;

      // Send enhanced welcome message
      this.sendToClient(clientId, {
        type: 'connected',
        payload: {
          clientId,
          serverVersion: '2.0.0',
          features: ['heartbeat', 'compression', 'reconnection', 'metrics'],
          heartbeatInterval: this.HEARTBEAT_INTERVAL,
          message: 'Connected to Enhanced Louaj Local Server',
          serverTime: new Date().toISOString()
        },
        timestamp: Date.now()
      });

      // Setup enhanced message handlers
      ws.on('message', (data: Buffer) => {
        this.handleMessage(clientId, data);
      });

      ws.on('close', (code: number, reason: Buffer) => {
        this.handleDisconnection(clientId, code, reason.toString());
      });

      ws.on('error', (error: Error) => {
        console.error(`❌ Enhanced WebSocket error for client ${clientId}:`, error.message);
        this.updateClientQuality(clientId, 'critical');
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

  private async handleMessage(clientId: string, data: Buffer): Promise<void> {
    const client = this.clients.get(clientId);
    if (!client) return;

    try {
      const message: WebSocketMessage = JSON.parse(data.toString());
      
      // Update client activity and metrics
      client.lastActivity = new Date();
      client.messageCount++;
      this.metrics.messagesReceived++;
      
      // Rate limiting check
      if (this.isRateLimited(client)) {
        console.warn(`⚠️ Rate limiting client ${clientId}`);
        this.sendToClient(clientId, {
          type: 'error',
          payload: { message: 'Rate limit exceeded' },
          timestamp: Date.now()
        });
        return;
      }

      console.log(`📨 Enhanced message from ${clientId}: ${message.type}`);

      // Handle message based on type
    switch (message.type) {
      case 'authenticate':
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
      
      default:
          console.warn(`❓ Unknown message type: ${message.type} from ${clientId}`);
          this.sendToClient(clientId, {
            type: 'error',
            payload: { message: 'Unknown message type' },
            timestamp: Date.now()
          });
      }

      // Send response for messages with messageId
      if (message.messageId) {
        this.sendToClient(clientId, {
          type: `${message.type}_response`,
          payload: { success: true },
          messageId: message.messageId,
          timestamp: Date.now()
        });
    }

    } catch (error) {
      console.error(`❌ Error processing message from ${clientId}:`, error);
      this.sendToClient(clientId, {
        type: 'error',
        payload: { message: 'Invalid message format' },
        timestamp: Date.now()
      });
    }
  }

  private async handleAuthentication(clientId: string, payload: any): Promise<void> {
    const client = this.clients.get(clientId);
    if (!client) return;

    try {
      // Enhanced authentication logic
      const { clientType, version, features } = payload;

      // Update client information
      client.clientType = this.validateClientType(clientType);
      client.isAuthenticated = true;
      
      this.metrics.authenticatedConnections++;

      console.log(`🔐 Client ${clientId} authenticated as ${client.clientType}`);

      // Send enhanced authentication response
      this.sendToClient(clientId, {
        type: 'authenticated',
        payload: {
          clientId,
          clientType: client.clientType,
          features: ['real-time-updates', 'compression', 'metrics'],
          serverCapabilities: {
            maxMessageSize: 1024 * 1024, // 1MB
            compression: true,
            heartbeat: true,
            subscriptions: true
          },
          serverTime: new Date().toISOString()
        },
        timestamp: Date.now()
      });
      
      // Send initial data based on client type
      await this.sendInitialData(clientId);

      this.emit('client_authenticated', { clientId, clientType: client.clientType });

    } catch (error) {
      console.error(`❌ Authentication error for ${clientId}:`, error);
      
      this.sendToClient(clientId, {
        type: 'auth_error',
        payload: { message: 'Authentication failed' },
        timestamp: Date.now()
      });
    }
  }

  private async handleHeartbeat(clientId: string, payload: any): Promise<void> {
    const client = this.clients.get(clientId);
    if (!client) return;

    const now = Date.now();
    const heartbeatTimestamp = payload?.timestamp;
    
    if (heartbeatTimestamp) {
      const latency = now - heartbeatTimestamp;
      this.updateClientLatency(clientId, latency);
    }

    client.lastHeartbeat = new Date();
    
    // Send heartbeat acknowledgment
    this.sendToClient(clientId, {
      type: 'heartbeat_ack',
      payload: { 
        timestamp: heartbeatTimestamp,
        serverTime: now,
        latency: client.latency
      },
      timestamp: now
    });
  }

  private handleSubscription(clientId: string, payload: any): void {
    const client = this.clients.get(clientId);
    if (!client || !client.isAuthenticated) return;

    const { topics } = payload;
    if (Array.isArray(topics)) {
      topics.forEach(topic => {
        if (typeof topic === 'string') {
          client.subscriptions.add(topic);
        }
      });
      
      console.log(`📢 Client ${clientId} subscribed to: ${topics.join(', ')}`);
      
      this.sendToClient(clientId, {
        type: 'subscription_confirmed',
        payload: { topics: Array.from(client.subscriptions) },
        timestamp: Date.now()
      });
    }
  }

  private handleUnsubscription(clientId: string, payload: any): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    const { topics } = payload;
    if (Array.isArray(topics)) {
      topics.forEach(topic => {
        client.subscriptions.delete(topic);
      });
      
      console.log(`📢 Client ${clientId} unsubscribed from: ${topics.join(', ')}`);
    }
  }

  private async handleDashboardDataRequest(clientId: string): Promise<void> {
    const client = this.clients.get(clientId);
    if (!client || !client.isAuthenticated) {
      this.sendToClient(clientId, {
        type: 'data_error',
        payload: { message: 'Authentication required' },
        timestamp: Date.now()
      });
      return;
    }

    try {
      const dashboardData = await this.collectDashboardData();
      
      this.sendToClient(clientId, {
        type: 'dashboard_data',
        payload: dashboardData,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('❌ Error collecting dashboard data:', error);
      
      this.sendToClient(clientId, {
        type: 'data_error',
        payload: { message: 'Failed to collect dashboard data' },
        timestamp: Date.now()
      });
    }
  }

  private handleConnectionTest(clientId: string, payload: any): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    this.sendToClient(clientId, {
      type: 'connection_test_response',
      payload: {
        received: payload,
        serverTime: new Date().toISOString(),
        latency: client.latency,
        quality: client.connectionQuality
      },
      timestamp: Date.now()
    });
  }

  private handleClientInfo(clientId: string, payload: any): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    if (payload.clientType) {
      client.clientType = this.validateClientType(payload.clientType);
      console.log(`ℹ️ Client ${clientId} identified as ${client.clientType}`);
    }
  }

  private setupClientPing(clientId: string): void {
    const pingInterval = setInterval(() => {
      const client = this.clients.get(clientId);
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
    }, this.HEARTBEAT_INTERVAL);
  }

  private handlePongReceived(clientId: string, data: Buffer): void {
    try {
      const pongData = JSON.parse(data.toString());
      const latency = Date.now() - pongData.timestamp;
      this.updateClientLatency(clientId, latency);
    } catch (error) {
      // Ignore malformed pong data
    }
  }

  private updateClientLatency(clientId: string, latency: number): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    client.latency = latency;
    
    // Update connection quality based on latency
    if (latency < 100) {
      client.connectionQuality = 'excellent';
    } else if (latency < 300) {
      client.connectionQuality = 'good';
    } else if (latency < 1000) {
      client.connectionQuality = 'poor';
    } else {
      client.connectionQuality = 'critical';
    }

    // Update server metrics
    const totalLatency = Array.from(this.clients.values())
      .reduce((sum, c) => sum + c.latency, 0);
    this.metrics.averageLatency = totalLatency / this.clients.size;
  }

  private updateClientQuality(clientId: string, quality: ClientConnection['connectionQuality']): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.connectionQuality = quality;
    }
  }

  private isRateLimited(client: ClientConnection): boolean {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Simple rate limiting - could be enhanced with sliding window
    return client.messageCount > this.MESSAGE_RATE_LIMIT;
  }

  private handleMetricsRequest(clientId: string): void {
    const client = this.clients.get(clientId);
    if (!client || !client.isAuthenticated) return;

    const serverMetrics = {
      ...this.metrics,
      uptime: Date.now() - this.metrics.uptime,
      clients: {
        total: this.clients.size,
        authenticated: Array.from(this.clients.values()).filter(c => c.isAuthenticated).length,
        byType: this.getClientsByType(),
        byQuality: this.getClientsByQuality()
      }
    };
      
      this.sendToClient(clientId, {
      type: 'metrics_response',
      payload: serverMetrics,
      timestamp: Date.now()
    });
  }

  private setupFinancialUpdates(): void {
    // Subscribe to financial updates from services
    this.webSocketService.on('financial_update', (data: any) => {
      this.broadcastToSubscribers('financial', {
        type: 'financial_update',
        payload: data,
        timestamp: Date.now()
      });
    });

    // Subscribe to booking updates
    this.webSocketService.on('booking_update', (data: any) => {
      console.log('📡 Broadcasting booking_update to clients:', data);
      this.broadcast({
        type: 'booking_update',
        payload: data,
        timestamp: Date.now()
      });
      
      // Also broadcast specific seat availability update if destination info is available
      if (data.destinationId) {
        this.broadcastSeatAvailabilityUpdate(data.destinationId);
      }
    });

    // Subscribe to queue updates
    this.webSocketService.on('queue_update', (data: any) => {
      console.log('📡 Broadcasting queue_update to clients:', data);
      this.broadcast({
        type: 'queue_update',
        payload: data,
        timestamp: Date.now()
      });
      
      // Also broadcast specific seat availability update if destination info is available
      if (data.destinationId) {
        this.broadcastSeatAvailabilityUpdate(data.destinationId);
      }
    });
    
    // Subscribe to cash booking updates
    this.webSocketService.on('cash_booking_updated', (data: any) => {
      console.log('📡 Broadcasting cash_booking_updated to clients:', data);
      this.broadcast({
        type: 'cash_booking_updated',
        payload: data,
        timestamp: Date.now()
      });
      
      // Also broadcast specific seat availability update if destination info is available
      if (data.destinationId) {
        this.broadcastSeatAvailabilityUpdate(data.destinationId);
      }
    });
    
    // Subscribe to queue updated events (from queue service)
    this.webSocketService.on('queue_updated', (data: any) => {
      console.log('📡 Broadcasting queue_updated to clients:', data);
      this.broadcast({
        type: 'queue_updated',
        payload: data,
        timestamp: Date.now()
      });
      
      // Also broadcast specific seat availability update if destination info is available
      if (data.destinationId) {
        this.broadcastSeatAvailabilityUpdate(data.destinationId);
      }
    });

    // Subscribe to seat availability changes (new event type)
    this.webSocketService.on('seat_availability_changed', (data: any) => {
      console.log('📡 Broadcasting seat_availability_changed to clients:', data);
      this.broadcast({
        type: 'seat_availability_changed',
        payload: data,
        timestamp: Date.now()
      });
    });
  }

  private handleDisconnection(clientId: string, code: number, reason: string): void {
    console.log(`❌ Client disconnected: ${clientId} - Code: ${code}, Reason: ${reason}`);
    
    const client = this.clients.get(clientId);
    if (client && client.isAuthenticated) {
      this.metrics.authenticatedConnections--;
    }
    
    this.clients.delete(clientId);
    this.emit('client_disconnected', { clientId, code, reason });
  }

  private startHeartbeatMonitor(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    
    this.heartbeatInterval = setInterval(() => {
      const now = new Date();
      
      this.clients.forEach((client, clientId) => {
        const timeSinceLastHeartbeat = now.getTime() - client.lastHeartbeat.getTime();
        
        // If no heartbeat for 2 minutes, consider the connection dead
        if (timeSinceLastHeartbeat > this.CONNECTION_TIMEOUT * 2) {
          console.log(`⏱️ Client ${clientId} timed out (no heartbeat for ${Math.round(timeSinceLastHeartbeat / 1000)}s)`);
          
          try {
            client.ws.terminate();
          } catch (error) {
            console.error(`❌ Error terminating connection for ${clientId}:`, error);
          }
          
          this.handleDisconnection(clientId, 1001, 'Heartbeat timeout');
        }
      });
    }, this.HEARTBEAT_INTERVAL);
  }

  private startMetricsCollection(): void {
    this.metricsInterval = setInterval(() => {
      // Update connection quality based on various factors
      this.clients.forEach((client, clientId) => {
        const timeSinceActivity = Date.now() - client.lastActivity.getTime();
        
        if (timeSinceActivity > 60000) { // 1 minute
          this.updateClientQuality(clientId, 'poor');
        } else if (timeSinceActivity > 30000) { // 30 seconds
          this.updateClientQuality(clientId, 'good');
        }
      });
    }, 60000); // Every minute
  }

  private startPeriodicCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      // Reset message counts for rate limiting
      this.clients.forEach(client => {
        client.messageCount = 0;
      });
      
      console.log(`🧹 Periodic cleanup completed. Active connections: ${this.clients.size}`);
    }, this.CLEANUP_INTERVAL);
  }

  private generateClientId(): string {
    return `client-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  }

  private getClientIpAddress(request: any): string {
    return request.socket.remoteAddress || 
           request.headers['x-forwarded-for'] || 
           request.headers['x-real-ip'] || 
           'unknown';
  }

  private validateClientType(clientType: string): ClientConnection['clientType'] {
    const validTypes: ClientConnection['clientType'][] = ['desktop-app', 'mobile-app', 'admin', 'unknown'];
    return validTypes.includes(clientType as any) ? clientType as any : 'unknown';
  }

  private async sendInitialData(clientId: string): Promise<void> {
    try {
      const dashboardData = await this.collectDashboardData();
      
      this.sendToClient(clientId, {
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
      return await dashboardController.getAllDashboardData();
    } catch (error) {
      console.error('❌ Error collecting dashboard data:', error);
      throw error;
    }
  }

  private getClientsByType(): Record<string, number> {
    const counts: Record<string, number> = {};
    
    this.clients.forEach(client => {
      counts[client.clientType] = (counts[client.clientType] || 0) + 1;
    });
    
    return counts;
  }

  private getClientsByQuality(): Record<string, number> {
    const counts: Record<string, number> = {};
    
    this.clients.forEach(client => {
      counts[client.connectionQuality] = (counts[client.connectionQuality] || 0) + 1;
    });
    
    return counts;
  }

  // Enhanced public methods

  public broadcastToSubscribers(topic: string, message: WebSocketMessage): void {
    let sentCount = 0;
    
    this.clients.forEach((client, clientId) => {
      if (client.isAuthenticated && client.subscriptions.has(topic)) {
        if (this.sendToClient(clientId, message)) {
          sentCount++;
        }
      }
    });

    console.log(`📡 Broadcast to ${sentCount} subscribers of topic: ${topic}`);
  }

  public broadcast(message: WebSocketMessage): void {
    let sentCount = 0;
    
    this.clients.forEach((client, clientId) => {
      if (client.isAuthenticated) {
        if (this.sendToClient(clientId, message)) {
          sentCount++;
        }
      }
    });

    this.metrics.messagesSent += sentCount;
    console.log(`📡 Broadcast message to ${sentCount} authenticated clients`);
  }

  public sendToClient(clientId: string, message: WebSocketMessage): boolean {
    const client = this.clients.get(clientId);
    
    if (!client || client.ws.readyState !== WebSocket.OPEN) {
      return false;
    }

    try {
      const messageString = JSON.stringify(message);
      client.ws.send(messageString);
      this.metrics.messagesSent++;
      return true;
    } catch (error) {
      console.error(`❌ Error sending message to ${clientId}:`, error);
      return false;
    }
  }

  public getServerMetrics(): ServerMetrics & { clients: any } {
    return {
      ...this.metrics,
      uptime: Date.now() - this.metrics.uptime,
      clients: {
        total: this.clients.size,
        authenticated: this.metrics.authenticatedConnections,
        byType: this.getClientsByType(),
        byQuality: this.getClientsByQuality()
      }
    };
  }

  public getClientInfo(clientId: string): ClientConnection | null {
    return this.clients.get(clientId) || null;
  }

  public getAllClients(): Array<{ id: string; info: Omit<Partial<ClientConnection>, 'subscriptions'> & { subscriptions?: string[] } }> {
    return Array.from(this.clients.entries()).map(([id, client]) => ({
      id,
      info: {
        clientType: client.clientType,
        isAuthenticated: client.isAuthenticated,
        connectionQuality: client.connectionQuality,
        latency: client.latency,
        connectedAt: client.connectedAt,
        subscriptions: Array.from(client.subscriptions)
      }
    }));
  }

  // Enhanced notification methods (keeping backward compatibility)
  public notifyFinancialUpdate(financialData: any): void {
    this.broadcastToSubscribers('financial', {
      type: 'financial_update',
      payload: financialData,
      timestamp: Date.now()
    });
  }

  public notifyBookingUpdate(bookingData: any): void {
    this.broadcastToSubscribers('bookings', {
      type: 'booking_update',
      payload: bookingData,
      timestamp: Date.now()
    });
  }

  public notifyQueueUpdate(queueData: any): void {
    this.broadcastToSubscribers('queues', {
      type: 'queue_update',
      payload: queueData,
      timestamp: Date.now()
    });
  }

  public notifyOvernightQueueUpdate(overnightQueueData: any): void {
    this.broadcastToSubscribers('overnight_queue', {
      type: 'overnight_queue_update',
      payload: overnightQueueData,
      timestamp: Date.now()
    });
  }

  public notifyStaffUpdate(staffData: any): void {
    this.broadcastToSubscribers('staff', {
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

    this.broadcast({
      type: 'dashboard_update',
      payload,
      timestamp: Date.now()
    });
  }

  // Get client count
  public getClientCount(): number {
    return this.clients.size;
  }

  // Get authenticated client count
  public getAuthenticatedClientCount(): number {
    return this.metrics.authenticatedConnections;
  }

  // Close all connections
  public async close(): Promise<void> {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
      this.metricsInterval = null;
    }
    
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    
    this.clients.forEach((client, clientId) => {
      try {
        client.ws.terminate();
      } catch (error) {
        console.error(`❌ Error closing connection for ${clientId}:`, error);
      }
    });
    
    this.clients.clear();
    
    // Close the WebSocket server
    return new Promise((resolve) => {
      this.wss.close(() => {
        console.log('✅ Enhanced WebSocket server closed');
        resolve();
      });
    });
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
        this.broadcast({
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
        this.broadcast({
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
    this.broadcast(message);
    
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
    this.broadcast(message);
    
    console.log(`🎉 Broadcasted booking success: ${bookingData.seatsBooked} seats booked for ${bookingData.destinationName}`);
  }
}

// Export function for external access
export function getLocalWebSocketServer(): EnhancedLocalWebSocketServer | null {
  return EnhancedLocalWebSocketServer.getInstance();
} 