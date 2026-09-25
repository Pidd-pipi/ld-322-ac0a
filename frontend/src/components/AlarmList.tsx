import { Button, List, Tag } from 'antd';
import type { Alarm } from '../types/domain';

export const AlarmList = ({ alarms, onHandle }: { alarms: Alarm[]; onHandle: (id: string) => void }) => (
  <List
    header={<strong>阈值报警与通知</strong>}
    bordered
    dataSource={alarms}
    renderItem={(alarm) => (
      <List.Item
        actions={[<Button key="handle" size="small" disabled={alarm.handled} onClick={() => onHandle(alarm.id)}>标记处理</Button>]}
      >
        <List.Item.Meta
          title={<span>{alarm.message} <Tag color={alarm.level === 'critical' ? 'red' : 'orange'}>{alarm.level}</Tag></span>}
          description={`${alarm.createdAt} · ${alarm.handled ? '已处理' : '待处理'}`}
        />
      </List.Item>
    )}
  />
);
