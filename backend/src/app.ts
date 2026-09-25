import cors from 'cors';
import express from 'express';
import { BusinessException } from './errors/BusinessException.js';
import { logger } from './logger/logger.js';
import { routes } from './routes/index.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('request failed', err);
  if (err instanceof BusinessException) {
    res.status(err.status).json({ code: err.code, message: err.message });
    return;
  }
  res.status(500).json({ code: 'INTERNAL_ERROR', message: '服务暂时不可用' });
});
