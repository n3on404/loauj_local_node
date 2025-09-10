import { EventEmitter } from 'events';
import { WebSocket } from 'ws';
import { Server as HTTPServer } from 'http';

export interface ClientConnection {
  id: string;
  ws: WebSocket;
  isAuthenticated: boolean;
  lastHeartbeat: Date;
  lastActivity: Date;
  clientType: 'desktop-app' | 'mobile-app' | 'admin' | 'unknown';
  ipAddress: string;
  userAgent?: string;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'critical';
  latency: number;
  messageCount: number;
  connectedAt: Date;
  subscriptions: Set<string>;
  priority: 'high' | 'normal' | 'low';
  loadBalancingGroup: string;
  connectionPool: string;
  messageQueue: Array<{ message: any; priority: number; timestamp: number }>;
  isProcessing: boolean;
}

export interface ConnectionPool {
  id: string;
  maxConnections: number;
  currentConnections: number;
  clients: Set<string>;
  loadBalancingStrategy: 'round-robin' | 'least-connections' | 'weighted';
  healthScore: number;
  lastHealthCheck: Date;
}

export interface LoadBalancingMetrics {
  totalConnections: number;
  activeConnections: number;
  connectionPools: Map<string, ConnectionPool>;
  averageLatency: number;
  messageThroughput: number;
  errorRate: number;
  lastUpdate: Date;
}

export class ConnectionManager extends EventEmitter {
  private clients: Map<string, ClientConnection> = new Map();
  private connectionPools: Map<string, ConnectionPool> = new Map();
  private loadBalancingMetrics: LoadBalancingMetrics;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private metricsUpdateInterval: NodeJS.Timeout | null = null;
  private messageProcessingInterval: NodeJS.Timeout | null = null;
  
  // Configuration
  private readonly MAX_CONNECTIONS_PER_POOL = 50;
  private readonly MAX_TOTAL_CONNECTIONS = 500;
  private readonly HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
  private readonly METRICS_UPDATE_INTERVAL = 10000; // 10 seconds
  private readonly MESSAGE_PROCESSING_INTERVAL = 100; // 100ms
  private readonly CONNECTION_TIMEOUT = 120000; // 2 minutes
  private readonly MESSAGE_QUEUE_SIZE_LIMIT = 1000;

  constructor() {
    super();
    
    this.loadBalancingMetrics = {
      totalConnections: 0,
      activeConnections: 0,
      connectionPools: new Map(),
      averageLatency: 0,
      messageThroughput: 0,
      errorRate: 0,
      lastUpdate: new Date()
    };

    this.initializeConnectionPools();
    this.startHealthMonitoring();
    this.startMetricsCollection();
    this.startMessageProcessing();
    
    console.log('🚀 Connection Manager initialized with advanced load balancing');
  }

  private initializeConnectionPools(): void {
    // Create connection pools for different client types
    const poolConfigs = [
      { id: 'desktop-apps', maxConnections: 100, strategy: 'round-robin' as const },
      { id: 'mobile-apps', maxConnections: 200, strategy: 'least-connections' as const },
      { id: 'admin-clients', maxConnections: 50, strategy: 'weighted' as const },
      { id: 'system-clients', maxConnections: 50, strategy: 'weighted' as const }
    ];

    poolConfigs.forEach(config => {
      this.connectionPools.set(config.id, {
        id: config.id,
        maxConnections: config.maxConnections,
        currentConnections: 0,
        clients: new Set(),
        loadBalancingStrategy: config.strategy,
        healthScore: 100,
        lastHealthCheck: new Date()
      });
    });

    console.log(`✅ Initialized ${poolConfigs.length} connection pools`);
  }

  public addClient(clientId: string, ws: WebSocket, request: any): ClientConnection | null {
    // Check if we can accept more connections
    if (this.clients.size >= this.MAX_TOTAL_CONNECTIONS) {
      console.warn('⚠️ Maximum total connections reached, rejecting new connection');
      return null;
    }

    const ipAddress = this.getClientIpAddress(request);
    const userAgent = request.headers['user-agent'];
    const clientType = this.determineClientType(userAgent);
    const poolId = this.selectConnectionPool(clientType);

    // Check if the selected pool can accept more connections
    const pool = this.connectionPools.get(poolId);
    if (!pool || pool.currentConnections >= pool.maxConnections) {
      console.warn(`⚠️ Pool ${poolId} is at capacity, rejecting connection`);
      return null;
    }

    const client: ClientConnection = {
      id: clientId,
      ws,
      isAuthenticated: false,
      lastHeartbeat: new Date(),
      lastActivity: new Date(),
      clientType,
      ipAddress,
      userAgent,
      connectionQuality: 'excellent',
      latency: 0,
      messageCount: 0,
      connectedAt: new Date(),
      subscriptions: new Set(),
      priority: this.determineClientPriority(clientType),
      loadBalancingGroup: poolId,
      connectionPool: poolId,
      messageQueue: [],
      isProcessing: false
    };

    // Add client to pool and manager
    this.clients.set(clientId, client);
    pool.clients.add(clientId);
    pool.currentConnections++;
    this.loadBalancingMetrics.totalConnections++;
    this.loadBalancingMetrics.activeConnections++;

    console.log(`🔌 Client ${clientId} added to pool ${poolId} (${pool.currentConnections}/${pool.maxConnections})`);
    
    this.emit('client_added', { clientId, clientType, poolId });
    return client;
  }

  public removeClient(clientId: string): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    // Remove from pool
    const pool = this.connectionPools.get(client.connectionPool);
    if (pool) {
      pool.clients.delete(clientId);
      pool.currentConnections--;
    }

    // Remove from manager
    this.clients.delete(clientId);
    this.loadBalancingMetrics.totalConnections--;
    this.loadBalancingMetrics.activeConnections--;

    console.log(`❌ Client ${clientId} removed from pool ${client.connectionPool}`);
    this.emit('client_removed', { clientId, poolId: client.connectionPool });
  }

  public getClient(clientId: string): ClientConnection | null {
    return this.clients.get(clientId) || null;
  }

  public getAllClients(): ClientConnection[] {
    return Array.from(this.clients.values());
  }

  public getClientsByPool(poolId: string): ClientConnection[] {
    return Array.from(this.clients.values()).filter(client => client.connectionPool === poolId);
  }

  public getConnectionPool(poolId: string): ConnectionPool | null {
    return this.connectionPools.get(poolId) || null;
  }

  public getAllConnectionPools(): ConnectionPool[] {
    return Array.from(this.connectionPools.values());
  }

  public getLoadBalancingMetrics(): LoadBalancingMetrics {
    return { ...this.loadBalancingMetrics };
  }

  public updateClientLatency(clientId: string, latency: number): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    client.latency = latency;
    
    // Update connection quality based on latency
    if (latency < 50) {
      client.connectionQuality = 'excellent';
    } else if (latency < 150) {
      client.connectionQuality = 'good';
    } else if (latency < 500) {
      client.connectionQuality = 'poor';
    } else {
      client.connectionQuality = 'critical';
    }

    // Update pool health score
    this.updatePoolHealthScore(client.connectionPool);
  }

  public updateClientActivity(clientId: string): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.lastActivity = new Date();
      client.messageCount++;
    }
  }

  public authenticateClient(clientId: string, authData: any): boolean {
    const client = this.clients.get(clientId);
    if (!client) return false;

    client.isAuthenticated = true;
    client.clientType = authData.clientType || client.clientType;
    client.priority = this.determineClientPriority(client.clientType);

    console.log(`🔐 Client ${clientId} authenticated as ${client.clientType} with priority ${client.priority}`);
    this.emit('client_authenticated', { clientId, clientType: client.clientType, priority: client.priority });
    
    return true;
  }

  public addSubscription(clientId: string, topics: string[]): boolean {
    const client = this.clients.get(clientId);
    if (!client || !client.isAuthenticated) return false;

    topics.forEach(topic => client.subscriptions.add(topic));
    console.log(`📢 Client ${clientId} subscribed to: ${topics.join(', ')}`);
    
    return true;
  }

  public removeSubscription(clientId: string, topics: string[]): boolean {
    const client = this.clients.get(clientId);
    if (!client) return false;

    topics.forEach(topic => client.subscriptions.delete(topic));
    console.log(`📢 Client ${clientId} unsubscribed from: ${topics.join(', ')}`);
    
    return true;
  }

  public queueMessage(clientId: string, message: any, priority: number = 1): boolean {
    const client = this.clients.get(clientId);
    if (!client) return false;

    // Check queue size limit
    if (client.messageQueue.length >= this.MESSAGE_QUEUE_SIZE_LIMIT) {
      console.warn(`⚠️ Message queue full for client ${clientId}, dropping message`);
      return false;
    }

    client.messageQueue.push({
      message,
      priority,
      timestamp: Date.now()
    });

    // Sort queue by priority (higher priority first)
    client.messageQueue.sort((a, b) => b.priority - a.priority);

    return true;
  }

  public broadcastToSubscribers(topic: string, message: any, priority: number = 1): number {
    let sentCount = 0;
    
    this.clients.forEach((client, clientId) => {
      if (client.isAuthenticated && client.subscriptions.has(topic)) {
        if (this.queueMessage(clientId, message, priority)) {
          sentCount++;
        }
      }
    });

    console.log(`📡 Queued message for ${sentCount} subscribers of topic: ${topic}`);
    return sentCount;
  }

  public broadcast(message: any, priority: number = 1): number {
    let sentCount = 0;
    
    this.clients.forEach((client, clientId) => {
      if (client.isAuthenticated) {
        if (this.queueMessage(clientId, message, priority)) {
          sentCount++;
        }
      }
    });

    console.log(`📡 Queued broadcast message for ${sentCount} authenticated clients`);
    return sentCount;
  }

  public sendToClient(clientId: string, message: any, priority: number = 1): boolean {
    const client = this.clients.get(clientId);
    if (!client) return false;

    return this.queueMessage(clientId, message, priority);
  }

  private selectConnectionPool(clientType: string): string {
    // Select pool based on client type
    switch (clientType) {
      case 'desktop-app':
        return 'desktop-apps';
      case 'mobile-app':
        return 'mobile-apps';
      case 'admin':
        return 'admin-clients';
      default:
        return 'system-clients';
    }
  }

  private determineClientType(userAgent?: string): 'desktop-app' | 'mobile-app' | 'admin' | 'unknown' {
    if (!userAgent) return 'unknown';
    
    if (userAgent.includes('Tauri')) return 'desktop-app';
    if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) return 'mobile-app';
    if (userAgent.includes('Admin') || userAgent.includes('Supervisor')) return 'admin';
    
    return 'unknown';
  }

  private determineClientPriority(clientType: string): 'high' | 'normal' | 'low' {
    switch (clientType) {
      case 'admin':
        return 'high';
      case 'desktop-app':
        return 'normal';
      case 'mobile-app':
        return 'normal';
      default:
        return 'low';
    }
  }

  private getClientIpAddress(request: any): string {
    return request.socket.remoteAddress || 
           request.headers['x-forwarded-for'] || 
           request.headers['x-real-ip'] || 
           'unknown';
  }

  private updatePoolHealthScore(poolId: string): void {
    const pool = this.connectionPools.get(poolId);
    if (!pool) return;

    const clients = this.getClientsByPool(poolId);
    if (clients.length === 0) {
      pool.healthScore = 100;
      return;
    }

    // Calculate health score based on connection quality and latency
    const totalQuality = clients.reduce((sum, client) => {
      const qualityScore = {
        'excellent': 100,
        'good': 80,
        'poor': 50,
        'critical': 20
      }[client.connectionQuality] || 50;
      
      return sum + qualityScore;
    }, 0);

    const averageQuality = totalQuality / clients.length;
    const averageLatency = clients.reduce((sum, client) => sum + client.latency, 0) / clients.length;
    
    // Latency penalty: reduce score for high latency
    const latencyPenalty = Math.min(averageLatency / 1000 * 20, 40); // Max 40 point penalty
    
    pool.healthScore = Math.max(0, Math.round(averageQuality - latencyPenalty));
    pool.lastHealthCheck = new Date();
  }

  private startHealthMonitoring(): void {
    this.healthCheckInterval = setInterval(() => {
      const now = new Date();
      
      // Check for stale connections
      this.clients.forEach((client, clientId) => {
        const timeSinceActivity = now.getTime() - client.lastActivity.getTime();
        
        if (timeSinceActivity > this.CONNECTION_TIMEOUT) {
          console.log(`⏱️ Client ${clientId} timed out, removing...`);
          this.removeClient(clientId);
          
          try {
            client.ws.terminate();
          } catch (error) {
            console.error(`❌ Error terminating connection for ${clientId}:`, error);
          }
        }
      });

      // Update pool health scores
      this.connectionPools.forEach((pool, poolId) => {
        this.updatePoolHealthScore(poolId);
      });

      // Emit health update event
      this.emit('health_update', {
        pools: this.getAllConnectionPools(),
        timestamp: now
      });

    }, this.HEALTH_CHECK_INTERVAL);

    console.log(`🔍 Health monitoring started (interval: ${this.HEALTH_CHECK_INTERVAL / 1000}s)`);
  }

  private startMetricsCollection(): void {
    this.metricsUpdateInterval = setInterval(() => {
      const now = Date.now();
      
      // Calculate average latency
      const totalLatency = Array.from(this.clients.values())
        .reduce((sum, client) => sum + client.latency, 0);
      this.loadBalancingMetrics.averageLatency = 
        this.clients.size > 0 ? totalLatency / this.clients.size : 0;

      // Calculate message throughput
      const totalMessages = Array.from(this.clients.values())
        .reduce((sum, client) => sum + client.messageCount, 0);
      this.loadBalancingMetrics.messageThroughput = totalMessages;

      // Update timestamp
      this.loadBalancingMetrics.lastUpdate = new Date();

      // Emit metrics update event
      this.emit('metrics_update', this.loadBalancingMetrics);

    }, this.METRICS_UPDATE_INTERVAL);

    console.log(`📊 Metrics collection started (interval: ${this.METRICS_UPDATE_INTERVAL / 1000}s)`);
  }

  private startMessageProcessing(): void {
    this.messageProcessingInterval = setInterval(() => {
      this.clients.forEach((client, clientId) => {
        if (client.messageQueue.length > 0 && !client.isProcessing) {
          this.processClientMessageQueue(clientId);
        }
      });
    }, this.MESSAGE_PROCESSING_INTERVAL);

    console.log(`📨 Message processing started (interval: ${this.MESSAGE_PROCESSING_INTERVAL}ms)`);
  }

  private async processClientMessageQueue(clientId: string): Promise<void> {
    const client = this.clients.get(clientId);
    if (!client || client.messageQueue.length === 0 || client.isProcessing) return;

    client.isProcessing = true;

    try {
      // Process up to 10 messages per cycle to prevent blocking
      const messagesToProcess = client.messageQueue.splice(0, 10);
      
      for (const queuedMessage of messagesToProcess) {
        if (client.ws.readyState === WebSocket.OPEN) {
          try {
            const messageString = JSON.stringify(queuedMessage.message);
            client.ws.send(messageString);
            
            // Update metrics
            this.loadBalancingMetrics.messageThroughput++;
            
          } catch (error) {
            console.error(`❌ Error sending message to ${clientId}:`, error);
            // Put message back in queue if it's a temporary error
            if (queuedMessage.priority > 1) {
              client.messageQueue.unshift(queuedMessage);
            }
          }
        } else {
          // Connection is closed, remove client
          console.log(`🔌 Client ${clientId} connection closed, removing...`);
          this.removeClient(clientId);
          return;
        }
      }
    } finally {
      client.isProcessing = false;
    }
  }

  public getConnectionStats(): any {
    const poolStats = Array.from(this.connectionPools.entries()).map(([id, pool]) => ({
      id,
      currentConnections: pool.currentConnections,
      maxConnections: pool.maxConnections,
      utilization: Math.round((pool.currentConnections / pool.maxConnections) * 100),
      healthScore: pool.healthScore,
      loadBalancingStrategy: pool.loadBalancingStrategy
    }));

    const clientStats = {
      total: this.clients.size,
      authenticated: Array.from(this.clients.values()).filter(c => c.isAuthenticated).length,
      byType: this.getClientCountByType(),
      byQuality: this.getClientCountByQuality(),
      byPriority: this.getClientCountByPriority()
    };

    return {
      pools: poolStats,
      clients: clientStats,
      metrics: this.loadBalancingMetrics,
      timestamp: new Date().toISOString()
    };
  }

  private getClientCountByType(): Record<string, number> {
    const counts: Record<string, number> = {};
    this.clients.forEach(client => {
      counts[client.clientType] = (counts[client.clientType] || 0) + 1;
    });
    return counts;
  }

  private getClientCountByQuality(): Record<string, number> {
    const counts: Record<string, number> = {};
    this.clients.forEach(client => {
      counts[client.connectionQuality] = (counts[client.connectionQuality] || 0) + 1;
    });
    return counts;
  }

  private getClientCountByPriority(): Record<string, number> {
    const counts: Record<string, number> = {};
    this.clients.forEach(client => {
      counts[client.priority] = (counts[client.priority] || 0) + 1;
    });
    return counts;
  }

  public cleanup(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    
    if (this.metricsUpdateInterval) {
      clearInterval(this.metricsUpdateInterval);
      this.metricsUpdateInterval = null;
    }
    
    if (this.messageProcessingInterval) {
      clearInterval(this.messageProcessingInterval);
      this.messageProcessingInterval = null;
    }

    console.log('🧹 Connection Manager cleanup completed');
  }

  /**
   * Get total client count
   */
  public getClientCount(): number {
    return this.clients.size;
  }

  /**
   * Get authenticated client count
   */
  public getAuthenticatedClientCount(): number {
    return Array.from(this.clients.values()).filter(client => client.isAuthenticated).length;
  }

  /**
   * Update client quality (alias for updateClientActivity)
   */
  public updateClientQuality(clientId: string, quality: 'excellent' | 'good' | 'poor' | 'critical'): void {
    const client = this.clients.get(clientId);
    if (client) {
      client.connectionQuality = quality;
      this.updateClientActivity(clientId);
    }
  }
} 