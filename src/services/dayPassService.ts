import { PrismaClient } from '@prisma/client';
import { LoggingService } from './loggingService';

const prisma = new PrismaClient();
const loggingService = new LoggingService();

export interface DayPassData {
  driverId: string;
  vehicleId: string;
  licensePlate: string;
  createdBy: string;
}

export interface DayPassValidationResult {
  isValid: boolean;
  expiresAt?: Date;
  message: string;
}

class DayPassService {
  private readonly DAY_PASS_PRICE = 2.0; // 2 TND

  /**
   * Purchase a day pass for a driver/vehicle
   */
  async purchaseDayPass(data: DayPassData): Promise<{ success: boolean; dayPass?: any; error?: string }> {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Check if driver already has a valid day pass for today
      const existingDayPass = await prisma.dayPass.findFirst({
        where: {
          driverId: data.driverId,
          purchaseDate: {
            gte: today,
            lt: tomorrow
          },
          isActive: true,
          isExpired: false
        }
      });

      if (existingDayPass) {
        return {
          success: false,
          error: 'Le chauffeur a déjà un pass journalier valide pour aujourd\'hui'
        };
      }

      // Create new day pass
      const dayPass = await prisma.dayPass.create({
        data: {
          driverId: data.driverId,
          vehicleId: data.vehicleId,
          licensePlate: data.licensePlate,
          price: this.DAY_PASS_PRICE,
          purchaseDate: now,
          validFrom: today, // 00:00:00 today
          validUntil: new Date(tomorrow.getTime() - 1), // 23:59:59 today
          isActive: true,
          isExpired: false,
          createdBy: data.createdBy
        },
        include: {
          driver: {
            select: {
              firstName: true,
              lastName: true,
              cin: true
            }
          },
          vehicle: {
            select: {
              licensePlate: true,
              capacity: true
            }
          },
          createdByStaff: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      });

      // Update driver's day pass status
      await prisma.driver.update({
        where: { id: data.driverId },
        data: {
          hasValidDayPass: true,
          dayPassExpiresAt: dayPass.validUntil
        }
      });

      await loggingService.log('DAY_PASS_PURCHASED', {
        dayPassId: dayPass.id,
        driverId: data.driverId,
        vehicleId: data.vehicleId,
        licensePlate: data.licensePlate,
        price: this.DAY_PASS_PRICE,
        validUntil: dayPass.validUntil,
        createdBy: data.createdBy
      });

      return {
        success: true,
        dayPass
      };

    } catch (error) {
      console.error('Error purchasing day pass:', error);
      await loggingService.log('DAY_PASS_PURCHASE_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        driverId: data.driverId,
        vehicleId: data.vehicleId
      });

      return {
        success: false,
        error: 'Erreur lors de l\'achat du pass journalier'
      };
    }
  }

  /**
   * Validate if a driver has a valid day pass
   */
  async validateDayPass(driverId: string): Promise<DayPassValidationResult> {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const dayPass = await prisma.dayPass.findFirst({
        where: {
          driverId,
          purchaseDate: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Tomorrow
          },
          isActive: true,
          isExpired: false
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      if (!dayPass) {
        return {
          isValid: false,
          message: 'Aucun pass journalier valide trouvé. Le pass journalier est obligatoire pour entrer dans la file d\'attente.'
        };
      }

      // Check if day pass is still valid (not expired)
      if (now > dayPass.validUntil) {
        // Mark as expired
        await prisma.dayPass.update({
          where: { id: dayPass.id },
          data: { isExpired: true }
        });

        // Update driver status
        await prisma.driver.update({
          where: { id: driverId },
          data: { hasValidDayPass: false }
        });

        return {
          isValid: false,
          message: 'Le pass journalier a expiré. Un nouveau pass journalier est requis.'
        };
      }

      return {
        isValid: true,
        expiresAt: dayPass.validUntil,
        message: 'Pass journalier valide'
      };

    } catch (error) {
      console.error('Error validating day pass:', error);
      return {
        isValid: false,
        message: 'Erreur lors de la validation du pass journalier'
      };
    }
  }

  /**
   * Get day pass status for a driver
   */
  async getDayPassStatus(driverId: string): Promise<{ hasValidPass: boolean; dayPass?: any }> {
    try {
      const validation = await this.validateDayPass(driverId);
      
      if (!validation.isValid) {
        return { hasValidPass: false };
      }

      const dayPass = await prisma.dayPass.findFirst({
        where: {
          driverId,
          isActive: true,
          isExpired: false
        },
        include: {
          driver: {
            select: {
              firstName: true,
              lastName: true,
              cin: true
            }
          },
          vehicle: {
            select: {
              licensePlate: true,
              capacity: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return {
        hasValidPass: true,
        dayPass
      };

    } catch (error) {
      console.error('Error getting day pass status:', error);
      return { hasValidPass: false };
    }
  }

  /**
   * Get all active day passes for today
   */
  async getTodayDayPasses(): Promise<any[]> {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

      return await prisma.dayPass.findMany({
        where: {
          purchaseDate: {
            gte: startOfDay,
            lt: endOfDay
          },
          isActive: true
        },
        include: {
          driver: {
            select: {
              firstName: true,
              lastName: true,
              cin: true
            }
          },
          vehicle: {
            select: {
              licensePlate: true,
              capacity: true
            }
          },
          createdByStaff: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

    } catch (error) {
      console.error('Error getting today\'s day passes:', error);
      return [];
    }
  }

  /**
   * Expire all day passes at midnight (should be called by a cron job)
   */
  async expireAllDayPasses(): Promise<{ expiredCount: number }> {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Find all day passes that should be expired (from previous days)
      const dayPassesToExpire = await prisma.dayPass.findMany({
        where: {
          purchaseDate: {
            lt: today
          },
          isActive: true,
          isExpired: false
        }
      });

      // Mark them as expired
      const result = await prisma.dayPass.updateMany({
        where: {
          purchaseDate: {
            lt: today
          },
          isActive: true,
          isExpired: false
        },
        data: {
          isExpired: true,
          isActive: false
        }
      });

      // Update all drivers who had expired day passes
      const driverIds = dayPassesToExpire.map(dp => dp.driverId);
      if (driverIds.length > 0) {
        await prisma.driver.updateMany({
          where: {
            id: {
              in: driverIds
            }
          },
          data: {
            hasValidDayPass: false,
            dayPassExpiresAt: null
          }
        });
      }

      await loggingService.log('DAY_PASSES_EXPIRED', {
        expiredCount: result.count,
        driverIds
      });

      return { expiredCount: result.count };

    } catch (error) {
      console.error('Error expiring day passes:', error);
      await loggingService.log('DAY_PASS_EXPIRATION_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      return { expiredCount: 0 };
    }
  }

  /**
   * Get day pass statistics
   */
  async getDayPassStats(date?: Date): Promise<{
    totalSold: number;
    totalRevenue: number;
    activePasses: number;
    expiredPasses: number;
  }> {
    try {
      const targetDate = date || new Date();
      const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

      const [totalSold, activePasses, expiredPasses] = await Promise.all([
        prisma.dayPass.count({
          where: {
            purchaseDate: {
              gte: startOfDay,
              lt: endOfDay
            }
          }
        }),
        prisma.dayPass.count({
          where: {
            purchaseDate: {
              gte: startOfDay,
              lt: endOfDay
            },
            isActive: true,
            isExpired: false
          }
        }),
        prisma.dayPass.count({
          where: {
            purchaseDate: {
              gte: startOfDay,
              lt: endOfDay
            },
            isExpired: true
          }
        })
      ]);

      const totalRevenue = totalSold * this.DAY_PASS_PRICE;

      return {
        totalSold,
        totalRevenue,
        activePasses,
        expiredPasses
      };

    } catch (error) {
      console.error('Error getting day pass stats:', error);
      return {
        totalSold: 0,
        totalRevenue: 0,
        activePasses: 0,
        expiredPasses: 0
      };
    }
  }

  /**
   * Get day pass price
   */
  getDayPassPrice(): number {
    return this.DAY_PASS_PRICE;
  }
}

export const dayPassService = new DayPassService();