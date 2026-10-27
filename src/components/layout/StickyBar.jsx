import clsx from 'clsx';
import { copy } from '../../data/copy';
import { logo } from '../../assets';
import { scrollToSection } from '../../utils/scroll';
import SiteNav from './SiteNav';
import styles from './StickyBar.module.css';

// A slim glass bar that slides in once the header has scrolled away (hidden on phones by CSS).
export default function StickyBar({ visible, active }) {
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
      <SiteNav active={active} variant="sticky" />
    </div>
  );
}
