import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/**
 * Counts up from 0 to `to` when scrolled into view (trend 6 — purposeful motion,
 * trend 1 — light data/stat display). Respects prefers-reduced-motion.
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, prefix = '', suffix = '', duration = 1.6 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(value)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
