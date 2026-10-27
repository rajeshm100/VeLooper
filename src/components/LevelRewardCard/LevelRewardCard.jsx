import clsx from 'clsx';
import { Check, Flag, Gift, Lock, MapPin } from 'lucide-react';
import { levelBadges } from '../../assets';
import styles from './LevelRewardCard.module.css';

const STATE = {
  completed: { label: 'Completed', Icon: Check },
  current: { label: 'You Are Here', Icon: MapPin },
  next: { label: 'Next Goal', Icon: Flag },
  locked: { label: 'Locked', Icon: Lock },
};

// One level in the roadmap grid: badge, name, its XP reward and a state pill. Click to see details.
export default function LevelRewardCard({ level, name, reward, state, selected, onSelect }) {
  const { label, Icon } = STATE[state];
  return (
    <button
      type="button"
      className={clsx(styles.card, styles[state], selected && styles.selected)}
      aria-pressed={selected}
      aria-label={`Level ${level}, ${name}. ${label}. Show details.`}
      onClick={() => onSelect(level)}
    >
      <span className={styles.badgeBox}>
        {(state === 'completed' || state === 'locked') && (
          <span className={styles.mark} aria-hidden="true">
            {state === 'completed' ? <Check size={16} strokeWidth={3} /> : <Lock size={14} />}
          </span>
        )}
        <img src={levelBadges[level]} alt="" />
      </span>
      <span className={styles.num}>Lv {level}</span>
      <span className={styles.name}>{name}</span>
      {reward && (
        <span className={styles.reward}>
          <Gift size={12} aria-hidden="true" /> +{reward.amount} {reward.type}
        </span>
      )}
      <span className={styles.pill}>
        <Icon size={11} aria-hidden="true" /> {label}
      </span>
    </button>
  );
}
