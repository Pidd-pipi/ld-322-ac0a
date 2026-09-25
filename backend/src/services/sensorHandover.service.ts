import { HANDOVER_TIME_PATTERN } from '../constants/app.constants.js';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/error.codes.js';
import { BusinessException } from '../errors/BusinessException.js';
import { repository } from '../repositories/memory.repository.js';
import type { SensorHandover } from '../types/domain.js';
import { validateHandoverPayload, type SensorHandoverPayload } from '../validators/sensorHandover.validator.js';

const latestHandover = (sensorId: string): SensorHandover | undefined => {
  const records = repository.handoversBySensor(sensorId);
  return records[records.length - 1];
};

export const sensorHandoverService = {
  listBySensor: (sensorId: string) => {
    if (!repository.sensorById(sensorId)) {
      throw new BusinessException(ERROR_CODES.SENSOR_NOT_FOUND, ERROR_MESSAGES.SENSOR_NOT_FOUND, 404);
    }
    return repository.handoversBySensor(sensorId);
  },

  handover: (payload: SensorHandoverPayload) => {
    const data = validateHandoverPayload(payload);
    if (!data) {
      throw new BusinessException(ERROR_CODES.INVALID_PAYLOAD, '请完整选择目标温室、区域并填写交接时间');
    }
    if (!HANDOVER_TIME_PATTERN.test(data.handoverAt)) {
      throw new BusinessException(ERROR_CODES.INVALID_HANDOVER_TIME, ERROR_MESSAGES.INVALID_HANDOVER_TIME);
    }
    const sensor = repository.sensorById(data.sensorId);
    if (!sensor) {
      throw new BusinessException(ERROR_CODES.SENSOR_NOT_FOUND, ERROR_MESSAGES.SENSOR_NOT_FOUND, 404);
    }
    if (!repository.greenhouseById(data.toGreenhouseId)) {
      throw new BusinessException(ERROR_CODES.GREENHOUSE_NOT_FOUND, ERROR_MESSAGES.GREENHOUSE_NOT_FOUND);
    }
    const zone = repository.zoneById(data.toZoneId);
    if (!zone) {
      throw new BusinessException(ERROR_CODES.ZONE_NOT_FOUND, ERROR_MESSAGES.ZONE_NOT_FOUND);
    }
    if (zone.greenhouseId !== data.toGreenhouseId) {
      throw new BusinessException(ERROR_CODES.ZONE_GREENHOUSE_MISMATCH, ERROR_MESSAGES.ZONE_GREENHOUSE_MISMATCH);
    }
    if (!data.reason) {
      throw new BusinessException(ERROR_CODES.HANDOVER_REASON_REQUIRED, ERROR_MESSAGES.HANDOVER_REASON_REQUIRED);
    }
    const last = latestHandover(data.sensorId);
    if (last && data.handoverAt <= last.handoverAt) {
      throw new BusinessException(
        ERROR_CODES.HANDOVER_TIME_CONFLICT,
        `交接时间必须晚于上次交接（${last.handoverAt}）。若为重复提交，请修改交接时间并说明原因`,
        409,
      );
    }
    const record = repository.addHandover({
      sensorId: data.sensorId,
      fromGreenhouseId: sensor.greenhouseId,
      fromZoneId: sensor.zoneId,
      toGreenhouseId: data.toGreenhouseId,
      toZoneId: data.toZoneId,
      handoverAt: data.handoverAt,
      reason: data.reason,
    });
    const sensorAfter = repository.moveSensor(data.sensorId, data.toGreenhouseId, data.toZoneId);
    return { handover: record, sensor: sensorAfter };
  },
};
