import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller.js';

export const dashboardRoutes = Router();

dashboardRoutes.get('/overview', dashboardController.overview);
dashboardRoutes.get('/greenhouses/:greenhouseId/history', dashboardController.history);
dashboardRoutes.post('/sensors/:id/handover', dashboardController.handover);
dashboardRoutes.post('/alarms/:id/handle', dashboardController.handleAlarm);
dashboardRoutes.post('/devices/:id/toggle', dashboardController.toggleDevice);
dashboardRoutes.post('/sensor-readings', dashboardController.ingestReading);
