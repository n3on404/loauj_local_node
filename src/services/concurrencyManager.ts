import { EventEmitter } from 'events';
import { prisma } from '../config/database';

export interface ConcurrencyOperation {
  id: string;
  type: 'booking' | 'cash_booking' | 'queue_update' | 'vehicle_status' | 'seat_assignment' | 'payment';
  resourceId: string;
  clientId: string;
  timestamp: Date;
  priority: number;
  data: any;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'conflict';
  result?: any;
  error?: string;
  retryCount: number;
  maxRetries: number;
  lockExpiry: Date;
}

export interface ResourceLock {
  resourceId: string;
  operationId: string;
  clientId: string;
  acquiredAt: Date;
  expiresAt: Date;
  type: string;
}

export interface ConcurrencyMetrics {
  totalOperations: number;
  activeOperations: number;
  completedOperations: number;
  failedOperations: number;
  conflictResolutions: number;
  averageProcessingTime: number;
  lockAcquisitionTime: number;
  lastUpdate: Date;
}

export class ConcurrencyManager extends EventEmitter {
  private operations: Map<string, ConcurrencyOperation> = new Map();
  private resourceLocks: Map<string, ResourceLock> = new Map();
  private operationQueue: ConcurrencyOperation[] = [];
  private processingInterval: NodeJS.Timeout | null = null;
  private lockCleanupInterval: NodeJS.Timeout | null = null;
  private metrics: ConcurrencyMetrics;
  
  // Configuration
  private readonly MAX_CONCURRENT_OPERATIONS = 100;
  private readonly LOCK_TIMEOUT = 30000; // 30 seconds
  private readonly MAX_RETRIES = 3;
  private readonly PROCESSING_INTERVAL = 50; // 50ms
  private readonly LOCK_CLEANUP_INTERVAL = 10000; // 10 seconds
  private readonly CONFLICT_RESOLUTION_STRATEGIES = {
    'booking': 'last-wins',
    'cash_booking': 'last-wins',
    'queue_update': 'merge',
    'vehicle_status': 'last-wins',
    'seat_assignment': 'first-wins',
    'payment': 'first-wins'
  };

  constructor() {
    super();
    
    this.metrics = {
      totalOperations: 0,
      activeOperations: 0,
      completedOperations: 0,
      failedOperations: 0,
      conflictResolutions: 0,
      averageProcessingTime: 0,
      lockAcquisitionTime: 0,
      lastUpdate: new Date()
    };

    this.startProcessing();
    this.startLockCleanup();
    
    console.log('🚀 Concurrency Manager initialized with advanced race condition handling');
  }

  /**
   * Submit an operation for processing with concurrency control
   */
  public async submitOperation(
    type: ConcurrencyOperation['type'],
    resourceId: string,
    clientId: string,
    data: any,
    priority: number = 1
  ): Promise<{ operationId: string; status: 'queued' | 'immediate' | 'conflict' }> {
    
    const operationId = this.generateOperationId();
    const operation: ConcurrencyOperation = {
      id: operationId,
      type,
      resourceId,
      clientId,
      timestamp: new Date(),
      priority,
      data,
      status: 'pending',
      retryCount: 0,
      maxRetries: this.MAX_RETRIES,
      lockExpiry: new Date(Date.now() + this.LOCK_TIMEOUT)
    };

    // Check if we can process immediately
    if (this.canProcessImmediately(type, resourceId, operation)) {
      operation.status = 'processing';
      this.operations.set(operationId, operation);
      this.metrics.totalOperations++;
      this.metrics.activeOperations++;
      
      // Process immediately
      this.processOperation(operation);
      
      return { operationId, status: 'immediate' };
    }

    // Check for conflicts
    const conflict = this.detectConflict(type, resourceId, operation);
    if (conflict) {
      const resolution = this.resolveConflict(conflict, operation);
      if (resolution === 'reject') {
        operation.status = 'conflict';
        this.emit('operation_conflict', { operation, conflict });
        return { operationId, status: 'conflict' };
      }
    }

    // Queue the operation
    operation.status = 'pending';
    this.operations.set(operationId, operation);
    this.operationQueue.push(operation);
    
    // Sort queue by priority (higher priority first)
    this.operationQueue.sort((a, b) => b.priority - a.priority);
    
    this.metrics.totalOperations++;
    this.emit('operation_queued', { operationId, type, resourceId, clientId });
    
    return { operationId, status: 'queued' };
  }

  /**
   * Check if an operation can be processed immediately
   */
  private canProcessImmediately(type: string, resourceId: string, operation: ConcurrencyOperation): boolean {
    // Check if resource is locked
    if (this.isResourceLocked(resourceId)) {
      return false;
    }

    // Check if we have capacity
    if (this.metrics.activeOperations >= this.MAX_CONCURRENT_OPERATIONS) {
      return false;
    }

    // High priority operations can bypass some checks
    if (operation.priority >= 8) {
      return true;
    }

    // Check operation type specific rules
    switch (type) {
      case 'payment':
        // Payments should be processed immediately to avoid conflicts
        return true;
      case 'vehicle_status':
        // Vehicle status updates can be processed immediately if no conflicts
        return !this.hasConflictingVehicleStatus(resourceId, operation);
      default:
        return false;
    }
  }

  /**
   * Detect conflicts with existing operations
   */
  private detectConflict(type: string, resourceId: string, operation: ConcurrencyOperation): ConcurrencyOperation | null {
    const conflictingOperations = Array.from(this.operations.values()).filter(op => 
      op.resourceId === resourceId && 
      op.status === 'processing' &&
      op.type === type &&
      op.id !== operation.id
    );

    if (conflictingOperations.length === 0) {
      return null;
    }

    // Return the most recent conflicting operation
    return conflictingOperations.sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    )[0];
  }

  /**
   * Resolve conflicts based on operation type and strategy
   */
  private resolveConflict(conflict: ConcurrencyOperation, operation: ConcurrencyOperation): 'accept' | 'reject' | 'merge' {
    const strategy = this.CONFLICT_RESOLUTION_STRATEGIES[operation.type as keyof typeof this.CONFLICT_RESOLUTION_STRATEGIES];
    
    switch (strategy) {
      case 'last-wins':
        // Cancel the conflicting operation and accept the new one
        conflict.status = 'failed';
        conflict.error = 'Superseded by newer operation';
        this.emit('operation_superseded', { conflict, supersededBy: operation });
        return 'accept';
        
      case 'first-wins':
        // Reject the new operation
        return 'reject';
        
      case 'merge':
        // Try to merge the operations
        if (this.canMergeOperations(conflict, operation)) {
          return 'merge';
        }
        return 'reject';
        
      default:
        return 'reject';
    }
  }

  /**
   * Check if operations can be merged
   */
  private canMergeOperations(existing: ConcurrencyOperation, newOp: ConcurrencyOperation): boolean {
    // Only certain operation types can be merged
    if (existing.type !== newOp.type) {
      return false;
    }

    switch (existing.type) {
      case 'queue_update':
        // Queue updates can be merged if they don't conflict
        return this.canMergeQueueUpdates(existing.data, newOp.data);
      case 'seat_assignment':
        // Seat assignments can be merged if they don't overlap
        return this.canMergeSeatAssignments(existing.data, newOp.data);
      default:
        return false;
    }
  }

  /**
   * Check if queue updates can be merged
   */
  private canMergeQueueUpdates(existingData: any, newData: any): boolean {
    // This is a simplified check - in production, you'd have more sophisticated logic
    return existingData.destinationId === newData.destinationId &&
           existingData.operation !== newData.operation;
  }

  /**
   * Check if seat assignments can be merged
   */
  private canMergeSeatAssignments(existingData: any, newData: any): boolean {
    // Check if seat assignments don't overlap
    const existingSeats = new Set(existingData.seats || []);
    const newSeats = new Set(newData.seats || []);
    
    for (const seat of newSeats) {
      if (existingSeats.has(seat)) {
        return false; // Overlap detected
      }
    }
    
    return true;
  }

  /**
   * Check if a resource is locked
   */
  private isResourceLocked(resourceId: string): boolean {
    const lock = this.resourceLocks.get(resourceId);
    if (!lock) return false;
    
    // Check if lock has expired
    if (new Date() > lock.expiresAt) {
      this.resourceLocks.delete(resourceId);
      return false;
    }
    
    return true;
  }

  /**
   * Acquire a lock on a resource
   */
  private acquireLock(resourceId: string, operationId: string, clientId: string, type: string): boolean {
    if (this.isResourceLocked(resourceId)) {
      return false;
    }

    const lock: ResourceLock = {
      resourceId,
      operationId,
      clientId,
      acquiredAt: new Date(),
      expiresAt: new Date(Date.now() + this.LOCK_TIMEOUT),
      type
    };

    this.resourceLocks.set(resourceId, lock);
    this.emit('lock_acquired', { resourceId, operationId, clientId, type });
    
    return true;
  }

  /**
   * Release a lock on a resource
   */
  private releaseLock(resourceId: string): void {
    const lock = this.resourceLocks.get(resourceId);
    if (lock) {
      this.resourceLocks.delete(resourceId);
      this.emit('lock_released', { resourceId, operationId: lock.operationId });
    }
  }

  /**
   * Check for conflicting vehicle status updates
   */
  private hasConflictingVehicleStatus(vehicleId: string, operation: ConcurrencyOperation): boolean {
    const conflictingOperations = Array.from(this.operations.values()).filter(op => 
      op.resourceId === vehicleId && 
      op.type === 'vehicle_status' &&
      op.status === 'processing' &&
      op.id !== operation.id
    );

    return conflictingOperations.length > 0;
  }

  /**
   * Process an operation with proper locking and conflict resolution
   */
  private async processOperation(operation: ConcurrencyOperation): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Acquire lock on the resource
      if (!this.acquireLock(operation.resourceId, operation.id, operation.clientId, operation.type)) {
        operation.status = 'failed';
        operation.error = 'Failed to acquire resource lock';
        this.emit('operation_failed', { operation, reason: 'lock_acquisition_failed' });
        return;
      }

      // Process the operation based on type
      const result = await this.executeOperation(operation);
      
      if (result.success) {
        operation.status = 'completed';
        operation.result = result.data;
        this.metrics.completedOperations++;
        this.emit('operation_completed', { operation, result: result.data });
      } else {
        operation.status = 'failed';
        operation.error = result.error || 'Unknown error';
        this.metrics.failedOperations++;
        this.emit('operation_failed', { operation, reason: result.error || 'Unknown error' });
      }

    } catch (error) {
      operation.status = 'failed';
      operation.error = error instanceof Error ? error.message : 'Unknown error';
      this.metrics.failedOperations++;
      this.emit('operation_failed', { operation, reason: operation.error });
    } finally {
      // Release the lock
      this.releaseLock(operation.resourceId);
      
      // Update metrics
      this.metrics.activeOperations--;
      const processingTime = Date.now() - startTime;
      this.updateAverageProcessingTime(processingTime);
      
      // Remove from operations map
      this.operations.delete(operation.id);
    }
  }

  /**
   * Execute the actual operation logic
   */
  private async executeOperation(operation: ConcurrencyOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      switch (operation.type) {
        case 'booking':
        case 'cash_booking':
          return await this.executeBooking(operation);
        case 'queue_update':
          return await this.executeQueueUpdate(operation);
        case 'vehicle_status':
          return await this.executeVehicleStatusUpdate(operation);
        case 'seat_assignment':
          return await this.executeSeatAssignment(operation);
        case 'payment':
          return await this.executePayment(operation);
        default:
          return { success: false, error: `Unknown operation type: ${operation.type}` };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Execution error' 
      };
    }
  }

  /**
   * Execute a booking operation
   */
  private async executeBooking(operation: ConcurrencyOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { destinationId, seatsRequested, staffId } = operation.data;
      
      // Use database transaction to ensure consistency
      const result = await prisma.$transaction(async (tx) => {
        // Check current seat availability using VehicleQueue (actual schema)
        const queueEntries = await tx.vehicleQueue.findMany({
          where: {
            destinationId,
            status: { in: ['WAITING', 'LOADING', 'READY'] }
          }
        });

        if (queueEntries.length === 0) {
          throw new Error('No vehicles available for this destination');
        }

        const totalAvailableSeats = queueEntries.reduce((sum: number, entry: any) => 
          sum + entry.availableSeats, 0
        );

        if (totalAvailableSeats < seatsRequested) {
          throw new Error('Insufficient seats available');
        }

        // Create the booking using actual schema
        const booking = await tx.booking.create({
          data: {
            id: `concurrency_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            queueId: queueEntries[0].id, // Use first available queue
            seatsBooked: seatsRequested,
            totalAmount: seatsRequested * (queueEntries[0].basePrice || 15.0),
            bookingSource: 'STATION',
            bookingType: 'CASH',
            paymentStatus: 'PAID',
            paymentMethod: 'CASH',
            verificationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
            createdBy: staffId,
            createdAt: new Date()
          }
        });

        // Update seat availability in VehicleQueue
        let remainingSeats = seatsRequested;
        for (const entry of queueEntries) {
          if (remainingSeats <= 0) break;
          
          const seatsToDeduct = Math.min(remainingSeats, entry.availableSeats);
          await tx.vehicleQueue.update({
            where: { id: entry.id },
            data: { availableSeats: entry.availableSeats - seatsToDeduct }
          });
          
          remainingSeats -= seatsToDeduct;
        }

        return { booking, seatsBooked: seatsRequested };
      });

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Booking execution failed' 
      };
    }
  }

  /**
   * Execute a queue update operation
   */
  private async executeQueueUpdate(operation: ConcurrencyOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { destinationId, action, vehicleId, seats } = operation.data;
      
      const result = await prisma.$transaction(async (tx) => {
        switch (action) {
          case 'add_vehicle':
            // Add vehicle to queue using VehicleQueue (actual schema)
            const queueEntry = await tx.vehicleQueue.create({
              data: {
                id: `queue_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
                vehicleId,
                destinationId,
                destinationName: `Destination ${destinationId}`,
                queueType: 'REGULAR',
                queuePosition: 1,
                status: 'WAITING',
                enteredAt: new Date(),
                availableSeats: seats,
                totalSeats: seats,
                basePrice: 15.0,
                syncedAt: new Date()
              }
            });
            return { queueEntry, action: 'added' };
            
          case 'remove_vehicle':
            // Remove vehicle from queue by updating status
            await tx.vehicleQueue.updateMany({
              where: { 
                vehicleId,
                destinationId,
                status: { in: ['WAITING', 'LOADING'] }
              },
              data: { status: 'DEPARTED' }
            });
            return { vehicleId, action: 'removed' };
            
          default:
            throw new Error(`Unknown queue action: ${action}`);
        }
      });

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Queue update execution failed' 
      };
    }
  }

  /**
   * Execute a vehicle status update operation
   */
  private async executeVehicleStatusUpdate(operation: ConcurrencyOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { vehicleId, status, metadata } = operation.data;
      
      // Update vehicle availability status (actual schema)
      const vehicle = await prisma.vehicle.update({
        where: { id: vehicleId },
        data: {
          isAvailable: status === 'available',
          isActive: status !== 'banned',
          isBanned: status === 'banned'
        }
      });

      return { success: true, data: vehicle };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Vehicle status update failed' 
      };
    }
  }

  /**
   * Execute a seat assignment operation
   */
  private async executeSeatAssignment(operation: ConcurrencyOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { vehicleId, seats, passengerInfo } = operation.data;
      
      const result = await prisma.$transaction(async (tx) => {
        // Check if seats are available in VehicleQueue (actual schema)
        const queueEntry = await tx.vehicleQueue.findFirst({
          where: { 
            vehicleId,
            status: { in: ['WAITING', 'LOADING'] }
          }
        });

        if (!queueEntry || queueEntry.availableSeats < seats.length) {
          throw new Error('Insufficient seats available');
        }

        // Create a booking instead of seat assignment (actual schema)
        const booking = await tx.booking.create({
          data: {
            id: `seat_assignment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            queueId: queueEntry.id,
            seatsBooked: seats.length,
            totalAmount: seats.length * (queueEntry.basePrice || 15.0),
            bookingSource: 'STATION',
            bookingType: 'CASH',
            paymentStatus: 'PAID',
            paymentMethod: 'CASH',
            verificationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
            createdAt: new Date()
          }
        });

        // Update available seats in VehicleQueue
        await tx.vehicleQueue.update({
          where: { id: queueEntry.id },
          data: { availableSeats: queueEntry.availableSeats - seats.length }
        });

        return { booking, vehicleId, seatsAssigned: seats.length };
      });

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Seat assignment failed' 
      };
    }
  }

  /**
   * Execute a payment operation
   */
  private async executePayment(operation: ConcurrencyOperation): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { bookingId, amount, paymentMethod, paymentDetails } = operation.data;
      
      const result = await prisma.$transaction(async (tx) => {
        // Check if booking exists and is unpaid
        const booking = await tx.booking.findUnique({
          where: { id: bookingId }
        });

        if (!booking) {
          throw new Error('Booking not found');
        }

        if (booking.paymentStatus === 'PAID') {
          throw new Error('Booking already paid');
        }

        // Update booking payment status (actual schema)
        await tx.booking.update({
          where: { id: bookingId },
          data: { 
            paymentStatus: 'PAID',
            paymentMethod: paymentMethod || 'CASH',
            paymentProcessedAt: new Date()
          }
        });

        return { bookingId, paymentStatus: 'PAID', paymentMethod };
      });

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Payment processing failed' 
      };
    }
  }

  /**
   * Start the operation processing loop
   */
  private startProcessing(): void {
    this.processingInterval = setInterval(() => {
      // Process queued operations
      while (this.operationQueue.length > 0 && 
             this.metrics.activeOperations < this.MAX_CONCURRENT_OPERATIONS) {
        
        const operation = this.operationQueue.shift();
        if (operation) {
          operation.status = 'processing';
          this.metrics.activeOperations++;
          this.processOperation(operation);
        }
      }
    }, this.PROCESSING_INTERVAL);

    console.log(`⚡ Operation processing started (interval: ${this.PROCESSING_INTERVAL}ms)`);
  }

  /**
   * Start the lock cleanup loop
   */
  private startLockCleanup(): void {
    this.lockCleanupInterval = setInterval(() => {
      const now = new Date();
      
      // Clean up expired locks
      for (const [resourceId, lock] of this.resourceLocks.entries()) {
        if (now > lock.expiresAt) {
          this.resourceLocks.delete(resourceId);
          this.emit('lock_expired', { resourceId, operationId: lock.operationId });
        }
      }
    }, this.LOCK_CLEANUP_INTERVAL);

    console.log(`🔓 Lock cleanup started (interval: ${this.LOCK_CLEANUP_INTERVAL / 1000}s)`);
  }

  /**
   * Update average processing time
   */
  private updateAverageProcessingTime(processingTime: number): void {
    const totalTime = this.metrics.averageProcessingTime * this.metrics.completedOperations;
    this.metrics.completedOperations++;
    this.metrics.averageProcessingTime = (totalTime + processingTime) / this.metrics.completedOperations;
  }

  /**
   * Generate a unique operation ID
   */
  private generateOperationId(): string {
    return `op_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get operation status
   */
  public getOperationStatus(operationId: string): ConcurrencyOperation | null {
    return this.operations.get(operationId) || null;
  }

  /**
   * Get all active operations
   */
  public getActiveOperations(): ConcurrencyOperation[] {
    return Array.from(this.operations.values()).filter(op => 
      op.status === 'processing' || op.status === 'pending'
    );
  }

  /**
   * Get concurrency metrics
   */
  public getMetrics(): ConcurrencyMetrics {
    return { ...this.metrics };
  }

  /**
   * Get resource lock information
   */
  public getResourceLocks(): ResourceLock[] {
    return Array.from(this.resourceLocks.values());
  }

  /**
   * Force release a lock (admin function)
   */
  public forceReleaseLock(resourceId: string): boolean {
    const lock = this.resourceLocks.get(resourceId);
    if (lock) {
      this.resourceLocks.delete(resourceId);
      this.emit('lock_force_released', { resourceId, operationId: lock.operationId });
      return true;
    }
    return false;
  }

  /**
   * Cleanup resources
   */
  public cleanup(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
    
    if (this.lockCleanupInterval) {
      clearInterval(this.lockCleanupInterval);
      this.lockCleanupInterval = null;
    }

    console.log('🧹 Concurrency Manager cleanup completed');
  }
} 