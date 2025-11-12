 // PUBLIC_INTERFACE
export function classNames(...args) {
  /** Compose truthy class names into a single string. */
  return args.flatMap((item) => {
    if (!item) return [];
    if (typeof item === 'string') return [item];
    if (Array.isArray(item)) return item;
    if (typeof item === 'object') {
      return Object.entries(item)
        .filter(([, v]) => Boolean(v))
        .map(([k]) => k);
    }
    return [];
  }).join(' ').trim();
}

export default classNames;
