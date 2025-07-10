import { Router, Request, Response } from 'express';
import { getAuthService } from '../services/authService';
import { WebSocketService } from '../websocket/webSocketService';

const router = Router();

// Get WebSocket service instance (this should be injected properly in a real app)
// For now, we'll get it from the global instance or create a new one
let webSocketService: WebSocketService;

// Initialize WebSocket service and auth service
const initializeServices = () => {
  if (!webSocketService) {
    webSocketService = new WebSocketService();
    // Auto-connect when services are initialized
    webSocketService.connect().catch(error => {
      console.error('❌ Failed to connect WebSocket during auth service init:', error);
    });
  }
  return getAuthService(webSocketService);
};

// Login with CIN - Initiate SMS verification
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { cin } = req.body;
    
    if (!cin || typeof cin !== 'string' || cin.length !== 8) {
      res.status(400).json({
        success: false,
        message: 'CIN must be exactly 8 digits',
        code: 'INVALID_CIN'
      });
      return;
    }

    const authService = initializeServices();
    
    // Check if station is connected to central server
    if (!authService.isConnectedToCentral) {
      res.status(503).json({
        success: false,
        message: 'Station not connected to central server. Please check your internet connection.',
        code: 'NOT_CONNECTED',
        connectionStatus: authService.connectionStatus
      });
      return;
    }

    console.log(`🔐 Processing login request for CIN: ${cin}`);

    const result = await authService.initiateLogin(cin);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.message,
        code: 'LOGIN_FAILED'
      });
      return;
    }

    res.json({
      success: true,
      message: result.message,
      requiresVerification: true,
      data: result.data
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Verify SMS code and complete authentication
router.post('/verify', async (req: Request, res: Response): Promise<void> => {
  try {
    const { cin, verificationCode } = req.body;
    
    if (!cin || !verificationCode) {
      res.status(400).json({
        success: false,
        message: 'CIN and verification code are required',
        code: 'MISSING_FIELDS'
      });
      return;
    }

    const authService = initializeServices();

    // Check if station is connected to central server
    if (!authService.isConnectedToCentral) {
      res.status(503).json({
        success: false,
        message: 'Station not connected to central server. Please check your internet connection.',
        code: 'NOT_CONNECTED',
        connectionStatus: authService.connectionStatus
      });
      return;
    }

    console.log(`🔍 Processing verification for CIN: ${cin}`);

    const result = await authService.verifyLogin(cin, verificationCode);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.message,
        code: 'VERIFICATION_FAILED'
      });
      return;
    }

    res.json({
      success: true,
      message: result.message,
      token: result.token,
      staff: result.staff
    });
  } catch (error) {
    console.error('❌ Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Verify token (for middleware use) - GET endpoint for desktop app
router.get('/verify-token', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.query.token as string;
    
    if (!token) {
      res.status(400).json({
        success: false,
        message: 'Token is required',
        code: 'NO_TOKEN'
      });
      return;
    }

    const authService = initializeServices();
    const result = await authService.verifyToken(token);

    if (!result.valid) {
      res.status(401).json({
        success: false,
        message: result.error || 'Invalid token',
        code: 'INVALID_TOKEN'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Token is valid',
      staff: result.staff,
      source: result.source
    });
  } catch (error) {
    console.error('❌ Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Verify token (POST endpoint for compatibility)
router.post('/verify-token', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.body.token;
    
    if (!token) {
      res.status(400).json({
        success: false,
        message: 'Token is required',
        code: 'NO_TOKEN'
      });
      return;
    }

    const authService = initializeServices();
    const result = await authService.verifyToken(token);

    if (!result.valid) {
      res.status(401).json({
        success: false,
        message: result.error || 'Invalid token',
        code: 'INVALID_TOKEN'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Token is valid',
      staff: result.staff,
      source: result.source
    });
  } catch (error) {
    console.error('❌ Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Logout
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.body.token;
    
    if (!token) {
      res.status(400).json({
        success: false,
        message: 'Token is required',
        code: 'NO_TOKEN'
      });
      return;
    }

    const authService = initializeServices();
    const result = await authService.logout(token);

    res.json(result);
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Get connection status
router.get('/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const authService = initializeServices();
    
    res.json({
      success: true,
      connectionStatus: authService.connectionStatus,
      isConnectedToCentral: authService.isConnectedToCentral,
      websocketState: webSocketService?.connectionState || 'unknown'
    });
  } catch (error) {
    console.error('❌ Status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

export default router; 