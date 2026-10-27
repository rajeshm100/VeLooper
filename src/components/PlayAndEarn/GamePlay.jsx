import styles from './Game.module.css';

// Play screen: a frame with a one-line hint. The game itself goes inside as children.
export default function GamePlay({ hint, children }) {
  return (
    <div className={styles.stage}>
      {hint && <p className={styles.hint}>{hint}</p>}
      {children}
    </div>
  );
}
