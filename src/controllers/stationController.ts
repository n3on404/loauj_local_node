import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const getStationConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const stationConfig = await prisma.stationConfig.findFirst();
    
    if (!stationConfig) {
      res.status(404).json({
        success: false,
        message: 'Station configuration not found'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        id: stationConfig.id,
        name: stationConfig.stationName,
        governorate: stationConfig.governorate,
        delegation: stationConfig.delegation,
        address: stationConfig.address,
        operatingHours: {
          openingTime: stationConfig.openingTime,
          closingTime: stationConfig.closingTime
        },
        isOperational: stationConfig.isOperational,
        isOnline: stationConfig.isOnline,
        lastSync: stationConfig.lastSync,
        updatedAt: stationConfig.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching station config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch station configuration',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateStationConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      name, 
      governorate, 
      delegation, 
      address,
      operatingHours,
      isOperational 
    } = req.body;

    // Validate required fields
    if (!name || !governorate || !delegation) {
      res.status(400).json({
        success: false,
        message: 'Station name, governorate, and delegation are required'
      });
      return;
    }

    // Validate operating hours
    if (operatingHours) {
      const { openingTime, closingTime } = operatingHours;
      if (!openingTime || !closingTime) {
        res.status(400).json({
          success: false,
          message: 'Both opening and closing times are required'
        });
        return;
      }

      // Validate time format (HH:MM)
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(openingTime) || !timeRegex.test(closingTime)) {
        res.status(400).json({
          success: false,
          message: 'Invalid time format. Use HH:MM format (e.g., 06:00)'
        });
        return;
      }

      // Validate that closing time is after opening time
      const [openHour, openMin] = openingTime.split(':').map(Number);
      const [closeHour, closeMin] = closingTime.split(':').map(Number);
      const openMinutes = openHour * 60 + openMin;
      const closeMinutes = closeHour * 60 + closeMin;
      
      if (openMinutes >= closeMinutes) {
        res.status(400).json({
          success: false,
          message: 'Closing time must be after opening time'
        });
        return;
      }
    }

    // Update or create station config
    const updatedConfig = await prisma.stationConfig.upsert({
      where: {
        stationId: 'local' // For local node, we use 'local' as station ID
      },
      update: {
        stationName: name,
        governorate,
        delegation,
        address: address || null,
        openingTime: operatingHours?.openingTime || '06:00',
        closingTime: operatingHours?.closingTime || '22:00',
        isOperational: isOperational !== undefined ? isOperational : true,
        updatedAt: new Date()
      },
      create: {
        stationId: 'local',
        stationName: name,
        governorate,
        delegation,
        address: address || null,
        openingTime: operatingHours?.openingTime || '06:00',
        closingTime: operatingHours?.closingTime || '22:00',
        isOperational: isOperational !== undefined ? isOperational : true,
        serverVersion: '1.0.0'
      }
    });

    res.json({
      success: true,
      message: 'Station configuration updated successfully',
      data: {
        id: updatedConfig.id,
        name: updatedConfig.stationName,
        governorate: updatedConfig.governorate,
        delegation: updatedConfig.delegation,
        address: updatedConfig.address,
        operatingHours: {
          openingTime: updatedConfig.openingTime,
          closingTime: updatedConfig.closingTime
        },
        isOperational: updatedConfig.isOperational,
        isOnline: updatedConfig.isOnline,
        updatedAt: updatedConfig.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating station config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update station configuration',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 