import test from 'node:test';
import assert from 'node:assert/strict';
import { SOLVED, neighbors, isSolved, inPlace, moveTile, shuffle, isSolvable, scoreNow, tierFor, arrowTarget } from './puzzle.js';
import { freshDay, attemptsLeft, canPlayForReward, nextMidnight, MAX_ATTEMPTS } from './puzzleDay.js';
import { BADGES, newlyEarned } from './achievements.js';
import { emptyStats } from './stats.js';

// small deterministic random generator (LCG) so shuffle tests are repeatable
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

test('every shuffle is solvable and never already solved (500 seeds)', () => {
  for (let seed = 1; seed <= 500; seed += 1) {
    const t = shuffle(seeded(seed));
    assert.equal(isSolved(t), false, `seed ${seed} was solved`);
    assert.ok(isSolvable(t), `seed ${seed} not solvable`);
    assert.deepEqual([...t].sort(), [...SOLVED].sort());
  }
});

test('neighbors of corner, edge and centre', () => {
  assert.deepEqual(neighbors(0).sort(), [1, 3]);
  assert.deepEqual(neighbors(1).sort(), [0, 2, 4]);
  assert.deepEqual(neighbors(4).sort(), [1, 3, 5, 7]);
});

test('moveTile only moves tiles next to the gap', () => {
  const board = [1, 2, 3, 4, 0, 5, 7, 8, 6];
  assert.equal(moveTile(board, 0), null);
  const moved = moveTile(board, 5);
  assert.deepEqual(moved, [1, 2, 3, 4, 5, 0, 7, 8, 6]);
  assert.deepEqual(board, [1, 2, 3, 4, 0, 5, 7, 8, 6]); // original untouched
});

test('solving the board is detected and counted', () => {
  assert.equal(inPlace(SOLVED), 8);
  const almost = [1, 2, 3, 4, 5, 6, 7, 0, 8];
  assert.equal(isSolved(moveTile(almost, 8)), true);
});

test('score drops 6 per move and 2 per second, never below 100', () => {
  assert.equal(scoreNow(0, 0), 1000);
  assert.equal(scoreNow(14, 12), 892);
  assert.equal(scoreNow(500, 90), 100);
});

test('reward tiers: gold 750+, silver 500+, bronze below', () => {
  assert.deepEqual([tierFor(1000).key, tierFor(750).key], ['gold', 'gold']);
  assert.deepEqual([tierFor(749).key, tierFor(500).key], ['silver', 'silver']);
  assert.equal(tierFor(499).key, 'bronze');
  assert.deepEqual([tierFor(900).xp, tierFor(600).xp, tierFor(100).xp], [100, 60, 30]);
});

test('arrow keys pick the tile that slides into the gap and never wrap rows', () => {
  const centreGap = [1, 2, 3, 4, 0, 5, 6, 7, 8];
  assert.equal(arrowTarget(centreGap, 'ArrowLeft'), 5);
  assert.equal(arrowTarget(centreGap, 'ArrowRight'), 3);
  assert.equal(arrowTarget(centreGap, 'ArrowUp'), 7);
  assert.equal(arrowTarget(centreGap, 'ArrowDown'), 1);
  assert.equal(arrowTarget([1, 2, 0, 3, 4, 5, 6, 7, 8], 'ArrowLeft'), null); // gap at row end
  assert.equal(arrowTarget([0, 1, 2, 3, 4, 5, 6, 7, 8], 'ArrowRight'), null);
  assert.equal(arrowTarget(centreGap, 'KeyA'), null);
});

test('daily state resets on a new day and tracks attempts', () => {
  const day1 = new Date(2026, 9, 25, 10);
  const day2 = new Date(2026, 9, 26, 10);
  const s = { ...freshDay(null, day1), attempts: 2 };
  assert.equal(attemptsLeft(s), 0);
  assert.equal(canPlayForReward(s), false);
  const sameDay = freshDay(s, day1);
  assert.equal(sameDay.attempts, 2);
  const nextDay = freshDay(s, day2);
  assert.equal(nextDay.attempts, 0);
  assert.equal(canPlayForReward(nextDay), true);
  assert.equal(MAX_ATTEMPTS, 2);
});

test('a claimed reward blocks further reward attempts that day', () => {
  const s = { date: 'x', attempts: 1, result: { xp: 100 } };
  assert.equal(canPlayForReward(s), false);
});

test('nextMidnight is the start of the next day', () => {
  const m = new Date(nextMidnight(new Date(2026, 9, 25, 23, 30)));
  assert.equal(m.getDate(), 26);
  assert.equal(m.getHours(), 0);
});

test('badges unlock from stats, streak and level', () => {
  const base = { stats: { ...emptyStats }, streak: 0, level: 4 };
  assert.deepEqual(newlyEarned(base), []);
  assert.deepEqual(newlyEarned({ ...base, stats: { ...emptyStats, wins: 1, games: 1 } }), ['first-win']);
  const many = { stats: { ...emptyStats, wins: 12, games: 12, best: 800, epic: true }, streak: 3, level: 5 };
  assert.deepEqual(newlyEarned(many).sort(), BADGES.map((b) => b.id).sort());
  const already = { ...many, stats: { ...many.stats, badges: { 'first-win': 1 } } };
  assert.equal(newlyEarned(already).includes('first-win'), false);
});
