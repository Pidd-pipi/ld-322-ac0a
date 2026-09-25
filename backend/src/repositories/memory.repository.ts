import type { Alarm, Device, Greenhouse, Report, SensorReading, Threshold } from '../types/domain.js';

const greenhouses: Greenhouse[] = [
  { id: 'gh-1', name: '一号番茄温室', crop: '番茄', area: 960, manager: '陈晓', status: 'warning' },
  { id: 'gh-2', name: '二号草莓温室', crop: '草莓', area: 720, manager: '刘敏', status: 'normal' },
  { id: 'gh-3', name: '育苗温室', crop: '黄瓜苗', area: 420, manager: '王磊', status: 'normal' },
];

const readings: SensorReading[] = [
  { id: 's1', greenhouseId: 'gh-1', sensorType: 'temperature', value: 31.6, unit: '℃', capturedAt: '08:00' },
  { id: 's2', greenhouseId: 'gh-1', sensorType: 'humidity', value: 74, unit: '%', capturedAt: '08:00' },
  { id: 's3', greenhouseId: 'gh-1', sensorType: 'light', value: 42000, unit: 'lux', capturedAt: '08:00' },
  { id: 's4', greenhouseId: 'gh-1', sensorType: 'co2', value: 980, unit: 'ppm', capturedAt: '08:00' },
  { id: 's5', greenhouseId: 'gh-1', sensorType: 'soilMoisture', value: 38, unit: '%', capturedAt: '08:00' },
  { id: 's6', greenhouseId: 'gh-2', sensorType: 'temperature', value: 24.8, unit: '℃', capturedAt: '08:00' },
  { id: 's7', greenhouseId: 'gh-2', sensorType: 'humidity', value: 68, unit: '%', capturedAt: '08:00' },
];

const thresholds: Threshold[] = [
  { greenhouseId: 'gh-1', sensorType: 'temperature', min: 18, max: 30 },
  { greenhouseId: 'gh-1', sensorType: 'humidity', min: 55, max: 80 },
  { greenhouseId: 'gh-1', sensorType: 'co2', min: 450, max: 1200 },
  { greenhouseId: 'gh-2', sensorType: 'temperature', min: 16, max: 28 },
];

let alarms: Alarm[] = [
  { id: 'a1', greenhouseId: 'gh-1', sensorType: 'temperature', message: '一号番茄温室温度超过 30℃', level: 'critical', handled: false, createdAt: '2026-05-31 08:02' },
  { id: 'a2', greenhouseId: 'gh-1', sensorType: 'soilMoisture', message: '土壤湿度低于灌溉阈值', level: 'warning', handled: false, createdAt: '2026-05-31 07:40' },
];

let devices: Device[] = [
  { id: 'dev-1', greenhouseId: 'gh-1', name: '东区风机', type: 'fan', online: true, enabled: true, schedule: '温度 > 30℃ 自动开启' },
  { id: 'dev-2', greenhouseId: 'gh-1', name: '滴灌泵', type: 'irrigation', online: true, enabled: false, schedule: '每天 08:00 开启 20 分钟' },
  { id: 'dev-3', greenhouseId: 'gh-2', name: '补光灯 A 组', type: 'lamp', online: true, enabled: true, schedule: '06:30-09:00' },
  { id: 'dev-4', greenhouseId: 'gh-3', name: '遮阳帘', type: 'shade', online: false, enabled: false, schedule: '光照 > 50000 lux' },
];

const reports: Report[] = [
  { id: 'rep-1', greenhouseId: 'gh-1', range: 'daily', summary: '高温持续 2 小时，建议午后加强通风。', avgTemperature: 28.9, avgHumidity: 71, alarmCount: 2 },
  { id: 'rep-2', greenhouseId: 'gh-2', range: 'weekly', summary: '草莓温室环境稳定，光照满足授粉期需求。', avgTemperature: 23.7, avgHumidity: 66, alarmCount: 0 },
];

export const repository = {
  greenhouses: () => greenhouses,
  readings: () => readings,
  thresholds: () => thresholds,
  alarms: () => alarms,
  devices: () => devices,
  reports: () => reports,
  history: (greenhouseId: string) => readings
    .filter((reading) => reading.greenhouseId === greenhouseId)
    .flatMap((reading, index) => [0, 1, 2, 3, 4].map((step) => ({
      ...reading,
      id: `${reading.id}-${step}`,
      capturedAt: `${8 + step}:00`,
      value: Number((reading.value + (step - index) * 0.8).toFixed(1)),
    }))),
  markAlarmHandled: (id: string) => {
    alarms = alarms.map((alarm) => alarm.id === id ? { ...alarm, handled: true } : alarm);
    return alarms.find((alarm) => alarm.id === id);
  },
  toggleDevice: (id: string) => {
    devices = devices.map((device) => device.id === id ? { ...device, enabled: !device.enabled } : device);
    return devices.find((device) => device.id === id);
  },
};
