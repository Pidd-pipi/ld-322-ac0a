import { API_BASE } from '../constants/app.constants';
import { AppException } from '../errors/AppException';
import type { GreenOverview, HandoverPayload, HandoverResult } from '../types/domain';

const parseError = async (response: Response, fallbackCode: string, fallbackMessage: string) => {
  const body = await response.json().catch(() => ({} as { code?: string; message?: string }));
  return new AppException(body.code ?? fallbackCode, body.message ?? fallbackMessage);
};

export const fetchOverview = async (): Promise<GreenOverview> => {
  const response = await fetch(`${API_BASE}/dashboard/overview`);
  if (!response.ok) {
    throw new AppException('OVERVIEW_FAILED', '温室监测数据加载失败');
  }
  return response.json() as Promise<GreenOverview>;
};

export const submitHandover = async (sensorId: string, payload: HandoverPayload): Promise<HandoverResult> => {
  const response = await fetch(`${API_BASE}/dashboard/sensors/${sensorId}/handover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw await parseError(response, 'HANDOVER_FAILED', '点位交接提交失败');
  }
  return response.json() as Promise<HandoverResult>;
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
