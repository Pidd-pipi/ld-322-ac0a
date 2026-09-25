export interface SensorHandoverPayload {
  sensorId?: unknown;
  toGreenhouseId?: unknown;
  toZoneId?: unknown;
  handoverAt?: unknown;
  reason?: unknown;
}

export interface ValidatedHandoverPayload {
  sensorId: string;
  toGreenhouseId: string;
  toZoneId: string;
  handoverAt: string;
  reason: string;
}

const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export const validateHandoverPayload = (payload: SensorHandoverPayload): ValidatedHandoverPayload | null => {
  const sensorId = asText(payload.sensorId);
  const toGreenhouseId = asText(payload.toGreenhouseId);
  const toZoneId = asText(payload.toZoneId);
  const handoverAt = asText(payload.handoverAt);
  const reason = asText(payload.reason);
  if (!sensorId || !toGreenhouseId || !toZoneId || !handoverAt) {
    return null;
  }
  return { sensorId, toGreenhouseId, toZoneId, handoverAt, reason };
};
