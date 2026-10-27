import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyStats, recordGame, liveStreak, dayKey } from './stats.js';

const day = (offset) => new Date(2026, 9, 25 + offset, 12, 0, 0);

test('first game starts a streak of 1', () => {
  const s = recordGame(emptyStats, 'lucky', { rarity: 'common' }, day(0));
  assert.equal(s.games, 1);
  assert.equal(s.wins, 1);
  assert.equal(s.streak, 1);
});

test('playing again the same day does not extend the streak', () => {
  let s = recordGame(emptyStats, 'lucky', {}, day(0));
  s = recordGame(s, 'puzzle', { win: true, score: 800 }, day(0));
  assert.equal(s.streak, 1);
  assert.equal(s.games, 2);
  assert.equal(s.best, 800);
});

test('playing on consecutive days builds the streak, a gap resets it', () => {
  let s = recordGame(emptyStats, 'lucky', {}, day(0));
  s = recordGame(s, 'lucky', {}, day(1));
  s = recordGame(s, 'lucky', {}, day(2));
  assert.equal(s.streak, 3);
  s = recordGame(s, 'lucky', {}, day(5));
  assert.equal(s.streak, 1);
});

test('liveStreak shows 0 once a day has been missed', () => {
  const s = recordGame(emptyStats, 'lucky', {}, day(0));
  assert.equal(liveStreak(s, day(0)), 1);
  assert.equal(liveStreak(s, day(1)), 1);
  assert.equal(liveStreak(s, day(2)), 0);
});

test('a lost puzzle counts as a game but not a win; epic prizes are remembered', () => {
  let s = recordGame(emptyStats, 'puzzle', { win: false, score: 0 }, day(0));
  assert.equal(s.games, 1);
  assert.equal(s.wins, 0);
  s = recordGame(s, 'lucky', { rarity: 'epic' }, day(0));
  assert.equal(s.epic, true);
});

test('dayKey formats a local date', () => {
  assert.equal(dayKey(0, day(0)), '2026-10-25');
});
