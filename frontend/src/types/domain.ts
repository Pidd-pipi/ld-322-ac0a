export interface Greenhouse {
  id: string;
  name: string;
  crop: string;
  area: number;
  manager: string;
  status: 'normal' | 'warning';
}

export interface Zone {
  id: string;
  greenhouseId: string;
  name: string;
}

export interface Sensor {
  id: string;
  name: string;
  sensorType: string;
  unit: string;
  greenhouseId: string;
  zoneId: string;
}

export interface SensorHandover {
  id: string;
  sensorId: string;
  fromGreenhouseId: string;
  fromZoneId: string;
  toGreenhouseId: string;
  toZoneId: string;
  handoverAt: string;
  reason: string;
  createdAt: string;
}

export interface SensorPoint {
  sensorId: string;
  sensorName: string;
  sensorType: string;
  greenhouseId: string;
  greenhouseName: string;
  zoneId: string;
  zoneName: string;
  latestHandover: SensorHandover | null;
}

export interface SensorReading {
  id: string;
  sensorId: string;
  greenhouseId: string;
  zoneId: string;
  sensorType: string;
  value: number;
  unit: string;
  capturedAt: string;
}

export interface Threshold {
  sensorId: string;
  sensorType: string;
  min: number;
  max: number;
}

export interface Alarm {
  id: string;
  sensorId: string;
  greenhouseId: string;
  zoneId: string;
  sensorType: string;
  message: string;
  level: 'warning' | 'critical';
  handled: boolean;
  createdAt: string;
}

export interface Device {
  id: string;
  greenhouseId: string;
  name: string;
  type: string;
  online: boolean;
  enabled: boolean;
  schedule: string;
}

export interface Report {
  id: string;
  greenhouseId: string;
  range: 'daily' | 'weekly';
  summary: string;
  avgTemperature: number;
  avgHumidity: number;
  alarmCount: number;
}

export interface GreenOverview {
  greenhouses: Greenhouse[];
  zones: Zone[];
  sensors: Sensor[];
  sensorPoints: SensorPoint[];
  handovers: SensorHandover[];
  readings: SensorReading[];
  alarms: Alarm[];
  thresholds: Threshold[];
  devices: Device[];
  reports: Report[];
  history: SensorReading[];
  stats: {
    greenhouseCount: number;
    activeAlarmCount: number;
    onlineDeviceCount: number;
    refreshSeconds: number;
  };
}
