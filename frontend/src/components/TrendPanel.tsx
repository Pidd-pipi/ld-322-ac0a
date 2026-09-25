import { Card, Segmented, Tag } from 'antd';
import { SENSOR_LABELS } from '../constants/app.constants';
import type { Greenhouse, Sensor, SensorHandover, SensorReading } from '../types/domain';
import { greenhouseName, latestHandoverOf } from '../utils/sensor';

interface TrendPanelProps {
  history: SensorReading[];
  sensors: Sensor[];
  handovers: SensorHandover[];
  greenhouses: Greenhouse[];
}

export const TrendPanel = ({ history, sensors, handovers, greenhouses }: TrendPanelProps) => {
  const rows = history.filter((row) => row.sensorType === 'temperature');
  const sensorIds = [...new Set(history.map((row) => row.sensorId))];
  return (
    <Card title="历史趋势与曲线查询" extra={<Segmented options={['日', '周', '月']} defaultValue="日" />}>
      <div className="grid h-56 grid-cols-5 items-end gap-3">
        {rows.map((row) => (
          <div key={row.id} className="text-center">
            <div className="rounded-t bg-emerald-600" style={{ height: `${row.value * 5}px` }} />
            <p className="mt-2 text-xs text-slate-500">{row.capturedAt}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1">
        {sensorIds.map((sensorId) => {
          const sensor = sensors.find((item) => item.id === sensorId);
          if (!sensor) return null;
          const lastHandover = latestHandoverOf(handovers, sensorId);
          return (
            <p key={sensorId} className="text-xs text-slate-600">
              <Tag>{SENSOR_LABELS[sensor.sensorType]} {sensorId}</Tag>
              当前点位：{greenhouseName(greenhouses, sensor.greenhouseId)} · {sensor.zone}
              <span className="ml-2 text-slate-400">
                {lastHandover
                  ? `最近交接：${lastHandover.handoverAt} 自 ${greenhouseName(greenhouses, lastHandover.fromGreenhouseId)} 迁入`
                  : '最近交接：无'}
              </span>
            </p>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-slate-600">支持按温室、传感器和时间范围查询，交接前的历史数据保留在原点位，可导出 CSV。</p>
    </Card>
  );
};
