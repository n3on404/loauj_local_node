import { EventEmitter } from 'events';
import WebSocket from 'ws';
import axios from 'axios';
import { env } from '../config/environment';
import { VehicleData, vehicleSyncService } from '../services/vehicleSyncService';
import { routeSyncService } from '../services/routeSyncService';
import { configService } from '../config/supervisorConfig';

export class WebSocketService extends EventEmitter {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private connectionTestTimer: NodeJS.Timeout | null = null;
  private connectionMonitorTimer: NodeJS.Timeout | null = null;
  private centralServerUrl: string;
  private centralServerHttpUrl: string;
  private reconnectAttempts = 0;
  private initialReconnectDelay = 5000; // 5 seconds initial delay
  private maxReconnectDelay = 60000; // 60 seconds max delay
  private reconnectDelay = 5000; // Current delay (will increase with backoff)
  private heartbeatInterval = 30000; // 30 seconds
  private connectionTestInterval = 60000; // 60 seconds
  private connectionMonitorInterval = 15000; // 15 seconds
  private stationId: string;
  private isAuthenticated = false;
  private isConnecting = false;
  private publicIp: string | null = null;
  private ipRefreshTimer: NodeJS.Timeout | null = null;
  private readonly IP_REFRESH_INTERVAL = 3600000; // 1 hour
  private lastHeartbeatResponse: number = 0;
  private _reconnectEnabled = true;

  constructor() {
    super();
    this.centralServerUrl = env.CENTRAL_SERVER_WS_URL;
    this.centralServerHttpUrl = env.CENTRAL_SERVER_URL;
    this.stationId = configService.getStationId();

    console.log(`📡 WebSocket Service initialized`);
    console.log(`   Central Server: ${this.centralServerHttpUrl}`);
    console.log(`   WebSocket URL: ${this.centralServerUrl}`);
    console.log(`   Station ID: ${this.stationId}`);
    console.log(`   Reconnection: Initial delay ${this.initialReconnectDelay / 1000}s, max ${this.maxReconnectDelay / 1000}s`);
    console.log(`   Connection Monitor: Every ${this.connectionMonitorInterval / 1000}s`);
    console.log(`   IP Refresh: Every ${this.IP_REFRESH_INTERVAL / 1000 / 60} minutes`);

    // Start connection monitor
    this.startConnectionMonitor();
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

  // LOCAL DEVELOPMENT: Use localhost instead of public IP detection
 // private async getPublicIpAddress(): Promise<string | null> {
   // console.log('🏠 Using localhost IP for local development');
    //return '127.0.0.1';
  //}

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
        this.lastHeartbeatResponse = Date.now();
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

      case 'instant_sync':
        console.log('📡 Received instant sync:', data.payload?.dataType, data.payload?.operation);
        this.handleInstantSync(data);
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

      // Real-time booking and seat availability handlers
      case 'seat_availability_request':
        console.log('📋 Received seat availability request');
        this.handleSeatAvailabilityRequest(data);
        break;

      case 'booking_created':
        console.log('🎫 Received booking created notification');
        this.emit('booking_created', data.payload);
        break;

      case 'booking_payment_updated':
        console.log('💳 Received booking payment update notification');
        this.emit('booking_payment_updated', data.payload);
        break;

      case 'booking_cancelled':
        console.log('🚫 Received booking cancelled notification');
        this.emit('booking_cancelled', data.payload);
        break;

      case 'error':
        console.error('❌ Server error:', data.payload?.message);
        this.emit('server_error', data.payload);
        break;

      default:
        console.warn('⚠️ Unknown message type:', data.type);
        this.emit('unknown_message', data);
    }

    // Emit the message for other listeners
    this.emit('message', data);
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

      vehicles.forEach(async (vehicle: VehicleData) => {
        const result_route_sync = await routeSyncService.syncRoutesForVehicle(vehicle);
        console.log(`📊 Route sync results: ${result_route_sync}`);
      });

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
   * Handle instant sync from central server
   */
  private async handleInstantSync(data: any): Promise<void> {
    try {
      const { dataType, operation, data: syncData, syncId, stationId: targetStationId } = data.payload;
      
      console.log(`📡 Processing instant sync: ${dataType} ${operation} (${syncId})`);

      // Check if this sync is targeted to our station (if stationId is specified)
      if (targetStationId && targetStationId !== this.stationId) {
        console.log(`⚠️ Sync not for this station (target: ${targetStationId}, current: ${this.stationId})`);
        return;
      }

      switch (dataType) {
        case 'staff':
          await this.handleStaffSync(operation, syncData);
          break;
        case 'route':
          await this.handleRouteSync(operation, syncData);
          break;
        case 'station':
          await this.handleStationSync(operation, syncData);
          break;
        case 'vehicle':
          await this.handleVehicleSync(operation, syncData);
          break;
        case 'destination':
        case 'governorate':
        case 'delegation':
          await this.handleGeographicSync(dataType, operation, syncData);
          break;
        default:
          console.warn(`⚠️ Unhandled sync data type: ${dataType}`);
      }

      // Send acknowledgment
      this.sendInstantSyncAck(syncId, dataType, operation, true, []);

      // Emit sync event for other services to listen
      this.emit('instant_sync_processed', {
        dataType,
        operation,
        data: syncData,
        syncId
      });

    } catch (error) {
      console.error('❌ Error processing instant sync:', error);
      this.sendInstantSyncAck(data.payload?.syncId, data.payload?.dataType, data.payload?.operation, false, [error instanceof Error ? error.message : 'Unknown error']);
    }
  }

  /**
   * Handle staff sync
   */
  private async handleStaffSync(operation: string, staffData: any): Promise<void> {
    const { prisma } = await import('../config/database');
    
    switch (operation) {
      case 'create':
        await prisma.staff.upsert({
          where: { cin: staffData.cin },
          update: {
            firstName: staffData.firstName,
            lastName: staffData.lastName,
            phoneNumber: staffData.phoneNumber,
            role: staffData.role,
            isActive: staffData.isActive,
            syncedAt: new Date()
          },
          create: {
            id: staffData.id,
            cin: staffData.cin,
            firstName: staffData.firstName,
            lastName: staffData.lastName,
            phoneNumber: staffData.phoneNumber,
            password: staffData.password || '$2b$12$default', // Placeholder password
            role: staffData.role,
            isActive: staffData.isActive,
            syncedAt: new Date()
          }
        });
        console.log(`✅ Staff synced: ${staffData.firstName} ${staffData.lastName} (${staffData.cin})`);
        break;
      case 'update':
        await prisma.staff.update({
          where: { id: staffData.id },
          data: {
            firstName: staffData.firstName,
            lastName: staffData.lastName,
            phoneNumber: staffData.phoneNumber,
            role: staffData.role,
            isActive: staffData.isActive,
            syncedAt: new Date()
          }
        });
        console.log(`✅ Staff updated: ${staffData.firstName} ${staffData.lastName}`);
        break;
      case 'delete':
        await prisma.staff.delete({
          where: { id: staffData.id }
        });
        console.log(`✅ Staff deleted: ${staffData.id}`);
        break;
    }
  }

  /**
   * Handle route sync
   */
  private async handleRouteSync(operation: string, routeData: any): Promise<void> {
    const { prisma } = await import('../config/database');
    
    switch (operation) {
      case 'create':
        await prisma.route.upsert({
          where: { id: routeData.id },
          update: {
            stationId: routeData.destinationStationId,
            stationName: routeData.destinationStation?.name || 'Unknown',
            basePrice: routeData.basePrice,
            isActive: routeData.isActive,
            syncedAt: new Date()
          },
          create: {
            id: routeData.id,
            stationId: routeData.destinationStationId,
            stationName: routeData.destinationStation?.name || 'Unknown',
            basePrice: routeData.basePrice,
            isActive: routeData.isActive,
            syncedAt: new Date()
          }
        });
        console.log(`✅ Route synced: ${routeData.departureStation?.name} → ${routeData.destinationStation?.name}`);
        break;
      case 'update':
        await prisma.route.update({
          where: { id: routeData.id },
          data: {
            basePrice: routeData.basePrice,
            isActive: routeData.isActive,
            syncedAt: new Date()
          }
        });
        console.log(`✅ Route updated: ${routeData.id}`);
        break;
      case 'delete':
        await prisma.route.delete({
          where: { id: routeData.id }
        });
        console.log(`✅ Route deleted: ${routeData.id}`);
        break;
    }
  }

  /**
   * Handle station config sync 
   */
  private async handleStationSync(operation: string, stationData: any): Promise<void> {
    const { prisma } = await import('../config/database');
    
    switch (operation) {
      case 'create':
      case 'update':
        await prisma.stationConfig.upsert({
          where: { stationId: stationData.id },
          update: {
            stationName: stationData.name,
            governorate: stationData.governorate?.name || 'Unknown',
            delegation: stationData.delegation?.name || 'Unknown',
            address: stationData.address,
            isOperational: stationData.isActive
          },
          create: {
            stationId: stationData.id,
            stationName: stationData.name,
            governorate: stationData.governorate?.name || 'Unknown',
            delegation: stationData.delegation?.name || 'Unknown',
            address: stationData.address,
            isOperational: stationData.isActive,
            serverVersion: '1.0.0'
          }
        });
        console.log(`✅ Station config synced: ${stationData.name}`);
        break;
      case 'delete':
        await prisma.stationConfig.delete({
          where: { stationId: stationData.id }
        });
        console.log(`✅ Station config deleted: ${stationData.id}`);
        break;
    }
  }

  /**
   * Handle vehicle sync (extended from existing)
   */
  private async handleVehicleSync(operation: string, vehicleData: any): Promise<void> {
    // Use existing vehicle sync service
    const { vehicleSyncService } = await import('../services/vehicleSyncService');
    
    switch (operation) {
      case 'create':
      case 'update':
        await vehicleSyncService.handleVehicleUpdate(vehicleData, this.stationId || 'unknown');
        break;
      case 'delete':
        await vehicleSyncService.handleVehicleDelete(vehicleData.id);
        break;
    }
  }

  /**
   * Handle geographic data sync (destinations, governorates, delegations)
   * Note: Local node stores these as strings, not separate models
   */
  private async handleGeographicSync(dataType: string, operation: string, data: any): Promise<void> {
    // For the local node, geographic data is stored as strings in other models
    // We'll log this for now and could update related records if needed
    console.log(`📍 Geographic ${dataType} ${operation}: ${data.name || data.id} (stored as strings in local models)`);
    
    // Could potentially update route governorate/delegation fields if needed
    if (dataType === 'governorate' || dataType === 'delegation') {
      // Update route records that reference this geographic data
      const { prisma } = await import('../config/database');
      
      try {
        if (operation === 'update' && dataType === 'governorate') {
          await prisma.route.updateMany({
            where: { governorate: data.oldName || data.name },
            data: { governorate: data.name }
          });
        }
        // Similar logic could be added for delegation updates
      } catch (error) {
        console.warn(`⚠️ Could not update geographic reference: ${error}`);
      }
    }
  }

  /**
   * Send instant sync acknowledgment to central server
   */
  private sendInstantSyncAck(syncId: string, dataType: string, operation: string, success: boolean, errors: string[]): void {
    this.send({
      type: 'instant_sync_ack',
      payload: {
        syncId,
        dataType,
        operation,
        success,
        errors,
        stationId: this.stationId,
        timestamp: new Date().toISOString()
      },
      timestamp: Date.now()
    });
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

  private async refreshPublicIp(): Promise<void> {
    const previousIp = this.publicIp;
    this.publicIp = await this.getPublicIpAddress();

    // For local development, we always use localhost, so no need to update unless it's the first time
    if (this.publicIp && this.publicIp !== previousIp) {
      console.log(`🔄 IP set to ${this.publicIp} for local development`);

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
      if (this.isConnected) {
        console.log('💓 Sending heartbeat to central server...');
        this.send({
          type: 'heartbeat',
          payload: {
            stationId: this.stationId,
            timestamp: new Date().toISOString()
          },
          timestamp: Date.now()
        });
      }
    }, this.heartbeatInterval);

    // Initialize last heartbeat response time
    this.lastHeartbeatResponse = Date.now();
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

  private startConnectionMonitor(): void {
    if (this.connectionMonitorTimer) {
      clearInterval(this.connectionMonitorTimer);
    }

    this.connectionMonitorTimer = setInterval(() => {
      // Check if we're supposed to be connected
      if (!this._reconnectEnabled) {
        return; // Skip monitoring if reconnection is disabled
      }

      // If we're not connected and not already trying to connect, attempt reconnection
      if (!this.isConnected && !this.isConnecting && !this.reconnectTimer) {
        console.log('🔍 Connection monitor: Not connected. Initiating reconnection...');
        this.connect().catch(error => {
          console.error('❌ Connection monitor reconnection attempt failed:', error);
        });
        return;
      }

      // If we are connected, check if we're still getting heartbeat responses
      if (this.isConnected && this.lastHeartbeatResponse) {
        const heartbeatAge = Date.now() - this.lastHeartbeatResponse;

        // If we haven't received a heartbeat response in 2.5x the interval, connection might be dead
        if (heartbeatAge > this.heartbeatInterval * 2.5) {
          console.warn(`⚠️ Connection monitor: No heartbeat response in ${Math.round(heartbeatAge / 1000)}s. Connection may be dead.`);

          // Force close the socket to trigger reconnection
          if (this.ws) {
            console.log('🔄 Connection monitor: Forcing socket closure to trigger reconnection');
            this.ws.terminate(); // Force close the socket
          }
        }
      }
    }, this.connectionMonitorInterval);

    console.log(`🔍 Connection monitor started (interval: ${this.connectionMonitorInterval / 1000}s)`);
  }

  private stopConnectionMonitor(): void {
    if (this.connectionMonitorTimer) {
      clearInterval(this.connectionMonitorTimer);
      this.connectionMonitorTimer = null;
      console.log('🔍 Connection monitor stopped');
    }
  }

  private attemptReconnect(): void {
    if (!this._reconnectEnabled) {
      console.log('⏸️ Reconnection is disabled. Not attempting to reconnect.');
      return;
    }

    this.reconnectAttempts++;

    // Calculate reconnect delay with exponential backoff (with max limit)
    if (this.reconnectAttempts > 1) {
      // Exponential backoff formula: min(initialDelay * 2^(attempts-1), maxDelay)
      this.reconnectDelay = Math.min(
        this.initialReconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1),
        this.maxReconnectDelay
      );
    } else {
      this.reconnectDelay = this.initialReconnectDelay;
    }

    console.log(`🔄 Attempting to reconnect (attempt #${this.reconnectAttempts}) in ${Math.round(this.reconnectDelay / 1000)}s...`);

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
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

    this._reconnectEnabled = false;

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this.reconnectAttempts = 0;
    console.log('✅ Reconnection attempts stopped');
  }

  startReconnecting(): void {
    console.log('▶️ Enabling reconnection attempts...');
    this._reconnectEnabled = true;

    // If we're not connected, try to connect immediately
    if (!this.isConnected && !this.isConnecting && !this.reconnectTimer) {
      console.log('🔄 Initiating immediate reconnection attempt...');
      this.reconnectAttempts = 0;
      this.reconnectDelay = this.initialReconnectDelay;
      this.connect().catch(error => {
        console.error('❌ Immediate reconnection attempt failed:', error);
      });
    }
  }

  forceReconnect(): void {
    console.log('🔄 Forcing reconnection...');

    // Make sure reconnection is enabled
    this._reconnectEnabled = true;

    // Close existing connection if any
    if (this.ws) {
      this.ws.close(1000, 'Forced reconnection');
      this.ws = null;
    }

    // Reset reconnection state
    this.isConnecting = false;
    this.isAuthenticated = false;
    this.reconnectAttempts = 0;
    this.reconnectDelay = this.initialReconnectDelay;

    // Clear any existing reconnect timer
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    // Attempt to connect immediately
    this.connect().catch(error => {
      console.error('❌ Forced reconnection attempt failed:', error);
    });
  }

  /**
   * Handle seat availability request from central server
   */
  private async handleSeatAvailabilityRequest(data: any): Promise<void> {
    try {
      const { destinationId, requestId } = data.payload;
      console.log(`📋 Processing seat availability request for destination: ${destinationId}`);

      // Import the queue booking service dynamically to avoid circular dependency
      const QueueBookingServiceModule = await import('../services/queueBookingService');
      const queueBookingService = new QueueBookingServiceModule.QueueBookingService(this);

      // Get current seat availability
      const seatInfo = await queueBookingService.getAvailableSeats(destinationId);

      // Send response back to central server
      this.send({
        type: 'seat_availability_response',
        payload: {
          requestId,
          destinationId,
          success: seatInfo.success,
          data: seatInfo.data,
          error: seatInfo.error,
          timestamp: new Date().toISOString()
        },
        timestamp: Date.now()
      });

      console.log(`✅ Seat availability response sent for request ${requestId}`);

    } catch (error) {
      console.error('❌ Error processing seat availability request:', error);

      // Send error response
      this.send({
        type: 'seat_availability_response',
        payload: {
          requestId: data.payload?.requestId,
          destinationId: data.payload?.destinationId,
          success: false,
          error: 'Failed to process seat availability request',
          timestamp: new Date().toISOString()
        },
        timestamp: Date.now()
      });
    }
  }

  /**
   * Send message to WebSocket server
   */
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
  requestStaffLogin(cin: string, password: string): Promise<any> {
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
        payload: { cin, password },
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

  get reconnectEnabled(): boolean {
    return this._reconnectEnabled;
  }
}