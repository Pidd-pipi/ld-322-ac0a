export const APP = {
  serviceName: 'cygreenenv',
  port: Number(process.env.BACKEND_PORT ?? 3000),
  refreshSeconds: 30,
} as const;

export const SENSOR_TYPES = ['temperature', 'humidity', 'light', 'co2', 'soilMoisture'] as const;

export const DEVICE_TYPES = {
  fan: '风机',
  shade: '遮阳帘',
  irrigation: '灌溉泵',
  lamp: '补光灯',
} as const;
