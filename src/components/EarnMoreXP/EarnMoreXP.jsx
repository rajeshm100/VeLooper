import { backgrounds, illustrations } from '../../assets';
import { copy, copy2 } from '../../data/copy';
import { usePlayer } from '../../context/PlayerContext';
import { bestValueId, isAvailable, tierFor } from '../../utils/earn';
import { fillTemplate, numberWithCommas } from '../../utils/format';
import { scrollToSection } from '../../utils/scroll';
import SectionCard from '../common/SectionCard';
import { useToast } from '../common/ToastHost';
import EarnCard from './EarnCard';
import styles from './EarnMoreXP.module.css';

// "03 · Earn": the remaining-XP line, the coins illustration and six earning cards.
export default function EarnMoreXP() {
  const { snapshot, config } = usePlayer();
  const toast = useToast();
  const opportunities = config.earningOpportunities;
  const best = bestValueId(opportunities);

  const onAction = (o) => {
    if (o.target) scrollToSection(o.target);
    else toast(`\uD83C\uDFAF ${o.title}: earn up to +${o.xp} XP!`);
  };

  return (
    <SectionCard id="earn-section" label={copy2.earnLabel} title={copy2.earnTitle} background={backgrounds.earn}>
      <p className={styles.remaining}>
        {snapshot.maxed
          ? copy2.earnMaxLine
          : fillTemplate(copy.milestoneLine, { remainingXP: numberWithCommas(snapshot.remainingXP), nextLevel: snapshot.nextLevel })}
      </p>
      <p className={styles.sub}>{copy2.earnSubtitle}</p>
      <img className={styles.art} src={illustrations.coinsWallet} alt="XP coins flowing into your wallet" />
      <div className={styles.grid}>
        {opportunities.map((o) => {
          const available = isAvailable(o, snapshot.level);
          return (
            <EarnCard
              key={o.id}
              opportunity={o}
              tier={tierFor(o.xp)}
              available={available}
              bestValue={o.id === best}
              label={available && o.availableLabel ? o.availableLabel : o.label}
              onAction={onAction}
            />
          );
        })}
      </div>
    </SectionCard>
  );
}
