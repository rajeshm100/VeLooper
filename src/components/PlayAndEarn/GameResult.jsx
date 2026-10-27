import clsx from 'clsx';
import styles from './Game.module.css';

// Result screen. Also used when you come back during the cooldown (locked = true).
export default function GameResult({ badge, badgeTone, title, amount, lines = [], countdownLabel, locked = false, actions = [] }) {
  return (
    <div className={styles.stage}>
      {badge && <span className={clsx(styles.badge, styles[badgeTone], !locked && styles.reveal)}>{badge}</span>}
      <h4 className={styles.stageTitle}>{title}</h4>
      {amount !== undefined && <p className={clsx(styles.resultAmount, !locked && styles.reveal)}>{amount}</p>}
      {lines.map((line) => (
        <p key={line} className={styles.stageText}>{line}</p>
      ))}
      {countdownLabel && <p className={styles.note}>Next play in: {countdownLabel}</p>}
      {actions.map((a) => (
        <button key={a.label} type="button" className={clsx(styles.btn, a.ghost && styles.ghost)} onClick={a.onClick}>
          {a.label}
        </button>
      ))}
    </div>
  );
}
