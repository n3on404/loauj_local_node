import { Router, Request, Response } from 'express';

const router = Router();

// Create new booking
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerInfo, destination, seats, vehicleId } = req.body;
    
    if (!customerInfo || !destination || !seats) {
      res.status(400).json({
        success: false,
        message: 'Customer info, destination, and seats are required'
      });
      return;
    }

    // TODO: Create booking in database
    const bookingId = `BK${Date.now()}`;
    
    res.json({
      success: true,
      message: 'Booking created successfully',
      data: {
        bookingId,
        verificationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        tickets: Array.from({ length: seats }, (_, index) => ({
          id: `${bookingId}-${index + 1}`,
          seatNumber: index + 1,
          qrCode: `QR_${bookingId}_${index + 1}`
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get booking by ID
router.get('/:bookingId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookingId } = req.params;
    
    // TODO: Fetch booking from database
    res.json({
      success: true,
      data: {
        id: bookingId,
        customer: {
          name: 'John Doe',
          phone: '+216 20 123 456'
        },
        destination: 'Tunis',
        seats: 2,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Verify ticket
router.post('/verify', async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, method } = req.body; // code can be QR or verification code
    
    if (!code) {
      res.status(400).json({
        success: false,
        message: 'Verification code is required'
      });
      return;
    }

    // TODO: Verify ticket against database
    res.json({
      success: true,
      message: 'Ticket verified successfully',
      data: {
        valid: true,
        booking: {
          id: 'BK123456',
          customer: 'John Doe',
          destination: 'Tunis',
          seat: '12A',
          departure: new Date(Date.now() + 30 * 60 * 1000).toISOString()
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

// Cancel booking
router.delete('/:bookingId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookingId } = req.params;
    
    // TODO: Cancel booking in database
    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router; 