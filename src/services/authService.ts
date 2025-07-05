import { PrismaClient } from '../../generated/prisma';
import { WebSocketService } from '../websocket/webSocketService';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface LoginResponse {
  success: boolean;
  message: string;
  requiresVerification?: boolean;
  data?: any;
}

export interface VerifyResponse {
  success: boolean;
  message: string;
  token?: string;
  staff?: any;
}

export interface TokenPayload {
  staffId: string;
  cin: string;
  role: string;
  stationId: string;
}

export class LocalAuthService {
  private webSocketService: WebSocketService;

  constructor(webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;
  }

  /**
   * Initiate staff login process via WebSocket
   */
  async initiateLogin(cin: string): Promise<LoginResponse> {
    try {
      // Check if WebSocket is connected
      if (!this.webSocketService.isConnected || !this.webSocketService.authenticated) {
        return {
          success: false,
          message: 'Station not connected to central server. Please check your internet connection.'
        };
      }

      console.log(`🔐 Initiating staff login for CIN: ${cin}`);

      // Send login request via WebSocket
      const result = await this.webSocketService.requestStaffLogin(cin);

      if (result.success) {
        console.log(`✅ SMS verification sent for staff: ${result.data?.firstName} ${result.data?.lastName}`);
      }

      return {
        success: result.success,
        message: result.message,
        requiresVerification: result.success,
        data: result.data
      };

    } catch (error) {
      console.error('❌ Local auth login error:', error);
      
      if (error instanceof Error && error.message.includes('not connected')) {
        return {
          success: false,
          message: 'Station not connected to central server. Please check your internet connection.'
        };
      }

      return {
        success: false,
        message: 'Failed to process login request. Please try again.'
      };
    }
  }

  /**
   * Verify SMS code and complete login process
   */
  async verifyLogin(cin: string, verificationCode: string): Promise<VerifyResponse> {
    try {
      // Check if WebSocket is connected
      if (!this.webSocketService.isConnected || !this.webSocketService.authenticated) {
        return {
          success: false,
          message: 'Station not connected to central server. Please check your internet connection.'
        };
      }

      console.log(`🔍 Verifying staff login for CIN: ${cin}`);

      // Send verification request via WebSocket
      const result = await this.webSocketService.requestStaffVerification(cin, verificationCode);

      if (!result.success) {
        return {
          success: false,
          message: result.message
        };
      }

      // Store session in local database
      const sessionResult = await this.storeSession(result.data.token, result.data.staff);

      if (!sessionResult.success) {
        console.error('❌ Failed to store session locally:', sessionResult.error);
        // Still return success since central auth worked
      }

      console.log(`✅ Staff login successful: ${result.data.staff.firstName} ${result.data.staff.lastName}`);

      return {
        success: true,
        message: result.message,
        token: result.data.token,
        staff: result.data.staff
      };

    } catch (error) {
      console.error('❌ Local auth verification error:', error);
      
      if (error instanceof Error && error.message.includes('not connected')) {
        return {
          success: false,
          message: 'Station not connected to central server. Please check your internet connection.'
        };
      }

      return {
        success: false,
        message: 'Failed to verify login. Please try again.'
      };
    }
  }

  /**
   * Verify token (check locally first, then central if needed)
   */
  async verifyToken(token: string): Promise<{ valid: boolean; staff?: any; error?: string; source?: string }> {
    try {
      // First try to verify from local database
      const localResult = await this.verifyTokenLocally(token);
      
      if (localResult.valid) {
        console.log(`✅ Token verified locally for staff: ${localResult.staff?.firstName} ${localResult.staff?.lastName}`);
        return { ...localResult, source: 'local' };
      }

      // If local verification fails and we're connected, try central server
      if (this.webSocketService.isConnected && this.webSocketService.authenticated) {
        console.log('🔄 Local token verification failed, checking with central server...');
        // TODO: Implement central token verification via WebSocket
        // For now, just return local result
      }

      return { valid: false, error: 'Invalid or expired token', source: 'local' };

    } catch (error) {
      console.error('❌ Token verification error:', error);
      return { valid: false, error: 'Token verification failed', source: 'error' };
    }
  }

  /**
   * Store session in local database for offline use
   */
  private async storeSession(token: string, staff: any): Promise<{ success: boolean; error?: string }> {
    try {
      // Decode token to get expiration
      const decoded = jwt.decode(token) as any;
      const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days default

      // Store or update staff info locally
      await prisma.staff.upsert({
        where: { id: staff.id },
        update: {
          cin: staff.cin,
          firstName: staff.firstName,
          lastName: staff.lastName,
          phoneNumber: staff.phoneNumber,
          role: staff.role,
          isActive: true,
          lastLogin: new Date(),
          syncedAt: new Date()
        },
        create: {
          id: staff.id,
          cin: staff.cin,
          firstName: staff.firstName,
          lastName: staff.lastName,
          phoneNumber: staff.phoneNumber,
          role: staff.role,
          isActive: true,
          lastLogin: new Date(),
          syncedAt: new Date()
        }
      });

      // Deactivate old sessions for this staff
      await prisma.session.updateMany({
        where: { staffId: staff.id, isActive: true },
        data: { isActive: false }
      });

      // Create new session
      await prisma.session.create({
        data: {
          staffId: staff.id,
          token: token,
          staffData: JSON.stringify(staff),
          isActive: true,
          lastActivity: new Date(),
          expiresAt: expiresAt,
          createdOffline: false
        }
      });

      console.log(`💾 Session stored locally for staff: ${staff.firstName} ${staff.lastName}`);
      return { success: true };

    } catch (error) {
      console.error('❌ Error storing session:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Verify token against local database
   */
  private async verifyTokenLocally(token: string): Promise<{ valid: boolean; staff?: any; error?: string }> {
    try {
      // Find session in local database
      const session = await prisma.session.findUnique({
        where: { token },
        include: { staff: true }
      });

      if (!session || !session.isActive) {
        return { valid: false, error: 'Session not found or inactive' };
      }

      // Check if session is expired
      if (session.expiresAt && session.expiresAt < new Date()) {
        // Mark session as inactive
        await prisma.session.update({
          where: { id: session.id },
          data: { isActive: false }
        });
        
        return { valid: false, error: 'Session expired' };
      }

      // Check if staff is still active
      if (!session.staff.isActive) {
        return { valid: false, error: 'Staff account is deactivated' };
      }

      // Update last activity
      await prisma.session.update({
        where: { id: session.id },
        data: { lastActivity: new Date() }
      });

      // Parse staff data from session
      const staffData = JSON.parse(session.staffData);

      return {
        valid: true,
        staff: {
          id: session.staff.id,
          cin: session.staff.cin,
          firstName: session.staff.firstName,
          lastName: session.staff.lastName,
          role: session.staff.role,
          phoneNumber: session.staff.phoneNumber,
          ...staffData // Include any additional data from central server
        }
      };

    } catch (error) {
      console.error('❌ Local token verification error:', error);
      return { valid: false, error: 'Token verification failed' };
    }
  }

  /**
   * Logout staff (deactivate session)
   */
  async logout(token: string): Promise<{ success: boolean; message: string }> {
    try {
      const result = await prisma.session.updateMany({
        where: { token, isActive: true },
        data: { 
          isActive: false,
          lastActivity: new Date()
        }
      });

      if (result.count > 0) {
        console.log(`✅ Staff logged out successfully`);
        return { success: true, message: 'Logged out successfully' };
      }

      return { success: false, message: 'Session not found' };

    } catch (error) {
      console.error('❌ Logout error:', error);
      return { success: false, message: 'Failed to logout' };
    }
  }

  /**
   * Check if station is connected to central server
   */
  get isConnectedToCentral(): boolean {
    return this.webSocketService.isConnected && this.webSocketService.authenticated;
  }

  /**
   * Get connection status
   */
  get connectionStatus(): string {
    if (!this.webSocketService.isConnected) {
      return 'disconnected';
    }
    if (!this.webSocketService.authenticated) {
      return 'connected_not_authenticated';
    }
    return 'connected_authenticated';
  }
}

// Export singleton instance
let authServiceInstance: LocalAuthService | null = null;

export const getAuthService = (webSocketService: WebSocketService): LocalAuthService => {
  if (!authServiceInstance) {
    authServiceInstance = new LocalAuthService(webSocketService);
  }
  return authServiceInstance;
}; 