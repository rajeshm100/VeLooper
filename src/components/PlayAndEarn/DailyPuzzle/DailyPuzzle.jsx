import { useEffect, useRef } from 'react';
import { backgrounds, illustrations } from '../../../assets';
import { copy3 } from '../../../data/copy';
import { usePlayer } from '../../../context/PlayerContext';
import useDailyPuzzle from '../../../hooks/useDailyPuzzle';
import { tierFor } from '../../../utils/puzzle';
import { numberWithCommas } from '../../../utils/format';
import { useToast } from '../../common/ToastHost';
import GameContainer from '../GameContainer';
import GameStart from '../GameStart';
import GamePlay from '../GamePlay';
import GameResult from '../GameResult';
import styles from '../Game.module.css';
import PuzzlePlay from './PuzzlePlay';
import PuzzleInfo from './PuzzleInfo';
import RewardReveal from './RewardReveal';

// The Daily Puzzle: the second game on the shared framework.
export default function DailyPuzzle() {
  const { addXP, recordGame } = usePlayer();
  const toast = useToast();
  const flow = useDailyPuzzle();
  const { outcome, mode, round } = flow;
  const awarded = useRef(0); // round number that has already been paid, so XP is never given twice

  const onFinish = (result) => {
    recordGame('puzzle', { win: result.win, score: result.score });
    flow.finish({ ...result, tier: result.win ? tierFor(result.score) : null });
  };

  // pay the reward shortly after the reveal appears (reward rounds only)
  useEffect(() => {
    if (!outcome || outcome.mode !== 'reward' || !outcome.win || awarded.current === round) return undefined;
    const id = setTimeout(() => {
      awarded.current = round;
      const { tier, score, moves, seconds } = outcome;
      flow.saveReward({ key: tier.key, name: tier.name, xp: tier.xp, score, moves, time: seconds });
      addXP(tier.xp, { source: 'Daily Puzzle', iconKey: 'puzzle' });
      toast(`\uD83E\uDDE9 Daily Puzzle: +${tier.xp} XP!`);
    }, 600);
    return () => clearTimeout(id);
  }, [outcome, round]); // eslint-disable-line react-hooks/exhaustive-deps

  const practiceBtn = { label: 'Practice (no XP)', ghost: true, onClick: flow.startPractice };

  const renderStart = () => (
    <GameStart
      title="Ready for today’s puzzle?"
      text="Solve it in 90 seconds to win up to 100 XP."
      note={`Attempts left today: ${flow.attemptsLeft}`}
      ctaLabel="Start Puzzle"
      onStart={flow.startReward}
    />
  );

  const renderPlay = () => (
    <GamePlay>
      <PuzzlePlay key={round} onFinish={onFinish} />
    </GamePlay>
  );

  const renderResult = ({ locked }) => {
    const countdownLabel = flow.countdown.label;
    if (locked) {
      const r = flow.day.result;
      return r ? (
        <GameResult
          locked
          badge={r.name}
          badgeTone={r.key === 'gold' ? 'epic' : r.key === 'silver' ? 'common' : 'rare'}
          title="Today’s reward claimed"
          amount={`+${r.xp} XP`}
          lines={[`Score ${numberWithCommas(r.score)} · ${r.moves} moves · ${r.time}s`]}
          countdownLabel={countdownLabel}
          actions={[practiceBtn]}
        />
      ) : (
        <GameResult locked title="No reward attempts left today" countdownLabel={countdownLabel} actions={[practiceBtn]} />
      );
    }
    if (!outcome) return null;
    if (outcome.mode === 'practice') {
      return outcome.win ? (
        <GameResult locked title="Practice complete!" amount={`Score ${numberWithCommas(outcome.score)}`} lines={[`${outcome.moves} moves · ${outcome.seconds}s · no XP in practice`]} actions={[{ label: 'Play Again', onClick: flow.startPractice }]} />
      ) : (
        <GameResult locked title="Time’s up!" lines={['Give it another go.']} actions={[{ label: 'Play Again', onClick: flow.startPractice }]} />
      );
    }
    if (outcome.win) {
      return (
        <div className={styles.stage}>
          <RewardReveal
            tier={outcome.tier}
            score={outcome.score}
            moves={outcome.moves}
            seconds={outcome.seconds}
            countdownLabel={countdownLabel}
            actions={<button type="button" className={`${styles.btn} ${styles.ghost}`} onClick={flow.startPractice}>Practice (no XP)</button>}
          />
        </div>
      );
    }
    // reward round, time ran out
    const left = flow.attemptsLeft;
    return (
      <GameResult
        locked
        title="Time’s up!"
        lines={[left > 0 ? `You have ${left} reward attempt left today.` : 'No reward attempts left today.']}
        actions={left > 0 ? [{ label: 'Try Again', onClick: flow.startReward }] : [practiceBtn]}
      />
    );
  };

  return (
    <GameContainer
      id="puzzle-card"
      label={copy3.puzzleLabel}
      title={copy3.puzzleTitle}
      subtitle={copy3.puzzleSubtitle}
      background={backgrounds.progression}
      illustration={illustrations.puzzleGame}
      illustrationAlt="A character sliding a tile into place on a number puzzle"
      flow={flow}
      info={<PuzzleInfo />}
      renderStart={renderStart}
      renderPlay={renderPlay}
      renderResult={renderResult}
    />
  );
}
