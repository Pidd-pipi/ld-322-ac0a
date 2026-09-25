export interface Greenhouse {
  id: string;
  name: string;
  crop: string;
  area: number;
  manager: string;
  status: 'normal' | 'warning';
}

export interface Sensor {
  id: string;
  sensorType: string;
  unit: string;
  greenhouseId: string;
  zone: string;
}

export interface SensorReading {
  id: string;
  sensorId: string;
  greenhouseId: string;
  zone: string;
  sensorType: string;
  value: number;
  unit: string;
  capturedAt: string;
}

export interface SensorHandover {
  id: string;
  sensorId: string;
  fromGreenhouseId: string;
  fromZone: string;
  toGreenhouseId: string;
  toZone: string;
  handoverAt: string;
  reason: string;
  createdAt: string;
}

export interface Threshold {
  sensorId: string;
  min: number;
  max: number;
}

export interface HandoverPayload {
  toGreenhouseId: string;
  toZone: string;
  handoverAt: string;
  reason?: string;
}

export interface HandoverResult {
  handover: SensorHandover;
  duplicated: boolean;
  message: string;
}

export interface Alarm {
  id: string;
  sensorId: string;
  greenhouseId: string;
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
  sensors: Sensor[];
  readings: SensorReading[];
  alarms: Alarm[];
  devices: Device[];
  reports: Report[];
  thresholds: Threshold[];
  handovers: SensorHandover[];
  history: SensorReading[];
  stats: {
    greenhouseCount: number;
    activeAlarmCount: number;
    onlineDeviceCount: number;
    refreshSeconds: number;
  };
}
