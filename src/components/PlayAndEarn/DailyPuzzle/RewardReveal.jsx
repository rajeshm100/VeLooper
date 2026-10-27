import { Trophy } from 'lucide-react';
import clsx from 'clsx';
import useCountUp from '../../../hooks/useCountUp';
import { numberWithCommas } from '../../../utils/format';
import styles from './DailyPuzzle.module.css';

// The premium reward reveal: spinning ring, medal pop, spark burst, XP counting up, stars one by one.
export default function RewardReveal({ tier, score, moves, seconds, countdownLabel, actions }) {
  const xp = useCountUp(tier.xp, 1300);
  return (
    <div className={styles.reveal}>
      <div className={styles.medalWrap}>
        <div className={styles.ring} />
        {Array.from({ length: 14 }, (_, k) => (
          <b key={k} className={styles.spark} style={{ '--a': `${k * 26}deg`, '--d': `${60 + (k % 4) * 18}px`, animationDelay: `${0.2 + (k % 5) * 0.08}s` }} />
        ))}
        <div className={clsx(styles.medal, styles[tier.key])}><Trophy size={34} aria-hidden="true" /></div>
      </div>
      <p className={clsx(styles.tierName, styles[`${tier.key}Text`])}>{tier.name}</p>
      <p className={styles.xp}>+{xp} XP</p>
      <div className={styles.stars} aria-label={`${tier.stars} of 3 stars`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={clsx(styles.star, i < tier.stars && styles.starOn)} style={{ animationDelay: `${1.1 + i * 0.35}s` }}>{'\u2605'}</span>
        ))}
      </div>
      <p className={styles.meta}>Score {numberWithCommas(score)} {'\u00b7'} {moves} moves {'\u00b7'} {seconds}s</p>
      <p className={styles.meta}>Added to your XP {'\u00b7'} next reward in <b>{countdownLabel}</b></p>
      {actions}
    </div>
  );
}
