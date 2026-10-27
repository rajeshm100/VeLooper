import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import confetti from 'canvas-confetti';
import { levelBadges } from '../../assets';
import { usePlayer } from '../../context/PlayerContext';
import useReducedMotion from '../../hooks/useReducedMotion';
import SectionLabel from '../common/SectionLabel';
import styles from './LevelUpModal.module.css';

const COLORS = ['#f4e98c', '#b7e9c1', '#93caed', '#d2af26', '#805b87'];

// Pops up after a level-up: the new badge, the level name and the XP reward, with confetti.
export default function LevelUpModal() {
  const { lastLevelUp, clearLevelUp, config } = usePlayer();
  const reduced = useReducedMotion();
  const level = lastLevelUp ? Math.max(...lastLevelUp.levelUps.map((u) => u.level)) : null;
  const name = level ? config.levels.find((l) => l.level === level)?.name : '';

  useEffect(() => {
    if (!lastLevelUp || reduced) return undefined;
    const burst = (origin) => confetti({ particleCount: 70, spread: 75, startVelocity: 45, origin, colors: COLORS, disableForReducedMotion: true });
    burst({ x: 0.2, y: 0.7 });
    burst({ x: 0.8, y: 0.7 });
    const t = setTimeout(() => burst({ x: 0.5, y: 0.6 }), 350);
    return () => clearTimeout(t);
  }, [lastLevelUp, reduced]);

  return (
    <Modal show={Boolean(lastLevelUp)} onHide={clearLevelUp} centered contentClassName={styles.content} aria-labelledby="level-up-title">
      <Modal.Body className={styles.body}>
        {lastLevelUp && (
          <>
            <SectionLabel ping>Level Up!</SectionLabel>
            <div className={styles.badgeWrap}>
              <img className={styles.badge} src={levelBadges[level]} alt={`Level ${level} badge`} />
            </div>
            <h3 id="level-up-title" className={styles.title}>Level {level} {'\u00b7'} {name}</h3>
            {lastLevelUp.levelUps.length > 1 && <p className={styles.text}>You climbed {lastLevelUp.levelUps.length} levels at once!</p>}
            {lastLevelUp.rewardXP > 0 && <p className={styles.reward}>+{lastLevelUp.rewardXP} XP level reward added</p>}
            <button type="button" className={styles.btn} onClick={clearLevelUp}>Awesome!</button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
