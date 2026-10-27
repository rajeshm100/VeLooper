// Achievement badges. `ctx` = { stats, streak, level }.
export const BADGES = [
  { id: 'first-win', name: 'First Win', iconKey: 'trophy', desc: 'Win any game',
    test: ({ stats }) => stats.wins >= 1, progress: ({ stats }) => `${Math.min(stats.wins, 1)} / 1` },
  { id: 'streak3', name: '3-Day Streak', iconKey: 'fire', desc: 'Play 3 days in a row',
    test: ({ streak }) => streak >= 3, progress: ({ streak }) => `${Math.min(streak, 3)} / 3 days` },
  { id: 'puzzle-gold', name: 'Puzzle Master', iconKey: 'puzzle', desc: 'Score 750+ in the puzzle',
    test: ({ stats }) => stats.best >= 750, progress: ({ stats }) => `Best ${stats.best} / 750` },
  { id: 'epic', name: 'Epic Find', iconKey: 'gem', desc: 'Win an epic Lucky Box prize',
    test: ({ stats }) => Boolean(stats.epic), progress: () => 'Not yet' },
  { id: 'level5', name: 'Level 5 Champion', iconKey: 'flag', desc: 'Reach Level 5',
    test: ({ level }) => level >= 5, progress: ({ level }) => `Level ${level} of 5` },
  { id: 'games10', name: 'Regular Player', iconKey: 'gamepad', desc: 'Play 10 games',
    test: ({ stats }) => stats.games >= 10, progress: ({ stats }) => `${Math.min(stats.games, 10)} / 10` },
];

// Ids of badges whose rule is met but that are not yet saved as earned.
export function newlyEarned(ctx) {
  return BADGES.filter((b) => !ctx.stats.badges[b.id] && b.test(ctx)).map((b) => b.id);
}
