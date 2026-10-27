import clsx from 'clsx';
import { FaLock } from 'react-icons/fa';
import { iconFor } from '../../data/iconMap';
import styles from './Achievements.module.css';

// One badge. Locked badges show progress; earned badges shimmer; a new one pops in.
export default function BadgeTile({ badge, earned, progress, isNew }) {
  const Icon = earned ? iconFor(badge.iconKey) : FaLock;
  return (
    <div className={clsx(styles.tile, earned ? styles.earned : styles.locked, isNew && styles.isNew)}>
      <span className={styles.icon}><Icon aria-hidden="true" /></span>
      <strong className={styles.name}>{badge.name}</strong>
      <span className={styles.desc}>{badge.desc}</span>
      <em className={styles.status}>{earned ? 'Earned' : progress}</em>
    </div>
  );
}
