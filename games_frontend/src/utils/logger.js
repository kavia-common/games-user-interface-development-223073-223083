import getConfig from '../config/env';

const levels = ['silent', 'error', 'warn', 'info', 'debug', 'trace'];

function levelIndex(lvl) {
  const n = levels.indexOf(String(lvl || '').toLowerCase());
  return n >= 0 ? n : levels.indexOf('info');
}

// PUBLIC_INTERFACE
export function createLogger(scope = 'app') {
  /**
   * Simple console-based logger that respects log level and avoids sensitive data.
   */
  const { LOG_LEVEL } = getConfig();
  const threshold = levelIndex(LOG_LEVEL);

  const fmt = (level, args) => {
    const ts = new Date().toISOString();
    return [`[${ts}] [${scope}] [${level.toUpperCase()}]`, ...args];
  };

  const logger = {
    error: (...args) => { if (threshold >= levelIndex('error')) console.error(...fmt('error', args)); },
    warn: (...args) => { if (threshold >= levelIndex('warn')) console.warn(...fmt('warn', args)); },
    info: (...args) => { if (threshold >= levelIndex('info')) console.info(...fmt('info', args)); },
    debug: (...args) => { if (threshold >= levelIndex('debug')) console.debug(...fmt('debug', args)); },
    trace: (...args) => { if (threshold >= levelIndex('trace')) console.trace(...fmt('trace', args)); },
  };

  return logger;
}

const defaultLogger = createLogger();
export default defaultLogger;
