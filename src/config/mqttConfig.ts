import dotenv from 'dotenv';

dotenv.config();

export const mqttConfig = {
  brokerUrl: process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883',
  username: process.env.MQTT_USERNAME || undefined,
  password: process.env.MQTT_PASSWORD || undefined,
  clientId: `louaj-station-${process.env.STATION_ID || 'unknown'}`,
  topics: {
    plateDetection: `louaj/stations/${process.env.STATION_ID || 'unknown'}/plate-detection`,
    stationStatus: `louaj/stations/${process.env.STATION_ID || 'unknown'}/status`,
    systemCommands: `louaj/stations/${process.env.STATION_ID || 'unknown'}/commands`,
    // New topics for replacing WebSocket functionality
    clientCommands: `louaj/stations/${process.env.STATION_ID || 'unknown'}/client-commands`,
    clientUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/client-updates`,
    queueUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/queue-updates`,
    bookingUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/booking-updates`,
    financialUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/financial-updates`,
    dashboardUpdates: `louaj/stations/${process.env.STATION_ID || 'unknown'}/dashboard-updates`,
    seatAvailability: `louaj/stations/${process.env.STATION_ID || 'unknown'}/seat-availability`,
    concurrencySync: `louaj/stations/${process.env.STATION_ID || 'unknown'}/concurrency-sync`,
    realTimeSync: `louaj/stations/${process.env.STATION_ID || 'unknown'}/realtime-sync`,
    authentication: `louaj/stations/${process.env.STATION_ID || 'unknown'}/auth`,
    heartbeat: `louaj/stations/${process.env.STATION_ID || 'unknown'}/heartbeat`,
    subscriptions: `louaj/stations/${process.env.STATION_ID || 'unknown'}/subscriptions`,
    // Global topics for broadcasting
    globalPlateDetection: 'louaj/global/plate-detection',
    globalStationStatus: 'louaj/global/station-status'
  }
};

export const validateMqttConfig = (): boolean => {
  if (!process.env.STATION_ID) {
    console.error('❌ STATION_ID environment variable is required for MQTT');
    return false;
  }

  if (!process.env.MQTT_BROKER_URL) {
    console.warn('⚠️ MQTT_BROKER_URL not set, using default: mqtt://localhost:1883');
  }

  return true;
};