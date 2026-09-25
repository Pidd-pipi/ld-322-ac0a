export const logger = {
  debug: (...args: unknown[]) => console.debug('[cygreenenv]', ...args),
  info: (...args: unknown[]) => console.info('[cygreenenv]', ...args),
  warn: (...args: unknown[]) => console.warn('[cygreenenv]', ...args),
  error: (...args: unknown[]) => console.error('[cygreenenv]', ...args),
};
