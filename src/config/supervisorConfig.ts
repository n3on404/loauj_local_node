import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Config interface to match the supervisor config structure
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
}

// Config service to read from supervisor config file
export class ConfigService {
  private configPath: string;
  private config: SupervisorConfig | null = null;

  constructor() {
    // Determine config path based on OS
    const homeDir = os.homedir();
    if (process.platform === 'win32') {
      this.configPath = path.join(process.env.APPDATA || '', 'supervisor-launcher', 'supervisor_config.json');
    } else {
      this.configPath = path.join(homeDir, '.config', 'supervisor-launcher', 'supervisor_config.json');
    }
  }

  /**
   * Load configuration from the supervisor config file
   */
  loadConfig(): SupervisorConfig | null {
    try {
      if (!fs.existsSync(this.configPath)) {
        console.warn(`⚠️ Supervisor config file not found at: ${this.configPath}`);
        return null;
      }

      const configData = fs.readFileSync(this.configPath, 'utf8');
      this.config = JSON.parse(configData);
      
      console.log(`✅ Loaded supervisor config from: ${this.configPath}`);
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
   * Get station ID from config, fallback to environment variable
   */
  getStationId(): string {
    const config = this.config || this.loadConfig();
    return config?.station_info?.station_id || process.env.STATION_ID || 'monastir-main-station';
  }

  /**
   * Get station name from config, fallback to environment variable
   */
  getStationName(): string {
    const config = this.config || this.loadConfig();
    return config?.station_info?.station_name || process.env.STATION_NAME || 'Monastir Main Station';
  }

  /**
   * Get delegation from config, fallback to environment variable
   */
  getDelegation(): string {
    const config = this.config || this.loadConfig();
    return config?.station_info?.delegation || process.env.DELEGATION || '';
  }

  /**
   * Get governorate from config, fallback to environment variable
   */
  getGovernorate(): string {
    const config = this.config || this.loadConfig();
    return config?.station_info?.governorate || process.env.GOVERNORATE || '';
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
}

// Create a singleton config service instance
export const configService = new ConfigService();

// Also export for CommonJS compatibility
module.exports = { configService, ConfigService }; 