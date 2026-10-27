import { motion, useReducedMotion } from 'framer-motion';

// Fade-and-rise the first time a section scrolls into view.
export default function Reveal({ children, className, delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
