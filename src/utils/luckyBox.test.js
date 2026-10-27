import test from 'node:test';
import assert from 'node:assert/strict';
import { rarityFromRoll, rarityBand, rollPrize } from './luckyBox.js';
import { tierFor, bestValueId, isAvailable } from './earn.js';
import { rewardsConfig } from '../data/rewardsConfig.js';

test('rarity odds are 60 / 30 / 10', () => {
  assert.equal(rarityFromRoll(0), 'common');
  assert.equal(rarityFromRoll(0.59), 'common');
  assert.equal(rarityFromRoll(0.6), 'rare');
  assert.equal(rarityFromRoll(0.89), 'rare');
  assert.equal(rarityFromRoll(0.9), 'epic');
  assert.equal(rarityFromRoll(0.999), 'epic');
});

test('the 50-200 XP range splits into thirds that do not overlap', () => {
  assert.deepEqual(rarityBand('common', 50, 200), [50, 99]);
  assert.deepEqual(rarityBand('rare', 50, 200), [100, 149]);
  assert.deepEqual(rarityBand('epic', 50, 200), [150, 200]);
});

test('every possible prize stays inside its rarity band', () => {
  for (let a = 0; a < 1; a += 0.05) {
    for (let b = 0; b < 1; b += 0.1) {
      const { rarity, xp } = rollPrize(a, b, 50, 200);
      const [lo, hi] = rarityBand(rarity, 50, 200);
      assert.ok(xp >= lo && xp <= hi, `${rarity} ${xp} not in ${lo}-${hi}`);
    }
  }
});

test('lowest and highest rolls give the lowest and highest prize', () => {
  assert.equal(rollPrize(0, 0, 50, 200).xp, 50);
  assert.equal(rollPrize(0.999, 0.999, 50, 200).xp, 200);
});

test('value tiers', () => {
  assert.equal(tierFor(25), 'low');
  assert.equal(tierFor(30), 'low');
  assert.equal(tierFor(50), 'medium');
  assert.equal(tierFor(99), 'medium');
  assert.equal(tierFor(100), 'high');
  assert.equal(tierFor(200), 'high');
});

test('Best Value goes to the first highest-XP card (Play Games, not Bonus Missions)', () => {
  assert.equal(bestValueId(rewardsConfig.earningOpportunities), 'play-games');
});

test('Play Games unlocks at level 2; plain cards follow their status', () => {
  const byId = (id) => rewardsConfig.earningOpportunities.find((o) => o.id === id);
  assert.equal(isAvailable(byId('play-games'), 1), false);
  assert.equal(isAvailable(byId('play-games'), 2), true);
  assert.equal(isAvailable(byId('watch-ads'), 1), true);
  assert.equal(isAvailable(byId('bonus-missions'), 9), false);
});
