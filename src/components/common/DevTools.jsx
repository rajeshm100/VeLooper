import { Bug } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import styles from './DevTools.module.css';

// Development only (hidden in production builds): add XP to try level-ups before the games are converted.
export default function DevTools() {
  const { addXP, resetDemo, snapshot } = usePlayer();
  if (!import.meta.env.DEV) return null;
  return (
    <aside className={styles.panel} aria-label="Developer tools">
      <span className={styles.title}><Bug size={14} aria-hidden="true" /> Dev {'\u00b7'} Lv {snapshot.level}</span>
      {[50, 500, 2000].map((n) => (
        <button key={n} type="button" onClick={() => addXP(n, { source: 'Dev tools', iconKey: 'bolt' })}>
          +{n} XP
        </button>
      ))}
      <button type="button" onClick={resetDemo}>Reset</button>
    </aside>
  );
}
