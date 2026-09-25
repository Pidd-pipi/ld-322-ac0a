import type { SensorReading } from '../types/domain';

export const toCsv = (rows: SensorReading[]) => {
  const header = 'greenhouseId,sensorType,value,unit,capturedAt';
  const body = rows.map((row) => `${row.greenhouseId},${row.sensorType},${row.value},${row.unit},${row.capturedAt}`);
  return [header, ...body].join('\n');
};
