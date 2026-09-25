import { repository } from '../repositories/memory.repository.js';

export const dashboardService = {
  overview: () => {
    const greenhouses = repository.greenhouses();
    const readings = repository.readings();
    const alarms = repository.alarms();
    return {
      greenhouses,
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
  history: (greenhouseId: string) => repository.history(greenhouseId),
  markHandled: (id: string) => repository.markAlarmHandled(id),
  toggleDevice: (id: string) => repository.toggleDevice(id),
  simulateReading: () => ({
    accepted: true,
    nextPush: 'WebSocket clients receive the next sensor snapshot',
  }),
};
