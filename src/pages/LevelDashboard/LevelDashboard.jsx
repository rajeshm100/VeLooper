import LevelHero from '../../components/LevelHero/LevelHero';
import StatsStrip from '../../components/StatsStrip/StatsStrip';
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap';
import EarnMoreXP from '../../components/EarnMoreXP/EarnMoreXP';
import { DailyPuzzle, LuckyBox } from '../../components/PlayAndEarn';
import Achievements from '../../components/Achievements/Achievements';
import XPActivity from '../../components/XPActivity/XPActivity';
import styles from './LevelDashboard.module.css';

// The page: it only arranges sections. Each section is its own component.
export default function LevelDashboard() {
  return (
    <main className={`container ${styles.page}`}>
      <LevelHero />
      <StatsStrip />
      <LevelRoadmap />
      <EarnMoreXP />
      <LuckyBox />
      <DailyPuzzle />
      <Achievements />
      <XPActivity />
    </main>
  );
}
