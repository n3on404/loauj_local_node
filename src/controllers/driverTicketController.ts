import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { LoggingService } from '../services/loggingService';

export const generateEntryTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      licensePlate, 
      destinationId, 
      destinationName,
      staffId 
    } = req.body;

    // Validate required fields
    if (!licensePlate || !staffId) {
      res.status(400).json({
        success: false,
        message: 'License plate and staff ID are required'
      });
      return;
    }

    // Get station configuration
    const stationConfig = await prisma.stationConfig.findFirst();
    if (!stationConfig) {
      res.status(500).json({
        success: false,
        message: 'Station configuration not found'
      });
      return;
    }

    // Find vehicle
    const vehicle = await prisma.vehicle.findUnique({
      where: { licensePlate },
      include: { driver: true }
    });

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: `Vehicle with license plate ${licensePlate} not found`
      });
      return;
    }

    // Find current queue entry for this vehicle
    const queueEntry = await prisma.vehicleQueue.findFirst({
      where: {
        vehicleId: vehicle.id,
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      }
    });

    if (!queueEntry) {
      res.status(404).json({
        success: false,
        message: `Vehicle ${licensePlate} is not currently in a queue`
      });
      return;
    }

    // Find next vehicle in queue (if any)
    const nextVehicle = await prisma.vehicleQueue.findFirst({
      where: {
        destinationId: queueEntry.destinationId,
        queuePosition: queueEntry.queuePosition + 1,
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      },
      include: { vehicle: true }
    });

    // Generate ticket number
    const ticketNumber = `ENT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Create entry ticket
    const entryTicket = await prisma.driverEntryTicket.create({
      data: {
        vehicleId: vehicle.id,
        licensePlate: vehicle.licensePlate,
        stationId: stationConfig.stationId,
        stationName: stationConfig.stationName,
        queuePosition: queueEntry.queuePosition,
        nextVehiclePlate: nextVehicle?.vehicle.licensePlate || null,
        entryTime: new Date(),
        ticketPrice: 2.0, // Fixed 2 TND entry fee
        ticketNumber,
        createdBy: staffId
      },
      include: {
        vehicle: {
          include: {
            driver: true
          }
        },
        createdByStaff: true
      }
    });

    // Log the vehicle entry
    await LoggingService.logVehicleEntry(
      staffId,
      vehicle.licensePlate,
      stationConfig.stationName,
      queueEntry.queuePosition,
      ticketNumber
    );

    res.json({
      success: true,
      message: 'Entry ticket generated successfully',
      data: {
        ticket: entryTicket,
        queuePosition: queueEntry.queuePosition,
        nextVehicle: nextVehicle?.vehicle.licensePlate || 'None'
      }
    });

  } catch (error) {
    console.error('Error generating entry ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate entry ticket',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const generateExitTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      licensePlate, 
      destinationId, 
      destinationName,
      staffId 
    } = req.body;

    // Validate required fields
    if (!licensePlate || !staffId) {
      res.status(400).json({
        success: false,
        message: 'License plate and staff ID are required'
      });
      return;
    }

    // Get station configuration
    const stationConfig = await prisma.stationConfig.findFirst();
    if (!stationConfig) {
      res.status(500).json({
        success: false,
        message: 'Station configuration not found'
      });
      return;
    }

    // Find vehicle
    const vehicle = await prisma.vehicle.findUnique({
      where: { licensePlate },
      include: { driver: true }
    });

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: `Vehicle with license plate ${licensePlate} not found`
      });
      return;
    }

    // Find current queue entry for this vehicle
    const queueEntry = await prisma.vehicleQueue.findFirst({
      where: {
        vehicleId: vehicle.id,
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      }
    });

    if (!queueEntry) {
      res.status(404).json({
        success: false,
        message: `Vehicle ${licensePlate} is not currently in a queue`
      });
      return;
    }

    // Generate ticket number
    const ticketNumber = `EXT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Create exit ticket and update vehicle status to DEPART in a transaction
    const [exitTicket] = await prisma.$transaction([
      // Create the exit ticket
      prisma.driverExitTicket.create({
        data: {
          vehicleId: vehicle.id,
          licensePlate: vehicle.licensePlate,
          departureStationId: stationConfig.stationId,
          departureStationName: stationConfig.stationName,
          destinationStationId: destinationId || queueEntry.destinationId,
          destinationStationName: destinationName || queueEntry.destinationName,
          exitTime: new Date(),
          ticketNumber,
          createdBy: staffId
        },
        include: {
          vehicle: {
            include: {
              driver: true
            }
          },
          createdByStaff: true
        }
      }),
      // Update vehicle status to DEPART (remove from active queue but keep record)
      prisma.vehicleQueue.update({
        where: { id: queueEntry.id },
        data: { 
          status: 'DEPARTED',
          actualDeparture: new Date()
        }
      })
    ]);

    // Log the vehicle exit
    await LoggingService.logVehicleExit(
      staffId,
      vehicle.licensePlate,
      stationConfig.stationName,
      destinationName || queueEntry.destinationName,
      ticketNumber
    );

    res.json({
      success: true,
      message: 'Exit ticket generated successfully',
      data: {
        ticket: exitTicket,
        destination: destinationName || queueEntry.destinationName
      }
    });

  } catch (error) {
    console.error('Error generating exit ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate exit ticket',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getDriverTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { licensePlate } = req.params;

    if (!licensePlate) {
      res.status(400).json({
        success: false,
        message: 'License plate is required'
      });
      return;
    }

    // Find vehicle
    const vehicle = await prisma.vehicle.findUnique({
      where: { licensePlate }
    });

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: `Vehicle with license plate ${licensePlate} not found`
      });
      return;
    }

    // Get entry tickets
    const entryTickets = await prisma.driverEntryTicket.findMany({
      where: { vehicleId: vehicle.id },
      include: {
        createdByStaff: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Get exit tickets
    const exitTickets = await prisma.driverExitTicket.findMany({
      where: { vehicleId: vehicle.id },
      include: {
        createdByStaff: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: {
        entryTickets,
        exitTickets,
        totalEntryTickets: entryTickets.length,
        totalExitTickets: exitTickets.length
      }
    });

  } catch (error) {
    console.error('Error fetching driver tickets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch driver tickets',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 

export const getVehiclesInQueue = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get all vehicles currently in queue
    const queueEntries = await prisma.vehicleQueue.findMany({
      where: {
        status: { in: ['WAITING', 'LOADING', 'READY'] }
      },
      include: {
        vehicle: {
          include: {
            driver: true
          }
        }
      },
      orderBy: [
        { destinationName: 'asc' },
        { queuePosition: 'asc' }
      ]
    });

    // Group by destination
    const vehiclesByDestination = queueEntries.reduce((acc, entry) => {
      const destination = entry.destinationName;
      if (!acc[destination]) {
        acc[destination] = [];
      }
      acc[destination].push({
        id: entry.id,
        licensePlate: entry.vehicle.licensePlate,
        queuePosition: entry.queuePosition,
        status: entry.status,
        destinationName: entry.destinationName,
        destinationId: entry.destinationId,
        enteredAt: entry.enteredAt,
        driver: entry.vehicle.driver ? {
          cin: entry.vehicle.driver.cin,
          accountStatus: entry.vehicle.driver.accountStatus
        } : null,
        vehicle: {
          capacity: entry.vehicle.capacity,
          licensePlate: entry.vehicle.licensePlate
        }
      });
      return acc;
    }, {} as Record<string, any[]>);

    res.json({
      success: true,
      data: {
        vehiclesByDestination,
        totalVehicles: queueEntries.length
      }
    });

  } catch (error) {
    console.error('Error fetching vehicles in queue:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicles in queue',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get driver's income for a given date based on exit passes.
 * Income = vehicle.capacity * route.basePrice, summed over today's exit passes.
 * Does not include service fees.
 * GET /api/driver-tickets/income/:licensePlate?date=YYYY-MM-DD
 */
export const getDriverIncomeForDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { licensePlate } = req.params as { licensePlate?: string };
    const { date } = req.query as { date?: string };

    if (!licensePlate) {
      res.status(400).json({ success: false, message: 'License plate is required' });
      return;
    }

    // Resolve vehicle and capacity
    const vehicle = await prisma.vehicle.findUnique({ where: { licensePlate } });
    if (!vehicle) {
      res.status(404).json({ success: false, message: `Vehicle ${licensePlate} not found` });
      return;
    }

    const target = date ? (() => { const [y,m,d] = date.split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0); })() : new Date();
    const startOfDay = new Date(target); startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(startOfDay); endOfDay.setDate(endOfDay.getDate() + 1);

    // Fetch today's exit passes for this vehicle
    const exitPasses = await prisma.exitPass.findMany({
      where: {
        vehicleId: vehicle.id,
        currentExitTime: { gte: startOfDay, lt: endOfDay }
      },
      select: { id: true, destinationId: true, destinationName: true, currentExitTime: true }
    });

    // Preload routes by destinationId used in exit passes
    const destinationIds = Array.from(new Set(exitPasses.map(p => p.destinationId).filter(Boolean)));
    const routes = destinationIds.length > 0
      ? await prisma.route.findMany({ where: { stationId: { in: destinationIds } }, select: { stationId: true, basePrice: true } })
      : [];
    const routeMap = new Map(routes.map(r => [r.stationId, Number(r.basePrice || 0)]));

    // Compute per-pass income (capacity * basePrice), no service fees
    const capacity = Number(vehicle.capacity || 0);
    const items = exitPasses.map(p => {
      const basePrice = routeMap.get(p.destinationId) || 0;
      const amount = capacity * basePrice;
      return {
        id: p.id,
        destinationId: p.destinationId,
        destinationName: p.destinationName,
        exitTime: p.currentExitTime,
        capacity,
        basePrice,
        amount
      };
    });

    const totalIncome = items.reduce((s, it) => s + it.amount, 0);

    res.json({
      success: true,
      data: {
        licensePlate,
        date: `${startOfDay.getFullYear()}-${String(startOfDay.getMonth()+1).padStart(2,'0')}-${String(startOfDay.getDate()).padStart(2,'0')}`,
        totals: { totalIncome },
        items
      }
    });
  } catch (error) {
    console.error('Error computing driver income:', error);
    res.status(500).json({ success: false, message: 'Failed to compute driver income', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getVehiclesForExit = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get vehicles from both queue and trips
    const [queueEntries, trips] = await Promise.all([
      // Vehicles in queue
      prisma.vehicleQueue.findMany({
        where: {
          status: { in: ['WAITING', 'LOADING', 'READY'] }
        },
        include: {
          vehicle: {
            include: {
              driver: true
            }
          }
        },
        orderBy: [
          { destinationName: 'asc' },
          { queuePosition: 'asc' }
        ]
      }),
      // Vehicles from trips (recent trips)
      prisma.trip.findMany({
        where: {
          startTime: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        },
        include: {
          vehicle: {
            include: {
              driver: true
            }
          }
        },
        orderBy: {
          startTime: 'desc'
        }
      })
    ]);

    // Process queue entries
    const queueVehicles = queueEntries.map(entry => ({
      id: entry.id,
      licensePlate: entry.vehicle.licensePlate,
      source: 'queue',
      queuePosition: entry.queuePosition,
      status: entry.status,
      destinationName: entry.destinationName,
      destinationId: entry.destinationId,
      enteredAt: entry.enteredAt,
      driver: entry.vehicle.driver ? {
        cin: entry.vehicle.driver.cin,
        accountStatus: entry.vehicle.driver.accountStatus
      } : null,
      vehicle: {
        capacity: entry.vehicle.capacity,
        licensePlate: entry.vehicle.licensePlate
      }
    }));

    // Process trip vehicles
    const tripVehicles = trips.map(trip => ({
      id: trip.id,
      licensePlate: trip.licensePlate,
      source: 'trip',
      destinationName: trip.destinationName,
      destinationId: trip.destinationId,
      startTime: trip.startTime,
      seatsBooked: trip.seatsBooked,
      driver: trip.vehicle.driver ? {
        cin: trip.vehicle.driver.cin,
        accountStatus: trip.vehicle.driver.accountStatus
      } : null,
      vehicle: {
        capacity: trip.vehicle.capacity,
        licensePlate: trip.vehicle.licensePlate
      }
    }));

    // Combine and remove duplicates (prioritize queue entries)
    const allVehicles: any[] = [...queueVehicles];
    const queueLicensePlates = new Set(queueVehicles.map(v => v.licensePlate));
    
    tripVehicles.forEach(tripVehicle => {
      if (!queueLicensePlates.has(tripVehicle.licensePlate)) {
        allVehicles.push(tripVehicle);
      }
    });

    res.json({
      success: true,
      data: {
        vehicles: allVehicles,
        totalVehicles: allVehicles.length,
        queueVehicles: queueVehicles.length,
        tripVehicles: tripVehicles.length
      }
    });

  } catch (error) {
    console.error('Error fetching vehicles for exit:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicles for exit',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const searchVehicleByCIN = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cin } = req.params;

    if (!cin) {
      res.status(400).json({
        success: false,
        message: 'CIN is required'
      });
      return;
    }

    // Find driver by CIN
    const driver = await prisma.driver.findUnique({
      where: { cin },
      include: {
        vehicle: {
          include: {
            queueEntries: {
              where: {
                status: { in: ['WAITING', 'LOADING', 'READY'] }
              },
              include: {
                vehicle: {
                  include: {
                    driver: true
                  }
                }
              }
            },
            trips: {
              where: {
                startTime: {
                  gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
                }
              },
              orderBy: {
                startTime: 'desc'
              }
            }
          }
        }
      }
    });

    if (!driver) {
      res.status(404).json({
        success: false,
        message: `Driver with CIN ${cin} not found`
      });
      return;
    }

    if (!driver.vehicle) {
      res.status(404).json({
        success: false,
        message: `Driver ${cin} has no associated vehicle`
      });
      return;
    }

    const vehicle = driver.vehicle;
    const queueEntry = vehicle.queueEntries[0]; // Get first active queue entry
    const recentTrip = vehicle.trips[0]; // Get most recent trip

    res.json({
      success: true,
      data: {
        driver: {
          cin: driver.cin,
          accountStatus: driver.accountStatus
        },
        vehicle: {
          licensePlate: vehicle.licensePlate,
          capacity: vehicle.capacity
        },
        queueEntry: queueEntry ? {
          id: queueEntry.id,
          queuePosition: queueEntry.queuePosition,
          status: queueEntry.status,
          destinationName: queueEntry.destinationName,
          destinationId: queueEntry.destinationId,
          enteredAt: queueEntry.enteredAt
        } : null,
        recentTrip: recentTrip ? {
          id: recentTrip.id,
          destinationName: recentTrip.destinationName,
          destinationId: recentTrip.destinationId,
          startTime: recentTrip.startTime,
          seatsBooked: recentTrip.seatsBooked
        } : null
      }
    });

  } catch (error) {
    console.error('Error searching vehicle by CIN:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search vehicle by CIN',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 