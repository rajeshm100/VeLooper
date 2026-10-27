// Pure level / XP logic. No React in here, so it is easy to test and reuse.

export const sortRoadmap = (roadmap) => [...roadmap].sort((a, b) => a.level - b.level);

// Which level does this much XP put you on?
export function deriveLevel(xp, roadmap) {
  const rm = sortRoadmap(roadmap);
  let current = rm[0];
  for (const entry of rm) if (xp >= entry.requiredXP) current = entry;
  const next = rm.find((entry) => entry.level === current.level + 1) || null;
  return { level: current.level, current, next, maxed: next === null };
}

// Everything the hero needs to draw itself.
export function levelSnapshot(xp, roadmap, levels) {
  const { level, current, next, maxed } = deriveLevel(xp, roadmap);
  const nameOf = (n) => levels.find((l) => l.level === n)?.name ?? `Level ${n}`;
  return {
    level,
    name: nameOf(level),
    currentEntry: current,
    nextLevel: next ? next.level : null,
    nextName: next ? nameOf(next.level) : null,
    requiredXP: next ? next.requiredXP : current.requiredXP,
    remainingXP: next ? Math.max(0, next.requiredXP - xp) : 0,
    percent: maxed ? 100 : Math.min(100, Math.round((xp / next.requiredXP) * 100)),
    nextReward: next ? next.reward : null,
    maxed,
  };
}

// 'completed' | 'current' | 'next' | 'locked'
export function levelState(levelNumber, currentLevel) {
  if (levelNumber < currentLevel) return 'completed';
  if (levelNumber === currentLevel) return 'current';
  if (levelNumber === currentLevel + 1) return 'next';
  return 'locked';
}

// Add XP and hand out the XP reward of every level reached (a reward can itself
// push the player over the next threshold, so this loops until nothing changes).
export function grantXP(xp, amount, roadmap) {
  const rm = sortRoadmap(roadmap);
  let total = xp + amount;
  let level = deriveLevel(xp, rm).level;
  const levelUps = [];
  let rewardXP = 0;

  for (let guard = 0; guard < rm.length + 2; guard += 1) {
    const reached = deriveLevel(total, rm).level;
    if (reached <= level) break;
    for (let l = level + 1; l <= reached; l += 1) {
      const reward = rm.find((e) => e.level === l)?.reward;
      const bonus = reward && reward.type === 'XP' ? reward.amount : 0;
      total += bonus;
      rewardXP += bonus;
      levelUps.push({ level: l, rewardXP: bonus });
    }
    level = reached;
  }
  return { xp: total, gained: amount + rewardXP, rewardXP, levelUps };
}
