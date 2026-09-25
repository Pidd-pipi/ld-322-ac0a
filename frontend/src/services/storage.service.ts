import { API_BASE } from '../constants/app.constants';
import { AppException } from '../errors/AppException';
import type { GreenOverview, SensorHandover } from '../types/domain';

interface ErrorBody {
  code?: string;
  message?: string;
}

const readError = async (response: Response, fallback: string) => {
  const body = (await response.json().catch(() => ({}))) as ErrorBody;
  return new AppException(body.code ?? 'REQUEST_FAILED', body.message ?? fallback);
};

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

export interface HandoverRequest {
  sensorId: string;
  toGreenhouseId: string;
  toZoneId: string;
  handoverAt: string;
  reason: string;
}

export const handoverSensor = async (payload: HandoverRequest): Promise<{ handover: SensorHandover }> => {
  const response = await fetch(`${API_BASE}/dashboard/sensors/handover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw await readError(response, '点位交接提交失败');
  }
  return response.json() as Promise<{ handover: SensorHandover }>;
};
