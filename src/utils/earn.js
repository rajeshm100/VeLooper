// Earning-card helpers: value tier, best-value card, locked or available.

// low <= 30 XP, medium <= 99 XP, high >= 100 XP
export function tierFor(xp) {
  if (xp >= 100) return 'high';
  if (xp > 30) return 'medium';
  return 'low';
}

// Only the FIRST card with the highest XP gets the "Best Value" ribbon.
export function bestValueId(opportunities) {
  let best = null;
  for (const o of opportunities) if (!best || o.xp > best.xp) best = o;
  return best ? best.id : null;
}

// A card with unlockLevel becomes available once the player reaches that level.
export function isAvailable(opportunity, playerLevel) {
  if (opportunity.unlockLevel) return playerLevel >= opportunity.unlockLevel;
  return opportunity.status === 'available';
}
