export const APP_NAME = '温室环境监测面板';
export const API_BASE = '/api';

export const SENSOR_LABELS: Record<string, string> = {
  temperature: '温度',
  humidity: '湿度',
  light: '光照',
  co2: 'CO2',
  soilMoisture: '土壤湿度',
};

export const ZONES = ['育苗区', '定植区', '采收区', '缓冲区'];

export const HANDOVER_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
