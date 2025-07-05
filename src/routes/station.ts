import { Router, Request, Response } from 'express';

const router = Router();

// Get station configuration
router.get('/config', async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Fetch station config from database
    res.json({
      success: true,
      data: {
        id: 'station_1',
        name: 'Louaj Gafsa',
        location: {
          governorate: 'Gafsa',
          delegation: 'Gafsa Ville',
          address: '123 Avenue Habib Bourguiba, Gafsa'
        },
        operatingHours: {
          open: '06:00',
          close: '22:00'
        },
        capacity: 200,
        facilities: ['wifi', 'parking', 'cafe', 'restrooms'],
        contact: {
          phone: '+216 76 123 456',
          email: 'gafsa@louaj.tn'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get available destinations from this station
router.get('/destinations', async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Fetch destinations from database
    res.json({
      success: true,
      data: [
        {
          id: 'dest_1',
          name: 'Tunis',
          governorate: 'Tunis',
          delegation: 'Tunis Ville',
          price: 25.500,
          duration: '4h 30min',
          distance: 340,
          available: true
        },
        {
          id: 'dest_2',
          name: 'Sfax',
          governorate: 'Sfax',
          delegation: 'Sfax Ville',
          price: 18.000,
          duration: '3h 15min',
          distance: 245,
          available: true
        },
        {
          id: 'dest_3',
          name: 'Sousse',
          governorate: 'Sousse',
          delegation: 'Sousse Medina',
          price: 22.000,
          duration: '3h 45min',
          distance: 285,
          available: true
        }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update station configuration
router.put('/config', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, operatingHours, facilities, contact } = req.body;
    
    // TODO: Update station config in database
    res.json({
      success: true,
      message: 'Station configuration updated',
      data: {
        name,
        operatingHours,
        facilities,
        contact,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get station statistics
router.get('/stats', async (req: Request, res: Response): Promise<void> => {
  try {
    const { period = 'today' } = req.query;
    
    // TODO: Calculate stats from database
    res.json({
      success: true,
      data: {
        period,
        bookings: {
          total: 156,
          confirmed: 142,
          cancelled: 14
        },
        revenue: {
          total: 3450.50,
          currency: 'TND'
        },
        vehicles: {
          active: 8,
          inQueue: 3,
          departed: 12
        },
        passengers: {
          checkedIn: 89,
          waiting: 23,
          noShow: 5
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router; 