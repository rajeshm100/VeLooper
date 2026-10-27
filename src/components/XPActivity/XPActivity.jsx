import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { backgrounds } from '../../assets';
import { copy2 } from '../../data/copy';
import { iconFor, toneFor } from '../../data/iconMap';
import { usePlayer } from '../../context/PlayerContext';
import { numberWithCommas, timeAgo } from '../../utils/format';
import SectionCard from '../common/SectionCard';
import styles from './XPActivity.module.css';

// "07 · Activity": session total plus the newest XP entries. New entries glow briefly.
export default function XPActivity() {
  const { activity, sessionTotal } = usePlayer();
  const [now, setNow] = useState(() => Date.now());
  const seen = useRef(new Set(activity.map((e) => e.id))); // entries that were there on load are not "new"
  const [fresh, setFresh] = useState([]);

  // keep the "x ago" labels current
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // flag entries added since the last render
  useEffect(() => {
    const added = activity.filter((e) => !seen.current.has(e.id)).map((e) => e.id);
    if (!added.length) return undefined;
    added.forEach((id) => seen.current.add(id));
    setFresh(added);
    setNow(Date.now());
    const t = setTimeout(() => setFresh([]), 2600);
    return () => clearTimeout(t);
  }, [activity]);

  return (
    <SectionCard id="activity-card" label={copy2.activityLabel} title={copy2.activityTitle} subtitle={copy2.activityLead} background={backgrounds.activity}>
      <div className={styles.summary}>
        <span className={styles.summaryLabel}>Session total</span>
        <strong className={styles.total}>{numberWithCommas(sessionTotal)} XP</strong>
      </div>
      <ul className={styles.list}>
        {activity.map((e) => {
          const Icon = iconFor(e.iconKey);
          return (
            <li key={e.id} className={clsx(styles.item, styles[toneFor(e.source)], fresh.includes(e.id) && styles.fresh)}>
              <span className={styles.icon}><Icon aria-hidden="true" /></span>
              <span className={styles.text}>
                <span className={styles.source}>{e.source}</span>
                <span className={styles.time}>{timeAgo(e.timestamp, now)}</span>
              </span>
              <span className={styles.xp}>+{e.xp} XP</span>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
