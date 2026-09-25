import { SENSOR_LABELS } from '../constants/app.constants';
import type { SensorReading } from '../types/domain';

export const SensorCards = ({ readings }: { readings: SensorReading[] }) => (
  <section className="grid gap-3 md:grid-cols-5">
    {readings.filter((reading) => reading.greenhouseId === 'gh-1').map((reading) => {
      const alert = reading.sensorType === 'temperature' && reading.value > 30;
      return (
        <article key={reading.id} className={`rounded-lg border p-4 shadow-sm ${alert ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'}`}>
          <span className="text-sm text-slate-500">{SENSOR_LABELS[reading.sensorType]}</span>
          <strong className="mt-2 block text-2xl font-black">{reading.value}{reading.unit}</strong>
          <p className="text-xs text-slate-500">{reading.capturedAt} 更新</p>
        </article>
      );
    })}
  </section>
);
