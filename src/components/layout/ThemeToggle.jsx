import clsx from 'clsx';
import { FaPalette } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

const OPTIONS = [
  { id: 'classic', label: 'Classic' },
  { id: 'neon', label: 'Neon' },
];

// Two-way switch between the Classic and Neon colour themes.
export default function ThemeToggle({ compact = false }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className={clsx(styles.group, compact && styles.compact)} role="group" aria-label="Colour theme">
      <FaPalette className={styles.icon} aria-hidden="true" />
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          className={clsx(styles.btn, theme === o.id && styles.on)}
          aria-pressed={theme === o.id}
          onClick={() => setTheme(o.id)}
        >
          <span className={clsx(styles.dot, styles[o.id])} aria-hidden="true" />
          {o.label}
        </button>
      ))}
    </div>
  );
}
