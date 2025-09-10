import mqtt, { MqttClient } from 'mqtt';
import { EventEmitter } from 'events';
import { QueueService } from './queueService';
import { EnhancedLocalWebSocketServer } from '../websocket/EnhancedLocalWebSocketServer';

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
  };
}

export class MQTTService extends EventEmitter {
  private client: MqttClient | null = null;
  private config: MQTTConfig;
  private queueService: QueueService;
  private localWebSocketServer: EnhancedLocalWebSocketServer;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectInterval = 5000; // 5 seconds

  constructor(
    config: MQTTConfig,
    queueService: QueueService,
    localWebSocketServer: EnhancedLocalWebSocketServer
  ) {
    super();
    this.config = config;
    this.queueService = queueService;
    this.localWebSocketServer = localWebSocketServer;
  }

  /**
   * Initialize MQTT connection
   */
  async connect(): Promise<void> {
    try {
      console.log(`🔌 Connecting to MQTT broker: ${this.config.brokerUrl}`);
      
      const options: mqtt.IClientOptions = {
        clientId: this.config.clientId,
        clean: true,
        connectTimeout: 30000,
        reconnectPeriod: this.reconnectInterval,
        keepalive: 60,
      };

      if (this.config.username && this.config.password) {
        options.username = this.config.username;
        options.password = this.config.password;
      }

      this.client = mqtt.connect(this.config.brokerUrl, options);

      this.client.on('connect', () => {
        console.log('✅ MQTT Connected successfully');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.subscribeToTopics();
        this.emit('connected');
      });

      this.client.on('message', this.handleMessage.bind(this));
      
      this.client.on('error', (error) => {
        console.error('❌ MQTT Connection error:', error);
        this.isConnected = false;
        this.emit('error', error);
      });

      this.client.on('close', () => {
        console.log('🔌 MQTT Connection closed');
        this.isConnected = false;
        this.emit('disconnected');
      });

      this.client.on('reconnect', () => {
        this.reconnectAttempts++;
        console.log(`🔄 MQTT Reconnecting... (attempt ${this.reconnectAttempts})`);
        
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          console.error('❌ Max reconnection attempts reached');
          this.client?.end();
        }
      });

    } catch (error) {
      console.error('❌ Failed to initialize MQTT connection:', error);
      throw error;
    }
  }

  /**
   * Subscribe to MQTT topics
   */
  private subscribeToTopics(): void {
    if (!this.client) return;

    const topics = [
      this.config.topics.plateDetection,
      this.config.topics.systemCommands,
    ];

    topics.forEach(topic => {
      this.client!.subscribe(topic, { qos: 1 }, (error) => {
        if (error) {
          console.error(`❌ Failed to subscribe to ${topic}:`, error);
        } else {
          console.log(`📡 Subscribed to topic: ${topic}`);
        }
      });
    });
  }

  /**
   * Handle incoming MQTT messages
   */
  private async handleMessage(topic: string, message: Buffer): Promise<void> {
    try {
      const messageStr = message.toString();
      console.log(`📨 MQTT Message received on ${topic}:`, messageStr);

      if (topic === this.config.topics.plateDetection) {
        await this.handlePlateDetection(messageStr);
      } else if (topic === this.config.topics.systemCommands) {
        await this.handleSystemCommand(messageStr);
      }
    } catch (error) {
      console.error('❌ Error handling MQTT message:', error);
    }
  }

  /**
   * Handle license plate detection messages
   */
  private async handlePlateDetection(messageStr: string): Promise<void> {
    try {
      const detection: LicensePlateDetection = JSON.parse(messageStr);
      
      console.log(`🚗 License plate detected: ${detection.licensePlate} (confidence: ${detection.confidence})`);

      // Validate detection data
      if (!detection.licensePlate || !detection.stationId) {
        console.error('❌ Invalid plate detection data:', detection);
        return;
      }

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
   * Process license plate detection
   */
  private async processPlateDetection(detection: LicensePlateDetection): Promise<void> {
    try {
      // Check if vehicle is already in queue by checking each destination queue
      let vehicleInQueue = false;
      const existingQueue = await this.queueService.getAvailableQueues();
      
      if (existingQueue.success && existingQueue.queues) {
        // Check each destination queue for the vehicle
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

        if (vehicleInQueue) {
          console.log(`ℹ️ Vehicle ${detection.licensePlate} already in queue`);
          
          // Broadcast detection event for logging/monitoring
          this.localWebSocketServer.broadcast({
            type: 'plate_detection',
            payload: {
              licensePlate: detection.licensePlate,
              confidence: detection.confidence,
              timestamp: detection.timestamp,
              status: 'already_in_queue',
              cameraId: detection.cameraId
            },
            timestamp: Date.now(),
            source: 'server'
          });
          
          return;
        }
      }

      // Auto-enter vehicle to queue (you can customize this logic)
      const enterResult = await this.queueService.enterQueue(detection.licensePlate, {
        // You can add default values or prompt for destination
        // For now, we'll let the staff manually assign destination
      });

      if (enterResult.success) {
        console.log(`✅ Vehicle ${detection.licensePlate} automatically entered queue`);
        
        // Broadcast successful detection and queue entry
        this.localWebSocketServer.broadcast({
          type: 'plate_detection',
          payload: {
            licensePlate: detection.licensePlate,
            confidence: detection.confidence,
            timestamp: detection.timestamp,
            status: 'entered_queue',
            cameraId: detection.cameraId,
            queueEntry: enterResult.queueEntry
          },
          timestamp: Date.now(),
          source: 'server'
        });

        // Emit event for other services
        this.emit('plateDetected', {
          detection,
          queueEntry: enterResult.queueEntry
        });

      } else {
        console.error(`❌ Failed to enter vehicle ${detection.licensePlate} to queue:`, enterResult.error);
        
        // Broadcast detection with error status
        this.localWebSocketServer.broadcast({
          type: 'plate_detection',
          payload: {
            licensePlate: detection.licensePlate,
            confidence: detection.confidence,
            timestamp: detection.timestamp,
            status: 'queue_entry_failed',
            error: enterResult.error,
            cameraId: detection.cameraId
          },
          timestamp: Date.now(),
          source: 'server'
        });
      }

    } catch (error) {
      console.error('❌ Error processing plate detection:', error);
    }
  }

  /**
   * Handle system commands
   */
  private async handleSystemCommand(messageStr: string): Promise<void> {
    try {
      const command = JSON.parse(messageStr);
      console.log('🎛️ System command received:', command);

      switch (command.type) {
        case 'ping':
          this.publishStationStatus();
          break;
        case 'restart_detection':
          this.emit('restartDetection');
          break;
        case 'update_config':
          this.emit('updateConfig', command.data);
          break;
        default:
          console.log(`ℹ️ Unknown command type: ${command.type}`);
      }
    } catch (error) {
      console.error('❌ Error handling system command:', error);
    }
  }

  /**
   * Publish station status
   */
  publishStationStatus(): void {
    if (!this.client || !this.isConnected) return;

    const status = {
      stationId: process.env.STATION_ID,
      timestamp: new Date().toISOString(),
      status: 'online',
      services: {
        mqtt: this.isConnected,
        queue: true, // You can add actual health checks
        websocket: true
      }
    };

    this.client.publish(
      this.config.topics.stationStatus,
      JSON.stringify(status),
      { qos: 1 },
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
   * Publish custom message
   */
  publish(topic: string, message: any, options: { qos?: 0 | 1 | 2; retain?: boolean } = {}): void {
    if (!this.client || !this.isConnected) {
      console.warn('⚠️ MQTT not connected, cannot publish message');
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
      }
    });
  }

  /**
   * Get connection status
   */
  getStatus(): { connected: boolean; reconnectAttempts: number } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts
    };
  }

  /**
   * Disconnect from MQTT broker
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      console.log('🔌 Disconnecting from MQTT broker...');
      this.client.end();
      this.client = null;
      this.isConnected = false;
    }
  }
}