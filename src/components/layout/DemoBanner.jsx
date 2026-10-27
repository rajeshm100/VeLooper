import { TriangleAlert } from 'lucide-react';
import styles from './DemoBanner.module.css';

export default function DemoBanner() {
  return (
    <div className={styles.banner} role="status">
      <TriangleAlert size={16} aria-hidden="true" />
      <span>DEVELOPMENT MODE: Showing dummy data. Not connected to live backend.</span>
    </div>
  );
}
