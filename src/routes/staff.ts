import { Router } from 'express';
import { authenticate, requireSupervisor, requireCentralConnection } from '../middleware/auth';
import { EnhancedLocalWebSocketServer } from '../websocket/LocalWebSocketServer';
import prisma from '../config/database';
import { randomUUID } from 'crypto';
import axios from 'axios';
import env from '../config/environment';

const router = Router();

// Apply authentication to all routes
router.use(authenticate);

// Helper function to broadcast staff updates
const broadcastStaffUpdate = (action: string, staffData: any) => {
  const wsServer = EnhancedLocalWebSocketServer.getLocalWebSocketServer();
  if (wsServer) {
    wsServer.notifyStaffUpdate({
      action,
      staff: staffData,
      timestamp: new Date().toISOString()
    });
  }
};

// NOTE: This router now uses real database records via Prisma (no mocks)

/**
 * Get all staff members for the station
 * GET /api/staff
 * Access: SUPERVISOR, ADMIN
 */
router.get('/', requireSupervisor, async (req, res) => {
  try {
    const { role, status } = req.query as { role?: string; status?: string };

    const where: any = {};
    if (role) where.role = role;
    if (status) where.isActive = status === 'active';

    const staff = await prisma.staff.findMany({
      where,
      orderBy: [{ lastLogin: 'desc' }, { firstName: 'asc' }],
    });

    res.json({
      success: true,
      data: staff,
      count: staff.length,
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff members',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Get staff member by ID
 * GET /api/staff/:id
 * Access: SUPERVISOR, ADMIN
 */
router.get('/:id', requireSupervisor, async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await prisma.staff.findUnique({ where: { id } });

    if (!staff) {
      res.status(404).json({
        success: false,
        message: 'Staff member not found',
      });
      return;
    }

    res.json({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.error('Error fetching staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff member',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Create new worker (staff member)
 * POST /api/staff
 * Access: SUPERVISOR, ADMIN
 */
router.post('/', requireSupervisor, requireCentralConnection, async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, cin } = req.body as {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      cin?: string;
    };

    if (!firstName || !lastName || !phoneNumber || !cin) {
      res.status(400).json({
        success: false,
        message: 'First name, last name, phone number, and CIN are required',
      });
      return;
    }

    // 1) Create at central server first to obtain canonical ID
    const centralServerUrl = env.CENTRAL_SERVER_URL || process.env.CENTRAL_SERVER_URL || 'http://localhost:5000';
    const authHeader = req.headers.authorization || '';

    let centralResponseData: any;
    try {
      const centralResp = await axios.post(
        `${centralServerUrl}/api/v1/staff`,
        { firstName, lastName, phoneNumber, cin },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader,
          },
          timeout: 10000,
        }
      );

      if (!centralResp.data?.success || !centralResp.data?.data?.id) {
        res.status(502).json({
          success: false,
          message: 'Central server did not return a valid staff record',
        });
        return;
      }
      centralResponseData = centralResp.data.data;
    } catch (err: any) {
      console.error('❌ Central staff creation failed:', err?.response?.data || err?.message || err);
      res.status(502).json({
        success: false,
        message: err?.response?.data?.message || 'Failed to create staff on central server',
        error: err?.message || 'CENTRAL_CREATE_FAILED',
      });
      return;
    }

    // 2) Upsert locally using the central ID to keep IDs in sync
    const created = await prisma.staff.upsert({
      where: { id: centralResponseData.id },
      update: {
        firstName,
        lastName,
        phoneNumber,
        cin,
        role: centralResponseData.role || 'WORKER',
        isActive: centralResponseData.isActive ?? true,
        syncedAt: new Date(),
      },
      create: {
        id: centralResponseData.id,
        firstName,
        lastName,
        phoneNumber,
        cin,
        role: centralResponseData.role || 'WORKER',
        isActive: centralResponseData.isActive ?? true,
        syncedAt: new Date(),
      },
    });

    broadcastStaffUpdate('created', created);

    res.status(201).json({
      success: true,
      data: created,
      message: 'Staff member created successfully',
    });
  } catch (error) {
    console.error('Error creating staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create staff member',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Update staff member
 * PUT /api/staff/:id
 * Access: SUPERVISOR, ADMIN
 */
router.put('/:id', requireSupervisor, async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber, role, isActive } = req.body as {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      role?: string;
      isActive?: boolean;
    };

    const existing = await prisma.staff.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Staff member not found' });
      return;
    }

    const updated = await prisma.staff.update({
      where: { id },
      data: {
        firstName: firstName ?? existing.firstName,
        lastName: lastName ?? existing.lastName,
        phoneNumber: phoneNumber ?? existing.phoneNumber,
        role: role ?? existing.role,
        isActive: typeof isActive === 'boolean' ? isActive : existing.isActive,
        syncedAt: new Date(),
      },
    });

    broadcastStaffUpdate('updated', updated);

    res.json({
      success: true,
      data: updated,
      message: 'Staff member updated successfully',
    });
  } catch (error) {
    console.error('Error updating staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update staff member',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Toggle staff member status (freeze/unfreeze)
 * PATCH /api/staff/:id/toggle-status
 * Access: SUPERVISOR, ADMIN
 */
router.patch('/:id/toggle-status', requireSupervisor, async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.staff.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Staff member not found' });
      return;
    }

    const updated = await prisma.staff.update({
      where: { id },
      data: { isActive: !existing.isActive, syncedAt: new Date() },
    });

    broadcastStaffUpdate('status_toggled', updated);

    res.json({
      success: true,
      data: updated,
      message: `Staff member ${updated.isActive ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error) {
    console.error('Error toggling staff status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle staff status',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Delete staff member
 * DELETE /api/staff/:id
 * Access: SUPERVISOR, ADMIN
 */
router.delete('/:id', requireSupervisor, async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.staff.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Staff member not found' });
      return;
    }

    try {
      await prisma.staff.delete({ where: { id } });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: 'Cannot delete staff member with existing linked records',
        error: err?.message || 'Delete failed',
      });
      return;
    }

    broadcastStaffUpdate('deleted', existing);

    res.json({
      success: true,
      message: 'Staff member deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete staff member',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router; 

/**
 * GET /api/staff/report/daily?date=YYYY-MM-DD
 * Returns daily report for all staff who have activity (bookings or day passes)
 */
router.get('/report/daily', requireSupervisor, async (req, res) => {
  try {
    const { date } = req.query as { date?: string };
    const target = date ? new Date(`${date}T00:00:00`) : new Date();
    const startOfDay = new Date(target); startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(startOfDay); endOfDay.setDate(endOfDay.getDate() + 1);

    // Fetch bookings grouped by staff
    const bookings = await prisma.booking.findMany({
      where: { createdAt: { gte: startOfDay, lt: endOfDay }, createdBy: { not: null } },
      select: {
        createdBy: true,
        totalAmount: true,
        queue: { select: { destinationName: true } },
      }
    });

    // Fetch day passes grouped by staff
    const dayPasses = await prisma.dayPass.findMany({
      where: { purchaseDate: { gte: startOfDay, lt: endOfDay } },
      select: { createdBy: true, price: true }
    });

    // Collect staff IDs that have activity
    const activeStaffIds = new Set<string>();
    bookings.forEach(b => { if (b.createdBy) activeStaffIds.add(b.createdBy); });
    dayPasses.forEach(dp => { if (dp.createdBy) activeStaffIds.add(dp.createdBy); });

    if (activeStaffIds.size === 0) {
      res.json({ success: true, data: { date: startOfDay.toISOString().slice(0,10), staff: [] } });
      return;
    }

    const staffList = await prisma.staff.findMany({
      where: { id: { in: Array.from(activeStaffIds) } },
      select: { id: true, cin: true, firstName: true, lastName: true, role: true }
    });
    const staffMap = new Map(staffList.map(s => [s.id, s]));

    // Aggregate
    const staffAgg = new Map<string, { cash: number; dayPass: number; grand: number; destinations: Map<string, { name: string; amount: number; count: number }> }>();
    const ensure = (id: string) => {
      if (!staffAgg.has(id)) staffAgg.set(id, { cash: 0, dayPass: 0, grand: 0, destinations: new Map() });
      return staffAgg.get(id)!;
    };

    bookings.forEach(b => {
      if (!b.createdBy) return;
      const agg = ensure(b.createdBy);
      const amt = Number(b.totalAmount || 0);
      agg.cash += amt;
      agg.grand += amt;
      const dest = b.queue?.destinationName || '—';
      const d = agg.destinations.get(dest) || { name: dest, amount: 0, count: 0 };
      d.amount += amt; d.count += 1; agg.destinations.set(dest, d);
    });

    dayPasses.forEach(dp => {
      if (!dp.createdBy) return;
      const agg = ensure(dp.createdBy);
      const amt = Number(dp.price || 0);
      agg.dayPass += amt;
      agg.grand += amt;
    });

    const result = Array.from(staffAgg.entries()).map(([id, agg]) => {
      const s = staffMap.get(id)!;
      return {
        staff: { id: s.id, cin: s.cin, firstName: s.firstName, lastName: s.lastName, role: s.role },
        totals: { cash: agg.cash, dayPass: agg.dayPass, grand: agg.grand },
        destinations: Array.from(agg.destinations.values()),
      };
    });

    res.json({ success: true, data: { date: startOfDay.toISOString().slice(0,10), staff: result } });
  } catch (error: any) {
    console.error('Error fetching staff daily report:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch staff daily report', error: error?.message || 'Unknown error' });
  }
});
/**
 * Get staff transactions and totals (for a specific day)
 * GET /api/staff/:id/transactions?date=YYYY-MM-DD
 * Access: SUPERVISOR, ADMIN
 */
router.get('/:id/transactions', requireSupervisor, async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query as { date?: string };

    // Verify staff exists
    const staff = await prisma.staff.findUnique({ where: { id } });
    if (!staff) {
      res.status(404).json({ success: false, message: 'Staff member not found' });
      return;
    }

    // Compute day range
    const target = date ? new Date(`${date}T00:00:00`) : new Date();
    const startOfDay = new Date(target);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // Bookings created by staff (cash only by design)
    const bookings = await prisma.booking.findMany({
      where: {
        createdBy: id,
        createdAt: { gte: startOfDay, lt: endOfDay },
      },
      select: {
        id: true,
        seatsBooked: true,
        totalAmount: true,
        createdAt: true,
        bookingType: true,
        bookingSource: true,
        paymentMethod: true,
        queue: { select: { destinationName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Day passes sold by staff
    const dayPasses = await prisma.dayPass.findMany({
      where: {
        purchaseDate: { gte: startOfDay, lt: endOfDay },
        OR: [
          { createdBy: id },
          { createdByStaff: { cin: staff.cin } },
        ],
      },
      select: {
        id: true,
        licensePlate: true,
        price: true,
        purchaseDate: true,
      },
      orderBy: { purchaseDate: 'desc' },
    });

    // Totals
    const totalCashBookingsAmount = bookings.reduce((sum, b: any) => sum + (b.totalAmount || 0), 0);
    const totalDayPasses = dayPasses.reduce((sum: number, p: any) => sum + (p.price || 0), 0);
    const grandTotal = totalCashBookingsAmount + totalDayPasses;

    res.json({
      success: true,
      data: {
        staff: { id: staff.id, cin: staff.cin, firstName: staff.firstName, lastName: staff.lastName, role: staff.role },
        date: startOfDay.toISOString().slice(0, 10),
        totals: {
          totalCashBookingsAmount,
          totalDayPasses,
          grandTotal,
        },
        items: {
          bookings,
          entryTickets: [],
          exitTickets: [],
          dayPasses,
        },
      },
    });
  } catch (error: any) {
    console.error('Error fetching staff transactions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch staff transactions', error: error?.message || 'Unknown error' });
  }
});