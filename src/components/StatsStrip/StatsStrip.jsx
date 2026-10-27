import { FaBolt, FaFire, FaGamepad, FaStar } from 'react-icons/fa';
import { usePlayer } from '../../context/PlayerContext';
import useCountUp from '../../hooks/useCountUp';
import { numberWithCommas } from '../../utils/format';
import Reveal from '../common/Reveal';
import styles from './StatsStrip.module.css';

function Tile({ icon: Icon, value, label, format = numberWithCommas }) {
  const shown = useCountUp(value);
  return (
    <div className={styles.tile}>
      <span className={styles.icon}><Icon aria-hidden="true" /></span>
      <b className={styles.value}>{format(shown)}</b>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

// Four live numbers under the hero: Total XP, streak, games played, best puzzle score.
export default function StatsStrip() {
  const { xp, streak, stats } = usePlayer();
  return (
    <Reveal>
      <section className={styles.strip} aria-label="Your stats">
        <Tile icon={FaBolt} value={xp} label="Total XP" />
        <Tile icon={FaFire} value={streak} label="Day streak" />
        <Tile icon={FaGamepad} value={stats.games} label="Games played" />
        <Tile icon={FaStar} value={stats.best} label="Best puzzle score" format={(v) => (v ? numberWithCommas(v) : '\u2013')} />
      </section>
    </Reveal>
  );
}
