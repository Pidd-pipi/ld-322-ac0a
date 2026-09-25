import { Alert, Button, message, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { AlarmList } from '../components/AlarmList';
import { DeviceControl } from '../components/DeviceControl';
import { GreenhouseGrid } from '../components/GreenhouseGrid';
import { HandoverModal } from '../components/HandoverModal';
import { MetricCard } from '../components/MetricCard';
import { ReportPanel } from '../components/ReportPanel';
import { SensorCards } from '../components/SensorCards';
import { TrendPanel } from '../components/TrendPanel';
import { logger } from '../logger/logger';
import { toCsv } from '../services/export.service';
import { fetchOverview, handoverSensor, handleAlarm, toggleDevice } from '../services/storage.service';
import type { HandoverRequest } from '../services/storage.service';
import type { GreenOverview, SensorPoint } from '../types/domain';

export const Dashboard = () => {
  const [overview, setOverview] = useState<GreenOverview>();
  const [error, setError] = useState('');
  const [handoverTarget, setHandoverTarget] = useState<SensorPoint | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      setOverview(await fetchOverview());
      logger.info('greenhouse overview loaded');
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败');
    }
  };

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const onToggle = async (id: string) => {
    await toggleDevice(id);
    message.success('设备状态已更新');
    await load();
  };

  const onHandleAlarm = async (id: string) => {
    await handleAlarm(id);
    message.success('报警已标记处理');
    await load();
  };

  const onHandover = async (payload: HandoverRequest) => {
    setSubmitting(true);
    try {
      await handoverSensor(payload);
      message.success('点位交接已提交，新的上报将进入新点位');
      setHandoverTarget(null);
      await load();
    } catch (err) {
      message.error(err instanceof Error ? err.message : '点位交接提交失败');
    } finally {
      setSubmitting(false);
    }
  };

  if (error) return <div className="mx-auto max-w-7xl p-6"><Alert type="error" message={error} /></div>;
  if (!overview) return <div className="mx-auto max-w-7xl p-6"><Skeleton active paragraph={{ rows: 8 }} /></div>;

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-6 py-6">
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="温室数量" value={String(overview.stats.greenhouseCount)} note="多温室独立配置" />
        <MetricCard label="活跃报警" value={String(overview.stats.activeAlarmCount)} note="阈值超限通知" />
        <MetricCard label="在线设备" value={String(overview.stats.onlineDeviceCount)} note="远程控制反馈" />
        <MetricCard label="刷新周期" value={`${overview.stats.refreshSeconds}s`} note="实时仪表盘" />
      </section>

      <GreenhouseGrid greenhouses={overview.greenhouses} sensorPoints={overview.sensorPoints} />
      <SensorCards
        sensors={overview.sensorPoints}
        readings={overview.readings}
        thresholds={overview.thresholds}
        onHandover={setHandoverTarget}
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <TrendPanel history={overview.history} sensorPoints={overview.sensorPoints} />
        <AlarmList alarms={overview.alarms} onHandle={onHandleAlarm} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <DeviceControl devices={overview.devices} onToggle={onToggle} />
        <ReportPanel reports={overview.reports} />
      </section>

      <Button onClick={() => navigator.clipboard.writeText(toCsv(overview.history))}>复制历史 CSV</Button>

      <HandoverModal
        sensor={handoverTarget}
        greenhouses={overview.greenhouses}
        zones={overview.zones}
        open={Boolean(handoverTarget)}
        submitting={submitting}
        onCancel={() => setHandoverTarget(null)}
        onSubmit={onHandover}
      />
    </div>
  );
};
