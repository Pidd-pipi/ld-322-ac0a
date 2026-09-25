import { ERROR_CODES, ERROR_MESSAGES } from '../constants/error.codes.js';
import { BusinessException } from '../errors/BusinessException.js';
import { repository } from '../repositories/memory.repository.js';
import type { Alarm, SensorReading } from '../types/domain.js';

interface ReadingPayload {
  sensorId?: unknown;
  value?: unknown;
  capturedAt?: unknown;
}

const evaluateThreshold = (reading: SensorReading): Alarm | undefined => {
  const threshold = repository.thresholdBySensorId(reading.sensorId);
  if (!threshold) {
    return undefined;
  }
  const sensor = repository.sensorById(reading.sensorId);
  const greenhouse = repository.greenhouseById(reading.greenhouseId);
  const zone = repository.zoneById(reading.zoneId);
  const location = `${greenhouse?.name ?? reading.greenhouseId}${zone ? `·${zone.name}` : ''}`;
  if (reading.value < threshold.min || reading.value > threshold.max) {
    return repository.addAlarm({
      sensorId: reading.sensorId,
      greenhouseId: reading.greenhouseId,
      zoneId: reading.zoneId,
      sensorType: reading.sensorType,
      message: `${location} ${sensor?.name ?? reading.sensorId} 读数 ${reading.value}${reading.unit} 超出阈值 [${threshold.min}, ${threshold.max}]`,
      level: 'warning',
    });
  }
  return undefined;
};

export const readingService = {
  ingest: (payload: ReadingPayload) => {
    const sensorId = typeof payload.sensorId === 'string' ? payload.sensorId.trim() : '';
    const value = Number(payload.value);
    if (!sensorId || Number.isNaN(value)) {
      throw new BusinessException(ERROR_CODES.INVALID_PAYLOAD, '请提供 sensorId 和数值 value');
    }
    const sensor = repository.sensorById(sensorId);
    if (!sensor) {
      throw new BusinessException(ERROR_CODES.SENSOR_NOT_FOUND, ERROR_MESSAGES.SENSOR_NOT_FOUND, 404);
    }
    // 新上报按传感器当前点位归档，交接前的历史读数不受影响
    const reading = repository.addReading({
      sensorId: sensor.id,
      greenhouseId: sensor.greenhouseId,
      zoneId: sensor.zoneId,
      sensorType: sensor.sensorType,
      value,
      unit: sensor.unit,
      capturedAt: typeof payload.capturedAt === 'string' && payload.capturedAt ? payload.capturedAt : new Date().toISOString(),
    });
    const alarm = evaluateThreshold(reading);
    return { accepted: true, reading, alarm };
  },
};
