import { copy } from '../../data/copy';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return <footer className={styles.footer}>{copy.footer}</footer>;
}
