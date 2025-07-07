import { Router } from 'express';
import { WebSocketService } from '../websocket/webSocketService';

// Create a function that returns the router with access to the WebSocket service
export default function createWebSocketRouter(webSocketService: WebSocketService) {
  const router = Router();

  /**
   * @route GET /api/websocket/status
   * @desc Get WebSocket connection status
   * @access Public
   */
  router.get('/status', (req, res) => {
    res.json({
      status: webSocketService.connectionState,
      isConnected: webSocketService.isConnected,
      isAuthenticated: webSocketService.authenticated,
      reconnectEnabled: webSocketService.reconnectEnabled,
      timestamp: new Date().toISOString()
    });
  });

  /**
   * @route POST /api/websocket/reconnect
   * @desc Force WebSocket reconnection
   * @access Public
   */
  router.post('/reconnect', (req, res) => {
    // Force reconnection
    webSocketService.forceReconnect();
    
    res.json({
      status: 'reconnecting',
      message: 'WebSocket reconnection initiated',
      timestamp: new Date().toISOString()
    });
  });

  /**
   * @route POST /api/websocket/toggle
   * @desc Enable or disable automatic reconnection
   * @access Public
   * @body { enable: boolean }
   */
  router.post('/toggle', (req, res) => {
    const { enable } = req.body;
    
    if (enable === true) {
      webSocketService.startReconnecting();
      res.json({
        status: 'enabled',
        message: 'WebSocket reconnection enabled',
        timestamp: new Date().toISOString()
      });
    } else if (enable === false) {
      webSocketService.stopReconnecting();
      res.json({
        status: 'disabled',
        message: 'WebSocket reconnection disabled',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Invalid request. Please provide "enable" parameter as true or false',
        timestamp: new Date().toISOString()
      });
    }
  });

  return router;
} 