import { useCallback, useState } from 'react';

// Like useState, but the value is saved in localStorage (JSON) and survives a reload.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* storage full or blocked: keep working in memory */
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, set];
}
