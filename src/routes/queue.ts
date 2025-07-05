import { Router } from 'express';
import { createQueueController } from '../controllers/queue';
import { authenticate } from '../middleware/auth';
import { WebSocketService } from '../websocket/webSocketService';

// Create a function that returns the router with the controller
export default function createQueueRouter(webSocketService?: WebSocketService) {
  const router = Router();
  
  // Create controller with WebSocket service if available, otherwise create a mock one
  const queueController = webSocketService 
    ? createQueueController(webSocketService)
    : createQueueController(new WebSocketService()); // Fallback

  /**
   * @route POST /api/queue/enter
   * @desc Enter a vehicle into a queue for a specific destination
   * @access Public (No authentication required)
   * @body { licensePlate: string }
   */
  router.post('/enter', queueController.enterQueue.bind(queueController));

  /**
   * @route POST /api/queue/exit
   * @desc Exit a vehicle from the queue
   * @access Public (No authentication required)
   * @body { licensePlate: string }
   */
  router.post('/exit', queueController.exitQueue.bind(queueController));

  // Apply authentication middleware to protected routes
  router.use(authenticate);

  /**
   * @route GET /api/queue/available
   * @desc Get all available destination queues with summary
   * @access Private (Authenticated staff)
   */
  router.get('/available', queueController.getAvailableQueues.bind(queueController));

  /**
   * @route GET /api/queue/stats
   * @desc Get comprehensive queue statistics
   * @access Private (Authenticated staff)
   */
  router.get('/stats', queueController.getQueueStats.bind(queueController));

  /**
   * @route GET /api/queue/:destinationId
   * @desc Get detailed queue for a specific destination
   * @access Private (Authenticated staff)
   * @param {string} destinationId - The destination station ID
   */
  router.get('/:destinationId', queueController.getDestinationQueue.bind(queueController));

  /**
   * @route PUT /api/queue/status
   * @desc Update vehicle status in queue
   * @access Private (Authenticated staff)
   * @body { licensePlate: string, status: 'WAITING' | 'LOADING' | 'READY' | 'DEPARTED' }
   */
  router.put('/status', queueController.updateVehicleStatus.bind(queueController));

  return router;
} 