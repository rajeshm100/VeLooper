import { illustrations, levelBadges, backgrounds } from '../../assets';
import { copy } from '../../data/copy';
import { usePlayer } from '../../context/PlayerContext';
import { scrollToSection } from '../../utils/scroll';
import Reveal from '../common/Reveal';
import GlowButton from '../common/GlowButton';
import CurrentLevel from '../CurrentLevel/CurrentLevel';
import XPProgress from '../XPProgress/XPProgress';
import NextLevelReward from '../NextLevelReward/NextLevelReward';
import LevelPath from './LevelPath';
import styles from './LevelHero.module.css';

// The main hero: where you are, how far to the next level, and what waits there.
export default function LevelHero() {
  const { snapshot, xp } = usePlayer();
  return (
    <Reveal>
      <section id="level-display" className={styles.hero} style={{ '--hero-bg': `url(${backgrounds.hero})` }}>
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-8">
            <CurrentLevel snapshot={snapshot} xp={xp} />
            <XPProgress snapshot={snapshot} xp={xp} />
            <NextLevelReward snapshot={snapshot} />
            <p className={styles.claim}>{snapshot.maxed ? copy.maxLevelLine : copy.claimLine}</p>
            <LevelPath snapshot={snapshot} />
            <div className={styles.cta}>
              <GlowButton size="lg" onClick={() => scrollToSection('lucky-box-card')}>
                {copy.heroCta}
              </GlowButton>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className={styles.badgeWrap}>
              <img className={styles.badge} src={levelBadges[snapshot.level]} alt={`Level ${snapshot.level} badge`} />
              <img className={styles.orb} src={illustrations.xpOrb} alt="Glowing XP orb" width="92" height="92" />
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
