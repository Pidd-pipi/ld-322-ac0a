import type { SensorReading } from '../types/domain';

export const toCsv = (rows: SensorReading[]) => {
  const header = 'sensorId,greenhouseId,zone,sensorType,value,unit,capturedAt';
  const body = rows.map((row) => `${row.sensorId},${row.greenhouseId},${row.zone},${row.sensorType},${row.value},${row.unit},${row.capturedAt}`);
  return [header, ...body].join('\n');
};
