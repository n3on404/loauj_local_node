import { Router } from 'express';
import { WebSocketService } from '../websocket/webSocketService';
import { EnhancedLocalWebSocketServer } from '../websocket/EnhancedLocalWebSocketServer';

let localWebSocketServer: EnhancedLocalWebSocketServer | null = null;

// Create a function that returns the router with access to the WebSocket service
export default function createWebSocketRouter(webSocketService: WebSocketService) {
  const router = Router();

  /**
   * @route GET /api/websocket/status
   * @desc Get WebSocket connection status
   * @access Public
   */
  router.get('/status', (req, res) => {
    try {
      const statusData = {
        central: {
          connected: webSocketService.isConnected,
          authenticated: webSocketService.authenticated,
          connectionState: webSocketService.connectionState,
          reconnectEnabled: webSocketService.reconnectEnabled
        },
        local: localWebSocketServer ? {
          totalClients: localWebSocketServer.getClientCount(),
          authenticatedClients: localWebSocketServer.getAuthenticatedClientCount(),
          uptime: Math.floor(process.uptime())
        } : null,
        timestamp: new Date().toISOString()
      };

      res.json(statusData);
    } catch (error) {
      console.error('Error in WebSocket status endpoint:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  });

  /**
   * @route GET /api/websocket/health
   * @desc Get detailed WebSocket health information
   * @access Public
   */
  router.get('/health', (req, res) => {
    const isHealthy = webSocketService.isConnected && webSocketService.authenticated;
    
    const healthData = {
      healthy: isHealthy,
      central: {
        connected: webSocketService.isConnected,
        authenticated: webSocketService.authenticated,
        state: webSocketService.connectionState
      },
      local: localWebSocketServer ? {
        running: true,
        clients: localWebSocketServer.getClientCount(),
        authenticated: localWebSocketServer.getAuthenticatedClientCount()
      } : { running: false },
      timestamp: new Date().toISOString()
    };

    res.status(isHealthy ? 200 : 503).json(healthData);
  });

  /**
   * @route GET /api/websocket/metrics
   * @desc Get WebSocket connection metrics
   * @access Public
   */
  router.get('/metrics', (req, res) => {
    const metrics = {
      central: {
        connected: webSocketService.isConnected,
        authenticated: webSocketService.authenticated,
        state: webSocketService.connectionState
      },
      local: localWebSocketServer ? localWebSocketServer.getServerMetrics() : null,
      system: {
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      }
    };

    res.json(metrics);
  });

  /**
   * @route POST /api/websocket/reconnect
   * @desc Force reconnection to central server
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

  return router;
}

// Set the local WebSocket server instance
export function setLocalWebSocketServer(server: EnhancedLocalWebSocketServer): void {
  localWebSocketServer = server;
  console.log('✅ Local WebSocket server instance set in routes');
} 