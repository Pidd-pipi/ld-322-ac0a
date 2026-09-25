import { Card, Segmented } from 'antd';
import type { SensorReading } from '../types/domain';

export const TrendPanel = ({ history }: { history: SensorReading[] }) => {
  const rows = history.filter((row) => row.sensorType === 'temperature');
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
      <p className="mt-3 text-sm text-slate-600">支持按温室、传感器和时间范围查询，数据可导出 CSV。</p>
    </Card>
  );
};
