import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { rewardsConfig } from '../data/rewardsConfig';
import { grantXP, levelSnapshot } from '../utils/progress';
import { emptyStats, liveStreak, recordGame as recordGameStats } from '../utils/stats';

const PlayerContext = createContext(null);

const KEYS = { bonusXP: 'veloop:bonusXP', activity: 'veloop:activity', stats: 'veloop:stats' };

// Demo history from the config, turned into real timestamps once.
function buildHistory(history, now) {
  return history.map((h, i) => ({
    id: `seed-${i}`,
    source: h.source,
    xp: h.xp,
    iconKey: h.iconKey,
    timestamp: now - h.hoursAgo * 3600 * 1000,
  }));
}

export function PlayerProvider({ children }) {
  const { startingXP, levelRoadmap, levels, xpHistory } = rewardsConfig;

  // XP earned in this browser (includes level rewards). Saved so it survives a reload.
  const [bonusXP, setBonusXP] = useLocalStorage(KEYS.bonusXP, 0);
  const [earned, setEarned] = useLocalStorage(KEYS.activity, []); // newest first
  const [stats, setStats] = useLocalStorage(KEYS.stats, emptyStats);
  const [seed] = useState(() => buildHistory(xpHistory, Date.now()));
  const [lastLevelUp, setLastLevelUp] = useState(null); // used by the level-up modal (session 2)

  const xp = startingXP + bonusXP;
  const snapshot = useMemo(() => levelSnapshot(xp, levelRoadmap, levels), [xp, levelRoadmap, levels]);

  // Add XP from any source. Returns { gained, rewardXP, levelUps }.
  const addXP = useCallback(
    (amount, { source, iconKey = 'bolt' }) => {
      const result = grantXP(startingXP + bonusXP, amount, levelRoadmap);
      const now = Date.now();
      const entries = [{ id: `${now}-main`, source, xp: amount, iconKey, timestamp: now }];
      result.levelUps.forEach((u) => {
        if (u.rewardXP > 0) {
          entries.unshift({ id: `${now}-lvl${u.level}`, source: `Level ${u.level} Reward`, xp: u.rewardXP, iconKey: 'trophy', timestamp: now });
        }
      });
      setBonusXP(bonusXP + result.gained);
      setEarned((prev) => [...entries, ...prev].slice(0, 25));
      if (result.levelUps.length) setLastLevelUp({ ...result, at: now });
      return result;
    },
    [startingXP, bonusXP, levelRoadmap, setBonusXP, setEarned],
  );

  const recordGame = useCallback((kind, data) => setStats((s) => recordGameStats(s, kind, data)), [setStats]);

  // Save newly earned badge ids (with the time they were earned).
  const unlockBadges = useCallback(
    (ids) => setStats((s) => ({ ...s, badges: { ...s.badges, ...Object.fromEntries(ids.map((id) => [id, Date.now()])) } })),
    [setStats],
  );

  const activity = useMemo(() => [...earned, ...seed].slice(0, 25), [earned, seed]);
  const sessionTotal = useMemo(() => activity.reduce((sum, e) => sum + e.xp, 0), [activity]);

  const resetDemo = useCallback(() => {
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
    setBonusXP(0);
    setEarned([]);
    setStats(emptyStats);
    setLastLevelUp(null);
  }, [setBonusXP, setEarned, setStats]);

  const value = useMemo(
    () => ({
      config: rewardsConfig,
      xp,
      snapshot,
      stats,
      streak: liveStreak(stats),
      activity,
      sessionTotal,
      lastLevelUp,
      clearLevelUp: () => setLastLevelUp(null),
      addXP,
      recordGame,
      unlockBadges,
      resetDemo,
    }),
    [xp, snapshot, stats, activity, sessionTotal, lastLevelUp, addXP, recordGame, unlockBadges, resetDemo],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside <PlayerProvider>');
  return ctx;
}
