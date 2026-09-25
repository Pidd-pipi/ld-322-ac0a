import type { Greenhouse, SensorHandover, SensorReading } from '../types/domain';

export const latestReadingOf = (readings: SensorReading[], sensorId: string) => {
  const matches = readings.filter((reading) => reading.sensorId === sensorId);
  return matches.length ? matches[matches.length - 1] : undefined;
};

export const latestHandoverOf = (handovers: SensorHandover[], sensorId: string) =>
  handovers
    .filter((handover) => handover.sensorId === sensorId)
    .sort((a, b) => b.handoverAt.localeCompare(a.handoverAt))[0];

export const greenhouseName = (greenhouses: Greenhouse[], id: string) =>
  greenhouses.find((house) => house.id === id)?.name ?? id;
