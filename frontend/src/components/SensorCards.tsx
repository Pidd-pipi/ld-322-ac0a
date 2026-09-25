import { Button, Tag } from 'antd';
import { useState } from 'react';
import { SENSOR_LABELS } from '../constants/app.constants';
import type { Greenhouse, HandoverPayload, HandoverResult, Sensor, SensorHandover, SensorReading, Threshold } from '../types/domain';
import { greenhouseName, latestHandoverOf, latestReadingOf } from '../utils/sensor';
import { HandoverModal } from './HandoverModal';

interface SensorCardsProps {
  sensors: Sensor[];
  readings: SensorReading[];
  thresholds: Threshold[];
  handovers: SensorHandover[];
  greenhouses: Greenhouse[];
  onHandover: (sensorId: string, payload: HandoverPayload) => Promise<HandoverResult>;
}

export const SensorCards = ({ sensors, readings, thresholds, handovers, greenhouses, onHandover }: SensorCardsProps) => {
  const [selected, setSelected] = useState<Sensor | null>(null);

  return (
    <section>
      <div className="grid gap-3 md:grid-cols-4">
        {sensors.map((sensor) => {
          const reading = latestReadingOf(readings, sensor.id);
          const threshold = thresholds.find((item) => item.sensorId === sensor.id);
          const alert = reading !== undefined && threshold !== undefined
            && (reading.value < threshold.min || reading.value > threshold.max);
          const lastHandover = latestHandoverOf(handovers, sensor.id);
          return (
            <article key={sensor.id} className={`rounded-lg border p-4 shadow-sm ${alert ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">{SENSOR_LABELS[sensor.sensorType]} · {sensor.id}</span>
                <Button size="small" onClick={() => setSelected(sensor)}>交接</Button>
              </div>
              <strong className="mt-2 block text-2xl font-black">
                {reading ? `${reading.value}${reading.unit}` : '--'}
              </strong>
              <p className="mt-1 text-xs text-slate-500">
                当前点位：{greenhouseName(greenhouses, sensor.greenhouseId)} · {sensor.zone}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {lastHandover
                  ? `最近交接：${lastHandover.handoverAt} 迁至 ${greenhouseName(greenhouses, lastHandover.toGreenhouseId)}`
                  : '最近交接：无'}
              </p>
              <div className="mt-2">
                {threshold
                  ? <Tag color={alert ? 'red' : 'default'}>阈值 {threshold.min} ~ {threshold.max}{reading?.unit}</Tag>
                  : <Tag>未设阈值</Tag>}
              </div>
            </article>
          );
        })}
      </div>
      <HandoverModal
        sensor={selected}
        greenhouses={greenhouses}
        handovers={handovers}
        onClose={() => setSelected(null)}
        onSubmit={onHandover}
      />
    </section>
  );
};
