import { useEffect, useRef, useState } from 'react';
import { backgrounds } from '../../assets';
import { copy3 } from '../../data/copy';
import { usePlayer } from '../../context/PlayerContext';
import { BADGES, newlyEarned } from '../../utils/achievements';
import SectionCard from '../common/SectionCard';
import { useToast } from '../common/ToastHost';
import BadgeTile from './BadgeTile';
import styles from './Achievements.module.css';

// "06 · Achievements": six badges. Earning one saves it, pops it in and shows a toast.
export default function Achievements() {
  const { stats, streak, snapshot, unlockBadges } = usePlayer();
  const toast = useToast();
  const ctx = { stats, streak, level: snapshot.level };
  const booted = useRef(false);
  const [fresh, setFresh] = useState([]);

  useEffect(() => {
    const ids = newlyEarned({ stats, streak, level: snapshot.level });
    if (!ids.length) {
      booted.current = true;
      return undefined;
    }
    unlockBadges(ids);
    // badges already earned when the page loads are saved silently; only later ones celebrate
    if (!booted.current) {
      booted.current = true;
      return undefined;
    }
    setFresh(ids);
    const names = ids.map((id) => BADGES.find((b) => b.id === id).name);
    const t1 = setTimeout(() => toast(`\uD83C\uDFC5 Badge unlocked: ${names[0]}${names.length > 1 ? ` +${names.length - 1}` : ''}`), 1800);
    const t2 = setTimeout(() => setFresh([]), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [stats, streak, snapshot.level]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SectionCard id="achievements-card" label={copy3.achievementsLabel} title={copy3.achievementsTitle} subtitle={copy3.achievementsSubtitle} background={backgrounds.earn}>
      <div className={styles.row}>
        {BADGES.map((b) => (
          <BadgeTile key={b.id} badge={b} earned={Boolean(stats.badges[b.id])} progress={b.progress(ctx)} isNew={fresh.includes(b.id)} />
        ))}
      </div>
    </SectionCard>
  );
}
