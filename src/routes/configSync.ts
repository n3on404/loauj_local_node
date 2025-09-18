import { Router, Request, Response } from 'express';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const router = Router();

// Interface for the config response from central server
interface CentralServerConfigResponse {
  success: boolean;
  message: string;
  data: {
    stationId: string;
    stationName: string;
    governorate: string;
    delegation: string;
  };
}

// Interface for the local config file
interface LocalConfigFile {
  cin: string;
  station_info: {
    cin: string;
    station_id: string;
    station_name: string;
    delegation: string;
    governorate: string;
  };
  first_run_completed: boolean;
  installed_apps: string[];
  last_check: string;
  last_sync: string;
}

/**
 * @route POST /api/config/sync
 * @desc Sync station configuration from central server using CIN
 * @access Hidden endpoint (no auth required for initial setup)
 */
router.post('/sync', async (req: Request, res: Response) => {
  try {
    const { cin } = req.body;

    if (!cin) {
      return res.status(400).json({
        success: false,
        message: 'CIN is required'
      });
    }

    // Check if configuration already exists
    const configService = require('../config/supervisorConfig').configService;
    if (configService.configExists()) {
      return res.status(409).json({
        success: false,
        message: 'Configuration already exists. Only one configuration is allowed.',
        error: 'CONFIG_ALREADY_EXISTS'
      });
    }

    console.log(`🔄 Syncing configuration for CIN: ${cin}`);

    // Call central server to get configuration
    const centralServerUrl = process.env.CENTRAL_SERVER_URL || 'http://localhost:5000';
    const configEndpoint = `${centralServerUrl}/api/v1/auth/config`;

    console.log(`📡 Calling central server: ${configEndpoint}`);

    const response = await axios.post<CentralServerConfigResponse>(configEndpoint, {
      cin: cin
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.success) {
      return res.status(400).json({
        success: false,
        message: response.data.message || 'Failed to retrieve configuration from central server'
      });
    }

    const configData = response.data.data;
    console.log(`✅ Received configuration from central server:`, configData);

    // Create local config file in simple format
    const localConfig = {
      CIN: cin,
      STATION_ID: configData.stationId,
      STATION_NAME: configData.stationName,
      GOVERNORATE: configData.governorate,
      DELEGATION: configData.delegation,
      CONFIGURED_AT: new Date().toISOString(),
      VERSION: '1.0'
    };

    // Determine config file path based on OS
    const configDir = process.platform === 'win32' 
      ? path.join(process.env.APPDATA || '', 'supervisor-launcher')
      : path.join(os.homedir(), '.config', 'supervisor-launcher');

    const configFilePath = path.join(configDir, 'station.config');

    // Ensure directory exists
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
      console.log(`📁 Created config directory: ${configDir}`);
    }

    // Write config file
    fs.writeFileSync(configFilePath, JSON.stringify(localConfig, null, 2), 'utf8');
    
    // Make config file read-only
    try {
      fs.chmodSync(configFilePath, 0o444); // Read-only for owner, group, and others
      console.log(`🔒 Configuration file made read-only: ${configFilePath}`);
    } catch (chmodError) {
      console.warn(`⚠️ Could not set read-only permissions: ${chmodError}`);
    }
    
    console.log(`💾 Configuration saved to: ${configFilePath}`);

    // Update environment variables (for current process)
    process.env.STATION_ID = configData.stationId;
    process.env.STATION_NAME = configData.stationName;
    process.env.GOVERNORATE = configData.governorate;
    process.env.DELEGATION = configData.delegation;

    console.log(`🔄 Environment variables updated:`);
    console.log(`   STATION_ID: ${configData.stationId}`);
    console.log(`   STATION_NAME: ${configData.stationName}`);
    console.log(`   GOVERNORATE: ${configData.governorate}`);
    console.log(`   DELEGATION: ${configData.delegation}`);

    return res.json({
      success: true,
      message: 'Configuration synced successfully',
      data: {
        configPath: configFilePath,
        stationId: configData.stationId,
        stationName: configData.stationName,
        governorate: configData.governorate,
        delegation: configData.delegation
      }
    });

  } catch (error: any) {
    console.error('❌ Configuration sync failed:', error);

    let errorMessage = 'Failed to sync configuration';
    let statusCode = 500;

    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Cannot connect to central server';
      statusCode = 503;
    } else if (error.response?.status === 404) {
      errorMessage = 'CIN not found in central server';
      statusCode = 404;
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || 'Invalid CIN format';
      statusCode = 400;
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'Central server not found';
      statusCode = 503;
    }

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route GET /api/config/status
 * @desc Get current configuration status
 * @access Hidden endpoint
 */
router.get('/status', (req: Request, res: Response) => {
  try {
    const configService = require('../config/supervisorConfig').configService;
    
    const configExists = configService.configExists();
    const configPath = configService.getConfigPath();
    
    let configData = null;
    if (configExists) {
      configData = configService.loadConfig();
    }

    res.json({
      success: true,
      data: {
        configExists,
        configPath,
        stationId: configService.getStationId(),
        stationName: configService.getStationName(),
        governorate: configService.getGovernorate(),
        delegation: configService.getDelegation(),
        cin: configService.getCIN(),
        configData: configData ? {
          first_run_completed: configData.first_run_completed,
          last_check: configData.last_check,
          last_sync: configData.last_sync
        } : null
      }
    });

  } catch (error: any) {
    console.error('❌ Failed to get config status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get configuration status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route POST /api/config/reload
 * @desc Reload configuration from file
 * @access Hidden endpoint
 */
router.post('/reload', (req: Request, res: Response) => {
  try {
    const configService = require('../config/supervisorConfig').configService;
    
    // Reload config from file
    const config = configService.loadConfig();
    
    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'Configuration file not found'
      });
    }

    // Update environment variables
    process.env.STATION_ID = config.station_info.station_id;
    process.env.STATION_NAME = config.station_info.station_name;
    process.env.GOVERNORATE = config.station_info.governorate;
    process.env.DELEGATION = config.station_info.delegation;

    console.log(`🔄 Configuration reloaded from file`);
    console.log(`   STATION_ID: ${config.station_info.station_id}`);
    console.log(`   STATION_NAME: ${config.station_info.station_name}`);
    console.log(`   GOVERNORATE: ${config.station_info.governorate}`);
    console.log(`   DELEGATION: ${config.station_info.delegation}`);

    return res.json({
      success: true,
      message: 'Configuration reloaded successfully',
      data: {
        stationId: config.station_info.station_id,
        stationName: config.station_info.station_name,
        governorate: config.station_info.governorate,
        delegation: config.station_info.delegation
      }
    });

  } catch (error: any) {
    console.error('❌ Failed to reload configuration:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reload configuration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;