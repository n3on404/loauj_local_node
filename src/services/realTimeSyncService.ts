import { EventEmitter } from 'events';
import { prisma } from '../config/database';
import { ConcurrencyManager } from './concurrencyManager';

export interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete' | 'sync';
  entityType: string;
  entityId: string;
  data: any;
  timestamp: Date;
  clientId: string;
  priority: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
  retryCount: number;
  maxRetries: number;
}

export interface DataSnapshot {
  entityType: string;
  entityId: string;
  data: any;
  version: number;
  timestamp: Date;
  checksum: string;
}

export interface SyncMetrics {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  averageSyncTime: number;
  lastSyncTime: Date;
  dataConsistencyScore: number;
  conflictsResolved: number;
}

export interface ClientSubscription {
  clientId: string;
  entityTypes: Set<string>;
  filters: Map<string, any>;
  lastSync: Date;
  syncInterval: number;
  isActive: boolean;
}

export class RealTimeSyncService extends EventEmitter {
  private syncOperations: Map<string, SyncOperation> = new Map();
  private dataSnapshots: Map<string, DataSnapshot> = new Map();
  private clientSubscriptions: Map<string, ClientSubscription> = new Map();
  private syncQueue: SyncOperation[] = [];
  private processingInterval: NodeJS.Timeout | null = null;
  private snapshotCleanupInterval: NodeJS.Timeout | null = null;
  private metrics: SyncMetrics;
  private concurrencyManager: ConcurrencyManager;
  
  // Configuration
  private readonly MAX_SYNC_OPERATIONS = 200;
  private readonly SYNC_PROCESSING_INTERVAL = 25; // 25ms for high-frequency updates
  private readonly SNAPSHOT_CLEANUP_INTERVAL = 60000; // 1 minute
  private readonly MAX_SNAPSHOT_AGE = 300000; // 5 minutes
  private readonly SYNC_TIMEOUT = 15000; // 15 seconds
  private readonly MAX_RETRIES = 3;
  private readonly BATCH_SIZE = 50; // Process operations in batches

  constructor(concurrencyManager: ConcurrencyManager) {
    super();
    
    this.concurrencyManager = concurrencyManager;
    
    this.metrics = {
      totalOperations: 0,
      successfulOperations: 0,
      failedOperations: 0,
      averageSyncTime: 0,
      lastSyncTime: new Date(),
      dataConsistencyScore: 100,
      conflictsResolved: 0
    };

    this.startProcessing();
    this.startSnapshotCleanup();
    this.setupConcurrencyManagerListeners();
    
    console.log('🚀 Real-Time Sync Service initialized with advanced data consistency');
  }

  /**
   * Subscribe a client to real-time updates
   */
  public subscribeClient(
    clientId: string,
    entityTypes: string[],
    filters: Map<string, any> = new Map(),
    syncInterval: number = 5000
  ): boolean {
    const subscription: ClientSubscription = {
      clientId,
      entityTypes: new Set(entityTypes),
      filters,
      lastSync: new Date(),
      syncInterval,
      isActive: true
    };

    this.clientSubscriptions.set(clientId, subscription);
    
    console.log(`📡 Client ${clientId} subscribed to: ${entityTypes.join(', ')}`);
    this.emit('client_subscribed', { clientId, entityTypes, filters });
    
    return true;
  }

  /**
   * Unsubscribe a client from real-time updates
   */
  public unsubscribeClient(clientId: string): boolean {
    const subscription = this.clientSubscriptions.get(clientId);
    if (subscription) {
      subscription.isActive = false;
      this.clientSubscriptions.delete(clientId);
      
      console.log(`📡 Client ${clientId} unsubscribed`);
      this.emit('client_unsubscribed', { clientId });
      
      return true;
    }
    return false;
  }

  /**
   * Submit a sync operation for processing
   */
  public async submitSyncOperation(
    type: SyncOperation['type'],
    entityType: string,
    entityId: string,
    data: any,
    clientId: string,
    priority: number = 1
  ): Promise<{ operationId: string; status: 'queued' | 'immediate' | 'rejected' }> {
    
    // Check if we can accept more operations
    if (this.syncOperations.size >= this.MAX_SYNC_OPERATIONS) {
      console.warn('⚠️ Maximum sync operations reached, rejecting new operation');
      return { operationId: '', status: 'rejected' };
    }

    const operationId = this.generateOperationId();
    const operation: SyncOperation = {
      id: operationId,
      type,
      entityType,
      entityId,
      data,
      timestamp: new Date(),
      clientId,
      priority,
      status: 'pending',
      retryCount: 0,
      maxRetries: this.MAX_RETRIES
    };

    // Check if we can process immediately
    if (this.canProcessImmediately(operation)) {
      operation.status = 'processing';
      this.syncOperations.set(operationId, operation);
      this.metrics.totalOperations++;
      
      // Process immediately
      this.processSyncOperation(operation);
      
      return { operationId, status: 'immediate' };
    }

    // Queue the operation
    operation.status = 'pending';
    this.syncOperations.set(operationId, operation);
    this.syncQueue.push(operation);
    
    // Sort queue by priority (higher priority first)
    this.syncQueue.sort((a, b) => b.priority - a.priority);
    
    this.metrics.totalOperations++;
    this.emit('sync_operation_queued', { operationId, type, entityType, entityId, clientId });
    
    return { operationId, status: 'queued' };
  }

  /**
   * Check if an operation can be processed immediately
   */
  private canProcessImmediately(operation: SyncOperation): boolean {
    // High priority operations can bypass queuing
    if (operation.priority >= 9) {
      return true;
    }

    // Check if we have capacity
    if (this.syncOperations.size >= this.MAX_SYNC_OPERATIONS * 0.8) {
      return false;
    }

    // Certain operation types can be processed immediately
    switch (operation.type) {
      case 'delete':
        // Deletions should be processed immediately to maintain consistency
        return true;
      case 'sync':
        // Sync operations can be processed immediately if no conflicts
        return !this.hasConflictingSync(operation);
      default:
        return false;
    }
  }

  /**
   * Check for conflicting sync operations
   */
  private hasConflictingSync(operation: SyncOperation): boolean {
    const conflictingOperations = Array.from(this.syncOperations.values()).filter(op => 
      op.entityType === operation.entityType &&
      op.entityId === operation.entityId &&
      op.status === 'processing' &&
      op.id !== operation.id
    );

    return conflictingOperations.length > 0;
  }

  /**
   * Process a sync operation
   */
  private async processSyncOperation(operation: SyncOperation): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Process the operation based on type
      const result = await this.executeSyncOperation(operation);
      
      if (result.success) {
        operation.status = 'completed';
        operation.result = result.data;
        this.metrics.successfulOperations++;
        
        // Update data snapshot
        this.updateDataSnapshot(operation.entityType, operation.entityId, result.data);
        
        // Notify subscribed clients
        this.notifySubscribedClients(operation.entityType, operation.entityId, result.data);
        
        this.emit('sync_operation_completed', { operation, result: result.data });
      } else {
        operation.status = 'failed';
        operation.error = result.error || 'Unknown error';
        this.metrics.failedOperations++;
        this.emit('sync_operation_failed', { operation, reason: result.error || 'Unknown error' });
      }

    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : 'Unknown error';
      this.metrics.failedOperations++;
      this.emit('sync_operation_failed', { operation, reason: operation.error });
    } finally {
      // Update metrics
      const syncTime = Date.now() - startTime;
      this.updateAverageSyncTime(syncTime);
      this.metrics.lastSyncTime = new Date();
      
      // Remove from operations map
      this.syncOperations.delete(operation.id);
      
      // Update data consistency score
      this.updateDataConsistencyScore();
    }
  }

  /**
   * Execute the actual sync operation
   */
  private async executeSyncOperation(operation: SyncOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      switch (operation.type) {
        case 'create':
          return await this.executeCreateOperation(operation);
        case 'update':
          return await this.executeUpdateOperation(operation);
        case 'delete':
          return await this.executeDeleteOperation(operation);
        case 'sync':
          return await this.executeDataSyncOperation(operation);
        default:
          return { success: false, error: `Unknown sync operation type: ${operation.type}` };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sync execution error' 
      };
    }
  }

  /**
   * Execute a create operation
   */
  private async executeCreateOperation(operation: SyncOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { entityType, entityId, data } = operation;
      
      // Use database transaction for consistency
      const result = await prisma.$transaction(async (tx) => {
        // Check if entity already exists
        const existing = await this.getEntityFromDatabase(tx, entityType, entityId);
        if (existing) {
          throw new Error(`Entity ${entityType}:${entityId} already exists`);
        }

        // Create the entity
        const created = await this.createEntityInDatabase(tx, entityType, data);
        
        return { entity: created, action: 'created' };
      });

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Create operation failed' 
      };
    }
  }

  /**
   * Execute an update operation
   */
  private async executeUpdateOperation(operation: SyncOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { entityType, entityId, data } = operation;
      
      const result = await prisma.$transaction(async (tx) => {
        // Check if entity exists
        const existing = await this.getEntityFromDatabase(tx, entityType, entityId);
        if (!existing) {
          throw new Error(`Entity ${entityType}:${entityId} not found`);
        }

        // Check for conflicts using optimistic locking
        if (data.version && existing.version !== data.version) {
          throw new Error(`Version conflict: expected ${data.version}, got ${existing.version}`);
        }

        // Update the entity
        const updated = await this.updateEntityInDatabase(tx, entityType, entityId, data);
        
        return { entity: updated, action: 'updated' };
      });

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Update operation failed' 
      };
    }
  }

  /**
   * Execute a delete operation
   */
  private async executeDeleteOperation(operation: SyncOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { entityType, entityId } = operation;
      
      const result = await prisma.$transaction(async (tx) => {
        // Check if entity exists
        const existing = await this.getEntityFromDatabase(tx, entityType, entityId);
        if (!existing) {
          throw new Error(`Entity ${entityType}:${entityId} not found`);
        }

        // Delete the entity
        await this.deleteEntityFromDatabase(tx, entityType, entityId);
        
        return { entityId, action: 'deleted' };
      });

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Delete operation failed' 
      };
    }
  }

  /**
   * Execute a sync operation (data synchronization)
   */
  private async executeDataSyncOperation(operation: SyncOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { entityType, entityId, data } = operation;
      
      const result = await prisma.$transaction(async (tx) => {
        // Get current entity state
        const current = await this.getEntityFromDatabase(tx, entityType, entityId);
        
        if (!current) {
          // Entity doesn't exist, create it
          const created = await this.createEntityInDatabase(tx, entityType, data);
          return { entity: created, action: 'created', syncType: 'full' };
        }

        // Check if update is needed
        if (this.isDataStale(current, data)) {
          const updated = await this.updateEntityInDatabase(tx, entityType, entityId, data);
          return { entity: updated, action: 'updated', syncType: 'incremental' };
        }

        return { entity: current, action: 'no_change', syncType: 'none' };
      });

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sync operation failed' 
      };
    }
  }

  /**
   * Get entity from database
   */
  private async getEntityFromDatabase(tx: any, entityType: string, entityId: string): Promise<any> {
    // This is a simplified implementation - in production, you'd have proper entity mapping
    switch (entityType) {
      case 'vehicle':
        return await tx.vehicle.findUnique({ where: { id: entityId } });
      case 'booking':
        return await tx.booking.findUnique({ where: { id: entityId } });
      case 'vehicleQueue':
        return await tx.vehicleQueue.findUnique({ where: { id: entityId } });
      case 'route':
        return await tx.route.findUnique({ where: { id: entityId } });
      case 'staff':
        return await tx.staff.findUnique({ where: { id: entityId } });
      default:
        throw new Error(`Unsupported entity type: ${entityType}`);
    }
  }

  /**
   * Create entity in database
   */
  private async createEntityInDatabase(tx: any, entityType: string, data: any): Promise<any> {
    switch (entityType) {
      case 'vehicle':
        return await tx.vehicle.create({ data });
      case 'booking':
        return await tx.booking.create({ data });
      case 'vehicleQueue':
        return await tx.vehicleQueue.create({ data });
      case 'route':
        return await tx.route.create({ data });
      case 'staff':
        return await tx.staff.create({ data });
      default:
        throw new Error(`Unsupported entity type: ${entityType}`);
    }
  }

  /**
   * Update entity in database
   */
  private async updateEntityInDatabase(tx: any, entityType: string, entityId: string, data: any): Promise<any> {
    switch (entityType) {
      case 'vehicle':
        return await tx.vehicle.update({ where: { id: entityId }, data });
      case 'booking':
        return await tx.booking.update({ where: { id: entityId }, data });
      case 'vehicleQueue':
        return await tx.vehicleQueue.update({ where: { id: entityId }, data });
      case 'route':
        return await tx.route.update({ where: { id: entityId }, data });
      case 'staff':
        return await tx.staff.update({ where: { id: entityId }, data });
      default:
        throw new Error(`Unsupported entity type: ${entityType}`);
    }
  }

  /**
   * Delete entity from database
   */
  private async deleteEntityFromDatabase(tx: any, entityType: string, entityId: string): Promise<void> {
    switch (entityType) {
      case 'vehicle':
        await tx.vehicle.delete({ where: { id: entityId } });
        break;
      case 'booking':
        await tx.booking.delete({ where: { id: entityId } });
        break;
      case 'vehicleQueue':
        await tx.vehicleQueue.delete({ where: { id: entityId } });
        break;
      case 'route':
        await tx.route.delete({ where: { id: entityId } });
        break;
      case 'staff':
        await tx.staff.delete({ where: { id: entityId } });
        break;
      default:
        throw new Error(`Unsupported entity type: ${entityType}`);
    }
  }

  /**
   * Check if data is stale and needs updating
   */
  private isDataStale(current: any, incoming: any): boolean {
    // Simple timestamp-based staleness check
    if (current.updatedAt && incoming.updatedAt) {
      return new Date(incoming.updatedAt) > new Date(current.updatedAt);
    }
    
    // Version-based check
    if (current.version && incoming.version) {
      return incoming.version > current.version;
    }
    
    // Checksum-based check
    if (current.checksum && incoming.checksum) {
      return current.checksum !== incoming.checksum;
    }
    
    // Default to true if we can't determine staleness
    return true;
  }

  /**
   * Update data snapshot
   */
  private updateDataSnapshot(entityType: string, entityId: string, data: any): void {
    const snapshotKey = `${entityType}:${entityId}`;
    const checksum = this.calculateChecksum(data);
    
    const snapshot: DataSnapshot = {
      entityType,
      entityId,
      data,
      version: (this.dataSnapshots.get(snapshotKey)?.version || 0) + 1,
      timestamp: new Date(),
      checksum
    };

    this.dataSnapshots.set(snapshotKey, snapshot);
  }

  /**
   * Calculate checksum for data
   */
  private calculateChecksum(data: any): string {
    // Simple checksum implementation - in production, use a proper hashing algorithm
    const dataString = JSON.stringify(data);
    let checksum = 0;
    
    for (let i = 0; i < dataString.length; i++) {
      checksum = ((checksum << 5) - checksum + dataString.charCodeAt(i)) & 0xffffffff;
    }
    
    return checksum.toString(16);
  }

  /**
   * Notify subscribed clients about data changes
   */
  private notifySubscribedClients(entityType: string, entityId: string, data: any): void {
    const snapshotKey = `${entityType}:${entityId}`;
    const snapshot = this.dataSnapshots.get(snapshotKey);
    
    if (!snapshot) return;

    this.clientSubscriptions.forEach((subscription, clientId) => {
      if (!subscription.isActive) return;
      
      // Check if client is subscribed to this entity type
      if (!subscription.entityTypes.has(entityType)) return;
      
      // Check if client should receive this update based on filters
      if (this.shouldClientReceiveUpdate(subscription, entityType, entityId, data)) {
        this.emit('client_update', {
          clientId,
          entityType,
          entityId,
          data: snapshot.data,
          version: snapshot.version,
          timestamp: snapshot.timestamp
        });
      }
    });
  }

  /**
   * Check if a client should receive an update based on their filters
   */
  private shouldClientReceiveUpdate(
    subscription: ClientSubscription,
    entityType: string,
    entityId: string,
    data: any
  ): boolean {
    const filters = subscription.filters.get(entityType);
    if (!filters) return true; // No filters means receive all updates
    
    // Apply filters (simplified implementation)
    for (const [key, value] of Object.entries(filters)) {
      if (data[key] !== value) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Start the sync operation processing loop
   */
  private startProcessing(): void {
    this.processingInterval = setInterval(() => {
      // Process queued operations in batches
      const operationsToProcess = this.syncQueue.splice(0, this.BATCH_SIZE);
      
      operationsToProcess.forEach(operation => {
        if (operation.status === 'pending') {
          operation.status = 'processing';
          this.processSyncOperation(operation);
        }
      });
    }, this.SYNC_PROCESSING_INTERVAL);

    console.log(`⚡ Sync processing started (interval: ${this.SYNC_PROCESSING_INTERVAL}ms, batch size: ${this.BATCH_SIZE})`);
  }

  /**
   * Start the snapshot cleanup loop
   */
  private startSnapshotCleanup(): void {
    this.snapshotCleanupInterval = setInterval(() => {
      const now = Date.now();
      const maxAge = this.MAX_SNAPSHOT_AGE;
      
      // Clean up old snapshots
      for (const [key, snapshot] of this.dataSnapshots.entries()) {
        if (now - snapshot.timestamp.getTime() > maxAge) {
          this.dataSnapshots.delete(key);
        }
      }
    }, this.SNAPSHOT_CLEANUP_INTERVAL);

    console.log(`🧹 Snapshot cleanup started (interval: ${this.SNAPSHOT_CLEANUP_INTERVAL / 1000}s, max age: ${this.MAX_SNAPSHOT_AGE / 1000}s)`);
  }

  /**
   * Setup listeners for concurrency manager events
   */
  private setupConcurrencyManagerListeners(): void {
    this.concurrencyManager.on('operation_completed', (data) => {
      // Trigger sync operations for completed concurrency operations
      this.emit('concurrency_operation_synced', data);
    });

    this.concurrencyManager.on('operation_failed', (data) => {
      // Handle failed concurrency operations
      this.emit('concurrency_operation_failed', data);
    });
  }

  /**
   * Update average sync time
   */
  private updateAverageSyncTime(syncTime: number): void {
    const totalTime = this.metrics.averageSyncTime * this.metrics.successfulOperations;
    this.metrics.successfulOperations++;
    this.metrics.averageSyncTime = (totalTime + syncTime) / this.metrics.successfulOperations;
  }

  /**
   * Update data consistency score
   */
  private updateDataConsistencyScore(): void {
    const totalOperations = this.metrics.successfulOperations + this.metrics.failedOperations;
    if (totalOperations === 0) return;
    
    const successRate = this.metrics.successfulOperations / totalOperations;
    this.metrics.dataConsistencyScore = Math.round(successRate * 100);
  }

  /**
   * Generate a unique operation ID
   */
  private generateOperationId(): string {
    return `sync_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get sync operation status
   */
  public getSyncOperationStatus(operationId: string): SyncOperation | null {
    return this.syncOperations.get(operationId) || null;
  }

  /**
   * Get all active sync operations
   */
  public getActiveSyncOperations(): SyncOperation[] {
    return Array.from(this.syncOperations.values()).filter(op => 
      op.status === 'processing' || op.status === 'pending'
    );
  }

  /**
   * Get sync metrics
   */
  public getMetrics(): SyncMetrics {
    return { ...this.metrics };
  }

  /**
   * Get data snapshot
   */
  public getDataSnapshot(entityType: string, entityId: string): DataSnapshot | null {
    const snapshotKey = `${entityType}:${entityId}`;
    return this.dataSnapshots.get(snapshotKey) || null;
  }

  /**
   * Get all data snapshots
   */
  public getAllDataSnapshots(): DataSnapshot[] {
    return Array.from(this.dataSnapshots.values());
  }

  /**
   * Get client subscriptions
   */
  public getClientSubscriptions(): ClientSubscription[] {
    return Array.from(this.clientSubscriptions.values());
  }

  /**
   * Force sync all data for a client
   */
  public async forceSyncForClient(clientId: string): Promise<boolean> {
    const subscription = this.clientSubscriptions.get(clientId);
    if (!subscription) return false;

    try {
      // Get all entities of subscribed types
      for (const entityType of subscription.entityTypes) {
        const entities = await this.getAllEntitiesOfType(entityType);
        
        for (const entity of entities) {
          await this.submitSyncOperation(
            'sync',
            entityType,
            entity.id,
            entity,
            clientId,
            10 // High priority
          );
        }
      }
      
      return true;
    } catch (error) {
      console.error(`❌ Force sync failed for client ${clientId}:`, error);
      return false;
    }
  }

  /**
   * Get all entities of a specific type
   */
  private async getAllEntitiesOfType(entityType: string): Promise<any[]> {
    try {
      switch (entityType) {
        case 'vehicle':
          return await prisma.vehicle.findMany();
        case 'booking':
          return await prisma.booking.findMany();
        case 'vehicleQueue':
          return await prisma.vehicleQueue.findMany();
        case 'route':
          return await prisma.route.findMany();
        case 'staff':
          return await prisma.staff.findMany();
        default:
          return [];
      }
    } catch (error) {
      console.error(`❌ Failed to get entities of type ${entityType}:`, error);
      return [];
    }
  }

  /**
   * Cleanup resources
   */
  public cleanup(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
    
    if (this.snapshotCleanupInterval) {
      clearInterval(this.snapshotCleanupInterval);
      this.snapshotCleanupInterval = null;
    }

    console.log('🧹 Real-Time Sync Service cleanup completed');
  }
} 