import { Card, Switch, Tag } from 'antd';
import type { Device } from '../types/domain';

export const DeviceControl = ({ devices, onToggle }: { devices: Device[]; onToggle: (id: string) => void }) => (
  <Card title="设备远程控制">
    <div className="grid gap-3 md:grid-cols-2">
      {devices.map((device) => (
        <article key={device.id} className="rounded-md border border-slate-200 p-3">
          <div className="flex items-center justify-between">
            <strong>{device.name}</strong>
            <Switch checked={device.enabled} disabled={!device.online} onChange={() => onToggle(device.id)} />
          </div>
          <p className="mt-2 text-sm text-slate-600">{device.schedule}</p>
          <Tag color={device.online ? 'green' : 'default'}>{device.online ? '在线' : '离线'}</Tag>
        </article>
      ))}
    </div>
  </Card>
);
