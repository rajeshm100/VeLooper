// Lucky Box prize logic, kept free of React so it can be tested.
// Rarity odds: 60% common, 30% rare, 10% epic. The XP range is split in thirds.

export const RARITIES = ['common', 'rare', 'epic'];

export function rarityFromRoll(roll) {
  if (roll < 0.6) return 'common';
  if (roll < 0.9) return 'rare';
  return 'epic';
}

// Inclusive [lo, hi] XP band for a rarity inside [min, max].
export function rarityBand(rarity, min, max) {
  const span = max - min + 1;
  const t1 = min + Math.floor(span / 3);
  const t2 = min + Math.floor((2 * span) / 3);
  if (rarity === 'common') return [min, t1 - 1];
  if (rarity === 'rare') return [t1, t2 - 1];
  return [t2, max];
}

// rollA picks the rarity, rollB picks the amount inside the band. Both are numbers in [0, 1).
export function rollPrize(rollA, rollB, min, max) {
  const rarity = rarityFromRoll(rollA);
  const [lo, hi] = rarityBand(rarity, min, max);
  return { rarity, xp: lo + Math.floor(rollB * (hi - lo + 1)) };
}
