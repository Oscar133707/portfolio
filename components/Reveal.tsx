import React from 'react';
import { motion } from 'framer-motion';

// Shared soft ease — matches --ease-mjuk in index.css
export const EASE_MJUK = [0.22, 1, 0.36, 1] as const;

const tags = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
} as const;

interface RevealProps {
  children: React.ReactNode;
  as?: keyof typeof tags;
  delay?: number;
  className?: string;
}

// One consistent scroll reveal for the whole site: short rise + fade, played once.
const Reveal: React.FC<RevealProps> = ({ children, as = 'div', delay = 0, className }) => {
  const Tag = tags[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE_MJUK, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
