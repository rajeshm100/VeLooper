import clsx from 'clsx';
import { Gift, Info, Lock, Trophy } from 'lucide-react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { illustrations } from '../../assets';
import { copy } from '../../data/copy';
import { fillTemplate } from '../../utils/format';
import styles from './NextLevelReward.module.css';

// The partly locked reward card: chest, "+50 XP" with a frosted lock, and an info tooltip.
export default function NextLevelReward({ snapshot }) {
  if (snapshot.maxed) {
    return (
      <div className={clsx(styles.card, styles.unlocked)}>
        <div className={styles.trophy}><Trophy size={28} aria-hidden="true" /></div>
        <div className={styles.body}>
          <span className={styles.label}>All rewards unlocked</span>
          <span className={styles.sub}>{copy.maxRewardLine}</span>
        </div>
      </div>
    );
  }

  const reward = snapshot.nextReward;
  return (
    <div className={styles.card}>
      <img className={styles.chest} src={illustrations.rewardChest} alt="Locked reward chest" width="76" height="68" />
      <div className={styles.body}>
        <span className={styles.label}>
          {copy.nextRewardLabel}
          <OverlayTrigger
            placement="bottom"
            trigger={['hover', 'focus', 'click']}
            overlay={<Tooltip id="next-reward-tip">{copy.nextRewardInfo}</Tooltip>}
          >
            <button type="button" className={styles.info} aria-label="About the next level reward">
              <Info size={16} aria-hidden="true" />
            </button>
          </OverlayTrigger>
        </span>
        <span className={styles.amount}>
          +{reward.amount} {reward.type}
          <span className={styles.frost} aria-hidden="true"><Lock size={16} /></span>
        </span>
        <span className={styles.sub}>
          <Gift size={14} aria-hidden="true" />
          {fillTemplate(copy.rewardLine, {
            nextLevel: snapshot.nextLevel,
            rewardAmount: reward.amount,
            rewardType: reward.type,
          })}
        </span>
      </div>
    </div>
  );
}
