import clsx from 'clsx';
import { navItems } from '../../data/navItems';
import { scrollToSection } from '../../utils/scroll';
import styles from './SiteNav.module.css';

// The six section links. Used in the header and in the sticky bar.
export default function SiteNav({ active, variant = 'header', className }) {
  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };
  return (
    <nav className={clsx(styles.nav, styles[variant], className)} aria-label="Page sections">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={clsx(styles.link, active === item.id && styles.active)}
          aria-current={active === item.id ? 'true' : undefined}
          onClick={(e) => go(e, item.id)}
        >
          <span className={item.short ? styles.full : undefined}>{item.label}</span>
          {item.short && <span className={styles.short}>{item.short}</span>}
        </a>
      ))}
    </nav>
  );
}
