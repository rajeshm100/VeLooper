import { useEffect, useRef, useState } from 'react';
import { backgrounds, illustrations } from '../../../assets';
import { copy2 } from '../../../data/copy';
import { usePlayer } from '../../../context/PlayerContext';
import useGameFlow from '../../../hooks/useGameFlow';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { rollPrize } from '../../../utils/luckyBox';
import { useToast } from '../../common/ToastHost';
import GameContainer from '../GameContainer';
import GameStart from '../GameStart';
import GamePlay from '../GamePlay';
import GameResult from '../GameResult';
import GameInfoPanel from '../GameInfoPanel';
import LuckyBoxTile from './LuckyBoxTile';
import styles from './LuckyBox.module.css';

const FLIP_MS = 1900;
const TOAST = { common: '\uD83C\uDF89 Congratulations! ', rare: '\uD83D\uDC9C Rare win! ', epic: '\u2728 Epic win! ' };

// Lucky Box: the first game built on the shared game framework.
export default function LuckyBox() {
  const { addXP, recordGame, config } = usePlayer();
  const toast = useToast();
  const { minXP, maxXP, cooldownHours } = config.luckyBox;
  const flow = useGameFlow('veloop:luckyBox', cooldownHours * 3600 * 1000);
  const [score, setScore] = useLocalStorage('veloop:luckyScore', 0);

  const [picked, setPicked] = useState(null); // { index, prize }
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (index) => {
    if (picked) return;
    const prize = rollPrize(Math.random(), Math.random(), minXP, maxXP);
    setPicked({ index, prize });
    // let the flip play, then pay out and move to the result screen
    timer.current = setTimeout(() => {
      addXP(prize.xp, { source: 'Lucky Box', iconKey: 'gift' });
      recordGame('lucky', { rarity: prize.rarity });
      setScore((s) => s + prize.xp);
      toast(`${TOAST[prize.rarity]}You won ${prize.xp} XP!`);
      flow.finish(prize);
      setPicked(null);
    }, FLIP_MS);
  };

  const info = (
    <GameInfoPanel
      score={score}
      sections={[
        { title: 'How to Play', lines: ['Select one of the three mystery boxes.', 'The box flips open and reveals your prize.', 'Each box hides a random XP amount.'] },
        { title: 'Objective', lines: ['Maximize your daily XP gain.', 'Reach the next rewards level faster.'] },
        { title: 'Reward', lines: [`Random payout of ${minXP} \u2013 ${maxXP} XP.`, 'Common, rare or epic: rarer prizes pay more.', 'Credited to your balance instantly.'] },
        { title: 'Frequency', lines: [`Playable once every ${cooldownHours} hours.`] },
      ]}
    />
  );

  const renderResult = ({ locked }) => {
    const prize = flow.result;
    return (
      <GameResult
        locked={locked}
        badge={prize ? prize.rarity : undefined}
        badgeTone={prize ? prize.rarity : undefined}
        title={locked ? 'Today\u2019s prize' : 'You opened a box!'}
        amount={prize ? `+${prize.xp} XP` : undefined}
        lines={['Credited to your balance.']}
        countdownLabel={flow.countdown.label}
      />
    );
  };

  return (
    <GameContainer
      id="lucky-box-card"
      label={copy2.luckyLabel}
      title={copy2.luckyTitle}
      subtitle={copy2.luckySubtitle}
      background={backgrounds.lucky}
      illustration={illustrations.luckyBoxGame}
      illustrationAlt="A character inviting you to pick one of three gift boxes"
      flow={flow}
      info={info}
      renderStart={() => (
        <GameStart title={copy2.luckyStartTitle} text={copy2.luckyStartText} ctaLabel={copy2.luckyStartCta} onStart={flow.begin} />
      )}
      renderPlay={() => (
        <GamePlay hint={copy2.luckyPlayHint}>
          <div className={styles.row}>
            {[0, 1, 2].map((i) => (
              <LuckyBoxTile
                key={i}
                index={i}
                prize={picked ? picked.prize : null}
                state={!picked ? 'idle' : picked.index === i ? 'opened' : 'dimmed'}
                onPick={pick}
              />
            ))}
          </div>
        </GamePlay>
      )}
      renderResult={renderResult}
    />
  );
}
