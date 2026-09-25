import { Card, Tag } from 'antd';
import type { Greenhouse, SensorPoint } from '../types/domain';
import { SENSOR_LABELS } from '../constants/app.constants';

interface GreenhouseGridProps {
  greenhouses: Greenhouse[];
  sensorPoints: SensorPoint[];
}

export const GreenhouseGrid = ({ greenhouses, sensorPoints }: GreenhouseGridProps) => (
  <section className="grid gap-4 md:grid-cols-3">
    {greenhouses.map((house) => {
      const houseSensors = sensorPoints.filter((point) => point.greenhouseId === house.id);
      return (
        <Card key={house.id} size="small" title={house.name} extra={<Tag color={house.status === 'warning' ? 'red' : 'green'}>{house.status}</Tag>}>
          <p className="text-sm text-slate-600">{house.crop} · {house.area} 平方米 · {house.manager}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {houseSensors.map((point) => (
              <div key={point.sensorId} className="rounded-md bg-slate-100 p-2">
                <span className="block text-xs text-slate-500">
                  {SENSOR_LABELS[point.sensorType]} · {point.zoneName}
                </span>
                <strong className="text-sm">{point.sensorName}</strong>
                {point.latestHandover && (
                  <span className="block text-xs text-slate-400">交接于 {point.latestHandover.handoverAt}</span>
                )}
              </div>
            ))}
            {houseSensors.length === 0 && <p className="text-xs text-slate-400">暂无传感器点位</p>}
          </div>
        </Card>
      );
    })}
  </section>
);
