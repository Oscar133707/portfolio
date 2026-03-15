import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Images for mobile crossfade — start with athletics to match current feel
const mobileImages = [
  '/for hero/IMG_4277.jpg',
  '/for hero/IMG_8897.JPG',
];

const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % mobileImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[var(--full-height,100svh)] flex items-center justify-center pt-0 overflow-x-hidden scroll-mt-20 w-full">

      {/* Split-Screen Background — desktop only */}
      <div className="absolute inset-0 z-0 hidden md:flex">
        <div className="relative w-1/2 h-full">
          <img
            src="/for hero/IMG_8897.JPG"
            alt="Tech Background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
        </div>
        <div className="relative w-1/2 h-full">
          <img
            src="/for hero/IMG_4277.jpg"
            alt="Athletics Background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
        </div>
      </div>

      {/* Crossfade Background — mobile only */}
      <div className="absolute inset-0 z-0 md:hidden">
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
              src={mobileImages[activeIndex]}
              alt="Hero Background"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.2] tracking-[-0.02em]">
            Elitidrottare & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Webbutvecklare
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-200 mb-10 leading-[1.7]"
        >
          Jag skapar moderna webbplatser och automatiserar affärsprocesser med AI.
          Låt mig ta din verksamhet till nästa nivå med smart teknik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-accent hover:bg-blue-600 transition-all duration-200 hover:scale-105 active:scale-[0.98] active:opacity-90 shadow-lg hover:shadow-blue-500/30 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
          >
            Se mina projekt
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 border-2 border-white/90 text-base font-semibold rounded-lg text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 hover:scale-105 active:scale-[0.98] active:opacity-90 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Boka ett samtal
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
