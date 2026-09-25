import { repository } from '../repositories/memory.repository.js';
import type { Sensor, SensorHandover } from '../types/domain.js';

const latestHandoverOf = (sensorId: string): SensorHandover | undefined => {
  const records = repository.handoversBySensor(sensorId);
  return records[records.length - 1];
};

const sensorPoint = (sensor: Sensor) => {
  const greenhouse = repository.greenhouseById(sensor.greenhouseId);
  const zone = repository.zoneById(sensor.zoneId);
  return {
    sensorId: sensor.id,
    sensorName: sensor.name,
    sensorType: sensor.sensorType,
    greenhouseId: sensor.greenhouseId,
    greenhouseName: greenhouse?.name ?? sensor.greenhouseId,
    zoneId: sensor.zoneId,
    zoneName: zone?.name ?? sensor.zoneId,
    latestHandover: latestHandoverOf(sensor.id) ?? null,
  };
};

export const dashboardService = {
  overview: () => {
    const greenhouses = repository.greenhouses();
    const readings = repository.readings();
    const alarms = repository.alarms();
    return {
      greenhouses,
      zones: repository.zones(),
      sensors: repository.sensors(),
      sensorPoints: repository.sensors().map(sensorPoint),
      handovers: repository.handovers(),
      readings,
      alarms,
      devices: repository.devices(),
      reports: repository.reports(),
      thresholds: repository.thresholds(),
      stats: {
        greenhouseCount: greenhouses.length,
        activeAlarmCount: alarms.filter((alarm) => !alarm.handled).length,
        onlineDeviceCount: repository.devices().filter((device) => device.online).length,
        refreshSeconds: 30,
      },
      history: repository.history('gh-1'),
    };
  },
  history: (greenhouseId: string) => ({
    readings: repository.history(greenhouseId),
    sensors: repository.sensors().map(sensorPoint),
  }),
  markHandled: (id: string) => repository.markAlarmHandled(id),
  toggleDevice: (id: string) => repository.toggleDevice(id),
};
