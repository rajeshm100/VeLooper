import { Trophy } from 'lucide-react';
import SectionLabel from '../common/SectionLabel';
import useCountUp from '../../hooks/useCountUp';
import { copy } from '../../data/copy';
import { fillTemplate, numberWithCommas } from '../../utils/format';
import styles from './CurrentLevel.module.css';

// Label, headline, "Level 4 · Challenger" and the XP-earned line.
export default function CurrentLevel({ snapshot, xp }) {
  const shownXP = useCountUp(xp);
  return (
    <div className={styles.wrap}>
      <SectionLabel ping>{copy.heroLabel}</SectionLabel>
      <h2 className={styles.headline}>{copy.headline}</h2>
      <p className={styles.level}>
        <Trophy size={22} aria-hidden="true" className={styles.icon} />
        {fillTemplate(copy.levelLine, { currentLevel: snapshot.level, levelName: snapshot.name })}
      </p>
      <p className={styles.xp}>{fillTemplate(copy.xpLine, { currentXP: numberWithCommas(shownXP) })}</p>
    </div>
  );
}
