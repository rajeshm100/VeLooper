import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { levelBadges } from '../../assets';
import { pad2 } from '../../utils/format';
import styles from './LevelPath.module.css';

function Stop({ level, caption, variant }) {
  return (
    <div className={clsx(styles.stop, styles[variant])}>
      <img src={levelBadges[level]} alt="" width="44" height="44" />
      <span className={styles.level}>Level {pad2(level)}</span>
      <span className={styles.caption}>{caption}</span>
    </div>
  );
}

// "Level 04  ->  Level 05" with Current / Next captions.
export default function LevelPath({ snapshot }) {
  return (
    <div className={styles.path}>
      <Stop level={snapshot.level} caption="Current" variant="current" />
      {!snapshot.maxed && (
        <>
          <ArrowRight size={28} strokeWidth={2.6} className={styles.arrow} aria-hidden="true" />
          <Stop level={snapshot.nextLevel} caption="Next" variant="next" />
        </>
      )}
    </div>
  );
}
