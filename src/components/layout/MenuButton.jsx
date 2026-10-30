import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import styles from './MenuButton.module.css';

// The hamburger button. It turns into an X while the menu is open. Phones only (hidden by CSS above 640px).
export default function MenuButton({ open, onClick, className }) {
  return (
    <button
      type="button"
      className={clsx(styles.btn, className)}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={onClick}
    >
      {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
    </button>
  );
}
