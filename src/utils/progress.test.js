import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveLevel, levelSnapshot, levelState, grantXP } from './progress.js';
import { rewardsConfig } from '../data/rewardsConfig.js';

const { levelRoadmap: rm, levels } = rewardsConfig;

test('deriveLevel follows the XP thresholds', () => {
  assert.equal(deriveLevel(0, rm).level, 1);
  assert.equal(deriveLevel(1499, rm).level, 1);
  assert.equal(deriveLevel(1500, rm).level, 2);
  assert.equal(deriveLevel(6420, rm).level, 4);
  assert.equal(deriveLevel(7999, rm).level, 4);
  assert.equal(deriveLevel(8000, rm).level, 5);
});

test('deriveLevel reports the top level as maxed', () => {
  const d = deriveLevel(99999, rm);
  assert.equal(d.level, 9);
  assert.equal(d.maxed, true);
});

test('levelSnapshot matches the original page numbers at 6,420 XP', () => {
  const s = levelSnapshot(6420, rm, levels);
  assert.equal(s.level, 4);
  assert.equal(s.name, 'Challenger');
  assert.equal(s.nextLevel, 5);
  assert.equal(s.requiredXP, 8000);
  assert.equal(s.remainingXP, 1580);
  assert.equal(s.percent, 80);
  assert.deepEqual(s.nextReward, { type: 'XP', amount: 50 });
});

test('levelSnapshot at 1,499 XP is Level 1 with 1 XP to go', () => {
  const s = levelSnapshot(1499, rm, levels);
  assert.equal(s.level, 1);
  assert.equal(s.remainingXP, 1);
  assert.equal(s.nextLevel, 2);
});

test('levelState labels each level relative to the current one', () => {
  assert.equal(levelState(3, 4), 'completed');
  assert.equal(levelState(4, 4), 'current');
  assert.equal(levelState(5, 4), 'next');
  assert.equal(levelState(9, 4), 'locked');
});

test('grantXP gives the level reward when a level is reached', () => {
  const r = grantXP(7990, 20, rm); // 8010 -> Level 5 -> +50
  assert.equal(r.xp, 8060);
  assert.equal(r.rewardXP, 50);
  assert.deepEqual(r.levelUps, [{ level: 5, rewardXP: 50 }]);
});

test('grantXP cascades when a reward pushes past the next threshold', () => {
  const custom = [
    { level: 1, requiredXP: 0, reward: { type: 'XP', amount: 0 } },
    { level: 2, requiredXP: 100, reward: { type: 'XP', amount: 50 } },
    { level: 3, requiredXP: 150, reward: { type: 'XP', amount: 25 } },
  ];
  const r = grantXP(90, 20, custom); // 110 -> L2 (+50) = 160 -> L3 (+25) = 185
  assert.equal(r.xp, 185);
  assert.deepEqual(r.levelUps.map((u) => u.level), [2, 3]);
});

test('grantXP with no level change just adds the XP', () => {
  const r = grantXP(6420, 100, rm);
  assert.equal(r.xp, 6520);
  assert.equal(r.rewardXP, 0);
  assert.deepEqual(r.levelUps, []);
});
