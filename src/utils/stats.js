// Stats for the stats strip and achievements. Pure functions, easy to test.

export const emptyStats = { games: 0, wins: 0, best: 0, streak: 0, lastDay: '', epic: false, badges: {} };

export function dayKey(offset = 0, now = new Date()) {
  const d = new Date(now);
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// A streak that was not continued yesterday or today shows as 0.
export function liveStreak(stats, now = new Date()) {
  return stats.lastDay === dayKey(0, now) || stats.lastDay === dayKey(-1, now) ? stats.streak : 0;
}

// kind: 'lucky' ({ rarity }) or 'puzzle' ({ win, score })
export function recordGame(stats, kind, data = {}, now = new Date()) {
  const next = { ...stats, badges: { ...stats.badges }, games: stats.games + 1 };
  if (kind === 'lucky') {
    next.wins += 1;
    if (data.rarity === 'epic') next.epic = true;
  } else if (data.win) {
    next.wins += 1;
    if (data.score > next.best) next.best = data.score;
  }
  const today = dayKey(0, now);
  if (next.lastDay !== today) {
    next.streak = next.lastDay === dayKey(-1, now) ? next.streak + 1 : 1;
    next.lastDay = today;
  }
  return next;
}
