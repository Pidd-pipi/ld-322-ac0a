import { Card, Tag } from 'antd';
import type { Greenhouse, SensorReading } from '../types/domain';

export const GreenhouseGrid = ({ greenhouses, readings }: { greenhouses: Greenhouse[]; readings: SensorReading[] }) => (
  <section className="grid gap-4 md:grid-cols-3">
    {greenhouses.map((house) => {
      const houseReadings = readings.filter((reading) => reading.greenhouseId === house.id);
      return (
        <Card key={house.id} size="small" title={house.name} extra={<Tag color={house.status === 'warning' ? 'red' : 'green'}>{house.status}</Tag>}>
          <p className="text-sm text-slate-600">{house.crop} · {house.area} 平方米 · {house.manager}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {houseReadings.slice(0, 4).map((reading) => (
              <div key={reading.id} className="rounded-md bg-slate-100 p-2">
                <span className="block text-xs text-slate-500">{reading.sensorType}</span>
                <strong>{reading.value}{reading.unit}</strong>
              </div>
            ))}
          </div>
        </Card>
      );
    })}
  </section>
);
