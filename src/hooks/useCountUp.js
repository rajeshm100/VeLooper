import { useEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion';

// Returns a number that counts up (or down) to `target` whenever the target changes.
export default function useCountUp(target, duration = 1100) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  const fromRef = useRef(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      fromRef.current = target;
      return undefined;
    }
    const from = fromRef.current;
    if (from === target) return undefined;
    let raf;
    let start = null;
    const tick = (ts) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const current = Math.round(from + (target - from) * eased);
      setValue(current);
      fromRef.current = current;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);

  return value;
}
