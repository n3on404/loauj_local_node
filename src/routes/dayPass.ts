import { Router } from 'express';
import { dayPassController } from '../controllers/dayPassController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route POST /api/day-pass/purchase
 * @desc Purchase a day pass for a driver/vehicle
 * @access Private (Staff only)
 */
router.post('/purchase', dayPassController.purchaseDayPass.bind(dayPassController));

/**
 * @route GET /api/day-pass/validate/:driverId
 * @desc Validate if a driver has a valid day pass
 * @access Private (Staff only)
 */
router.get('/validate/:driverId', dayPassController.validateDayPass.bind(dayPassController));

/**
 * @route GET /api/day-pass/status/:driverId
 * @desc Get day pass status for a driver
 * @access Private (Staff only)
 */
router.get('/status/:driverId', dayPassController.getDayPassStatus.bind(dayPassController));

/**
 * @route GET /api/day-pass/status-by-license/:licensePlate
 * @desc Get day pass status for a vehicle by license plate
 * @access Private (Staff only)
 */
router.get('/status-by-license/:licensePlate', dayPassController.getDayPassStatusByLicensePlate.bind(dayPassController));

/**
 * @route GET /api/day-pass/price
 * @desc Get day pass price
 * @access Private (Staff only)
 */
router.get('/price', dayPassController.getDayPassPrice.bind(dayPassController));

/**
 * @route GET /api/day-pass/today
 * @desc Get all day passes for today
 * @access Private (Staff only)
 */
router.get('/today', dayPassController.getTodayDayPasses.bind(dayPassController));

/**
 * @route GET /api/day-pass/stats
 * @desc Get day pass statistics
 * @access Private (Staff only)
 */
router.get('/stats', dayPassController.getDayPassStats.bind(dayPassController));

/**
 * @route POST /api/day-pass/expire-all
 * @desc Manually expire all day passes
 * @access Private (Supervisor only)
 */
router.post('/expire-all', dayPassController.expireAllDayPasses.bind(dayPassController));

/**
 * @route GET /api/day-pass/drivers-without-pass
 * @desc Get drivers without valid day pass
 * @access Private (Staff only)
 */
router.get('/drivers-without-pass', dayPassController.getDriversWithoutDayPass.bind(dayPassController));

/**
 * @route GET /api/day-pass/drivers-without-pass-test
 * @desc Get drivers without valid day pass (TEST - NO AUTH)
 * @access Public (for testing)
 */
router.get('/drivers-without-pass-test', dayPassController.getDriversWithoutDayPass.bind(dayPassController));

export default router;