import type { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard.service.js';
import { readingService } from '../services/reading.service.js';
import { sensorHandoverService } from '../services/sensorHandover.service.js';

export const dashboardController = {
  overview: (_req: Request, res: Response) => res.json(dashboardService.overview()),
  history: (req: Request, res: Response) => res.json(dashboardService.history(String(req.params.greenhouseId))),
  handleAlarm: (req: Request, res: Response) => res.json(dashboardService.markHandled(String(req.params.id))),
  toggleDevice: (req: Request, res: Response) => res.json(dashboardService.toggleDevice(String(req.params.id))),
  ingestReading: (req: Request, res: Response) => res.status(202).json(readingService.ingest(req.body ?? {})),
  handoverSensor: (req: Request, res: Response) => res.status(201).json(sensorHandoverService.handover(req.body ?? {})),
  sensorHandovers: (req: Request, res: Response) => res.json(sensorHandoverService.listBySensor(String(req.params.sensorId))),
};
