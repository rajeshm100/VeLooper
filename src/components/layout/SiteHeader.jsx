import { copy } from '../../data/copy';
import { logo } from '../../assets';
import SiteNav from './SiteNav';
import styles from './SiteHeader.module.css';

export default function SiteHeader({ active }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <a
          className={styles.logo}
          href="https://www.velooprewards.in/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the VELoop Rewards website"
        >
          <img src={logo} width="48" height="48" alt="VELoop animated logo" />
        </a>
        <h1 className={styles.title}>{copy.siteTitle}</h1>
      </div>
      <p className={styles.subtitle}>{copy.siteSubtitle}</p>
      <SiteNav active={active} variant="header" />
    </header>
  );
}
