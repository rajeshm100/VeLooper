// The Daily Puzzle's once-a-day rules.
import { dayKey } from './stats.js';

export const MAX_ATTEMPTS = 2;

// Saved state belongs to one calendar day; a new day starts clean.
export function freshDay(saved, now = new Date()) {
  const today = dayKey(0, now);
  return saved && saved.date === today ? saved : { date: today, attempts: 0, result: null };
}

export const attemptsLeft = (state) => Math.max(0, MAX_ATTEMPTS - state.attempts);
export const canPlayForReward = (state) => !state.result && attemptsLeft(state) > 0;

// Timestamp of the next local midnight (when the puzzle resets).
export function nextMidnight(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
}
