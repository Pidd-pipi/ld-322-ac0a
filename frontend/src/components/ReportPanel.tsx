import { Button, Card } from 'antd';
import type { Report } from '../types/domain';

export const ReportPanel = ({ reports }: { reports: Report[] }) => (
  <Card title="环境分析报告" extra={<Button size="small">导出 PDF</Button>}>
    <div className="space-y-3">
      {reports.map((report) => (
        <article key={report.id} className="rounded-md bg-slate-100 p-3">
          <strong>{report.range === 'daily' ? '日报' : '周报'} · {report.greenhouseId}</strong>
          <p className="mt-1 text-sm text-slate-600">{report.summary}</p>
          <p className="mt-2 text-sm text-emerald-700">
            平均温度 {report.avgTemperature}℃ · 平均湿度 {report.avgHumidity}% · 报警 {report.alarmCount} 次
          </p>
        </article>
      ))}
    </div>
  </Card>
);
