import { Request, Response, NextFunction } from 'express';
import { env } from '../config/environment';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  
  // Skip logging for health checks and static files
  if (req.path === '/health' || req.path.startsWith('/static')) {
    return next();
  }

  // Log request
  if (env.DEBUG) {
    console.log(`📨 ${req.method} ${req.path}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent')?.substring(0, 50),
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
      body: req.method !== 'GET' && req.body ? 
        { ...req.body, password: req.body.password ? '[REDACTED]' : undefined } : 
        undefined,
    });
  }

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(body: any) {
    const duration = Date.now() - startTime;
    
    if (env.DEBUG) {
      console.log(`📤 ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`, {
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        success: res.statusCode < 400,
      });
    }
    
    return originalJson.call(this, body);
  };

  next();
}; 