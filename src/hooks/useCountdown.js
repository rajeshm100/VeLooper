import { useEffect, useState } from 'react';

const pad = (n) => (n < 10 ? `0${n}` : String(n));

// Counts down to a timestamp. Returns the milliseconds left and a "23h 59m 58s" style label.
export default function useCountdown(targetTimestamp) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!targetTimestamp || targetTimestamp <= Date.now()) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetTimestamp]);

  const remainingMs = Math.max(0, (targetTimestamp || 0) - now);
  const total = Math.ceil(remainingMs / 1000);
  const label = `${pad(Math.floor(total / 3600))}h ${pad(Math.floor((total % 3600) / 60))}m ${pad(total % 60)}s`;
  return { remainingMs, label };
}
