import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Simple config interface for station configuration
export interface StationConfig {
  CIN: string;
  STATION_ID: string;
  STATION_NAME: string;
  GOVERNORATE: string;
  DELEGATION: string;
  CONFIGURED_AT: string;
  VERSION: string;
}

// Legacy interface for backward compatibility
export interface SupervisorConfig {
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
  last_sync?: string;
}

// Config service to read from supervisor config file
export class ConfigService {
  private configPath: string;
  private config: SupervisorConfig | null = null;

  constructor() {
    // Determine config path based on OS - now using station.config
    const homeDir = os.homedir();
    if (process.platform === 'win32') {
      this.configPath = path.join(process.env.APPDATA || '', 'supervisor-launcher', 'station.config');
    } else {
      this.configPath = path.join(homeDir, '.config', 'supervisor-launcher', 'station.config');
    }
  }

  /**
   * Load configuration from the station config file
   */
  loadConfig(): SupervisorConfig | null {
    try {
      if (!fs.existsSync(this.configPath)) {
        console.warn(`⚠️ Station config file not found at: ${this.configPath}`);
        return null;
      }

      const configData = fs.readFileSync(this.configPath, 'utf8');
      const stationConfig: StationConfig = JSON.parse(configData);
      
      // Convert simple format to legacy format for backward compatibility
      this.config = {
        cin: stationConfig.CIN,
        station_info: {
          cin: stationConfig.CIN,
          station_id: stationConfig.STATION_ID,
          station_name: stationConfig.STATION_NAME,
          delegation: stationConfig.DELEGATION,
          governorate: stationConfig.GOVERNORATE
        },
        first_run_completed: true,
        installed_apps: ['local-node'],
        last_check: stationConfig.CONFIGURED_AT,
        last_sync: stationConfig.CONFIGURED_AT
      };
      
      console.log(`✅ Loaded station config from: ${this.configPath}`);
      if (this.config?.station_info) {
        console.log(`🏢 Station ID: ${this.config.station_info.station_id}`);
        console.log(`🏢 Station Name: ${this.config.station_info.station_name}`);
      }
      
      return this.config;
    } catch (error) {
      console.error(`❌ Failed to load supervisor config from ${this.configPath}:`, error);
      return null;
    }
  }

  /**
   * Get station ID from config file only (no env fallback)
   */
  getStationId(): string {
    const config = this.config || this.loadConfig();
    return config?.station_info?.station_id || 'unknown-station';
  }

  /**
   * Get station name from config file only (no env fallback)
   */
  getStationName(): string {
    const config = this.config || this.loadConfig();
    return config?.station_info?.station_name || 'Unknown Station';
  }

  /**
   * Get delegation from config file only (no env fallback)
   */
  getDelegation(): string {
    const config = this.config || this.loadConfig();
    return config?.station_info?.delegation || '';
  }

  /**
   * Get governorate from config file only (no env fallback)
   */
  getGovernorate(): string {
    const config = this.config || this.loadConfig();
    return config?.station_info?.governorate || '';
  }

  /**
   * Get CIN from config
   */
  getCIN(): string {
    const config = this.config || this.loadConfig();
    return config?.cin || '';
  }

  /**
   * Get the config path
   */
  getConfigPath(): string {
    return this.configPath;
  }

  /**
   * Check if config file exists
   */
  configExists(): boolean {
    return fs.existsSync(this.configPath);
  }

  /**
   * Update configuration file with new data - DISABLED (read-only config)
   */
  updateConfig(updates: Partial<SupervisorConfig>): boolean {
    console.warn('⚠️ Configuration updates are disabled - config file is read-only');
    return false;
  }

  /**
   * Force reload configuration from file
   */
  reloadConfig(): SupervisorConfig | null {
    this.config = null; // Clear cached config
    return this.loadConfig();
  }

  /**
   * Get configuration directory path
   */
  getConfigDirectory(): string {
    return path.dirname(this.configPath);
  }
}

// Create a singleton config service instance
export const configService = new ConfigService();

// Also export for CommonJS compatibility
module.exports = { configService, ConfigService }; 