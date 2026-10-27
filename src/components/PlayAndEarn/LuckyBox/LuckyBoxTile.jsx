import clsx from 'clsx';
import { FaGift } from 'react-icons/fa';
import styles from './LuckyBox.module.css';

const SPARKS = { common: 8, rare: 12, epic: 18 };
const SPARK_COLORS = {
  common: ['var(--soft-blue)', 'var(--text-primary)'],
  rare: ['var(--muted-purple)', 'var(--soft-blue)', 'var(--text-primary)'],
  epic: ['var(--warm-yellow)', 'var(--text-secondary)', 'var(--text-primary)'],
};

// One mystery box. When opened it flips in 3D to a prize card that glows in its rarity colour.
export default function LuckyBoxTile({ index, state, prize, onPick }) {
  // state: 'idle' | 'opened' | 'dimmed'
  const opened = state === 'opened';
  return (
    <button
      type="button"
      className={clsx(styles.tile, opened && styles.opened, state === 'dimmed' && styles.dimmed, opened && styles[prize.rarity], styles[`d${index}`])}
      disabled={state !== 'idle'}
      aria-label={opened ? `${prize.rarity} prize: ${prize.xp} XP` : `Mystery box ${index + 1}`}
      onClick={() => onPick(index)}
    >
      <span className={styles.inner}>
        <span className={clsx(styles.face, styles.front)}>
          <FaGift aria-hidden="true" />
        </span>
        <span className={clsx(styles.face, styles.back)}>
          {opened && (
            <>
              <small className={styles.rarity}>{prize.rarity}</small>
              <span className={styles.prize}>+{prize.xp} XP</span>
            </>
          )}
        </span>
      </span>
      {opened &&
        Array.from({ length: SPARKS[prize.rarity] }, (_, i) => (
          <b
            key={i}
            className={styles.spark}
            style={{ '--a': `${(360 / SPARKS[prize.rarity]) * i}deg`, '--c': SPARK_COLORS[prize.rarity][i % SPARK_COLORS[prize.rarity].length] }}
          />
        ))}
    </button>
  );
}
