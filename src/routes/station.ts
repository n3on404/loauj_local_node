import { Router } from 'express';
import { getStationConfig, updateStationConfig } from '../controllers/stationController';
import { TunisiaDataService } from '../utils/tunisiaData';

const router = Router();

// Get station configuration
router.get('/config', getStationConfig);

// Update station configuration
router.put('/config', updateStationConfig);

// Get all governorates (public endpoint)
router.get('/governorates', (req, res) => {
  try {
    const tunisiaData = TunisiaDataService.getInstance();
    const governorates = tunisiaData.getAllGovernorates();
    
    res.json({
      success: true,
      data: governorates
    });
  } catch (error) {
    console.error('Error fetching governorates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch governorates'
    });
  }
});

// Get delegations by governorate (public endpoint)
router.get('/delegations/:governorate', (req, res) => {
  try {
    const { governorate } = req.params;
    const tunisiaData = TunisiaDataService.getInstance();
    const delegations = tunisiaData.getDelegationsByGovernorate(governorate);
    
    if (delegations.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Governorate not found'
      });
      return;
    }
    
    res.json({
      success: true,
      data: delegations
    });
  } catch (error) {
    console.error('Error fetching delegations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch delegations'
    });
  }
});

// Get all governorates with their delegations (public endpoint)
router.get('/locations', (req, res) => {
  try {
    const tunisiaData = TunisiaDataService.getInstance();
    const governoratesData = tunisiaData.getGovernoratesData();
    
    res.json({
      success: true,
      data: governoratesData
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch locations'
    });
  }
});

// Get available destinations from this station
router.get('/destinations', async (req, res) => {
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

// Get station statistics
router.get('/stats', async (req, res) => {
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