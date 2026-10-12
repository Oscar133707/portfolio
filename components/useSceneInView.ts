import { useRef } from 'react';
import { useInView } from 'framer-motion';

// Returns a ref + flag; put `is-visible` on the scene root when the flag is true
// so the CSS micro-scene loops in index.css only start once the scene is on screen.
export function useSceneInView<T extends Element>(amount = 0.35) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  return [ref, inView] as const;
}
