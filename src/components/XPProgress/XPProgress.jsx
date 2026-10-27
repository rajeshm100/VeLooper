import { useEffect, useState } from 'react';
import clsx from 'clsx';
import useCountUp from '../../hooks/useCountUp';
import { copy } from '../../data/copy';
import { fillTemplate, numberWithCommas } from '../../utils/format';
import styles from './XPProgress.module.css';

const MILESTONES = [25, 50, 75];
const FILL_MS = 1400;

// Progress bar with 25 / 50 / 75% markers that light up as the bar passes them.
export default function XPProgress({ snapshot, xp }) {
  const shownXP = useCountUp(xp, FILL_MS);
  // start at 0 and fill after mount, so the bar animates in on page load
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setFilled(true), 150);
    return () => clearTimeout(id);
  }, []);
  const pct = filled ? snapshot.percent : 0;

  const progressText = snapshot.maxed
    ? `${numberWithCommas(shownXP)} XP \u00b7 100% complete`
    : fillTemplate(copy.progressLine, {
        currentXP: numberWithCommas(shownXP),
        requiredXP: numberWithCommas(snapshot.requiredXP),
        percent: snapshot.percent,
      });

  return (
    <div className={styles.wrap}>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={snapshot.percent}
        aria-label="Progress to the next level"
      >
        <div className={styles.bar} style={{ width: `${pct}%` }} />
        {MILESTONES.map((m) => (
          <span
            key={m}
            className={clsx(styles.dot, pct >= m && styles.hit)}
            style={{
              left: `${m}%`,
              transitionDelay: pct >= m && snapshot.percent > 0 ? `${150 + Math.round((m / snapshot.percent) * FILL_MS)}ms` : '0ms',
            }}
          />
        ))}
      </div>
      <p className={styles.text}>{progressText}</p>
      {!snapshot.maxed && (
        <p className={styles.remaining}>
          {fillTemplate(copy.milestoneLine, { remainingXP: numberWithCommas(snapshot.remainingXP), nextLevel: snapshot.nextLevel })}
        </p>
      )}
    </div>
  );
}
