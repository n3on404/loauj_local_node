import { Router } from 'express';
import { authenticate, requireSupervisor } from '../middleware/auth';
import { EnhancedLocalWebSocketServer } from '../websocket/LocalWebSocketServer';

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

// Mock staff data for local development
const mockStaffData = [
  {
    id: 'staff-001',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+21612345678',
    cin: '12345678',
    role: 'SUPERVISOR',
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z'
  },
  {
    id: 'staff-002',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+21687654321',
    cin: '87654321',
    role: 'WORKER',
    isActive: true,
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z'
  }
];

/**
 * Get all staff members for the station
 * GET /api/staff
 * Access: SUPERVISOR, ADMIN
 */
router.get('/', requireSupervisor, async (req, res) => {
  try {
    const { role, status } = req.query;
    
    let filteredStaff = [...mockStaffData];
    
    // Filter by role
    if (role) {
      filteredStaff = filteredStaff.filter(staff => staff.role === role);
    }
    
    // Filter by status
    if (status) {
      const isActive = status === 'active';
      filteredStaff = filteredStaff.filter(staff => staff.isActive === isActive);
    }

    res.json({
      success: true,
      data: filteredStaff,
      count: filteredStaff.length
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff members',
      error: error instanceof Error ? error.message : 'Unknown error'
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
    const staff = mockStaffData.find(s => s.id === id);
    
    if (!staff) {
      res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
      return;
    }

    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    console.error('Error fetching staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch staff member',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Create new worker (staff member)
 * POST /api/staff
 * Access: SUPERVISOR, ADMIN
 */
router.post('/', requireSupervisor, async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, cin } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !phoneNumber || !cin) {
      res.status(400).json({
        success: false,
        message: 'First name, last name, phone number, and CIN are required'
      });
      return;
    }

    // Check if CIN already exists
    const existingStaff = mockStaffData.find(s => s.cin === cin);
    if (existingStaff) {
      res.status(400).json({
        success: false,
        message: 'Staff member with this CIN already exists'
      });
      return;
    }

    const newStaff = {
      id: `staff-${Date.now()}`,
      firstName,
      lastName,
      phoneNumber,
      cin,
      role: 'WORKER',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockStaffData.push(newStaff);
    broadcastStaffUpdate('created', newStaff);

    res.status(201).json({
      success: true,
      data: newStaff,
      message: 'Staff member created successfully'
    });
  } catch (error) {
    console.error('Error creating staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create staff member',
      error: error instanceof Error ? error.message : 'Unknown error'
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
    const { firstName, lastName, phoneNumber, role, isActive } = req.body;

    const staffIndex = mockStaffData.findIndex(s => s.id === id);
    if (staffIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
      return;
    }

    const updatedStaff = {
      ...mockStaffData[staffIndex],
      firstName: firstName || mockStaffData[staffIndex].firstName,
      lastName: lastName || mockStaffData[staffIndex].lastName,
      phoneNumber: phoneNumber || mockStaffData[staffIndex].phoneNumber,
      role: role || mockStaffData[staffIndex].role,
      isActive: isActive !== undefined ? isActive : mockStaffData[staffIndex].isActive,
      updatedAt: new Date().toISOString()
    };

    mockStaffData[staffIndex] = updatedStaff;
    broadcastStaffUpdate('updated', updatedStaff);

    res.json({
      success: true,
      data: updatedStaff,
      message: 'Staff member updated successfully'
    });
  } catch (error) {
    console.error('Error updating staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update staff member',
      error: error instanceof Error ? error.message : 'Unknown error'
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

    const staffIndex = mockStaffData.findIndex(s => s.id === id);
    if (staffIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
      return;
    }

    const updatedStaff = {
      ...mockStaffData[staffIndex],
      isActive: !mockStaffData[staffIndex].isActive,
      updatedAt: new Date().toISOString()
    };

    mockStaffData[staffIndex] = updatedStaff;
    broadcastStaffUpdate('status_toggled', updatedStaff);

    res.json({
      success: true,
      data: updatedStaff,
      message: `Staff member ${updatedStaff.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling staff status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle staff status',
      error: error instanceof Error ? error.message : 'Unknown error'
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

    const staffIndex = mockStaffData.findIndex(s => s.id === id);
    if (staffIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
      return;
    }

    const deletedStaff = mockStaffData[staffIndex];
    mockStaffData.splice(staffIndex, 1);
    broadcastStaffUpdate('deleted', deletedStaff);

    res.json({
      success: true,
      message: 'Staff member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete staff member',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 