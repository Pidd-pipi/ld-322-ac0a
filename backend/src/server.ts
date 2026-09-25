import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { APP } from './constants/app.constants.js';
import { app } from './app.js';
import { logger } from './logger/logger.js';
import { dashboardService } from './services/dashboard.service.js';

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (client) => {
  logger.info('websocket connected');
  client.send(JSON.stringify({ type: 'snapshot', payload: dashboardService.overview().readings }));
});

setInterval(() => {
  dashboardService.simulateReading();
  const message = JSON.stringify({ type: 'sensor:update', payload: dashboardService.overview().readings });
  wss.clients.forEach((client) => client.send(message));
}, APP.refreshSeconds * 1000);

server.listen(APP.port, () => {
  logger.info(`server listening on ${APP.port}`);
});
