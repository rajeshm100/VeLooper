import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import useReducedMotion from '../../../hooks/useReducedMotion';
import { arrowTarget, inPlace, isSolved, moveTile, scoreNow, shuffle, TIME_LIMIT } from '../../../utils/puzzle';
import { numberWithCommas } from '../../../utils/format';
import PuzzleBoard from './PuzzleBoard';
import styles from './DailyPuzzle.module.css';

const clock = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;

// One round: timer, move counter, live score, progress bar and the board.
// Mount it with a new `key` for a new board. It calls onFinish({ win, score, moves, seconds }).
export default function PuzzlePlay({ onFinish }) {
  const reduced = useReducedMotion();
  const [tiles, setTiles] = useState(() => shuffle());
  const [moves, setMoves] = useState(0);
  const [left, setLeft] = useState(TIME_LIMIT);
  const done = useRef(false);
  const seconds = TIME_LIMIT - left;

  const finish = useCallback(
    (win, m, s) => {
      if (done.current) return;
      done.current = true;
      onFinish({ win, moves: m, seconds: s, score: win ? scoreNow(m, s) : 0 });
    },
    [onFinish],
  );

  // countdown
  useEffect(() => {
    const id = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (left <= 0) finish(false, moves, TIME_LIMIT);
  }, [left, moves, finish]);

  const move = useCallback(
    (i) => {
      if (done.current) return;
      const next = moveTile(tiles, i);
      if (!next) return;
      setTiles(next);
      setMoves((m) => m + 1);
      if (isSolved(next)) finish(true, moves + 1, TIME_LIMIT - left);
    },
    [tiles, moves, left, finish],
  );

  // arrow keys, while the puzzle is on screen
  useEffect(() => {
    const onKey = (e) => {
      const target = arrowTarget(tiles, e.key);
      if (target === null) return;
      const card = document.getElementById('puzzle-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      e.preventDefault();
      move(target);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [tiles, move]);

  const placed = inPlace(tiles);
  return (
    <div className={styles.play}>
      <div className={styles.hud}>
        <div className={styles.stat}><span>Time</span><b className={clsx(left <= 15 && !reduced && styles.warn)}>{clock(Math.max(0, left))}</b></div>
        <div className={styles.stat}><span>Moves</span><b>{moves}</b></div>
        <div className={styles.stat}><span>Score</span><b>{numberWithCommas(scoreNow(moves, seconds))}</b></div>
      </div>
      <div className={styles.progress}>
        <span>{placed} / 8 tiles in place</span>
        <div className={styles.bar}><div style={{ width: `${(placed / 8) * 100}%` }} /></div>
      </div>
      <PuzzleBoard tiles={tiles} onMove={move} />
    </div>
  );
}
