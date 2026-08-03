import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HandArrow } from './Annotations';

// Full-bleed crossfade images for the mobile/tablet hero (strong, portrait-friendly shots)
const mobileHeroImages = [
  '/compressed 2/sm2026-jubel.jpg',
  '/compressed 2/sm2026-guld.jpg',
  '/compressed 2/IMG_3531.jpg',
];

const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Gentle parallax on the desktop hero photo (trend 6 — purposeful motion)
  const yImg = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 70]);
  const yMesh = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -40]);

  // Mobile background crossfade (like the original site — "living" first impression)
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
      className="relative min-h-[var(--full-height,100svh)] flex items-center pt-28 pb-16 md:pt-24 md:pb-20 [overflow:clip] scroll-mt-20 w-full"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
      </div>

      {/* Desktop: animated gradient mesh backdrop */}
      <motion.div style={{ y: yMesh }} className="hidden lg:block absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="mesh-orb animate-mesh w-[46rem] h-[46rem] -top-40 -left-40 bg-grad1/40" />
        <div className="mesh-orb animate-float-slow w-[38rem] h-[38rem] top-10 -right-32 bg-grad3/40" />
        <div className="mesh-orb animate-mesh w-[34rem] h-[34rem] bottom-[-12rem] left-1/3 bg-grad2/30" style={{ animationDelay: '3s' }} />
      </motion.div>
      <div className="hidden lg:block grain-overlay" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Text column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display font-light text-[2.65rem] leading-[1.02] sm:text-6xl lg:text-7xl tracking-[-0.03em] text-white lg:text-slate-900"
            >
              Elitidrottare
              <span className="block">
                &amp; <span className="text-gradient font-normal">webbutvecklare</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-slate-200 lg:text-slate-600 leading-[1.7]"
            >
              Jag skapar moderna webbplatser och automatiserar affärsprocesser med AI.
              Låt mig ta din verksamhet till nästa nivå med smart teknik.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-stretch sm:items-center gap-4"
            >
              <div className="relative">
                <a
                  href="#portfolio"
                  className="group inline-flex w-full sm:w-auto items-center justify-center min-h-[44px] px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-grad1 via-grad2 to-grad3 shadow-lg shadow-grad2/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-grad2/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-grad2 focus-visible:outline-offset-2"
                >
                  Se mina projekt
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                {/* Hand-drawn arrow pointing at the primary CTA (desktop only, trend 3) */}
                <HandArrow className="hidden lg:block absolute -right-16 -top-12 w-16 h-12 rotate-[8deg]" delay={0.8} />
              </div>
              <a
                href="#contact"
                className="inline-flex w-full sm:w-auto items-center justify-center min-h-[44px] px-7 py-3.5 rounded-full text-base font-semibold border transition-all duration-200 active:scale-[0.98] text-white border-white/60 bg-white/10 backdrop-blur-sm hover:bg-white/20 lg:text-slate-900 lg:border-slate-900/15 lg:bg-white/50 lg:hover:bg-white lg:hover:border-slate-900/25 focus-visible:outline-2 focus-visible:outline-white lg:focus-visible:outline-slate-900 focus-visible:outline-offset-2"
              >
                Boka ett samtal
              </a>
            </motion.div>
          </div>

          {/* Image column — desktop only */}
          <div className="hidden lg:block lg:col-span-5">
            <motion.div
              style={{ y: yImg }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="relative mx-auto max-w-sm lg:max-w-none"
            >
              {/* Gradient ring frame (static tilt — kept off the parallax node to avoid transform conflict) */}
              <div className="relative rounded-[2rem] p-[3px] bg-gradient-to-br from-grad1 via-grad2 to-grad3 shadow-2xl shadow-grad2/20 rotate-[-2deg]">
                <div className="relative rounded-[1.85rem] overflow-hidden bg-slate-100">
                  <img
                    src="/compressed 2/sm2026-jubel.jpg"
                    alt="Oscar Johansson firar seger på tävling i Taekwon-do"
                    className="w-full h-full object-cover aspect-[3/4]"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating glass caption chip */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 rounded-2xl bg-white/80 backdrop-blur-md border border-black/5 px-4 py-3 card-soft rotate-[-2deg]">
                <p className="font-display font-semibold text-sm text-slate-900 leading-tight">Svensk Mästare 2026</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
