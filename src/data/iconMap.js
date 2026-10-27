import { FaBolt, FaFire, FaFlag, FaGamepad, FaGem, FaGift, FaPuzzlePiece, FaStar, FaTasks, FaTrophy, FaTv, FaUsers } from 'react-icons/fa';

// Config files store a short string key; this turns it into an icon component.
export const iconMap = {
  tv: FaTv,
  users: FaUsers,
  tasks: FaTasks,
  gamepad: FaGamepad,
  star: FaStar,
  fire: FaFire,
  gift: FaGift,
  trophy: FaTrophy,
  puzzle: FaPuzzlePiece,
  gem: FaGem,
  flag: FaFlag,
  bolt: FaBolt,
};

export const iconFor = (key) => iconMap[key] || FaBolt;

// Colour family of an activity entry, by source. Used by the activity feed.
export function toneFor(source) {
  if (/^Level \d+ Reward/.test(source)) return 'purple';
  return (
    {
      'Lucky Box': 'gold',
      'Daily Puzzle': 'green',
      'Bonus Mission': 'gold',
      'Ad Watch': 'blue',
      'Daily Task': 'blue',
      Referral: 'green',
      Streak: 'green',
    }[source] || 'blue'
  );
}
