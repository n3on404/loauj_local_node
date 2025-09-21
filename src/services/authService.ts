import { PrismaClient } from '@prisma/client';
import { WebSocketService } from '../websocket/webSocketService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export interface LoginResponse {
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
  private jwtSecret: string;
  private saltRounds: number = 12;

  constructor(webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;
    this.jwtSecret = process.env.JWT_SECRET || '125169cc5d865676c9b13ec2df5926cc942ff45e84eb931d6e2cef2940f8efbc';
  }

  /**
   * Hash CIN to use as default password
   */
  private async hashCinPassword(cin: string): Promise<string> {
    return await bcrypt.hash(cin, this.saltRounds);
  }

  /**
   * Login with CIN and password
   */
  async login(cin: string, password: string): Promise<LoginResponse> {
    try {
      console.log(`🔐 Attempting login for CIN: ${cin}`);

      // First try local authentication
      const localResult = await this.loginLocally(cin, password);
      if (localResult.success) {
        return localResult;
      }

      // If local auth fails and we're connected, try central server
      if (this.webSocketService.isConnected && this.webSocketService.authenticated) {
        console.log(`🔄 Local auth failed, trying central server for CIN: ${cin}`);
        const centralResult = await this.webSocketService.requestStaffLogin(cin, password);
        
        if (centralResult.success) {
          // Store session locally for future use
          const sessionResult = await this.storeSession(centralResult.data.token, centralResult.data.staff);
          
          if (!sessionResult.success) {
            console.error('❌ Failed to store session locally:', sessionResult.error);
          }

          console.log(`✅ Staff login successful via central: ${centralResult.data.staff.firstName} ${centralResult.data.staff.lastName}`);
          
          return {
            success: true,
            message: centralResult.message,
            token: centralResult.data.token,
            staff: centralResult.data.staff
          };
        }
      }

      return {
        success: false,
        message: 'Invalid CIN or password'
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
        message: 'Login failed. Please try again.'
      };
    }
  }

  /**
   * Login using local database
   */
  private async loginLocally(cin: string, password: string): Promise<LoginResponse> {
    try {
      // Find staff member in local database
      const staff = await prisma.staff.findUnique({
        where: { cin }
      });

      if (!staff || !staff.isActive) {
        return {
          success: false,
          message: 'Invalid CIN or password'
        };
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, staff.password);

      if (!isValidPassword) {
        return {
          success: false,
          message: 'Invalid CIN or password'
        };
      }

      // Create JWT token
      const tokenPayload: TokenPayload = {
        staffId: staff.id,
        cin: staff.cin,
        role: staff.role,
        stationId: 'local' // Local station ID
      };

      const token = jwt.sign(tokenPayload, this.jwtSecret, { expiresIn: '30d' });

      // Update last login time
      await prisma.staff.update({
        where: { id: staff.id },
        data: { lastLogin: new Date() }
      });

      // Store session in database for token verification
      const sessionResult = await this.storeSession(token, {
        id: staff.id,
        cin: staff.cin,
        firstName: staff.firstName,
        lastName: staff.lastName,
        role: staff.role,
        phoneNumber: staff.phoneNumber
      });

      if (!sessionResult.success) {
        console.error('❌ Failed to store session locally:', sessionResult.error);
      }

      console.log(`✅ Local login successful: ${staff.firstName} ${staff.lastName}`);

      return {
        success: true,
        message: 'Login successful',
        token,
        staff: {
          id: staff.id,
          cin: staff.cin,
          firstName: staff.firstName,
          lastName: staff.lastName,
          role: staff.role,
          phoneNumber: staff.phoneNumber
        }
      };

    } catch (error) {
      console.error('❌ Local login error:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.'
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

      // Check if staff with this CIN already exists but with a different ID
      const existingStaff = await prisma.staff.findUnique({
        where: { cin: staff.cin }
      });

      if (existingStaff && existingStaff.id !== staff.id) {
        // Delete the existing staff record to avoid unique constraint violation
        await prisma.session.deleteMany({
          where: { staffId: existingStaff.id }
        });
        
        await prisma.staff.delete({
          where: { id: existingStaff.id }
        });
        
        console.log(`⚠️ Removed conflicting staff record with CIN ${staff.cin} but different ID`);
      }

      // Store or update staff info locally
      await prisma.staff.upsert({
        where: { id: staff.id },
        update: {
          cin: staff.cin,
          firstName: staff.firstName,
          lastName: staff.lastName,
          phoneNumber: staff.phoneNumber,
          password: staff.password || await this.hashCinPassword(staff.cin), // CIN as default password
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
          password: staff.password || await this.hashCinPassword(staff.cin), // CIN as default password
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
   * Change staff password
   */
  async changePassword(staffId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log(`🔒 Changing password for staff: ${staffId}`);

      // Get staff with current password
      const staff = await prisma.staff.findUnique({
        where: { id: staffId }
      });

      if (!staff) {
        return {
          success: false,
          message: 'Staff member not found'
        };
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, staff.password);

      if (!isValidPassword) {
        return {
          success: false,
          message: 'Current password is incorrect'
        };
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, this.saltRounds);

      // Update password
      await prisma.staff.update({
        where: { id: staffId },
        data: { password: hashedNewPassword }
      });

      console.log(`✅ Password changed successfully for staff: ${staffId}`);

      return {
        success: true,
        message: 'Password changed successfully'
      };

    } catch (error) {
      console.error('❌ Error changing password:', error);
      return {
        success: false,
        message: 'Failed to change password'
      };
    }
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