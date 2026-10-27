import { Gift } from 'lucide-react';
import { numberWithCommas } from '../../utils/format';
import styles from './LevelInfo.module.css';

const STATE_LABEL = { completed: 'Completed', current: 'You are here', next: 'Next goal', locked: 'Locked' };

// Details for the level you tapped in the roadmap.
export default function LevelInfo({ level, name, state, requiredXP, reward, xp }) {
  const toGo = Math.max(0, requiredXP - xp);
  return (
    <div className={styles.panel} aria-live="polite">
      <strong className={styles.title}>Level {level} {'\u00b7'} {name}</strong>
      <span className={styles.state}>{STATE_LABEL[state]}</span>
      <span className={styles.lines}>
        <span>Unlocks at {numberWithCommas(requiredXP)} XP</span>
        {reward && (
          <span className={styles.reward}>
            <Gift size={14} aria-hidden="true" /> Reward: +{reward.amount} {reward.type}
          </span>
        )}
        {level > 0 && toGo > 0 && (state === 'next' || state === 'locked') && <span>{numberWithCommas(toGo)} XP to go</span>}
      </span>
    </div>
  );
}
