import mqtt, { MqttClient } from 'mqtt';
import { EventEmitter } from 'events';
import { QueueService } from './queueService';

export interface MqttMessage {
  type: string;
  data?: any;
  payload?: any;
  timestamp: string;
  priority?: number;
  entityType?: string;
  entityId?: string;
  operationId?: string;
  messageId?: string;
  retryCount?: number;
  source?: 'client' | 'server' | 'local_node';
  target?: string;
  broadcast?: boolean;
  clientId?: string;
}

export interface ConnectionMetrics {
  latency: number;
  messageThroughput: number;
  errorRate: number;
  lastHeartbeat: Date;
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
  uptime: number;
  messagesSent: number;
  messagesReceived: number;
  reconnectionAttempts: number;
  lastReconnection: Date | null;
  connectedClients: number;
}

export interface ClientConnection {
  id: string;
  clientType: string;
  connectedAt: Date;
  lastActivity: Date;
  isAuthenticated: boolean;
  subscriptions: Set<string>;
  latency: number;
  messagesSent: number;
  messagesReceived: number;
}

interface LicensePlateDetection {
  licensePlate: string;
  confidence: number;
  timestamp: string;
  stationId: string;
  cameraId?: string;
  imageBase64?: string;
  bbox?: number[];
}

interface MQTTConfig {
  brokerUrl: string;
  username: string | undefined;
  password: string | undefined;
  clientId: string;
  topics: {
    plateDetection: string;
    stationStatus: string;
    systemCommands: string;
    // New topics for replacing WebSocket functionality
    clientCommands: string;
    clientUpdates: string;
    queueUpdates: string;
    bookingUpdates: string;
    financialUpdates: string;
    dashboardUpdates: string;
    seatAvailability: string;
    concurrencySync: string;
    realTimeSync: string;
    authentication: string;
    heartbeat: string;
    subscriptions: string;
  };
}

export class EnhancedMQTTService extends EventEmitter {
  private client: MqttClient | null = null;
  private config: MQTTConfig;
  private queueService: QueueService | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectInterval = 5000; // 5 seconds
  private heartbeatInterval: NodeJS.Timeout | null = null;
  
  // Client management
  private connectedClients: Map<string, ClientConnection> = new Map();
  private subscriptions: Map<string, Set<string>> = new Map(); // topic -> clientIds
  
  // Metrics
  private metrics: ConnectionMetrics = {
    latency: 0,
    messageThroughput: 0,
    errorRate: 0,
    lastHeartbeat: new Date(),
    connectionQuality: 'fair',
    uptime: 0,
    messagesSent: 0,
    messagesReceived: 0,
    reconnectionAttempts: 0,
    lastReconnection: null,
    connectedClients: 0,
  };
  
  // Message queuing and reliability
  private messageQueue: Map<string, MqttMessage[]> = new Map();
  private failedMessages: Map<string, { message: MqttMessage; retryCount: number; lastAttempt: Date }> = new Map();
  private messageAcknowledgments: Map<string, boolean> = new Map();

  constructor(config: MQTTConfig, queueService?: QueueService) {
    super();
    this.config = {
      ...config,
      topics: {
        ...config.topics,
        // Enhanced topics for WebSocket replacement
        clientCommands: `louaj/stations/${process.env.STATION_ID || 'unknown'}/client-commands`,
        clientUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/client-updates`,
        queueUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/queue-updates`,
        bookingUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/booking-updates`,
        financialUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/financial-updates`,
        dashboardUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/dashboard-updates`,
        seatAvailability: `louaj/stations/${process.env.STATION_ID || 'unknown'}/seat-availability`,
        concurrencySync: `louaj/stations/${process.env.STATION_ID || 'unknown'}/concurrency-sync`,
        realTimeSync: `louaj/stations/${process.env.STATION_ID || 'unknown'}/real-time-sync`,
        authentication: `louaj/stations/${process.env.STATION_ID || 'unknown'}/authentication`,
        heartbeat: `louaj/stations/${process.env.STATION_ID || 'unknown'}/heartbeat`,
        subscriptions: `louaj/stations/${process.env.STATION_ID || 'unknown'}/subscriptions`,
      }
    };
    this.queueService = queueService || null;
    this.startMetricsCollection();
  }

  /**
   * Initialize MQTT connection with enhanced features
   */
  async connect(): Promise<void> {
    try {
      console.log(`🔌 Connecting to Enhanced MQTT broker: ${this.config.brokerUrl}`);
      
      const options: mqtt.IClientOptions = {
        clientId: this.config.clientId,
        clean: true,
        connectTimeout: 30000,
        reconnectPeriod: this.reconnectInterval,
        keepalive: 60,
        will: {
          topic: this.config.topics.stationStatus,
          payload: JSON.stringify({
            stationId: process.env.STATION_ID,
            status: 'offline',
            timestamp: new Date().toISOString()
          }),
          qos: 1,
          retain: true
        }
      };

      if (this.config.username && this.config.password) {
        options.username = this.config.username;
        options.password = this.config.password;
      }

      this.client = mqtt.connect(this.config.brokerUrl, options);

      this.client.on('connect', () => {
        console.log('✅ Enhanced MQTT Connected successfully');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.subscribeToTopics();
        this.startHeartbeat();
        this.publishStationStatus();
        this.emit('connected');
      });

      this.client.on('message', this.handleMessage.bind(this));
      
      this.client.on('error', (error) => {
        console.error('❌ Enhanced MQTT Connection error:', error);
        this.isConnected = false;
        this.metrics.errorRate++;
        this.emit('error', error);
      });

      this.client.on('close', () => {
        console.log('🔌 Enhanced MQTT Connection closed');
        this.isConnected = false;
        this.stopHeartbeat();
        this.emit('disconnected');
      });

      this.client.on('reconnect', () => {
        this.reconnectAttempts++;
        this.metrics.reconnectionAttempts++;
        this.metrics.lastReconnection = new Date();
        console.log(`🔄 Enhanced MQTT Reconnecting... (attempt ${this.reconnectAttempts})`);
        
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          console.error('❌ Max reconnection attempts reached');
          this.client?.end();
        }
      });

    } catch (error) {
      console.error('❌ Failed to initialize Enhanced MQTT connection:', error);
      throw error;
    }
  }

  /**
   * Subscribe to all MQTT topics
   */
  private subscribeToTopics(): void {
    if (!this.client) return;

    const topics = Object.values(this.config.topics);

    topics.forEach(topic => {
      this.client!.subscribe(topic, { qos: 1 }, (error) => {
        if (error) {
          console.error(`❌ Failed to subscribe to ${topic}:`, error);
        } else {
          console.log(`📡 Subscribed to topic: ${topic}`);
        }
      });
    });

    // Subscribe to global topics for multi-station coordination
    const globalTopics = [
      'louaj/global/plate-detection',
      'louaj/global/station-status',
      'louaj/global/system-commands'
    ];

    globalTopics.forEach(topic => {
      this.client!.subscribe(topic, { qos: 1 }, (error) => {
        if (error) {
          console.error(`❌ Failed to subscribe to global topic ${topic}:`, error);
        } else {
          console.log(`📡 Subscribed to global topic: ${topic}`);
        }
      });
    });
  }

  /**
   * Handle incoming MQTT messages with enhanced processing
   */
  private async handleMessage(topic: string, message: Buffer): Promise<void> {
    try {
      const messageStr = message.toString();
      let parsedMessage: MqttMessage;

      try {
        parsedMessage = JSON.parse(messageStr);
      } catch (parseError) {
        console.error('❌ Failed to parse MQTT message:', parseError);
        return;
      }

      console.log(`📨 Enhanced MQTT Message received on ${topic}:`, parsedMessage.type || 'unknown');
      
      // Update metrics
      this.metrics.messagesReceived++;
      parsedMessage.timestamp = parsedMessage.timestamp || new Date().toISOString();

      // Route message based on topic
      if (topic === this.config.topics.plateDetection) {
        await this.handlePlateDetection(parsedMessage);
      } else if (topic === this.config.topics.systemCommands) {
        await this.handleSystemCommand(parsedMessage);
      } else if (topic === this.config.topics.clientCommands) {
        await this.handleClientCommand(parsedMessage);
      } else if (topic === this.config.topics.authentication) {
        await this.handleAuthentication(parsedMessage);
      } else if (topic === this.config.topics.heartbeat) {
        await this.handleHeartbeat(parsedMessage);
      } else if (topic === this.config.topics.subscriptions) {
        await this.handleSubscription(parsedMessage);
      } else {
        // Handle other message types
        this.emit('message', { topic, message: parsedMessage });
      }

      // Send acknowledgment if message has ID
      if (parsedMessage.messageId) {
        this.sendAcknowledgment(parsedMessage.messageId, parsedMessage.source);
      }

    } catch (error) {
      console.error('❌ Error handling Enhanced MQTT message:', error);
      this.metrics.errorRate++;
    }
  }

  /**
   * Handle client commands (replacing WebSocket commands)
   */
  private async handleClientCommand(message: MqttMessage): Promise<void> {
    try {
      console.log(`🎛️ Client command received:`, message);

      switch (message.type) {
        case 'test_message':
          await this.handleTestMessage(message);
          break;
        case 'performance_test':
          await this.handlePerformanceTest(message);
          break;
        case 'get_dashboard_data':
          await this.handleGetDashboardData(message);
          break;
        case 'get_queue_data':
          await this.handleGetQueueData(message);
          break;
        case 'create_booking':
          await this.handleCreateBooking(message);
          break;
        default:
          console.log(`ℹ️ Unknown client command type: ${message.type}`);
      }
    } catch (error) {
      console.error('❌ Error handling client command:', error);
    }
  }

  /**
   * Handle authentication (replacing WebSocket auth)
   */
  private async handleAuthentication(message: MqttMessage): Promise<void> {
    try {
      console.log(`🔐 Authentication request from client: ${message.clientId}`);
      
      const authData = message.payload;
      const token = authData?.token;
      const clientId = message.clientId;

      if (!clientId) {
        console.error('❌ No client ID provided in authentication message');
        return;
      }

      // Validate token (implement your token validation logic here)
      const isValid = await this.validateToken(token);

      if (isValid) {
        // Register authenticated client
        this.registerClient(clientId, {
          clientType: authData?.clientType || 'desktop-app',
          isAuthenticated: true
        });

        // Send authentication confirmation
        this.sendToClient(clientId, {
          type: 'authenticated',
          payload: {
            clientId,
            timestamp: new Date().toISOString(),
            serverCapabilities: {
              maxMessageSize: 1024 * 1024,
              compression: false,
              heartbeat: true,
              subscriptions: true,
              priorityLevels: 10,
              mqttVersion: '3.1.1'
            }
          },
          timestamp: new Date().toISOString(),
          source: 'local_node'
        });

        console.log(`✅ Client ${clientId} authenticated successfully`);
        this.emit('client_authenticated', { clientId });

      } else {
        // Send authentication failure
        this.sendToClient(clientId, {
          type: 'auth_failed',
          payload: {
            reason: 'Invalid token',
            timestamp: new Date().toISOString()
          },
          timestamp: new Date().toISOString(),
          source: 'local_node'
        });

        console.log(`❌ Authentication failed for client ${clientId}`);
        this.emit('client_auth_failed', { clientId, reason: 'Invalid token' });
      }

    } catch (error) {
      console.error('❌ Authentication error:', error);
    }
  }

  /**
   * Handle heartbeat messages
   */
  private async handleHeartbeat(message: MqttMessage): Promise<void> {
    try {
      const clientId = message.clientId;
      if (!clientId) return;

      // Update client activity
      const client = this.connectedClients.get(clientId);
      if (client) {
        client.lastActivity = new Date();
        
        // Calculate latency if timestamp is provided
        if (message.timestamp) {
          const latency = Date.now() - new Date(message.timestamp).getTime();
          client.latency = latency;
        }
      }

      // Send heartbeat response
      this.sendToClient(clientId, {
        type: 'heartbeat_response',
        payload: {
          serverTime: new Date().toISOString(),
          serverMetrics: this.getMetrics(),
          clientMetrics: client ? {
            latency: client.latency,
            messagesSent: client.messagesSent,
            messagesReceived: client.messagesReceived
          } : null
        },
        timestamp: new Date().toISOString(),
        source: 'local_node'
      });

    } catch (error) {
      console.error('❌ Heartbeat error:', error);
    }
  }

  /**
   * Handle subscription requests
   */
  private async handleSubscription(message: MqttMessage): Promise<void> {
    try {
      const clientId = message.clientId;
      const entityTypes = message.payload?.entityTypes || [];

      if (!clientId) {
        console.error('❌ No client ID provided in subscription message');
        return;
      }

      console.log(`📡 Client ${clientId} subscribing to: ${entityTypes.join(', ')}`);

      // Add subscriptions for client
      const client = this.connectedClients.get(clientId);
      if (client) {
        entityTypes.forEach((type: string) => {
          client.subscriptions.add(type);
          
          // Add to topic subscriptions
          if (!this.subscriptions.has(type)) {
            this.subscriptions.set(type, new Set());
          }
          this.subscriptions.get(type)!.add(clientId);
        });
      }

      // Send subscription confirmation
      this.sendToClient(clientId, {
        type: 'subscribed',
        payload: {
          entityTypes,
          timestamp: new Date().toISOString()
        },
        timestamp: new Date().toISOString(),
        source: 'local_node'
      });

      console.log(`✅ Client ${clientId} subscribed successfully`);

    } catch (error) {
      console.error('❌ Subscription error:', error);
    }
  }

  /**
   * Handle test message
   */
  private async handleTestMessage(message: MqttMessage): Promise<void> {
    console.log(`🧪 Test message from client ${message.clientId}:`, message.payload);
    
    if (message.clientId) {
      this.sendToClient(message.clientId, {
        type: 'test_message_response',
        payload: {
          received: message.payload,
          serverTime: new Date().toISOString(),
          clientId: message.clientId,
          message: 'Test message received and processed successfully via MQTT'
        },
        timestamp: new Date().toISOString(),
        source: 'local_node'
      });
    }
  }

  /**
   * Handle performance test
   */
  private async handlePerformanceTest(message: MqttMessage): Promise<void> {
    console.log(`⚡ Performance test from client ${message.clientId}`);
    
    if (message.clientId) {
      this.sendToClient(message.clientId, {
        type: 'performance_test_response',
        payload: {
          received: message.payload,
          serverTime: new Date().toISOString(),
          clientId: message.clientId,
          message: 'Performance test processed successfully via MQTT',
          latency: Date.now() - new Date(message.timestamp).getTime()
        },
        timestamp: new Date().toISOString(),
        source: 'local_node'
      });
    }
  }

  /**
   * Handle dashboard data requests
   */
  private async handleGetDashboardData(message: MqttMessage): Promise<void> {
    try {
      // Import dashboard controller dynamically to avoid circular dependencies
      const { getAllDashboardData } = await import('../controllers/dashboardController');
      const dashboardData = await getAllDashboardData();
      
      if (message.clientId) {
        this.sendToClient(message.clientId, {
          type: 'dashboard_data',
          payload: dashboardData,
          timestamp: new Date().toISOString(),
          source: 'local_node'
        });
      }
    } catch (error) {
      console.error('❌ Error getting dashboard data:', error);
    }
  }

  /**
   * Handle queue data requests
   */
  private async handleGetQueueData(message: MqttMessage): Promise<void> {
    try {
      if (this.queueService && message.clientId) {
        const queueData = await this.queueService.getAvailableQueues();
        
        this.sendToClient(message.clientId, {
          type: 'queue_data',
          payload: queueData,
          timestamp: new Date().toISOString(),
          source: 'local_node'
        });
      }
    } catch (error) {
      console.error('❌ Error getting queue data:', error);
    }
  }

  /**
   * Handle booking creation
   */
  private async handleCreateBooking(message: MqttMessage): Promise<void> {
    try {
      console.log(`🎫 Booking creation request from client ${message.clientId}`);
      
      // Process booking creation logic here
      // This would integrate with your existing booking controllers
      
      if (message.clientId) {
        this.sendToClient(message.clientId, {
          type: 'booking_created',
          payload: {
            success: true,
            bookingId: `booking_${Date.now()}`,
            timestamp: new Date().toISOString()
          },
          timestamp: new Date().toISOString(),
          source: 'local_node'
        });
      }
    } catch (error) {
      console.error('❌ Error creating booking:', error);
    }
  }

  /**
   * Handle license plate detection (existing functionality)
   */
  private async handlePlateDetection(messageStr: string | MqttMessage): Promise<void> {
    try {
      let detection: LicensePlateDetection;
      
      if (typeof messageStr === 'string') {
        detection = JSON.parse(messageStr);
      } else {
        detection = messageStr.payload || messageStr.data;
      }
      
      console.log(`🚗 License plate detected: ${detection.licensePlate} (confidence: ${detection.confidence})`);

      // Check if this detection is for our station
      const currentStationId = process.env.STATION_ID;
      if (detection.stationId !== currentStationId) {
        console.log(`ℹ️ Detection for different station (${detection.stationId}), ignoring`);
        return;
      }

      // Process the detection
      await this.processPlateDetection(detection);

    } catch (error) {
      console.error('❌ Error processing plate detection:', error);
    }
  }

  /**
   * Process license plate detection (existing functionality)
   */
  private async processPlateDetection(detection: LicensePlateDetection): Promise<void> {
    try {
      // Check if vehicle is already in queue
      let vehicleInQueue = false;
      if (this.queueService) {
        const existingQueue = await this.queueService.getAvailableQueues();
        
        if (existingQueue.success && existingQueue.queues) {
          for (const queue of existingQueue.queues) {
            const queueDetails = await this.queueService.getDestinationQueue(queue.destinationId);
            if (queueDetails.success && queueDetails.queue) {
              const found = queueDetails.queue.some((queueEntry: any) => 
                queueEntry.licensePlate === detection.licensePlate
              );
              if (found) {
                vehicleInQueue = true;
                break;
              }
            }
          }
        }
      }

      if (vehicleInQueue) {
        console.log(`ℹ️ Vehicle ${detection.licensePlate} already in queue`);
        
        // Broadcast detection event
        this.broadcast({
          type: 'plate_detection',
          payload: {
            licensePlate: detection.licensePlate,
            confidence: detection.confidence,
            timestamp: detection.timestamp,
            status: 'already_in_queue',
            cameraId: detection.cameraId
          },
          timestamp: new Date().toISOString(),
          source: 'local_node'
        });
        
        return;
      }

      // Auto-enter vehicle to queue
      if (this.queueService) {
        const enterResult = await this.queueService.enterQueue(detection.licensePlate, {});

        if (enterResult.success) {
          console.log(`✅ Vehicle ${detection.licensePlate} automatically entered queue`);
          
          // Broadcast successful detection and queue entry
          this.broadcast({
            type: 'plate_detection',
            payload: {
              licensePlate: detection.licensePlate,
              confidence: detection.confidence,
              timestamp: detection.timestamp,
              status: 'entered_queue',
              cameraId: detection.cameraId,
              queueEntry: enterResult.queueEntry
            },
            timestamp: new Date().toISOString(),
            source: 'local_node'
          });

          // Emit event for other services
          this.emit('plateDetected', {
            detection,
            queueEntry: enterResult.queueEntry
          });

        } else {
          console.error(`❌ Failed to enter vehicle ${detection.licensePlate} to queue:`, enterResult.error);
        }
      }

    } catch (error) {
      console.error('❌ Error processing plate detection:', error);
    }
  }

  /**
   * Handle system commands (existing functionality)
   */
  private async handleSystemCommand(message: MqttMessage): Promise<void> {
    try {
      console.log('🎛️ System command received:', message);

      switch (message.type) {
        case 'ping':
          this.publishStationStatus();
          break;
        case 'restart_detection':
          this.emit('restartDetection');
          break;
        case 'update_config':
          this.emit('updateConfig', message.payload);
          break;
        default:
          console.log(`ℹ️ Unknown command type: ${message.type}`);
      }
    } catch (error) {
      console.error('❌ Error handling system command:', error);
    }
  }

  /**
   * Register a new client connection
   */
  private registerClient(clientId: string, options: { clientType?: string; isAuthenticated?: boolean } = {}): void {
    const client: ClientConnection = {
      id: clientId,
      clientType: options.clientType || 'unknown',
      connectedAt: new Date(),
      lastActivity: new Date(),
      isAuthenticated: options.isAuthenticated || false,
      subscriptions: new Set(),
      latency: 0,
      messagesSent: 0,
      messagesReceived: 0
    };

    this.connectedClients.set(clientId, client);
    this.metrics.connectedClients = this.connectedClients.size;
    
    console.log(`👤 Client registered: ${clientId} (${client.clientType})`);
    this.emit('client_connected', { clientId, client });
  }

  /**
   * Send message to specific client
   */
  public sendToClient(clientId: string, message: MqttMessage): void {
    if (!this.client || !this.isConnected) {
      console.warn('⚠️ Enhanced MQTT not connected, cannot send message');
      return;
    }

    // Add client-specific routing
    const clientTopic = `${this.config.topics.clientUpdates}/${clientId}`;
    message.target = clientId;
    message.timestamp = message.timestamp || new Date().toISOString();
    message.source = message.source || 'local_node';

    const messageStr = JSON.stringify(message);
    
    this.client.publish(clientTopic, messageStr, {
      qos: 1,
      retain: false
    }, (error) => {
      if (error) {
        console.error(`❌ Failed to send message to client ${clientId}:`, error);
      } else {
        console.log(`📤 Message sent to client ${clientId}: ${message.type}`);
        this.metrics.messagesSent++;
        
        // Update client metrics
        const client = this.connectedClients.get(clientId);
        if (client) {
          client.messagesSent++;
        }
      }
    });
  }

  /**
   * Broadcast message to all authenticated clients
   */
  public broadcast(message: MqttMessage): void {
    if (!this.client || !this.isConnected) {
      console.warn('⚠️ Enhanced MQTT not connected, cannot broadcast message');
      return;
    }

    message.broadcast = true;
    message.timestamp = message.timestamp || new Date().toISOString();
    message.source = message.source || 'local_node';

    const messageStr = JSON.stringify(message);
    
    this.client.publish(this.config.topics.clientUpdates, messageStr, {
      qos: 1,
      retain: false
    }, (error) => {
      if (error) {
        console.error(`❌ Failed to broadcast message:`, error);
      } else {
        console.log(`📡 Broadcasted message: ${message.type}`);
        this.metrics.messagesSent++;
      }
    });
  }

  /**
   * Broadcast to subscribers of a specific entity type
   */
  public broadcastToSubscribers(entityType: string, data: any): void {
    const subscribers = this.subscriptions.get(entityType);
    if (!subscribers || subscribers.size === 0) {
      console.log(`📡 No subscribers for entity type: ${entityType}`);
      return;
    }

    const message: MqttMessage = {
      type: entityType,
      payload: data,
      timestamp: new Date().toISOString(),
      source: 'local_node',
      broadcast: true
    };

    subscribers.forEach(clientId => {
      this.sendToClient(clientId, message);
    });

    console.log(`📡 Broadcasted ${entityType} to ${subscribers.size} subscribers`);
  }

  /**
   * Send acknowledgment for received message
   */
  private sendAcknowledgment(messageId: string, source?: string): void {
    if (!source || !this.client || !this.isConnected) return;

    const ackMessage: MqttMessage = {
      type: 'message_ack',
      payload: {
        messageId,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString(),
      source: 'local_node'
    };

    // Send acknowledgment back to sender
    const ackTopic = `${this.config.topics.clientUpdates}/ack`;
    this.client.publish(ackTopic, JSON.stringify(ackMessage), { qos: 0 });
  }

  /**
   * Validate authentication token
   */
  private async validateToken(token: string): Promise<boolean> {
    // Implement your token validation logic here
    // For now, return true if token exists
    return !!token;
  }

  /**
   * Start heartbeat mechanism
   */
  private startHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(() => {
      this.publishStationStatus();
      this.checkClientConnections();
    }, 30000); // Every 30 seconds

    console.log('💓 Enhanced MQTT heartbeat started');
  }

  /**
   * Stop heartbeat mechanism
   */
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
      console.log('💓 Enhanced MQTT heartbeat stopped');
    }
  }

  /**
   * Check client connections and clean up stale ones
   */
  private checkClientConnections(): void {
    const now = new Date();
    const timeout = 5 * 60 * 1000; // 5 minutes

    for (const [clientId, client] of this.connectedClients.entries()) {
      if (now.getTime() - client.lastActivity.getTime() > timeout) {
        console.log(`🧹 Removing stale client: ${clientId}`);
        this.connectedClients.delete(clientId);
        
        // Remove from subscriptions
        for (const [entityType, subscribers] of this.subscriptions.entries()) {
          subscribers.delete(clientId);
          if (subscribers.size === 0) {
            this.subscriptions.delete(entityType);
          }
        }
        
        this.emit('client_disconnected', { clientId });
      }
    }

    this.metrics.connectedClients = this.connectedClients.size;
  }

  /**
   * Start metrics collection
   */
  private startMetricsCollection(): void {
    setInterval(() => {
      this.updateMetrics();
    }, 10000); // Every 10 seconds
  }

  /**
   * Update connection metrics
   */
  private updateMetrics(): void {
    // Calculate average latency
    let totalLatency = 0;
    let clientCount = 0;

    for (const client of this.connectedClients.values()) {
      totalLatency += client.latency;
      clientCount++;
    }

    this.metrics.latency = clientCount > 0 ? totalLatency / clientCount : 0;
    this.metrics.lastHeartbeat = new Date();
    this.metrics.uptime = Date.now() - (this.metrics.uptime || Date.now());

    // Assess connection quality
    this.assessConnectionQuality();
  }

  /**
   * Assess connection quality
   */
  private assessConnectionQuality(): void {
    const { latency, errorRate } = this.metrics;
    
    let quality: ConnectionMetrics['connectionQuality'] = 'fair';
    
    if (latency < 50 && errorRate < 0.01) {
      quality = 'excellent';
    } else if (latency < 100 && errorRate < 0.05) {
      quality = 'good';
    } else if (latency < 200 && errorRate < 0.1) {
      quality = 'fair';
    } else {
      quality = 'poor';
    }
    
    if (quality !== this.metrics.connectionQuality) {
      this.metrics.connectionQuality = quality;
      console.log(`📊 Connection quality changed to: ${quality}`);
    }
  }

  /**
   * Publish station status (existing functionality)
   */
  public publishStationStatus(): void {
    if (!this.client || !this.isConnected) return;

    const status = {
      stationId: process.env.STATION_ID,
      timestamp: new Date().toISOString(),
      status: 'online',
      services: {
        mqtt: this.isConnected,
        queue: true,
        database: true
      },
      metrics: this.metrics,
      connectedClients: this.connectedClients.size
    };

    this.client.publish(
      this.config.topics.stationStatus,
      JSON.stringify(status),
      { qos: 1, retain: true },
      (error) => {
        if (error) {
          console.error('❌ Failed to publish station status:', error);
        } else {
          console.log('📤 Station status published');
        }
      }
    );
  }

  /**
   * Get connection metrics
   */
  public getMetrics(): ConnectionMetrics {
    return { ...this.metrics };
  }

  /**
   * Get connected clients
   */
  public getConnectedClients(): Map<string, ClientConnection> {
    return new Map(this.connectedClients);
  }

  /**
   * Get connection status
   */
  public getStatus(): { connected: boolean; reconnectAttempts: number; clientCount: number } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      clientCount: this.connectedClients.size
    };
  }

  // WebSocket replacement methods for broadcasting specific updates

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
   * Publish custom message
   */
  public publish(topic: string, message: any, options: { qos?: 0 | 1 | 2; retain?: boolean } = {}): void {
    if (!this.client || !this.isConnected) {
      console.warn('⚠️ Enhanced MQTT not connected, cannot publish message');
      return;
    }

    const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
    
    this.client.publish(topic, messageStr, {
      qos: options.qos || 1,
      retain: options.retain || false
    }, (error) => {
      if (error) {
        console.error(`❌ Failed to publish to ${topic}:`, error);
      } else {
        console.log(`📤 Published to ${topic}`);
        this.metrics.messagesSent++;
      }
    });
  }

  /**
   * Disconnect from MQTT broker
   */
  public async disconnect(): Promise<void> {
    if (this.client) {
      console.log('🔌 Disconnecting from Enhanced MQTT broker...');
      
      // Publish offline status
      this.publish(this.config.topics.stationStatus, {
        stationId: process.env.STATION_ID,
        status: 'offline',
        timestamp: new Date().toISOString()
      }, { retain: true });

      this.stopHeartbeat();
      this.client.end();
      this.client = null;
      this.isConnected = false;
      this.connectedClients.clear();
      this.subscriptions.clear();
    }
  }
}
