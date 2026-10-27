import { CalendarCheck, Clock, Gift, Hand, IdCard, Star, Target } from 'lucide-react';
import { MAX_ATTEMPTS } from '../../../utils/puzzleDay';
import { TIME_LIMIT } from '../../../utils/puzzle';
import styles from './DailyPuzzle.module.css';

const PANELS = [
  { icon: Hand, title: 'How to Play', text: 'Tap a tile next to the empty space to slide it across (or use the arrow keys). Keep sliding until the numbers run 1 to 8 in order.' },
  { icon: Target, title: 'Objective', text: 'Arrange tiles 1\u20138 in order, with the empty space in the bottom-right corner.' },
  { icon: Clock, title: 'Time & Attempts', text: `${TIME_LIMIT} seconds per attempt. You get ${MAX_ATTEMPTS} reward attempts per day.` },
  { icon: Gift, title: 'Reward', text: 'Solve it to win XP: Gold +100, Silver +60, Bronze +30.' },
  { icon: Star, title: 'Score', text: 'Starts at 1,000 and drops with every move and second (minimum 100). Gold needs 750+, Silver 500+.' },
  { icon: IdCard, title: 'Eligibility', text: 'Open to every player at any level. Only a solved puzzle earns XP, and practice rounds earn none.' },
  { icon: CalendarCheck, title: 'How Often', text: 'One reward per day, resetting at midnight your time. Replay for practice any time.' },
];

// The seven explanation panels: how to play, objective, limits, reward, score, eligibility, frequency.
export default function PuzzleInfo() {
  return (
    <div className={styles.infoGrid}>
      {PANELS.map(({ icon: Icon, title, text }) => (
        <div key={title} className={styles.infoCard}>
          <h4><Icon size={16} aria-hidden="true" /> {title}</h4>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}
