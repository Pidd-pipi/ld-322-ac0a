import { Button, Tag, Tooltip } from 'antd';
import { SENSOR_LABELS } from '../constants/app.constants';
import type { SensorPoint, SensorReading, Threshold } from '../types/domain';

interface SensorCardsProps {
  sensors: SensorPoint[];
  readings: SensorReading[];
  thresholds: Threshold[];
  onHandover: (sensor: SensorPoint) => void;
}

const latestReadingOf = (readings: SensorReading[], sensorId: string) =>
  [...readings].reverse().find((reading) => reading.sensorId === sensorId);

const isOutOfRange = (reading: SensorReading | undefined, thresholds: Threshold[]) => {
  if (!reading) {
    return false;
  }
  const threshold = thresholds.find((item) => item.sensorId === reading.sensorId);
  return Boolean(threshold && (reading.value < threshold.min || reading.value > threshold.max));
};

export const SensorCards = ({ sensors, readings, thresholds, onHandover }: SensorCardsProps) => (
  <section>
    <h3 className="mb-2 text-base font-semibold text-slate-700">传感器点位（当前位置与最近交接）</h3>
    <div className="grid gap-3 md:grid-cols-4">
      {sensors.map((sensor) => {
        const reading = latestReadingOf(readings, sensor.sensorId);
        const alert = isOutOfRange(reading, thresholds);
        return (
          <article
            key={sensor.sensorId}
            className={`rounded-lg border p-4 shadow-sm ${alert ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">{sensor.sensorName}</span>
              <Tag color="blue">{SENSOR_LABELS[sensor.sensorType]}</Tag>
            </div>
            <strong className="mt-2 block text-2xl font-black">
              {reading ? `${reading.value}${reading.unit}` : '--'}
            </strong>
            <p className="mt-1 text-xs text-slate-500">
              当前点位：{sensor.greenhouseName} · {sensor.zoneName}
            </p>
            <p className="text-xs text-slate-500">
              {sensor.latestHandover
                ? `最近交接：${sensor.latestHandover.handoverAt}`
                : '最近交接：无'}
            </p>
            {sensor.latestHandover && (
              <Tooltip title={sensor.latestHandover.reason}>
                <p className="mt-1 truncate text-xs text-slate-400">原因：{sensor.latestHandover.reason}</p>
              </Tooltip>
            )}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">{reading ? `${reading.capturedAt} 更新` : '暂无读数'}</span>
              <Button size="small" onClick={() => onHandover(sensor)}>点位交接</Button>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);
