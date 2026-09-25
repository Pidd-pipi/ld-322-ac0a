import { Router } from 'express';
import { APP } from '../constants/app.constants.js';
import { dashboardRoutes } from './dashboard.routes.js';

export const routes = Router();

routes.get('/health', (_req, res) => res.json({ status: 'ok', service: APP.serviceName }));
routes.use('/dashboard', dashboardRoutes);
