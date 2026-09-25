export interface Greenhouse {
  id: string;
  name: string;
  crop: string;
  area: number;
  manager: string;
  status: 'normal' | 'warning';
}

export interface SensorReading {
  id: string;
  greenhouseId: string;
  sensorType: string;
  value: number;
  unit: string;
  capturedAt: string;
}

export interface Alarm {
  id: string;
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
  readings: SensorReading[];
  alarms: Alarm[];
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
