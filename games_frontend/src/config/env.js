const isDev = process.env.NODE_ENV !== 'production';

// PUBLIC_INTERFACE
export function getConfig() {
  /**
   * Return environment configuration safely. Reads and parses feature flags.
   * Warns in development if expected values are missing.
   */
  const read = (key, fallback = undefined) => {
    const v = process.env[key];
    if ((v === undefined || v === '') && isDev) {
      // eslint-disable-next-line no-console
      console.warn(`[env] Missing ${key}, using ${String(fallback)}`);
    }
    return v !== undefined && v !== '' ? v : fallback;
  };

  const parseBool = (v, fallback = false) => {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'string') {
      const s = v.toLowerCase();
      if (['true', '1', 'yes', 'on'].includes(s)) return true;
      if (['false', '0', 'no', 'off'].includes(s)) return false;
    }
    return fallback;
  };

  const parseFlags = (raw) => {
    if (!raw) return {};
    try {
      // Try JSON first
      if (raw.trim().startsWith('{') || raw.trim().startsWith('[')) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return Object.fromEntries(parsed.map((k) => [String(k), true]));
        }
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
      // Comma-separated list
      return raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
    } catch (e) {
      if (isDev) {
        // eslint-disable-next-line no-console
        console.warn('[env] Failed to parse REACT_APP_FEATURE_FLAGS:', e);
      }
      return {};
    }
  };

  const cfg = {
    API_BASE: read('REACT_APP_API_BASE', ''),
    BACKEND_URL: read('REACT_APP_BACKEND_URL', ''),
    FRONTEND_URL: read('REACT_APP_FRONTEND_URL', ''),
    WS_URL: read('REACT_APP_WS_URL', ''),
    NODE_ENV: read('REACT_APP_NODE_ENV', process.env.NODE_ENV || 'development'),
    NEXT_TELEMETRY_DISABLED: parseBool(read('REACT_APP_NEXT_TELEMETRY_DISABLED', 'true')),
    ENABLE_SOURCE_MAPS: parseBool(read('REACT_APP_ENABLE_SOURCE_MAPS', 'true')),
    PORT: read('REACT_APP_PORT', '3000'),
    TRUST_PROXY: parseBool(read('REACT_APP_TRUST_PROXY', 'false')),
    LOG_LEVEL: read('REACT_APP_LOG_LEVEL', 'info'),
    HEALTHCHECK_PATH: read('REACT_APP_HEALTHCHECK_PATH', '/healthz'),
    FEATURE_FLAGS: parseFlags(read('REACT_APP_FEATURE_FLAGS', '')),
    EXPERIMENTS_ENABLED: parseBool(read('REACT_APP_EXPERIMENTS_ENABLED', 'false')),
  };

  return cfg;
}

export default getConfig;
