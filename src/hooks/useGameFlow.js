import { useCallback, useEffect, useState } from 'react';
import useCountdown from './useCountdown';
import useLocalStorage from './useLocalStorage';

// The state machine behind every daily game:
//   start -> play -> result      (and "locked" when you come back during the cooldown)
// The last play time and result are saved, so the cooldown survives a reload.
export default function useGameFlow(storageKey, cooldownMs) {
  const [saved, setSaved] = useLocalStorage(storageKey, { lastPlayed: 0, result: null });
  const readyAt = saved.lastPlayed ? saved.lastPlayed + cooldownMs : 0;
  const coolingDown = readyAt > Date.now();

  const [phase, setPhase] = useState(coolingDown ? 'locked' : 'start');
  const countdown = useCountdown(readyAt);

  // when the cooldown ends, the game is available again
  useEffect(() => {
    if (countdown.remainingMs === 0 && (phase === 'locked' || phase === 'result') && readyAt) setPhase('start');
  }, [countdown.remainingMs, phase, readyAt]);

  const begin = useCallback(() => setPhase('play'), []);
  const finish = useCallback(
    (result) => {
      setSaved({ lastPlayed: Date.now(), result });
      setPhase('result');
    },
    [setSaved],
  );

  return { phase, result: saved.result, countdown, begin, finish };
}
