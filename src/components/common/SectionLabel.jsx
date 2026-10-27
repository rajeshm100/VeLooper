import clsx from 'clsx';
import styles from './SectionLabel.module.css';

// The numbered gold pill above each section heading, e.g. "03 · Earn".
export default function SectionLabel({ children, ping = false, className }) {
  return <span className={clsx(styles.pill, ping && styles.ping, className)}>{children}</span>;
}
