import { API_BASE } from '../constants/app.constants';
import { AppException } from '../errors/AppException';
import type { GreenOverview } from '../types/domain';

export const fetchOverview = async (): Promise<GreenOverview> => {
  const response = await fetch(`${API_BASE}/dashboard/overview`);
  if (!response.ok) {
    throw new AppException('OVERVIEW_FAILED', '温室监测数据加载失败');
  }
  return response.json() as Promise<GreenOverview>;
};

export const toggleDevice = async (id: string) => {
  const response = await fetch(`${API_BASE}/dashboard/devices/${id}/toggle`, { method: 'POST' });
  if (!response.ok) {
    throw new AppException('DEVICE_TOGGLE_FAILED', '设备控制失败');
  }
  return response.json();
};

export const handleAlarm = async (id: string) => {
  const response = await fetch(`${API_BASE}/dashboard/alarms/${id}/handle`, { method: 'POST' });
  if (!response.ok) {
    throw new AppException('ALARM_HANDLE_FAILED', '报警处理失败');
  }
  return response.json();
};
