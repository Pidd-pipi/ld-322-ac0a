import { Card, Tag } from 'antd';
import { SENSOR_LABELS } from '../constants/app.constants';
import type { Greenhouse, Sensor, SensorReading } from '../types/domain';
import { latestReadingOf } from '../utils/sensor';

interface GreenhouseGridProps {
  greenhouses: Greenhouse[];
  sensors: Sensor[];
  readings: SensorReading[];
}

export const GreenhouseGrid = ({ greenhouses, sensors, readings }: GreenhouseGridProps) => (
  <section className="grid gap-4 md:grid-cols-3">
    {greenhouses.map((house) => {
      const houseSensors = sensors.filter((sensor) => sensor.greenhouseId === house.id);
      return (
        <Card key={house.id} size="small" title={house.name} extra={<Tag color={house.status === 'warning' ? 'red' : 'green'}>{house.status}</Tag>}>
          <p className="text-sm text-slate-600">{house.crop} · {house.area} 平方米 · {house.manager}</p>
          <p className="mt-1 text-xs text-slate-400">当前点位传感器 {houseSensors.length} 台</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {houseSensors.slice(0, 4).map((sensor) => {
              const reading = latestReadingOf(readings, sensor.id);
              return (
                <div key={sensor.id} className="rounded-md bg-slate-100 p-2">
                  <span className="block text-xs text-slate-500">{SENSOR_LABELS[sensor.sensorType]} · {sensor.zone}</span>
                  <strong>{reading ? `${reading.value}${reading.unit}` : '--'}</strong>
                </div>
              );
            })}
            {houseSensors.length === 0 && <p className="col-span-2 text-xs text-slate-400">暂无传感器入驻</p>}
          </div>
        </Card>
      );
    })}
  </section>
);
