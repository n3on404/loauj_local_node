import { Request, Response, NextFunction } from 'express';
import { getAuthService } from '../services/authService';
import { WebSocketService } from '../websocket/webSocketService';
import { configService } from '../config/supervisorConfig';

// Extend Express Request interface to include staff
declare global {
  namespace Express {
    interface Request {
      staff?: any;
    }
  }
}

// Cache the auth service instance
let authService: ReturnType<typeof getAuthService> | null = null;

const getAuthServiceInstance = () => {
  if (!authService) {
    // Create a new WebSocket service if needed
    const webSocketService = new WebSocketService();
    authService = getAuthService(webSocketService);
  }
  return authService;
};

/**
 * Middleware to authenticate requests using JWT tokens
 * Checks local database first, then falls back to central server if connected
 * Allows central server requests to bypass authentication
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Allow central server requests to bypass authentication
    if (req.headers['x-central-server'] === 'true') {
      console.log('🔐 Central server request - bypassing authentication');
      req.staff = {
        role: 'CENTRAL_SERVER',
        station: { id: configService.getStationId() }
      };
      next();
      return;
    }

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      });
      return;
    }

    const token = authHeader.substring(7);
    const authServiceInstance = getAuthServiceInstance();
    
    const verificationResult = await authServiceInstance.verifyToken(token);

    if (!verificationResult.valid) {
      res.status(401).json({
        success: false,
        message: verificationResult.error || 'Invalid token',
        code: 'INVALID_TOKEN'
      });
      return;
    }

    // Attach staff info to request
    req.staff = verificationResult.staff;
    next();
  } catch (error) {
    console.error('❌ Authentication middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error',
      code: 'AUTH_ERROR'
    });
  }
};

/**
 * Optional authentication - doesn't block if no token provided
 */
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without authentication
      next();
      return;
    }

    const token = authHeader.substring(7);
    const authServiceInstance = getAuthServiceInstance();
    
    const verificationResult = await authServiceInstance.verifyToken(token);

    if (verificationResult.valid) {
      req.staff = verificationResult.staff;
    }
    // Continue regardless of token validity
    next();
  } catch (error) {
    console.error('❌ Optional authentication error:', error);
    // Continue even on error
    next();
  }
};

/**
 * Require specific role
 */
export const requireRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.staff) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
      return;
    }

    if (!allowedRoles.includes(req.staff.role)) {
      res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
        code: 'INSUFFICIENT_PERMISSIONS'
      });
      return;
    }

    next();
  };
};

/**
 * Require supervisor role or higher
 */
export const requireSupervisor = requireRole(['SUPERVISOR', 'ADMIN']);

/**
 * Require admin role
 */
export const requireAdmin = requireRole(['ADMIN']);

/**
 * Require worker role or higher (anyone) or central server
 */
export const requireStaff = (req: Request, res: Response, next: NextFunction): void => {
  // Allow central server requests
  if (req.staff?.role === 'CENTRAL_SERVER') {
    next();
    return;
  }
  
  // For other requests, require staff role
  if (!req.staff) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
      code: 'AUTH_REQUIRED'
    });
    return;
  }

  const allowedRoles = ['WORKER', 'SUPERVISOR', 'ADMIN'];
  if (!allowedRoles.includes(req.staff.role)) {
    res.status(403).json({
      success: false,
      message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
      code: 'INSUFFICIENT_PERMISSIONS'
    });
    return;
  }

  next();
};

/**
 * Check if station is connected to central server
 */
export const requireCentralConnection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authServiceInstance = getAuthServiceInstance();
    
    if (!authServiceInstance.isConnectedToCentral) {
      res.status(503).json({
        success: false,
        message: 'This operation requires connection to central server',
        code: 'NOT_CONNECTED',
        connectionStatus: authServiceInstance.connectionStatus
      });
      return;
    }

    next();
  } catch (error) {
    console.error('❌ Central connection check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check central server connection',
      code: 'CONNECTION_CHECK_ERROR'
    });
  }
};

/**
 * Validate CIN format
 */
export const validateCIN = (req: Request, res: Response, next: NextFunction): void => {
  const { cin } = req.body;
  
  if (!cin || typeof cin !== 'string' || cin.length !== 8 || !/^\d{8}$/.test(cin)) {
    res.status(400).json({
      success: false,
      message: 'CIN must be exactly 8 digits',
      code: 'INVALID_CIN'
    });
    return;
  }
  
  next();
};

/**
 * Validate phone number format (Tunisia)
 */
export const validatePhoneNumber = (req: Request, res: Response, next: NextFunction): void => {
  const { phoneNumber } = req.body;
  
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Phone number is required',
      code: 'MISSING_PHONE'
    });
    return;
  }
  
  // Tunisia phone number validation (simplified)
  const phoneRegex = /^(\+216|216|0)?[2-9]\d{7}$/;
  if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
    res.status(400).json({
      success: false,
      message: 'Invalid phone number format',
      code: 'INVALID_PHONE'
    });
    return;
  }
  
  next();
}; 