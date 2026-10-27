// Sliding-tile puzzle logic (3x3). Pure functions, no React.

export const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0 is the empty space
export const TIME_LIMIT = 90; // seconds per attempt

export function neighbors(i) {
  const r = Math.floor(i / 3);
  const c = i % 3;
  const out = [];
  if (r > 0) out.push(i - 3);
  if (r < 2) out.push(i + 3);
  if (c > 0) out.push(i - 1);
  if (c < 2) out.push(i + 1);
  return out;
}

export const isSolved = (tiles) => tiles.every((v, i) => v === SOLVED[i]);
export const inPlace = (tiles) => tiles.filter((v, i) => v !== 0 && v === i + 1).length;

// Slide the tile at index i into the gap. Returns the new board, or null if it is not next to the gap.
export function moveTile(tiles, i) {
  const gap = tiles.indexOf(0);
  if (!neighbors(gap).includes(i)) return null;
  const next = [...tiles];
  next[gap] = next[i];
  next[i] = 0;
  return next;
}

// Shuffle by playing random legal moves backwards from the solved board, so it is ALWAYS solvable.
export function shuffle(random = Math.random, steps = 24) {
  let tiles;
  do {
    tiles = [...SOLVED];
    let gap = 8;
    let previous = -1;
    for (let k = 0; k < steps; k += 1) {
      const options = neighbors(gap).filter((n) => n !== previous);
      const pick = options[Math.floor(random() * options.length)];
      tiles[gap] = tiles[pick];
      tiles[pick] = 0;
      previous = gap;
      gap = pick;
    }
  } while (isSolved(tiles));
  return tiles;
}

// Parity check: a 3x3 board is solvable when the number of inversions is even.
export function isSolvable(tiles) {
  const flat = tiles.filter((v) => v !== 0);
  let inversions = 0;
  for (let a = 0; a < flat.length; a += 1) for (let b = a + 1; b < flat.length; b += 1) if (flat[a] > flat[b]) inversions += 1;
  return inversions % 2 === 0;
}

// Score starts at 1,000 and drops 6 per move and 2 per second, never below 100.
export const scoreNow = (moves, seconds) => Math.max(100, 1000 - moves * 6 - seconds * 2);

export function tierFor(score) {
  if (score >= 750) return { key: 'gold', name: 'Gold Solver', xp: 100, stars: 3 };
  if (score >= 500) return { key: 'silver', name: 'Silver Solver', xp: 60, stars: 2 };
  return { key: 'bronze', name: 'Bronze Solver', xp: 30, stars: 1 };
}

// Arrow key = the direction the tile moves, so ArrowLeft slides the tile on the RIGHT of the gap.
export function arrowTarget(tiles, key) {
  const gap = tiles.indexOf(0);
  const offset = { ArrowLeft: 1, ArrowRight: -1, ArrowUp: 3, ArrowDown: -3 }[key];
  if (offset === undefined) return null;
  const target = gap + offset;
  if (target < 0 || target > 8) return null;
  if (Math.abs(offset) === 1 && Math.floor(target / 3) !== Math.floor(gap / 3)) return null; // would wrap to another row
  return target;
}
