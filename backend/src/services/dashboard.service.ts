import { ERROR_CODES } from '../constants/error.codes.js';
import { BusinessException } from '../errors/BusinessException.js';
import { repository } from '../repositories/memory.repository.js';
import type { HandoverPayload } from '../validators/handover.validator.js';

const toTimestamp = (text: string) => Date.parse(text.replace(' ', 'T'));

export const dashboardService = {
  overview: () => {
    const greenhouses = repository.greenhouses();
    const readings = repository.readings();
    const alarms = repository.alarms();
    return {
      greenhouses,
      sensors: repository.sensors(),
      readings,
      alarms,
      devices: repository.devices(),
      reports: repository.reports(),
      thresholds: repository.thresholds(),
      handovers: repository.handovers(),
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
  handover: (sensorId: string, payload: HandoverPayload) => {
    const sensor = repository.sensors().find((item) => item.id === sensorId);
    if (!sensor) {
      throw new BusinessException(ERROR_CODES.SENSOR_NOT_FOUND, `传感器 ${sensorId} 不存在`, 404);
    }
    const target = repository.greenhouses().find((item) => item.id === payload.toGreenhouseId);
    if (!target) {
      throw new BusinessException(ERROR_CODES.GREENHOUSE_NOT_FOUND, '目标温室不存在', 404);
    }
    const duplicated = repository.handovers().find((handover) =>
      handover.sensorId === sensorId
      && handover.toGreenhouseId === payload.toGreenhouseId
      && handover.toZone === payload.toZone
      && handover.handoverAt === payload.handoverAt);
    if (duplicated) {
      return {
        handover: duplicated,
        duplicated: true,
        message: `重复提交：该传感器已登记 ${payload.handoverAt} 交接至${target.name} · ${payload.toZone}，本次未重复创建`,
      };
    }
    if (sensor.greenhouseId === payload.toGreenhouseId && sensor.zone === payload.toZone) {
      throw new BusinessException(ERROR_CODES.INVALID_HANDOVER, '目标点位与当前点位相同，无需交接');
    }
    const last = repository.latestHandover(sensorId);
    if (last && toTimestamp(payload.handoverAt) <= toTimestamp(last.handoverAt)) {
      throw new BusinessException(
        ERROR_CODES.HANDOVER_TIME_CONFLICT,
        `交接时间必须晚于上次交接（${last.handoverAt}）`,
        409,
      );
    }
    const record = repository.recordHandover({
      sensorId,
      fromGreenhouseId: sensor.greenhouseId,
      fromZone: sensor.zone,
      toGreenhouseId: payload.toGreenhouseId,
      toZone: payload.toZone,
      handoverAt: payload.handoverAt,
      reason: payload.reason,
    });
    return {
      handover: record,
      duplicated: false,
      message: `已交接至${target.name} · ${payload.toZone}，后续上报计入新点位，历史数据保留在原点位`,
    };
  },
  markHandled: (id: string) => repository.markAlarmHandled(id),
  toggleDevice: (id: string) => repository.toggleDevice(id),
  simulateReading: () => {
    const sensors = repository.sensors();
    const sensor = sensors[Math.floor(Math.random() * sensors.length)];
    const reading = repository.appendSimulatedReading(sensor);
    return {
      accepted: true,
      reading,
      nextPush: 'WebSocket clients receive the next sensor snapshot',
    };
  },
};
