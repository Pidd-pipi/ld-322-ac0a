import { Card, Segmented, Tag } from 'antd';
import type { SensorPoint, SensorReading } from '../types/domain';

interface TrendPanelProps {
  history: SensorReading[];
  sensorPoints: SensorPoint[];
}

export const TrendPanel = ({ history, sensorPoints }: TrendPanelProps) => {
  const rows = history.filter((row) => row.sensorType === 'temperature');
  const trendSensors = sensorPoints.filter((point) => history.some((row) => row.sensorId === point.sensorId));
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
        {trendSensors.map((point) => (
          <p key={point.sensorId} className="text-xs text-slate-600">
            <Tag>{point.sensorName}</Tag>
            当前点位：{point.greenhouseName} · {point.zoneName}
            {point.latestHandover
              ? `；最近交接：${point.latestHandover.handoverAt}（交接前数据保留在原点位）`
              : '；最近交接：无'}
          </p>
        ))}
      </div>
      <p className="mt-3 text-sm text-slate-600">支持按温室、传感器和时间范围查询，交接前的历史数据仍归原温室，数据可导出 CSV。</p>
    </Card>
  );
};
