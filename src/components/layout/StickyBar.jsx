import clsx from 'clsx';
import { copy } from '../../data/copy';
import { logo } from '../../assets';
import { scrollToSection } from '../../utils/scroll';
import MenuButton from './MenuButton';
import SiteNav from './SiteNav';
import ThemeToggle from './ThemeToggle';
import styles from './StickyBar.module.css';

// A slim glass bar that slides in once the header has scrolled away.
// Larger screens: brand + section links + theme switch. Phones: brand + hamburger.
export default function StickyBar({ visible, active, menuOpen, onMenu }) {
  return (
    <div className={clsx(styles.bar, visible && styles.show)}>
      <a
        className={styles.brand}
        href="#level-display"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('level-display');
        }}
      >
        <img src={logo} width="34" height="34" alt="" />
        <span>{copy.siteTitle}</span>
      </a>
      <SiteNav active={active} variant="sticky" className={styles.links} />
      <ThemeToggle compact className={styles.theme} />
      <MenuButton open={menuOpen} onClick={onMenu} />
    </div>
  );
}
