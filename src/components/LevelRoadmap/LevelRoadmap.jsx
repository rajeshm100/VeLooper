import { useState } from 'react';
import { Info } from 'lucide-react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { backgrounds } from '../../assets';
import { copy } from '../../data/copy';
import { usePlayer } from '../../context/PlayerContext';
import { levelState } from '../../utils/progress';
import { scrollToSection } from '../../utils/scroll';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';
import GlowButton from '../common/GlowButton';
import LevelRewardCard from '../LevelRewardCard/LevelRewardCard';
import LevelInfo from '../LevelInfo/LevelInfo';
import RewardTower from './RewardTower';
import styles from './LevelRoadmap.module.css';

// "02 · Levels": the reward tower on the left, all nine levels on the right.
export default function LevelRoadmap() {
  const { snapshot, config, xp } = usePlayer();
  const [picked, setPicked] = useState(null); // null = follow the player's current level
  const shown = picked ?? snapshot.level;

  const entryOf = (n) => config.levelRoadmap.find((r) => r.level === n);
  const levelOf = (n) => config.levels.find((l) => l.level === n);
  const detail = entryOf(shown);

  return (
    <Reveal>
      <section id="level-progression" className={styles.card} style={{ '--card-bg': `url(${backgrounds.progression})` }}>
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-5">
            <div className={styles.left}>
              <SectionLabel>{copy.roadmapLabel}</SectionLabel>
              <h3 className={styles.title}>
                {copy.roadmapTitle}
                <OverlayTrigger
                  placement="bottom"
                  trigger={['hover', 'focus', 'click']}
                  overlay={<Tooltip id="progression-tip">{copy.progressionTooltip}</Tooltip>}
                >
                  <button type="button" className={styles.info} aria-label="About level progression">
                    <Info size={20} aria-hidden="true" />
                  </button>
                </OverlayTrigger>
              </h3>
              <p className={styles.note}>{copy.noteOne}</p>
              <p className={styles.note}>{copy.noteTwo}</p>
              <RewardTower level={snapshot.level} />
              <GlowButton onClick={() => scrollToSection('earn-section')} className={styles.cta}>
                {copy.roadmapCta}
              </GlowButton>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className={styles.grid}>
              {config.levels.map((l) => (
                <LevelRewardCard
                  key={l.level}
                  level={l.level}
                  name={l.name}
                  reward={entryOf(l.level)?.reward}
                  state={levelState(l.level, snapshot.level)}
                  selected={shown === l.level}
                  onSelect={setPicked}
                />
              ))}
            </div>
            <LevelInfo
              level={shown}
              name={levelOf(shown)?.name}
              state={levelState(shown, snapshot.level)}
              requiredXP={detail.requiredXP}
              reward={detail.reward}
              xp={xp}
            />
          </div>
        </div>
      </section>
    </Reveal>
  );
}
