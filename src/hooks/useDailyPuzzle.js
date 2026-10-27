import { useCallback, useEffect, useMemo, useState } from 'react';
import useCountdown from './useCountdown';
import useLocalStorage from './useLocalStorage';
import { canPlayForReward, freshDay, attemptsLeft, nextMidnight } from '../utils/puzzleDay';

// Flow for the Daily Puzzle. Same phases as useGameFlow (start / play / result / locked),
// but the limit is "2 reward attempts and 1 reward per calendar day", with free practice rounds.
export default function useDailyPuzzle() {
  const [saved, setSaved] = useLocalStorage('veloop:puzzleDay', { date: '', attempts: 0, result: null });
  const day = useMemo(() => freshDay(saved), [saved]);

  const [phase, setPhase] = useState('start');
  const [mode, setMode] = useState('reward'); // 'reward' | 'practice'
  const [round, setRound] = useState(0); // new value = a fresh board
  const [outcome, setOutcome] = useState(null); // what just happened: { win, score, moves, seconds, mode, tier }

  const resetAt = useMemo(() => nextMidnight(), [day.date]);
  const countdown = useCountdown(resetAt);

  // a new day begins: back to the start screen with fresh attempts
  useEffect(() => {
    if (countdown.remainingMs === 0 && resetAt <= Date.now()) {
      setPhase('start');
      setOutcome(null);
    }
  }, [countdown.remainingMs, resetAt]);

  const startReward = useCallback(() => {
    setSaved({ ...day, attempts: day.attempts + 1 });
    setMode('reward');
    setOutcome(null);
    setRound((r) => r + 1);
    setPhase('play');
  }, [day, setSaved]);

  const startPractice = useCallback(() => {
    setMode('practice');
    setOutcome(null);
    setRound((r) => r + 1);
    setPhase('play');
  }, []);

  const finish = useCallback((result) => {
    setOutcome({ ...result, mode });
    setPhase('result');
  }, [mode]);

  const saveReward = useCallback(
    (reward) => setSaved({ ...day, result: reward }),
    [day, setSaved],
  );

  const canReward = canPlayForReward(day);
  // when the start screen would be shown but there is nothing to play for, show the locked screen instead
  const shownPhase = phase === 'start' && !canReward ? 'locked' : phase;

  return { phase: shownPhase, mode, round, outcome, day, canReward, attemptsLeft: attemptsLeft(day), countdown, startReward, startPractice, finish, saveReward };
}
