import type {
  Alarm,
  Device,
  Greenhouse,
  Report,
  Sensor,
  SensorHandover,
  SensorReading,
  Threshold,
  Zone,
} from '../types/domain.js';

const greenhouses: Greenhouse[] = [
  { id: 'gh-1', name: '一号番茄温室', crop: '番茄', area: 960, manager: '陈晓', status: 'warning' },
  { id: 'gh-2', name: '二号草莓温室', crop: '草莓', area: 720, manager: '刘敏', status: 'normal' },
  { id: 'gh-3', name: '育苗温室', crop: '黄瓜苗', area: 420, manager: '王磊', status: 'normal' },
];

const zones: Zone[] = [
  { id: 'z-1a', greenhouseId: 'gh-1', name: '东区' },
  { id: 'z-1b', greenhouseId: 'gh-1', name: '西区' },
  { id: 'z-2a', greenhouseId: 'gh-2', name: '育苗区' },
  { id: 'z-2b', greenhouseId: 'gh-2', name: '定植区' },
  { id: 'z-3a', greenhouseId: 'gh-3', name: '育苗架A' },
  { id: 'z-3b', greenhouseId: 'gh-3', name: '育苗架B' },
];

const sensors: Sensor[] = [
  { id: 'sen-1', name: '温度传感器-1', sensorType: 'temperature', unit: '℃', greenhouseId: 'gh-1', zoneId: 'z-1a' },
  { id: 'sen-2', name: '湿度传感器-1', sensorType: 'humidity', unit: '%', greenhouseId: 'gh-1', zoneId: 'z-1a' },
  { id: 'sen-3', name: '光照传感器-1', sensorType: 'light', unit: 'lux', greenhouseId: 'gh-1', zoneId: 'z-1b' },
  { id: 'sen-4', name: 'CO2传感器-1', sensorType: 'co2', unit: 'ppm', greenhouseId: 'gh-1', zoneId: 'z-1a' },
  { id: 'sen-5', name: '土壤湿度传感器-1', sensorType: 'soilMoisture', unit: '%', greenhouseId: 'gh-1', zoneId: 'z-1b' },
  { id: 'sen-6', name: '温度传感器-2', sensorType: 'temperature', unit: '℃', greenhouseId: 'gh-2', zoneId: 'z-2b' },
  { id: 'sen-7', name: '湿度传感器-2', sensorType: 'humidity', unit: '%', greenhouseId: 'gh-2', zoneId: 'z-2b' },
  { id: 'sen-8', name: '移动式育苗测温仪', sensorType: 'temperature', unit: '℃', greenhouseId: 'gh-3', zoneId: 'z-3a' },
];

let handovers: SensorHandover[] = [
  {
    id: 'ho-1',
    sensorId: 'sen-8',
    fromGreenhouseId: 'gh-2',
    fromZoneId: 'z-2a',
    toGreenhouseId: 'gh-3',
    toZoneId: 'z-3a',
    handoverAt: '2026-09-10 08:00',
    reason: '育苗季结束，随苗床从草莓温室育苗区转移到育苗温室',
    createdAt: '2026-09-10 08:05',
  },
];

// 读数记录采集时所在点位，交接前的数据保留在原温室/区域
const readings: SensorReading[] = [
  { id: 'r-1', sensorId: 'sen-1', greenhouseId: 'gh-1', zoneId: 'z-1a', sensorType: 'temperature', value: 31.6, unit: '℃', capturedAt: '08:00' },
  { id: 'r-2', sensorId: 'sen-2', greenhouseId: 'gh-1', zoneId: 'z-1a', sensorType: 'humidity', value: 74, unit: '%', capturedAt: '08:00' },
  { id: 'r-3', sensorId: 'sen-3', greenhouseId: 'gh-1', zoneId: 'z-1b', sensorType: 'light', value: 42000, unit: 'lux', capturedAt: '08:00' },
  { id: 'r-4', sensorId: 'sen-4', greenhouseId: 'gh-1', zoneId: 'z-1a', sensorType: 'co2', value: 980, unit: 'ppm', capturedAt: '08:00' },
  { id: 'r-5', sensorId: 'sen-5', greenhouseId: 'gh-1', zoneId: 'z-1b', sensorType: 'soilMoisture', value: 38, unit: '%', capturedAt: '08:00' },
  { id: 'r-6', sensorId: 'sen-6', greenhouseId: 'gh-2', zoneId: 'z-2b', sensorType: 'temperature', value: 24.8, unit: '℃', capturedAt: '08:00' },
  { id: 'r-7', sensorId: 'sen-7', greenhouseId: 'gh-2', zoneId: 'z-2b', sensorType: 'humidity', value: 68, unit: '%', capturedAt: '08:00' },
  // sen-8 交接前（留在原温室 gh-2 育苗区）
  { id: 'r-8a', sensorId: 'sen-8', greenhouseId: 'gh-2', zoneId: 'z-2a', sensorType: 'temperature', value: 23.4, unit: '℃', capturedAt: '2026-09-09 16:00' },
  { id: 'r-8b', sensorId: 'sen-8', greenhouseId: 'gh-2', zoneId: 'z-2a', sensorType: 'temperature', value: 22.9, unit: '℃', capturedAt: '2026-09-09 20:00' },
  // sen-8 交接后（进入新点位 gh-3 育苗架A）
  { id: 'r-8c', sensorId: 'sen-8', greenhouseId: 'gh-3', zoneId: 'z-3a', sensorType: 'temperature', value: 25.1, unit: '℃', capturedAt: '08:00' },
];

// 阈值绑定传感器本身，交接后仍跟随同一传感器生效
const thresholds: Threshold[] = [
  { sensorId: 'sen-1', sensorType: 'temperature', min: 18, max: 30 },
  { sensorId: 'sen-2', sensorType: 'humidity', min: 55, max: 80 },
  { sensorId: 'sen-4', sensorType: 'co2', min: 450, max: 1200 },
  { sensorId: 'sen-6', sensorType: 'temperature', min: 16, max: 28 },
  { sensorId: 'sen-8', sensorType: 'temperature', min: 15, max: 28 },
];

let alarms: Alarm[] = [
  { id: 'a1', sensorId: 'sen-1', greenhouseId: 'gh-1', zoneId: 'z-1a', sensorType: 'temperature', message: '一号番茄温室温度超过 30℃', level: 'critical', handled: false, createdAt: '2026-09-25 08:02' },
  { id: 'a2', sensorId: 'sen-5', greenhouseId: 'gh-1', zoneId: 'z-1b', sensorType: 'soilMoisture', message: '土壤湿度低于灌溉阈值', level: 'warning', handled: false, createdAt: '2026-09-25 07:40' },
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

let sequence = 100;
const nextId = (prefix: string) => `${prefix}-${sequence++}`;

export const repository = {
  greenhouses: () => greenhouses,
  zones: () => zones,
  sensors: () => sensors,
  readings: () => readings,
  thresholds: () => thresholds,
  alarms: () => alarms,
  devices: () => devices,
  reports: () => reports,
  handovers: () => handovers,
  greenhouseById: (id: string) => greenhouses.find((greenhouse) => greenhouse.id === id),
  zoneById: (id: string) => zones.find((zone) => zone.id === id),
  sensorById: (id: string) => sensors.find((sensor) => sensor.id === id),
  thresholdBySensorId: (sensorId: string) => thresholds.find((threshold) => threshold.sensorId === sensorId),
  handoversBySensor: (sensorId: string) => handovers
    .filter((handover) => handover.sensorId === sensorId)
    .sort((a, b) => a.handoverAt.localeCompare(b.handoverAt)),
  history: (greenhouseId: string) => readings
    .filter((reading) => reading.greenhouseId === greenhouseId)
    .flatMap((reading, index) => [0, 1, 2, 3, 4].map((step) => ({
      ...reading,
      id: `${reading.id}-${step}`,
      capturedAt: `${8 + step}:00`,
      value: Number((reading.value + (step - index) * 0.8).toFixed(1)),
    }))),
  addHandover: (handover: Omit<SensorHandover, 'id' | 'createdAt'>) => {
    const record: SensorHandover = {
      ...handover,
      id: nextId('ho'),
      createdAt: new Date().toISOString(),
    };
    handovers = [...handovers, record];
    return record;
  },
  moveSensor: (sensorId: string, greenhouseId: string, zoneId: string) => {
    const sensor = sensors.find((item) => item.id === sensorId);
    if (sensor) {
      sensor.greenhouseId = greenhouseId;
      sensor.zoneId = zoneId;
    }
    return sensor;
  },
  addReading: (reading: Omit<SensorReading, 'id'>) => {
    const record: SensorReading = { ...reading, id: nextId('r') };
    readings.push(record);
    return record;
  },
  addAlarm: (alarm: Omit<Alarm, 'id' | 'handled' | 'createdAt'>) => {
    const record: Alarm = {
      ...alarm,
      id: nextId('a'),
      handled: false,
      createdAt: new Date().toISOString(),
    };
    alarms = [...alarms, record];
    return record;
  },
  markAlarmHandled: (id: string) => {
    alarms = alarms.map((alarm) => alarm.id === id ? { ...alarm, handled: true } : alarm);
    return alarms.find((alarm) => alarm.id === id);
  },
  toggleDevice: (id: string) => {
    devices = devices.map((device) => device.id === id ? { ...device, enabled: !device.enabled } : device);
    return devices.find((device) => device.id === id);
  },
};
