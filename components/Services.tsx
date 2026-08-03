import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Sparkles, Check, ArrowUpRight } from 'lucide-react';

interface ServiceFeatureProps {
  text: string;
}

const ServiceFeature: React.FC<ServiceFeatureProps> = ({ text }) => (
  <li className="flex items-start space-x-3">
    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex items-center justify-center">
      <Check size={12} className="text-white" strokeWidth={3.5} />
    </span>
    <span className="text-slate-600 text-[15px] leading-relaxed">{text}</span>
  </li>
);

interface ServiceCardProps {
  index: string;
  tag: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ index, tag, title, description, features, icon, delay }) => {
  // Dynamically tracks whether the device supports true hover (mouse).
  const [canHover, setCanHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setCanHover(e.matches);
      if (!e.matches) setIsHovered(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={canHover ? { y: -8 } : undefined}
      whileTap={{ y: -2 }}
      onMouseEnter={() => { if (canHover) setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full rounded-3xl p-[1.5px] bg-gradient-to-br from-grad1/40 via-grad2/30 to-grad3/40"
    >
      <div className={`relative h-full bg-white rounded-[1.4rem] p-8 md:p-10 flex flex-col transition-shadow duration-300 ${isHovered ? 'shadow-2xl shadow-grad2/15' : 'card-soft'}`}>
        <div className="flex items-start justify-between mb-8">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-grad1 via-grad2 to-grad3 flex items-center justify-center text-white shadow-lg shadow-grad2/20 transform transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
            {icon}
          </div>
          <span className="font-mono text-[11px] tracking-widest text-slate-400">{index} / {tag}</span>
        </div>

        <div className="flex-1">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-slate-900 mb-4 tracking-tight">
            {title}
          </h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="w-full h-px bg-black/5 mb-8" />

          <ul className="space-y-4 mb-8">
            {features.map((feature, idx) => (
              <ServiceFeature key={idx} text={feature} />
            ))}
          </ul>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 font-medium text-slate-900 hover:text-grad2 transition-colors text-sm"
        >
          Diskutera ditt projekt
          <ArrowUpRight size={16} className={`transition-transform duration-200 ${isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
        </a>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-20 md:py-28 scroll-mt-24 [overflow:clip] w-full px-5 sm:px-6 lg:px-8 border-t border-black/5">
      {/* Subtle gradient mesh backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="mesh-orb animate-float-slow w-[36rem] h-[36rem] -top-20 -left-32 bg-grad1/20" />
        <div className="mesh-orb animate-mesh w-[32rem] h-[32rem] bottom-[-10rem] -right-24 bg-grad3/20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-14 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-display font-semibold text-4xl md:text-5xl text-slate-900 tracking-tight leading-[1.1]"
          >
            Tjänster
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="mt-5 text-lg text-slate-600 leading-[1.7]"
          >
            Helhetslösningar inom digital utveckling. Jag kombinerar teknisk expertis med affärsförståelse för att skapa värde.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <ServiceCard
            index="01"
            tag="WEBB"
            icon={<Monitor size={30} strokeWidth={2.25} />}
            title="Webbutveckling"
            description="Responsiva, snabba och användarvänliga hemsidor byggda med modern teknik som React och Tailwind CSS."
            features={[
              "Responsiv design för alla enheter",
              "Snabb laddningstid & SEO-optimering",
              "Modern tech stack (React, TypeScript, Next.js)",
              "Underhållbar och skalbar kod"
            ]}
            delay={0.15}
          />

          <ServiceCard
            index="02"
            tag="AI"
            icon={<Sparkles size={30} strokeWidth={2.25} />}
            title="AI-Automation"
            description="Effektivisera arbetsflöden genom att implementera smarta AI-assistenter och automatiseringar som sparar tid."
            features={[
              "Automatisera repetitiva uppgifter",
              "AI-chattbotar & assistenter",
              "Integration med befintliga system",
              "Skräddarsydda lösningar för din verksamhet"
            ]}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
