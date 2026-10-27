import clsx from 'clsx';
import { neighbors } from '../../../utils/puzzle';
import styles from './DailyPuzzle.module.css';

// The 3x3 board. Tiles next to the gap glow so you can see what can move.
export default function PuzzleBoard({ tiles, onMove, disabled }) {
  const gap = tiles.indexOf(0);
  const movable = disabled ? [] : neighbors(gap);
  return (
    <div className={clsx(styles.board, disabled && styles.idle)} role="group" aria-label="Sliding puzzle board">
      {tiles.map((v, i) =>
        v === 0 ? (
          <div key="gap" className={clsx(styles.tile, styles.gap)} aria-hidden="true" />
        ) : (
          <button
            key={v}
            type="button"
            className={clsx(styles.tile, v === i + 1 && styles.ok, movable.includes(i) && styles.movable)}
            aria-label={`Tile ${v}`}
            disabled={disabled}
            onClick={() => onMove(i)}
          >
            {v}
          </button>
        ),
      )}
    </div>
  );
}
