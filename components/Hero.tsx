import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';
import { EASE_MJUK } from './Reveal';

// Full-bleed crossfade images for the mobile/tablet hero (strong, portrait-friendly shots)
const mobileHeroImages = [
  '/compressed 2/sm2026-jubel.jpg',
  '/compressed 2/sm2026-guld.jpg',
  '/compressed 2/IMG_3531.jpg',
];

// Headline lines slide up from behind a mask, one after another
const headlineLines: React.ReactNode[] = [
  'Elitidrottare',
  <>&amp; <span className="text-glans">webbutvecklare</span></>,
];

const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Gentle parallax on the desktop hero photo
  const yImg = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 60]);

  // Mobile background crossfade — "living" first impression
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mobileHeroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section
      id="hero"
      className="yta-textur relative min-h-[var(--full-height,100svh)] flex items-center pt-28 pb-16 md:pt-28 md:pb-20 [overflow:clip] scroll-mt-20 w-full"
    >
      {/* Mobile / tablet: full-bleed crossfade background */}
      <div className="lg:hidden absolute inset-0 z-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <img
              src={mobileHeroImages[activeIndex]}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
        {/* Darkens for legibility and melts into the page colour at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-bas/70 via-bas/50 to-bas" />
      </div>

      {/* Desktop: faint grid over the textured surface */}
      <div className="hidden lg:block yta-rutnat" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Text column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="font-display font-medium text-[2.35rem] min-[420px]:text-[2.7rem] sm:text-6xl lg:text-[5.25rem] text-fg">
              {headlineLines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block"
                    initial={{ y: reduce ? 0 : '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE_MJUK, delay: 0.1 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_MJUK, delay: 0.4 }}
              className="mt-7 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-fg/80 lg:text-dump leading-[1.7]"
            >
              Jag skapar moderna webbplatser och automatiserar affärsprocesser med AI.
              Låt mig ta din verksamhet till nästa nivå med smart teknik.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_MJUK, delay: 0.52 }}
              className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-stretch sm:items-center gap-3"
            >
              <a href="#portfolio" className="knapp knapp-primar">
                Se mina projekt
                <ArrowRight className="h-[18px] w-[18px]" />
              </a>
              <a href="#contact" className="knapp knapp-sekundar">
                Boka ett samtal
              </a>
            </motion.div>
          </div>

          {/* Image column — desktop only */}
          <div className="hidden lg:block lg:col-span-5">
            <motion.div
              style={{ y: yImg }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE_MJUK, delay: 0.2 }}
              className="relative mx-auto max-w-md"
            >
              {/* Cobalt glow behind the photo */}
              <div className="absolute -inset-10 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />

              <div className="relative rounded-[1.75rem] border border-linje bg-yta p-2 shadow-svavande">
                <div className="relative overflow-hidden rounded-[1.3rem]">
                  <img
                    src="/compressed 2/sm2026-jubel.jpg"
                    alt="Oscar Johansson firar seger på tävling i Taekwon-do"
                    className="w-full h-full object-cover aspect-[4/5]"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bas/50 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating glass chip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_MJUK, delay: 0.75 }}
                className="absolute -bottom-5 -left-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-yta/80 backdrop-blur-xl px-4 py-3 shadow-svavande"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-guld/15 text-guld">
                  <Trophy size={18} />
                </span>
                <span className="font-display font-medium text-[15px] text-fg leading-tight">Svensk Mästare 2026</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
