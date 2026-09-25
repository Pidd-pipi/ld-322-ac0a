import type { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard.service.js';

export const dashboardController = {
  overview: (_req: Request, res: Response) => res.json(dashboardService.overview()),
  history: (req: Request, res: Response) => res.json(dashboardService.history(String(req.params.greenhouseId))),
  handleAlarm: (req: Request, res: Response) => res.json(dashboardService.markHandled(String(req.params.id))),
  toggleDevice: (req: Request, res: Response) => res.json(dashboardService.toggleDevice(String(req.params.id))),
  ingestReading: (_req: Request, res: Response) => res.status(202).json(dashboardService.simulateReading()),
};
