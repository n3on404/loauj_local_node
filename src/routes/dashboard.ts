import { Router, Request, Response } from 'express';
import * as dashboardController from '../controllers/dashboardController';
import { authenticate, requireSupervisor } from '../middleware/auth';
import { getDashboardStatsHandler } from '../controllers/dashboardController';

export default function createDashboardRouter() {
  const router = Router();

  /**
   * @route GET /api/dashboard/stats
   * @desc Get dashboard statistics
   * @access Private (Staff)
   */
  router.get('/stats', getDashboardStatsHandler);

  /**
   * @route GET /api/dashboard/queues
   * @desc Get queue details for dashboard
   * @access Private (Staff)
   */
  router.get('/queues', authenticate, async (req: any, res: any) => {
    try {
      const queues = await dashboardController.getDashboardQueues();
      
      res.json({
        success: true,
        data: queues
      });
    } catch (error) {
      console.error('❌ Error fetching queue details:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch queue details'
      });
    }
  });

  /**
   * @route GET /api/dashboard/vehicles
   * @desc Get vehicle details for dashboard
   * @access Private (Staff)
   */
  router.get('/vehicles', authenticate, async (req: any, res: any) => {
    try {
      const vehicles = await dashboardController.getDashboardVehicles();
      
      res.json({
        success: true,
        data: vehicles
      });
    } catch (error) {
      console.error('❌ Error fetching vehicle details:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch vehicle details'
      });
    }
  });

  /**
   * @route GET /api/dashboard/bookings
   * @desc Get recent bookings for dashboard
   * @access Private (Staff)
   */
  router.get('/bookings', authenticate, async (req: any, res: any) => {
    try {
      const recentBookings = await dashboardController.getDashboardBookings();
      
      res.json({
        success: true,
        data: recentBookings
      });
    } catch (error) {
      console.error('❌ Error fetching recent bookings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch recent bookings'
      });
    }
  });

  /**
   * @route GET /api/dashboard/all
   * @desc Get all dashboard data in one request
   * @access Private (Staff)
   */
  router.get('/all', authenticate, async (req: any, res: any) => {
    try {
      const dashboardData = await dashboardController.getAllDashboardData();
      
      res.json({
        success: true,
        data: dashboardData
      });
    } catch (error) {
      console.error('❌ Error fetching all dashboard data:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard data'
      });
    }
  });

  /**
   * @route GET /api/dashboard/financial
   * @desc Get financial statistics for supervisor dashboard
   * @access Private (Supervisor)
   */
  router.get('/financial', authenticate, requireSupervisor, async (req: any, res: any) => {
    try {
      const financialStats = await dashboardController.getFinancialStats();
      
      res.json({
        success: true,
        data: financialStats
      });
    } catch (error) {
      console.error('❌ Error fetching financial stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch financial statistics'
      });
    }
  });

  /**
   * @route GET /api/dashboard/transactions
   * @desc Get transaction history for supervisor dashboard
   * @access Private (Supervisor)
   */
  router.get('/transactions', authenticate, requireSupervisor, async (req: any, res: any) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const transactions = await dashboardController.getTransactionHistory(limit);
      
      res.json({
        success: true,
        data: transactions,
        count: transactions.length
      });
    } catch (error) {
      console.error('❌ Error fetching transaction history:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch transaction history'
      });
    }
  });

  /**
   * @route GET /api/dashboard/supervisor
   * @desc Get comprehensive supervisor dashboard data
   * @access Private (Supervisor)
   */
  router.get('/supervisor', authenticate, requireSupervisor, async (req: any, res: any) => {
    try {
      const supervisorData = await dashboardController.getSupervisorDashboardData();
      
      res.json({
        success: true,
        data: supervisorData
      });
    } catch (error) {
      console.error('❌ Error fetching supervisor dashboard data:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch supervisor dashboard data'
      });
    }
  });

  return router;
} 