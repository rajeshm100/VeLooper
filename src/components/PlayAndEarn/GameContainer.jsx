import { backgrounds } from '../../assets';
import SectionCard from '../common/SectionCard';
import styles from './Game.module.css';

// Frame for any daily game: section header, illustration, the screen for the current phase
// and the info panel. The game supplies the three screens; `flow` (from useGameFlow) says which to show.
export default function GameContainer({ id, label, title, subtitle, background, illustration, illustrationAlt, flow, info, renderStart, renderPlay, renderResult }) {
  let screen;
  if (flow.phase === 'play') screen = renderPlay();
  else if (flow.phase === 'result') screen = renderResult({ locked: false });
  else if (flow.phase === 'locked') screen = renderResult({ locked: true });
  else screen = renderStart();

  return (
    <SectionCard id={id} label={label} title={title} subtitle={subtitle} background={background || backgrounds.lucky}>
      <div className={`row g-4 align-items-start ${styles.layout}`}>
        <div className="col-12 col-lg-6">
          <img className={styles.art} src={illustration} alt={illustrationAlt} />
          {screen}
        </div>
        <div className="col-12 col-lg-6">{info}</div>
      </div>
    </SectionCard>
  );
}
