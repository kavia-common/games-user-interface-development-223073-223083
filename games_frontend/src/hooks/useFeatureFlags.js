import { useMemo } from 'react';
import getConfig from '../config/env';

// PUBLIC_INTERFACE
export function useFeatureFlags() {
  /** Returns a flags object and helper has(flagName). */
  const cfg = getConfig();
  const flags = cfg.FEATURE_FLAGS || {};

  const api = useMemo(() => {
    const has = (name) => Boolean(flags && flags[name]);
    return { flags, has };
  }, [flags]);

  return api;
}

export default useFeatureFlags;
