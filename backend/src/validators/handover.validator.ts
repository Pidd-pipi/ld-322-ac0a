import { HANDOVER_DEFAULT_REASON, ZONES } from '../constants/app.constants.js';
import { ERROR_CODES } from '../constants/error.codes.js';
import { BusinessException } from '../errors/BusinessException.js';

export interface HandoverPayload {
  toGreenhouseId: string;
  toZone: string;
  handoverAt: string;
  reason: string;
}

const isRecord = (body: unknown): body is Record<string, unknown> =>
  typeof body === 'object' && body !== null;

export const parseHandoverPayload = (body: unknown): HandoverPayload => {
  if (!isRecord(body)) {
    throw new BusinessException(ERROR_CODES.INVALID_PAYLOAD, '交接请求体不能为空');
  }
  const { toGreenhouseId, toZone, handoverAt, reason } = body;
  if (typeof toGreenhouseId !== 'string' || !toGreenhouseId.trim()) {
    throw new BusinessException(ERROR_CODES.INVALID_PAYLOAD, '请选择目标温室');
  }
  if (typeof toZone !== 'string' || !ZONES.includes(toZone as (typeof ZONES)[number])) {
    throw new BusinessException(ERROR_CODES.INVALID_PAYLOAD, `种植区必须是：${ZONES.join('、')}`);
  }
  if (typeof handoverAt !== 'string' || Number.isNaN(Date.parse(handoverAt.replace(' ', 'T')))) {
    throw new BusinessException(ERROR_CODES.INVALID_PAYLOAD, '交接时间格式不正确');
  }
  return {
    toGreenhouseId: toGreenhouseId.trim(),
    toZone,
    handoverAt: handoverAt.trim(),
    reason: typeof reason === 'string' && reason.trim() ? reason.trim() : HANDOVER_DEFAULT_REASON,
  };
};
