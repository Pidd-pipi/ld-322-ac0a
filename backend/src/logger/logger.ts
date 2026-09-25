const write = (level: string, message: string, meta?: unknown) => {
  const payload = meta ? ` ${JSON.stringify(meta)}` : '';
  console.log(`[cygreenenv] ${level} ${message}${payload}`);
};

export const logger = {
  debug: (message: string, meta?: unknown) => write('debug', message, meta),
  info: (message: string, meta?: unknown) => write('info', message, meta),
  warn: (message: string, meta?: unknown) => write('warn', message, meta),
  error: (message: string, meta?: unknown) => write('error', message, meta),
};
