import { ArrowUp } from 'lucide-react';
import styles from './BackToTop.module.css';

export default function BackToTop({ visible }) {
  return (
    <button
      type="button"
      className={visible ? `${styles.btn} ${styles.show}` : styles.btn}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp size={22} />
    </button>
  );
}
