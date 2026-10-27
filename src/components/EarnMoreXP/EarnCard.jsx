import { useState } from 'react';
import clsx from 'clsx';
import { ArrowRight, Info, Lock } from 'lucide-react';
import { copy2 } from '../../data/copy';
import { iconFor } from '../../data/iconMap';
import styles from './EarnCard.module.css';

// One earning card. Hover, focus or tap the middle of the card to swap its description
// for a short "What's involved" list. The button at the bottom stays clickable.
export default function EarnCard({ opportunity, tier, available, bestValue, label, onAction }) {
  const [previewing, setPreviewing] = useState(false);
  const Icon = iconFor(opportunity.iconKey);

  const toggle = () => setPreviewing((v) => !v);
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <article className={clsx(styles.card, styles[tier], available ? styles.available : styles.locked, previewing && styles.previewing)}>
      {bestValue && <span className={styles.ribbon}>{'\u2605'} {copy2.bestValue}</span>}

      <div
        className={styles.stack}
        role="button"
        tabIndex={0}
        aria-pressed={previewing}
        aria-label={`${opportunity.title}: show what is involved`}
        onClick={toggle}
        onKeyDown={onKey}
      >
        <div className={styles.main}>
          <div className={styles.head}>
            <span className={styles.icon}><Icon aria-hidden="true" /></span>
            <h4 className={styles.title}>{opportunity.title}</h4>
          </div>
          <p className={styles.xp}>Earn up to +{opportunity.xp} XP</p>
          <p className={styles.desc}>{opportunity.description}</p>
          <span className={styles.hint}>
            <Info size={12} aria-hidden="true" />
            <span className={styles.hintHover}>{copy2.hoverHint}</span>
            <span className={styles.hintTap}>{copy2.tapHint}</span>
          </span>
        </div>
        <div className={styles.preview}>
          <h5>{copy2.involvedTitle}</h5>
          <ul>
            {opportunity.details.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <button type="button" className={styles.cta} disabled={!available} onClick={() => onAction(opportunity)}>
        {available ? (
          <>
            {label} <ArrowRight size={16} aria-hidden="true" />
          </>
        ) : (
          <>
            <Lock size={14} aria-hidden="true" /> {label}
          </>
        )}
      </button>
    </article>
  );
}
