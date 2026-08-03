import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Hand-drawn marker annotations (trend 3: human imperfections / anti-AI).
 * Rough, slightly wobbly SVG strokes in warm ink orange that "draw themselves"
 * when scrolled into view. Purely decorative — always aria-hidden.
 */

interface AnnotationProps {
  className?: string;
  color?: string;
  /** Delay before the draw-in animation starts (seconds). */
  delay?: number;
  strokeWidth?: number;
}

const INK = '#F97316';

const useDraw = (delay: number) => {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.9, ease: 'easeInOut' as const, delay },
  };
};

/** A loose curved arrow, pointing down-right by default. */
export const HandArrow: React.FC<AnnotationProps> = ({ className, color = INK, delay = 0.2, strokeWidth = 3 }) => {
  const draw = useDraw(delay);
  return (
    <svg className={className} viewBox="0 0 120 90" fill="none" aria-hidden="true">
      <motion.path
        d="M6 12 C 30 6, 74 10, 92 44 C 98 56, 96 66, 90 74"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...draw}
      />
      <motion.path
        d="M72 64 C 80 70, 86 73, 90 74 C 90 68, 92 60, 97 52"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw}
        transition={{ ...draw.transition, delay: delay + 0.35 }}
      />
    </svg>
  );
};

/** An open, scribbled circle to ring something important. */
export const HandCircle: React.FC<AnnotationProps> = ({ className, color = INK, delay = 0.2, strokeWidth = 3 }) => {
  const draw = useDraw(delay);
  return (
    <svg className={className} viewBox="0 0 220 130" fill="none" aria-hidden="true">
      <motion.path
        d="M138 12 C 74 2, 20 20, 14 60 C 9 96, 66 120, 128 121 C 190 122, 214 92, 206 58 C 200 30, 168 14, 120 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...draw}
        transition={{ ...draw.transition, duration: 1.1 }}
      />
    </svg>
  );
};

/** A hand-drawn wavy underline. */
export const HandUnderline: React.FC<AnnotationProps> = ({ className, color = INK, delay = 0.1, strokeWidth = 4 }) => {
  const draw = useDraw(delay);
  return (
    <svg className={className} viewBox="0 0 240 24" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M4 15 C 46 6, 92 20, 138 12 C 180 5, 214 16, 236 9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...draw}
      />
    </svg>
  );
};

/** A little four-point sparkle/asterisk to mark a highlight. */
export const HandStar: React.FC<AnnotationProps> = ({ className, color = INK, delay = 0.2, strokeWidth = 3 }) => {
  const draw = useDraw(delay);
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <motion.path d="M24 6 C 25 18, 26 22, 42 24 C 26 26, 25 30, 24 42 C 23 30, 22 26, 6 24 C 22 22, 23 18, 24 6 Z"
        stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" {...draw} />
    </svg>
  );
};
