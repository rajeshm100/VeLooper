import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import styles from './GlowButton.module.css';

// Primary call-to-action: gradient pill with a glow and a shine sweep on hover.
export default function GlowButton({ children, onClick, arrow = true, size = 'md', className, ...rest }) {
  return (
    <button type="button" className={clsx(styles.btn, size === 'lg' && styles.lg, className)} onClick={onClick} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowRight size={18} strokeWidth={2.6} aria-hidden="true" className={styles.arrow} />}
    </button>
  );
}
