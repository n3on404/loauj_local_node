import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { dayPassService } from '../services/dayPassService';
import { LoggingService } from '../services/loggingService';

// Extend Express Request interface to include staff
declare global {
  namespace Express {
    interface Request {
      staff?: any;
    }
  }
}

const loggingService = new LoggingService();

export class DayPassController {
  /**
   * Purchase a day pass for a driver/vehicle
   */
  async purchaseDayPass(req: Request, res: Response) {
    try {
      const { driverId, vehicleId, licensePlate } = req.body;
      const staffId = req.staff?.id;

      if (!staffId) {
        return res.status(401).json({
          success: false,
          message: 'Non autorisé'
        });
      }

      if (!driverId || !vehicleId || !licensePlate) {
        return res.status(400).json({
          success: false,
          message: 'Données manquantes: driverId, vehicleId et licensePlate sont requis'
        });
      }

      const result = await dayPassService.purchaseDayPass({
        driverId,
        vehicleId,
        licensePlate,
        createdBy: staffId
      });

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.error
        });
      }

      await loggingService.log('DAY_PASS_API_PURCHASE', {
        staffId,
        driverId,
        vehicleId,
        licensePlate,
        dayPassId: result.dayPass?.id
      });

      res.json({
        success: true,
        message: 'Pass journalier acheté avec succès',
        data: result.dayPass
      });
      return;

    } catch (error) {
      console.error('Error in purchaseDayPass controller:', error);
      await loggingService.log('DAY_PASS_API_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'purchaseDayPass'
      });

      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
      return;
    }
  }

  /**
   * Validate a driver's day pass
   */
  async validateDayPass(req: Request, res: Response) {
    try {
      const { driverId } = req.params;

      if (!driverId) {
        return res.status(400).json({
          success: false,
          message: 'driverId est requis'
        });
      }

      const validation = await dayPassService.validateDayPass(driverId);

      res.json({
        success: true,
        data: validation
      });
      return;

    } catch (error) {
      console.error('Error in validateDayPass controller:', error);
      await loggingService.log('DAY_PASS_API_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'validateDayPass'
      });

      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
      return;
    }
  }

  /**
   * Get day pass status for a driver
   */
  async getDayPassStatus(req: Request, res: Response) {
    try {
      const { driverId } = req.params;

      if (!driverId) {
        return res.status(400).json({
          success: false,
          message: 'driverId est requis'
        });
      }

      const status = await dayPassService.getDayPassStatus(driverId);

      res.json({
        success: true,
        data: status
      });
      return;

    } catch (error) {
      console.error('Error in getDayPassStatus controller:', error);
      await loggingService.log('DAY_PASS_API_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'getDayPassStatus'
      });

      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
      return;
    }
  }

  /**
   * Get day pass status for a vehicle by license plate
   */
  async getDayPassStatusByLicensePlate(req: Request, res: Response) {
    try {
      const { licensePlate } = req.params;

      if (!licensePlate) {
        return res.status(400).json({
          success: false,
          message: 'licensePlate est requis'
        });
      }

      // Find vehicle by license plate
      const vehicle = await prisma.vehicle.findUnique({
        where: { licensePlate },
        include: { driver: true }
      });

      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: `Véhicule avec la plaque ${licensePlate} non trouvé`
        });
      }

      if (!vehicle.driver) {
        return res.status(404).json({
          success: false,
          message: `Aucun conducteur associé au véhicule ${licensePlate}`
        });
      }

      const status = await dayPassService.getDayPassStatus(vehicle.driver.id);
      
      console.log(`Day pass status for vehicle ${licensePlate} (driver: ${vehicle.driver.id}):`, status);

      res.json({
        success: true,
        data: {
          ...status,
          vehicle: {
            licensePlate: vehicle.licensePlate,
            capacity: vehicle.capacity
          },
          driver: {
            id: vehicle.driver.id,
            cin: vehicle.driver.cin,
            accountStatus: vehicle.driver.accountStatus
          }
        }
      });
      return;

    } catch (error) {
      console.error('Error in getDayPassStatusByLicensePlate controller:', error);
      await loggingService.log('DAY_PASS_API_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'getDayPassStatusByLicensePlate'
      });

      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
      return;
    }
  }

  /**
   * Get day pass price
   */
  async getDayPassPrice(req: Request, res: Response) {
    try {
      const price = await dayPassService.getDayPassPrice();

      res.json({
        success: true,
        data: {
          price: price
        }
      });
      return;

    } catch (error) {
      console.error('Error in getDayPassPrice controller:', error);
      await loggingService.log('DAY_PASS_API_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'getDayPassPrice'
      });

      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
      return;
    }
  }

  /**
   * Get all day passes for today
   */
  async getTodayDayPasses(req: Request, res: Response) {
    try {
      const dayPasses = await dayPassService.getTodayDayPasses();

      res.json({
        success: true,
        data: dayPasses
      });

    } catch (error) {
      console.error('Error in getTodayDayPasses controller:', error);
      await loggingService.log('DAY_PASS_API_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'getTodayDayPasses'
      });

      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
      return;
    }
  }

  /**
   * Get day pass statistics
   */
  async getDayPassStats(req: Request, res: Response) {
    try {
      const { date } = req.query;
      const targetDate = date ? new Date(date as string) : undefined;

      const stats = await dayPassService.getDayPassStats(targetDate);

      res.json({
        success: true,
        data: stats
      });

    } catch (error) {
      console.error('Error in getDayPassStats controller:', error);
      await loggingService.log('DAY_PASS_API_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'getDayPassStats'
      });

      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
      return;
    }
  }

  /**
   * Manually expire all day passes (for testing or manual intervention)
   */
  async expireAllDayPasses(req: Request, res: Response) {
    try {
      const staffId = req.staff?.id;

      if (!staffId) {
        return res.status(401).json({
          success: false,
          message: 'Non autorisé'
        });
      }

      const result = await dayPassService.expireAllDayPasses();

      await loggingService.log('DAY_PASS_MANUAL_EXPIRATION', {
        staffId,
        expiredCount: result.expiredCount
      });

      res.json({
        success: true,
        message: `${result.expiredCount} passes journaliers ont été expirés`,
        data: result
      });
      return;

    } catch (error) {
      console.error('Error in expireAllDayPasses controller:', error);
      await loggingService.log('DAY_PASS_API_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'expireAllDayPasses'
      });

      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
      return;
    }
  }

  /**
   * Get drivers without valid day pass
   */
  async getDriversWithoutDayPass(req: Request, res: Response) {
    try {
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();

      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

      // Get all active drivers
      const drivers = await prisma.driver.findMany({
        where: {
          isActive: true,
          accountStatus: 'APPROVED'
        },
        include: {
          vehicle: {
            select: {
              id: true,
              licensePlate: true,
              capacity: true
            }
          }
        }
      });

      // Get drivers who have valid day passes today
      const driversWithDayPass = await prisma.dayPass.findMany({
        where: {
          purchaseDate: {
            gte: startOfDay,
            lt: endOfDay
          },
          isActive: true,
          isExpired: false
        },
        select: {
          driverId: true
        }
      });

      const driversWithDayPassIds = new Set(driversWithDayPass.map((dp: any) => dp.driverId));

      // Filter out drivers who have valid day passes
      const driversWithoutDayPass = drivers.filter((driver: any) => 
        !driversWithDayPassIds.has(driver.id)
      );

      await prisma.$disconnect();

      res.json({
        success: true,
        data: driversWithoutDayPass
      });

    } catch (error) {
      console.error('Error in getDriversWithoutDayPass controller:', error);
      await loggingService.log('DAY_PASS_API_ERROR', {
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'getDriversWithoutDayPass'
      });

      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
      return;
    }
  }
}

export const dayPassController = new DayPassController();