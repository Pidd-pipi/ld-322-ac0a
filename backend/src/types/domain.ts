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

export interface Threshold {
  greenhouseId: string;
  sensorType: string;
  min: number;
  max: number;
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
