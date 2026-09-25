import { SENSOR_LABELS } from '../constants/app.constants.js';
import type { Alarm, Device, Greenhouse, Report, Sensor, SensorHandover, SensorReading, Threshold } from '../types/domain.js';

const greenhouses: Greenhouse[] = [
  { id: 'gh-1', name: '一号番茄温室', crop: '番茄', area: 960, manager: '陈晓', status: 'warning' },
  { id: 'gh-2', name: '二号草莓温室', crop: '草莓', area: 720, manager: '刘敏', status: 'normal' },
  { id: 'gh-3', name: '育苗温室', crop: '黄瓜苗', area: 420, manager: '王磊', status: 'normal' },
];

const sensors: Sensor[] = [
  { id: 's1', sensorType: 'temperature', unit: '℃', greenhouseId: 'gh-1', zone: '定植区' },
  { id: 's2', sensorType: 'humidity', unit: '%', greenhouseId: 'gh-1', zone: '定植区' },
  { id: 's3', sensorType: 'light', unit: 'lux', greenhouseId: 'gh-1', zone: '定植区' },
  { id: 's4', sensorType: 'co2', unit: 'ppm', greenhouseId: 'gh-1', zone: '育苗区' },
  { id: 's5', sensorType: 'soilMoisture', unit: '%', greenhouseId: 'gh-1', zone: '育苗区' },
  { id: 's6', sensorType: 'temperature', unit: '℃', greenhouseId: 'gh-2', zone: '定植区' },
  { id: 's7', sensorType: 'humidity', unit: '%', greenhouseId: 'gh-2', zone: '采收区' },
];

const readings: SensorReading[] = [
  { id: 'r1', sensorId: 's1', greenhouseId: 'gh-1', zone: '定植区', sensorType: 'temperature', value: 31.6, unit: '℃', capturedAt: '08:00' },
  { id: 'r2', sensorId: 's2', greenhouseId: 'gh-1', zone: '定植区', sensorType: 'humidity', value: 74, unit: '%', capturedAt: '08:00' },
  { id: 'r3', sensorId: 's3', greenhouseId: 'gh-1', zone: '定植区', sensorType: 'light', value: 42000, unit: 'lux', capturedAt: '08:00' },
  { id: 'r4', sensorId: 's4', greenhouseId: 'gh-1', zone: '育苗区', sensorType: 'co2', value: 980, unit: 'ppm', capturedAt: '08:00' },
  { id: 'r5', sensorId: 's5', greenhouseId: 'gh-1', zone: '育苗区', sensorType: 'soilMoisture', value: 38, unit: '%', capturedAt: '08:00' },
  { id: 'r6', sensorId: 's6', greenhouseId: 'gh-2', zone: '定植区', sensorType: 'temperature', value: 24.8, unit: '℃', capturedAt: '08:00' },
  { id: 'r7', sensorId: 's7', greenhouseId: 'gh-2', zone: '采收区', sensorType: 'humidity', value: 68, unit: '%', capturedAt: '08:00' },
  // s6 交接前留在育苗温室的历史读数，交接后仍归原点位
  { id: 'r8', sensorId: 's6', greenhouseId: 'gh-3', zone: '育苗区', sensorType: 'temperature', value: 25.6, unit: '℃', capturedAt: '05-20 07:00' },
  { id: 'r9', sensorId: 's6', greenhouseId: 'gh-3', zone: '育苗区', sensorType: 'temperature', value: 25.9, unit: '℃', capturedAt: '05-20 08:00' },
];

let handovers: SensorHandover[] = [
  { id: 'ho-1', sensorId: 's6', fromGreenhouseId: 'gh-3', fromZone: '育苗区', toGreenhouseId: 'gh-2', toZone: '定植区', handoverAt: '2026-05-20 09:00', reason: '育苗季结束，转移至草莓温室定植区', createdAt: '2026-05-20 09:05' },
];

const thresholds: Threshold[] = [
  { sensorId: 's1', min: 18, max: 30 },
  { sensorId: 's2', min: 55, max: 80 },
  { sensorId: 's4', min: 450, max: 1200 },
  { sensorId: 's6', min: 16, max: 28 },
];

let alarms: Alarm[] = [
  { id: 'a1', sensorId: 's1', greenhouseId: 'gh-1', sensorType: 'temperature', message: '一号番茄温室温度超过 30℃', level: 'critical', handled: false, createdAt: '2026-05-31 08:02' },
  { id: 'a2', sensorId: 's5', greenhouseId: 'gh-1', sensorType: 'soilMoisture', message: '土壤湿度低于灌溉阈值', level: 'warning', handled: false, createdAt: '2026-05-31 07:40' },
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

let readingSeq = 10;
let handoverSeq = 2;
let alarmSeq = 3;

const nowText = () => new Date().toISOString().slice(0, 16).replace('T', ' ');

const byHandoverTimeDesc = (a: SensorHandover, b: SensorHandover) =>
  Date.parse(b.handoverAt.replace(' ', 'T')) - Date.parse(a.handoverAt.replace(' ', 'T'));

const checkThreshold = (sensor: Sensor, reading: SensorReading) => {
  const threshold = thresholds.find((item) => item.sensorId === sensor.id);
  if (!threshold || (reading.value >= threshold.min && reading.value <= threshold.max)) return;
  if (alarms.some((alarm) => alarm.sensorId === sensor.id && !alarm.handled)) return;
  const greenhouse = greenhouses.find((item) => item.id === sensor.greenhouseId);
  const span = threshold.max - threshold.min;
  const deviation = reading.value > threshold.max ? reading.value - threshold.max : threshold.min - reading.value;
  alarms = [{
    id: `a${alarmSeq++}`,
    sensorId: sensor.id,
    greenhouseId: sensor.greenhouseId,
    sensorType: sensor.sensorType,
    message: `${greenhouse?.name ?? sensor.greenhouseId} ${sensor.zone} ${SENSOR_LABELS[sensor.sensorType] ?? sensor.sensorType}读数 ${reading.value}${reading.unit} 超出阈值 [${threshold.min}, ${threshold.max}]`,
    level: deviation > span * 0.1 ? 'critical' : 'warning',
    handled: false,
    createdAt: nowText(),
  }, ...alarms];
};

export const repository = {
  greenhouses: () => greenhouses,
  sensors: () => sensors,
  readings: () => readings,
  thresholds: () => thresholds,
  alarms: () => alarms,
  devices: () => devices,
  reports: () => reports,
  handovers: () => [...handovers].sort(byHandoverTimeDesc),
  latestHandover: (sensorId: string) => handovers
    .filter((handover) => handover.sensorId === sensorId)
    .sort(byHandoverTimeDesc)[0],
  recordHandover: (input: Omit<SensorHandover, 'id' | 'createdAt'>) => {
    const record: SensorHandover = { ...input, id: `ho-${handoverSeq++}`, createdAt: nowText() };
    handovers = [...handovers, record];
    const sensor = sensors.find((item) => item.id === input.sensorId);
    if (sensor) {
      sensor.greenhouseId = input.toGreenhouseId;
      sensor.zone = input.toZone;
    }
    return record;
  },
  history: (greenhouseId: string) => readings
    .filter((reading) => reading.greenhouseId === greenhouseId)
    .flatMap((reading, index) => [0, 1, 2, 3, 4].map((step) => ({
      ...reading,
      id: `${reading.id}-${step}`,
      capturedAt: `${8 + step}:00`,
      value: Number((reading.value + (step - index) * 0.8).toFixed(1)),
    }))),
  appendSimulatedReading: (sensor: Sensor) => {
    const previous = [...readings].reverse().find((reading) => reading.sensorId === sensor.id);
    const base = previous ? previous.value : 20;
    const drift = base * (Math.random() - 0.45) * 0.04;
    const integer = sensor.sensorType === 'light' || sensor.sensorType === 'co2';
    const value = integer ? Math.round(base + drift) : Number((base + drift).toFixed(1));
    const reading: SensorReading = {
      id: `r${readingSeq++}`,
      sensorId: sensor.id,
      greenhouseId: sensor.greenhouseId,
      zone: sensor.zone,
      sensorType: sensor.sensorType,
      value,
      unit: sensor.unit,
      capturedAt: nowText().slice(11),
    };
    readings.push(reading);
    checkThreshold(sensor, reading);
    return reading;
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
