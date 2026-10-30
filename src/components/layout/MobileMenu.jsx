import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ChevronRight, X } from 'lucide-react';
import { copy } from '../../data/copy';
import { logo } from '../../assets';
import { navItems } from '../../data/navItems';
import useMediaQuery from '../../hooks/useMediaQuery';
import { scrollToSection } from '../../utils/scroll';
import ThemeToggle from './ThemeToggle';
import styles from './MobileMenu.module.css';

const FOCUSABLE = 'a[href], button:not([disabled])';

// Slide-in menu for phones. Closes on Escape, on a tap outside, after choosing a link, and when the
// screen grows past the phone size. While open it keeps keyboard focus inside and stops the page scrolling.
export default function MobileMenu({ open, onClose, active }) {
  const panelRef = useRef(null);
  const wide = useMediaQuery('(min-width: 641px)');

  useEffect(() => {
    if (open && wide) onClose(false);
  }, [open, wide, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const items = () => Array.from(panel.querySelectorAll(FOCUSABLE));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    items()[1]?.focus(); // first section link (index 0 is the close button)

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose(true);
        return;
      }
      if (e.key !== 'Tab') return;
      const list = items();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const go = (e, id) => {
    e.preventDefault();
    onClose(false); // do not pull focus back to the button: we are leaving for another section
    window.setTimeout(() => scrollToSection(id), 60); // after the page can scroll again
  };

  return (
    <div className={clsx(styles.root, open && styles.open)} aria-hidden={!open}>
      <div className={styles.backdrop} onClick={() => onClose(true)} />
      <aside id="mobile-menu" ref={panelRef} className={styles.panel} role="dialog" aria-modal="true" aria-label="Menu">
        <div className={styles.top}>
          <span className={styles.brand}>
            <img src={logo} width="34" height="34" alt="" />
            {copy.siteTitle}
          </span>
          <button type="button" className={styles.close} aria-label="Close menu" onClick={() => onClose(true)}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <nav className={styles.nav} aria-label="Page sections">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={clsx(styles.link, active === item.id && styles.active)}
              aria-current={active === item.id ? 'true' : undefined}
              onClick={(e) => go(e, item.id)}
            >
              <span>{item.label}</span>
              <ChevronRight size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className={styles.footer}>
          <ThemeToggle />
          <p>{copy.footer}</p>
        </div>
      </aside>
    </div>
  );
}
