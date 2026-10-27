import { numberWithCommas } from '../../utils/format';
import styles from './Game.module.css';

// The rules panel next to a game: score, how to play, objective, reward, frequency.
export default function GameInfoPanel({ score, sections }) {
  return (
    <div className={styles.info}>
      {score !== undefined && (
        <>
          <h4>Current Game Score</h4>
          <p className={styles.score}>{numberWithCommas(score)}</p>
        </>
      )}
      {sections.map((s) => (
        <section key={s.title}>
          <h4>{s.title}</h4>
          <ul>
            {s.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
