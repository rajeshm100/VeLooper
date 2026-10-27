import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Mascot, TowerBackdrop, TowerDefs, TowerTopChest } from './towerArt';
import styles from './RewardTower.module.css';

const FLOORS = 9;
// Where the mascot stands on floor i (0-based): on the right side of that floor's top edge.
const pos = (i) => ({ x: 120 + (176 - i * 10) / 2 - 40, y: 288 - (i + 1) * 26 });

// Nine-floor tower. Floors below your level are green, your floor is gold, the rest are locked.
// The mascot climbs to your floor on load and climbs again whenever you level up.
export default function RewardTower({ level }) {
  const [standingOn, setStandingOn] = useState(1);
  const first = useRef(true);

  useEffect(() => {
    const id = setTimeout(() => setStandingOn(level), first.current ? 400 : 0);
    first.current = false;
    return () => clearTimeout(id);
  }, [level]);

  const here = pos(standingOn - 1);
  const trail = Array.from({ length: standingOn }, (_, i) => `${i ? 'L' : 'M'}${pos(i).x + 6} ${pos(i).y + 12}`).join(' ');

  return (
    <svg
      className={styles.tower}
      viewBox="0 0 240 316"
      role="img"
      aria-label={`Reward tower: you are on level ${level} of ${FLOORS}`}
    >
      <TowerDefs />
      <TowerBackdrop />
      {Array.from({ length: FLOORS }, (_, i) => {
        const w = 176 - i * 10;
        const y = 288 - (i + 1) * 26;
        const n = i + 1;
        const state = n < level ? 'done' : n === level ? 'current' : 'locked';
        return (
          <g key={n} className={clsx(styles.tier, styles[state])}>
            <rect x={120 - w / 2} y={y} width={w} height="25" rx="6" />
            <text x={120 - w / 2 + 14} y={y + 17}>{n}</text>
            {state === 'locked' && (
              <g className={styles.lock} transform={`translate(${120 + w / 2 - 18} ${y + 6})`}>
                <rect x="0" y="6" width="10" height="8" rx="2" />
                <path d="M2 6v-3a3 3 0 0 1 6 0v3" fill="none" />
              </g>
            )}
          </g>
        );
      })}
      <TowerTopChest />
      <path d={trail} className={styles.trail} />
      <g className={styles.mascot} style={{ transform: `translate(${here.x}px, ${here.y}px)` }}>
        <Mascot />
      </g>
    </svg>
  );
}
