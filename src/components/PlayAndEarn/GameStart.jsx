import styles from './Game.module.css';

// Start screen: what the game is, whether you can play now, and the button.
export default function GameStart({ title, text, ctaLabel, onStart, note }) {
  return (
    <div className={styles.stage}>
      <h4 className={styles.stageTitle}>{title}</h4>
      <p className={styles.stageText}>{text}</p>
      {note && <p className={styles.note}>{note}</p>}
      <button type="button" className={styles.btn} onClick={onStart}>
        {ctaLabel}
      </button>
    </div>
  );
}
