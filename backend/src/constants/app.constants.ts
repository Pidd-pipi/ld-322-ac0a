export const APP = {
  serviceName: 'cygreenenv',
  port: Number(process.env.BACKEND_PORT ?? 3000),
  refreshSeconds: 30,
} as const;

export const SENSOR_TYPES = ['temperature', 'humidity', 'light', 'co2', 'soilMoisture'] as const;

export const SENSOR_LABELS: Record<string, string> = {
  temperature: '温度',
  humidity: '湿度',
  light: '光照',
  co2: 'CO2',
  soilMoisture: '土壤湿度',
};

export const ZONES = ['育苗区', '定植区', '采收区', '缓冲区'] as const;

export const HANDOVER_DEFAULT_REASON = '育苗季点位调整';

export const DEVICE_TYPES = {
  fan: '风机',
  shade: '遮阳帘',
  irrigation: '灌溉泵',
  lamp: '补光灯',
} as const;
