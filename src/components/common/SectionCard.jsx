import clsx from 'clsx';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import styles from './SectionCard.module.css';

// The glass card every section sits in: numbered label, title, optional subtitle, then content.
export default function SectionCard({ id, label, title, subtitle, background, align = 'center', children, className }) {
  return (
    <Reveal>
      <section
        id={id}
        className={clsx(styles.card, align === 'center' && styles.center, className)}
        style={background ? { '--card-bg': `url(${background})` } : undefined}
      >
        {label && <SectionLabel>{label}</SectionLabel>}
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </section>
    </Reveal>
  );
}
