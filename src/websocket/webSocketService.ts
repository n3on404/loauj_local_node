import { EventEmitter } from 'events';
import WebSocket from 'ws';
import axios from 'axios';
import { env } from '../config/environment';
import { vehicleSyncService } from '../services/vehicleSyncService';

export class WebSocketService extends EventEmitter {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private connectionTestTimer: NodeJS.Timeout | null = null;
  private centralServerUrl: string;
  private centralServerHttpUrl: string;
  private reconnectAttempts = 0;
  private reconnectDelay = 30000; // 30 seconds - fixed interval
  private heartbeatInterval = 30000; // 30 seconds
  private connectionTestInterval = 60000; // 60 seconds
  private stationId: string;
  private isAuthenticated = false;
  private isConnecting = false;
  private publicIp: string | null = null;
  private ipRefreshTimer: NodeJS.Timeout | null = null;
  private readonly IP_REFRESH_INTERVAL = 3600000; // 1 hour

  constructor() {
    super();
    this.centralServerUrl = env.CENTRAL_SERVER_WS_URL;
    this.centralServerHttpUrl = env.CENTRAL_SERVER_URL;
    this.stationId = env.STATION_ID || 'station-001'; // Default for testing
    
    console.log(`📡 WebSocket Service initialized`);
    console.log(`   Central Server: ${this.centralServerHttpUrl}`);
    console.log(`   WebSocket URL: ${this.centralServerUrl}`);
    console.log(`   Station ID: ${this.stationId}`);
    console.log(`   Reconnection: Infinite retries every ${this.reconnectDelay/1000}s`);
    console.log(`   IP Refresh: Every ${this.IP_REFRESH_INTERVAL/1000/60} minutes`);
  }

  async connect(): Promise<void> {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      console.log('⚠️ Already connecting or connected');
      return;
    }

    try {
      console.log(`🔌 Attempting to connect to central server (attempt #${this.reconnectAttempts + 1})...`);
      
      // First test if central server is reachable via HTTP
      const isReachable = await this.testCentralServerConnection();
      if (!isReachable) {
        throw new Error('Central server is not reachable');
      }

      console.log(`🔌 Connecting to WebSocket server: ${this.centralServerUrl}`);
      this.isConnecting = true;
      
      this.ws = new WebSocket(this.centralServerUrl);
      this.setupWebSocket();
      
    } catch (error) {
      console.error('❌ WebSocket connection failed:', error);
      this.isConnecting = false;
      this.handleConnectionError(error);
    }
  }

  private async testCentralServerConnection(): Promise<boolean> {
    try {
      console.log(`🧪 Testing connection to central server: ${this.centralServerHttpUrl}`);
      const response = await axios.get(`${this.centralServerHttpUrl}/health`, {
        timeout: 5000,
        validateStatus: (status) => status < 500 // Accept any status below 500
      });
      
      console.log(`✅ Central server is reachable (HTTP ${response.status})`);
      return true;
    } catch (error) {
      console.error(`❌ Central server is not reachable:`, error instanceof Error ? error.message : error);
      return false;
    }
  }

  private setupWebSocket(): void {
    if (!this.ws) return;

    this.ws.on('open', () => {
      console.log('✅ WebSocket connected');
      this.isConnecting = false;
      this.isAuthenticated = false;
      this.emit('connected');
      
      // Authenticate with the central server
      this.authenticate().catch(error => {
        console.error('❌ Authentication failed:', error);
      });
    });

    this.ws.on('message', (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        this.handleMessage(message);
      } catch (error) {
        console.error('❌ Failed to parse WebSocket message:', error);
      }
    });

    this.ws.on('close', (code: number, reason: Buffer) => {
      console.log(`🔌 WebSocket connection closed: ${code} - ${reason.toString()}`);
      this.isConnecting = false;
      this.isAuthenticated = false;
      this.cleanup();
      this.emit('disconnected', { code, reason: reason.toString() });
      
      if (code !== 1000) { // Not a normal closure
        this.attemptReconnect();
      }
    });

    this.ws.on('error', (error: Error) => {
      console.error('❌ WebSocket error:', error.message);
      this.isConnecting = false;
      this.emit('error', error);
    });

    this.ws.on('ping', () => {
      // Respond to server pings
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.pong();
      }
    });
  }

  private async getPublicIpAddress(): Promise<string | null> {
    try {
      console.log('🌐 Fetching public IP address...');
      
      // Try multiple IP services for reliability
      const ipServices = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://ifconfig.me/ip'
      ];
      
      for (const service of ipServices) {
        try {
          const response = await axios.get(service, { 
            timeout: 5000,
            headers: { 'User-Agent': 'WebSocketService/1.0' }
          });
          
          let ip: string;
          if (service.includes('ipify')) {
            ip = response.data.ip;
          } else if (service.includes('ipapi')) {
            ip = response.data.ip;
          } else {
            ip = response.data.trim();
          }
          
          if (ip && this.isValidIP(ip)) {
            console.log(`✅ Public IP detected: ${ip}`);
            return ip;
          }
        } catch (error) {
          console.warn(`⚠️ Failed to get IP from ${service}:`, error instanceof Error ? error.message : error);
          continue;
        }
      }
      
      console.warn('⚠️ Could not detect public IP address from any service');
      return null;
    } catch (error) {
      console.error('❌ Error getting public IP address:', error);
      return null;
    }
  }

  private isValidIP(ip: string): boolean {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  }

  private async authenticate(): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('⚠️ Cannot authenticate - WebSocket not connected');
      return;
    }

    console.log(`🔐 Authenticating with station ID: ${this.stationId}`);
    
    // Get public IP if not already cached
    if (!this.publicIp) {
      this.publicIp = await this.getPublicIpAddress();
    }
    
    this.send({
      type: 'authenticate',
      payload: {
        stationId: this.stationId,
        timestamp: new Date().toISOString(),
        publicIp: this.publicIp
      },
      timestamp: Date.now()
    });
  }

  private handleMessage(data: any): void {
    console.log('📨 Received WebSocket message:', data.type);
    
    switch (data.type) {
      case 'connected':
        console.log('🎉 Received welcome message from central server');
        break;

      case 'authenticated':
        console.log('✅ Successfully authenticated with central server');
        this.isAuthenticated = true;
        this.reconnectAttempts = 0;
        this.startHeartbeat();
        this.startConnectionTest();
        this.startIpRefresh();
        this.emit('authenticated', data.payload);
        break;

      case 'auth_error':
        console.error('❌ Authentication failed:', data.payload?.message);
        this.emit('auth_error', data.payload);
        break;

      case 'heartbeat_ack':
        console.log(`💓 Heartbeat acknowledged by central server`);
        break;

      case 'ip_update_ack':
        console.log(`🌐 IP update acknowledged by central server:`, data.payload?.publicIp);
        this.emit('ip_update_ack', data.payload);
        break;

      case 'ip_update_error':
        console.error('❌ IP update failed:', data.payload?.message);
        this.emit('ip_update_error', data.payload);
        break;

      case 'heartbeat_error':
        console.error('❌ Heartbeat error from central server:', data.payload?.message);
        this.emit('heartbeat_error', data.payload);
        break;

      case 'connection_test_response':
        console.log('✅ Connection test successful');
        break;
        
      case 'sync_request':
        this.emit('sync_request', data.payload);
        break;

      case 'sync_response':
        this.emit('sync_response', data.payload);
        break;
        
      case 'booking_update':
        this.emit('booking_update', data.payload);
        break;
        
      case 'vehicle_update':
        this.emit('vehicle_update', data.payload);
        break;
        
      case 'queue_update':
        this.emit('queue_update', data.payload);
        break;

      case 'data_update':
        this.emit('data_update', data.payload);
        break;

      case 'station_status_update':
        this.emit('station_status_update', data.payload);
        break;

      case 'staff_login_response':
        console.log('🔐 Received staff login response:', data.payload?.success ? '✅ Success' : '❌ Failed');
        this.emit('message', data); // Emit for Promise-based handlers
        break;

      case 'staff_verify_response':
        console.log('🔍 Received staff verification response:', data.payload?.success ? '✅ Success' : '❌ Failed');
        this.emit('message', data); // Emit for Promise-based handlers
        break;

      case 'vehicle_sync_full':
        console.log('🚐 Received full vehicle sync');
        this.handleVehicleFullSync(data);
        break;

      case 'vehicle_sync_update':
        console.log('🚐 Received vehicle update sync');
        this.handleVehicleUpdateSync(data);
        break;

      case 'vehicle_sync_delete':
        console.log('🚐 Received vehicle delete sync');
        this.handleVehicleDeleteSync(data);
        break;

      case 'vehicle_sync_error':
        console.error('❌ Vehicle sync error:', data.payload?.message);
        this.emit('vehicle_sync_error', data.payload);
        break;

      case 'error':
        console.error('❌ Server error:', data.payload?.message);
        this.emit('server_error', data.payload);
        break;
        
      default:
        console.warn('⚠️ Unknown message type:', data.type);
        this.emit('unknown_message', data);
    }
  }

  /**
   * Handle full vehicle sync from central server
   */
  private async handleVehicleFullSync(data: any): Promise<void> {
    try {
      const { vehicles, stationId, syncTime, count } = data.payload;
      console.log(`🚐 Processing full vehicle sync: ${count} vehicles for station ${stationId}`);
      
      const result = await vehicleSyncService.handleFullSync(vehicles, this.stationId);
      
      console.log(`📊 Full sync results: ${result.processed} processed, ${result.skipped} skipped, ${result.errors.length} errors`);
      
      // Send acknowledgment
      this.sendVehicleSyncAck(data.messageId, 'vehicle_sync_full', result.success, result.errors);
      
      this.emit('vehicle_sync_complete', {
        type: 'full',
        processed: result.processed,
        skipped: result.skipped,
        total: count,
        success: result.success,
        errors: result.errors
      });
      
    } catch (error) {
      console.error('❌ Error processing full vehicle sync:', error);
      this.sendVehicleSyncAck(data.messageId, 'vehicle_sync_full', false, ['Processing error']);
    }
  }

  /**
   * Handle vehicle update sync from central server
   */
  private async handleVehicleUpdateSync(data: any): Promise<void> {
    try {
      const { vehicle, stationId, syncTime } = data.payload;
      console.log(`🚐 Processing vehicle update: ${vehicle.licensePlate} for station ${stationId}`);
      
      const result = await vehicleSyncService.handleVehicleUpdate(vehicle, this.stationId);
      
      console.log(`📊 Vehicle update result: ${result.processed ? 'processed' : 'skipped (already up-to-date)'}`);
      
      // Send acknowledgment
      this.sendVehicleSyncAck(data.messageId, 'vehicle_sync_update', result.success, result.error ? [result.error] : []);
      
      this.emit('vehicle_sync_update', {
        vehicle,
        success: result.success,
        processed: result.processed,
        error: result.error
      });
      
    } catch (error) {
      console.error('❌ Error processing vehicle update sync:', error);
      this.sendVehicleSyncAck(data.messageId, 'vehicle_sync_update', false, ['Processing error']);
    }
  }

  /**
   * Handle vehicle delete sync from central server
   */
  private async handleVehicleDeleteSync(data: any): Promise<void> {
    try {
      const { vehicleId, stationId, syncTime } = data.payload;
      console.log(`🚐 Processing vehicle deletion: ${vehicleId} for station ${stationId}`);
      
      const result = await vehicleSyncService.handleVehicleDelete(vehicleId);
      
      // Send acknowledgment
      this.sendVehicleSyncAck(data.messageId, 'vehicle_sync_delete', result.success, result.error ? [result.error] : []);
      
      this.emit('vehicle_sync_delete', {
        vehicleId,
        success: result.success,
        error: result.error
      });
      
    } catch (error) {
      console.error('❌ Error processing vehicle delete sync:', error);
      this.sendVehicleSyncAck(data.messageId, 'vehicle_sync_delete', false, ['Processing error']);
    }
  }

  /**
   * Send vehicle sync acknowledgment to central server
   */
  private sendVehicleSyncAck(messageId: string, syncType: string, success: boolean, errors: string[]): void {
    this.send({
      type: 'vehicle_sync_ack',
      payload: {
        messageId,
        syncType,
        success,
        errors,
        stationId: this.stationId,
        timestamp: new Date().toISOString()
      },
      timestamp: Date.now()
    });
  }

  send(data: any): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('⚠️ WebSocket not connected, cannot send message');
      return false;
    }

    try {
      this.ws.send(JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('❌ Failed to send WebSocket message:', error);
      return false;
    }
  }

  private async refreshPublicIp(): Promise<void> {
    const previousIp = this.publicIp;
    this.publicIp = await this.getPublicIpAddress();
    
    if (this.publicIp && this.publicIp !== previousIp) {
      console.log(`🔄 Public IP changed from ${previousIp || 'unknown'} to ${this.publicIp}`);
      
      // If authenticated, send IP update to server
      if (this.isAuthenticated && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send({
          type: 'ip_update',
          payload: {
            stationId: this.stationId,
            publicIp: this.publicIp,
            timestamp: new Date().toISOString()
          },
          timestamp: Date.now()
        });
      }
    }
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    
    this.heartbeatTimer = setInterval(() => {
      if (!this.send({ 
        type: 'heartbeat', 
        payload: {
          stationId: this.stationId,
          timestamp: new Date().toISOString(),
          publicIp: this.publicIp  // Include current IP in heartbeat
        },
        timestamp: Date.now() 
      })) {
        console.warn('⚠️ Heartbeat failed, connection may be lost');
      }
    }, this.heartbeatInterval);
  }

  private startConnectionTest(): void {
    this.stopConnectionTest();
    
    this.connectionTestTimer = setInterval(() => {
      if (!this.send({ 
        type: 'connection_test', 
        timestamp: Date.now() 
      })) {
        console.warn('⚠️ Connection test failed');
      }
    }, this.connectionTestInterval);
  }

  private stopConnectionTest(): void {
    if (this.connectionTestTimer) {
      clearInterval(this.connectionTestTimer);
      this.connectionTestTimer = null;
    }
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private startIpRefresh(): void {
    this.stopIpRefresh();
    
    this.ipRefreshTimer = setInterval(async () => {
      console.log('🔄 Periodic IP refresh check...');
      await this.refreshPublicIp();
    }, this.IP_REFRESH_INTERVAL);
  }

  private stopIpRefresh(): void {
    if (this.ipRefreshTimer) {
      clearInterval(this.ipRefreshTimer);
      this.ipRefreshTimer = null;
    }
  }

  private attemptReconnect(): void {
    this.reconnectAttempts++;
    
    console.log(`🔄 Attempting to reconnect (attempt #${this.reconnectAttempts}) in ${this.reconnectDelay/1000}s...`);
    
    this.reconnectTimer = setTimeout(() => {
      this.connect().catch(error => {
        console.error('❌ Reconnection attempt failed:', error);
      });
    }, this.reconnectDelay);
  }

  private handleConnectionError(error: any): void {
    console.error('❌ WebSocket connection error:', error);
    console.log('🔄 Will retry connection automatically...');
    this.emit('connection_error', error);
    this.attemptReconnect();
  }

  private cleanup(): void {
    this.stopHeartbeat();
    this.stopConnectionTest();
    this.stopIpRefresh();
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  disconnect(): void {
    console.log('🔌 Disconnecting WebSocket...');
    
    this.cleanup();
    
    if (this.ws) {
      this.ws.close(1000, 'Normal closure'); // Normal closure code
      this.ws = null;
    }
    
    this.emit('disconnected');
    console.log('✅ WebSocket disconnected');
  }

  stopReconnecting(): void {
    console.log('🛑 Stopping reconnection attempts...');
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    this.reconnectAttempts = 0;
    console.log('✅ Reconnection attempts stopped');
  }

  // Public methods for sending specific message types
  sendBookingUpdate(booking: any): boolean {
    return this.send({
      type: 'booking_update',
      payload: booking,
      timestamp: Date.now()
    });
  }

  sendVehicleUpdate(vehicle: any): boolean {
    return this.send({
      type: 'vehicle_update',
      payload: vehicle,
      timestamp: Date.now()
    });
  }

  sendQueueUpdate(queue: any): boolean {
    return this.send({
      type: 'queue_update',
      payload: queue,
      timestamp: Date.now()
    });
  }

  requestSync(): boolean {
    return this.send({
      type: 'sync_request',
      timestamp: Date.now()
    });
  }

  // Manually refresh and update IP address
  async refreshIpAddress(): Promise<string | null> {
    console.log('🔄 Manual IP refresh requested...');
    await this.refreshPublicIp();
    return this.publicIp;
  }

  // Staff Authentication Methods
  requestStaffLogin(cin: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected || !this.isAuthenticated) {
        reject(new Error('Station not connected to central server'));
        return;
      }

      const messageId = `login_${Date.now()}_${Math.random()}`;
      
      // Set up one-time listener for response
      const handleResponse = (message: any) => {
        if (message.type === 'staff_login_response' && message.messageId === messageId) {
          this.off('message', handleResponse);
          resolve(message.payload);
        }
      };
      
      this.on('message', handleResponse);
      
      // Set timeout for request
      setTimeout(() => {
        this.off('message', handleResponse);
        reject(new Error('Login request timeout'));
      }, 30000); // 30 second timeout
      
      // Send request
      const success = this.send({
        type: 'staff_login_request',
        payload: { cin },
        timestamp: Date.now(),
        messageId
      });
      
      if (!success) {
        this.off('message', handleResponse);
        reject(new Error('Failed to send login request'));
      }
    });
  }

  requestStaffVerification(cin: string, verificationCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isConnected || !this.isAuthenticated) {
        reject(new Error('Station not connected to central server'));
        return;
      }

      const messageId = `verify_${Date.now()}_${Math.random()}`;
      
      // Set up one-time listener for response
      const handleResponse = (message: any) => {
        if (message.type === 'staff_verify_response' && message.messageId === messageId) {
          this.off('message', handleResponse);
          resolve(message.payload);
        }
      };
      
      this.on('message', handleResponse);
      
      // Set timeout for request
      setTimeout(() => {
        this.off('message', handleResponse);
        reject(new Error('Verification request timeout'));
      }, 30000); // 30 second timeout
      
      // Send request
      const success = this.send({
        type: 'staff_verify_request',
        payload: { cin, verificationCode },
        timestamp: Date.now(),
        messageId
      });
      
      if (!success) {
        this.off('message', handleResponse);
        reject(new Error('Failed to send verification request'));
      }
    });
  }

  // Status getters
  get isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  get connectionState(): string {
    if (!this.ws) return 'disconnected';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: return 'connecting';
      case WebSocket.OPEN: return 'connected';
      case WebSocket.CLOSING: return 'closing';
      case WebSocket.CLOSED: return 'disconnected';
      default: return 'unknown';
    }
  }

  get authenticated(): boolean {
    return this.isAuthenticated;
  }
} 