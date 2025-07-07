import { EventEmitter } from 'events';
import { prisma } from '../config/database';
import { createQueueBookingService } from './queueBookingService';
import { WebSocketService } from '../websocket/webSocketService';
import axios from 'axios';

export interface SyncStatus {
  isOnline: boolean;
  pendingTrips: number;
  lastSyncAttempt: Date | null;
  lastSuccessfulSync: Date | null;
  consecutiveFailures: number;
}

export class AutoTripSyncService extends EventEmitter {
  private isRunning = false;
  private syncInterval: NodeJS.Timeout | null = null;
  private connectionCheckInterval: NodeJS.Timeout | null = null;
  private queueBookingService: any;
  private webSocketService: WebSocketService;
  
  // Configuration
  private readonly centralServerUrl: string;
  private readonly stationId: string;
  private readonly syncIntervalMs: number;
  private readonly connectionCheckIntervalMs: number;
  private readonly maxRetryAttempts: number;
  private readonly retryDelayMs: number;
  
  // Status tracking
  private currentStatus: SyncStatus = {
    isOnline: false,
    pendingTrips: 0,
    lastSyncAttempt: null,
    lastSuccessfulSync: null,
    consecutiveFailures: 0
  };

  constructor(webSocketService: WebSocketService) {
    super();
    this.webSocketService = webSocketService;
    this.centralServerUrl = process.env.CENTRAL_SERVER_URL || 'http://localhost:5000';
    this.stationId = process.env.STATION_ID || 'station-001';
    this.syncIntervalMs = parseInt(process.env.TRIP_SYNC_INTERVAL_MS || '30000'); // 30 seconds default
    this.connectionCheckIntervalMs = parseInt(process.env.CONNECTION_CHECK_INTERVAL_MS || '10000'); // 10 seconds
    this.maxRetryAttempts = parseInt(process.env.MAX_SYNC_RETRY_ATTEMPTS || '3');
    this.retryDelayMs = parseInt(process.env.SYNC_RETRY_DELAY_MS || '5000'); // 5 seconds
    
    // Initialize queue booking service
    this.queueBookingService = createQueueBookingService(webSocketService);
  }

  /**
   * Start the automatic sync service
   */
  async start(): Promise<void> {
    try {
      if (this.isRunning) {
        console.log('🔄 Auto Trip Sync Service is already running');
        return;
      }

      console.log('🚀 Starting Auto Trip Sync Service...');
      console.log(`📡 Central Server: ${this.centralServerUrl}`);
      console.log(`🏢 Station ID: ${this.stationId}`);
      console.log(`⏰ Sync Interval: ${this.syncIntervalMs / 1000}s`);
      console.log(`🔍 Connection Check Interval: ${this.connectionCheckIntervalMs / 1000}s`);

      this.isRunning = true;

      // Start connection monitoring
      this.startConnectionMonitoring();

      // Start sync loop
      this.startSyncLoop();

      // Initial sync attempt
      await this.performSyncCheck();

      this.emit('started');
      console.log('✅ Auto Trip Sync Service started successfully');

    } catch (error) {
      console.error('❌ Failed to start Auto Trip Sync Service:', error);
      this.isRunning = false;
      throw error;
    }
  }

  /**
   * Stop the automatic sync service
   */
  async stop(): Promise<void> {
    try {
      if (!this.isRunning) {
        console.log('🛑 Auto Trip Sync Service is not running');
        return;
      }

      console.log('🛑 Stopping Auto Trip Sync Service...');
      this.isRunning = false;

      // Clear intervals
      if (this.syncInterval) {
        clearInterval(this.syncInterval);
        this.syncInterval = null;
      }

      if (this.connectionCheckInterval) {
        clearInterval(this.connectionCheckInterval);
        this.connectionCheckInterval = null;
      }

      this.emit('stopped');
      console.log('✅ Auto Trip Sync Service stopped');

    } catch (error) {
      console.error('❌ Error stopping Auto Trip Sync Service:', error);
    }
  }

  /**
   * Start connection monitoring
   */
  private startConnectionMonitoring(): void {
    this.connectionCheckInterval = setInterval(async () => {
      if (!this.isRunning) return;

      const wasOnline = this.currentStatus.isOnline;
      const isOnline = await this.checkConnection();

      if (isOnline !== wasOnline) {
        this.currentStatus.isOnline = isOnline;
        
        if (isOnline) {
          console.log('🟢 Connection to central server restored');
          this.emit('connection_restored');
          
          // Reset consecutive failures
          this.currentStatus.consecutiveFailures = 0;
          
          // Immediately attempt sync when connection is restored
          await this.performSyncCheck();
        } else {
          console.log('🔴 Connection to central server lost');
          this.emit('connection_lost');
        }
      }
    }, this.connectionCheckIntervalMs);
  }

  /**
   * Start sync loop
   */
  private startSyncLoop(): void {
    this.syncInterval = setInterval(async () => {
      if (!this.isRunning) return;
      await this.performSyncCheck();
    }, this.syncIntervalMs);
  }

  /**
   * Check connection to central server
   */
  private async checkConnection(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.centralServerUrl}/health`, {
        timeout: 5000,
        headers: {
          'X-Station-ID': this.stationId
        }
      });

      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  /**
   * Perform sync check and attempt sync if needed
   */
  private async performSyncCheck(): Promise<void> {
    try {
      this.currentStatus.lastSyncAttempt = new Date();

      // Update pending trips count
      const pendingTripsCount = await prisma.trip.count({
        where: { syncStatus: 'PENDING' }
      });

      this.currentStatus.pendingTrips = pendingTripsCount;

      // Check if we're online
      if (!this.currentStatus.isOnline) {
        this.currentStatus.isOnline = await this.checkConnection();
      }

      // Only sync if we're online and have pending trips
      if (this.currentStatus.isOnline && pendingTripsCount > 0) {
        console.log(`🔄 Syncing ${pendingTripsCount} pending trip(s)...`);
        
        const success = await this.syncPendingTrips();
        
        if (success) {
          this.currentStatus.lastSuccessfulSync = new Date();
          this.currentStatus.consecutiveFailures = 0;
          console.log('✅ Trip sync completed successfully');
        } else {
          this.currentStatus.consecutiveFailures++;
          console.log(`❌ Trip sync failed (${this.currentStatus.consecutiveFailures} consecutive failures)`);
        }
      } else if (pendingTripsCount === 0) {
        // No pending trips, but update last successful sync time
        this.currentStatus.lastSuccessfulSync = new Date();
      }

      // Emit status update
      this.emit('status_update', this.currentStatus);

    } catch (error) {
      console.error('❌ Error during sync check:', error);
      this.currentStatus.consecutiveFailures++;
      this.emit('sync_error', error);
    }
  }

  /**
   * Sync pending trips to central server
   */
  private async syncPendingTrips(): Promise<boolean> {
    try {
      // Use the queue booking service sync method
      await this.queueBookingService.syncPendingTrips();
      
      // Check if any trips are still pending after sync attempt
      const remainingPendingTrips = await prisma.trip.count({
        where: { syncStatus: 'PENDING' }
      });

      // If we reduced the number of pending trips, consider it a success
      return remainingPendingTrips < this.currentStatus.pendingTrips;

    } catch (error) {
      console.error('❌ Error syncing pending trips:', error);
      return false;
    }
  }

  /**
   * Force sync now (manual trigger)
   */
  async forceSyncNow(): Promise<{ success: boolean; syncedCount: number; message: string }> {
    try {
      console.log('🔄 Manual sync triggered...');
      
      const initialPendingCount = await prisma.trip.count({
        where: { syncStatus: 'PENDING' }
      });

      if (initialPendingCount === 0) {
        return {
          success: true,
          syncedCount: 0,
          message: 'No pending trips to sync'
        };
      }

      // Check connection first
      const isOnline = await this.checkConnection();
      if (!isOnline) {
        return {
          success: false,
          syncedCount: 0,
          message: 'Central server is not reachable'
        };
      }

      // Update status
      this.currentStatus.isOnline = true;
      this.currentStatus.lastSyncAttempt = new Date();

      // Perform sync
      const success = await this.syncPendingTrips();
      
      if (success) {
        const finalPendingCount = await prisma.trip.count({
          where: { syncStatus: 'PENDING' }
        });

        const syncedCount = initialPendingCount - finalPendingCount;
        
        this.currentStatus.lastSuccessfulSync = new Date();
        this.currentStatus.consecutiveFailures = 0;
        this.currentStatus.pendingTrips = finalPendingCount;

        return {
          success: true,
          syncedCount,
          message: `Successfully synced ${syncedCount} trip(s)`
        };
      } else {
        this.currentStatus.consecutiveFailures++;
        return {
          success: false,
          syncedCount: 0,
          message: 'Sync failed - see logs for details'
        };
      }

    } catch (error) {
      console.error('❌ Error during manual sync:', error);
      return {
        success: false,
        syncedCount: 0,
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get current sync status
   */
  getStatus(): SyncStatus {
    return { ...this.currentStatus };
  }

  /**
   * Get detailed sync information
   */
  async getDetailedStatus(): Promise<{
    status: SyncStatus;
    pendingTrips: Array<{
      id: string;
      licensePlate: string;
      destinationName: string;
      startTime: Date;
      seatsBooked: number;
      createdAt: Date;
    }>;
    serviceInfo: {
      isRunning: boolean;
      centralServerUrl: string;
      stationId: string;
      syncIntervalMs: number;
    };
  }> {
    try {
      const pendingTrips = await prisma.trip.findMany({
        where: { syncStatus: 'PENDING' },
        select: {
          id: true,
          licensePlate: true,
          destinationName: true,
          startTime: true,
          seatsBooked: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      });

      return {
        status: this.getStatus(),
        pendingTrips,
        serviceInfo: {
          isRunning: this.isRunning,
          centralServerUrl: this.centralServerUrl,
          stationId: this.stationId,
          syncIntervalMs: this.syncIntervalMs
        }
      };

    } catch (error) {
      console.error('❌ Error getting detailed status:', error);
      return {
        status: this.getStatus(),
        pendingTrips: [],
        serviceInfo: {
          isRunning: this.isRunning,
          centralServerUrl: this.centralServerUrl,
          stationId: this.stationId,
          syncIntervalMs: this.syncIntervalMs
        }
      };
    }
  }

  /**
   * Check if service is running
   */
  get running(): boolean {
    return this.isRunning;
  }
}
