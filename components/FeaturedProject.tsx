import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Users, Zap } from 'lucide-react';
import { FeaturedCase } from '../types';

interface FeaturedProjectProps {
  project: FeaturedCase;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  // Dynamically tracks whether the device supports true hover (mouse).
  // Listens for changes so DevTools device simulation is respected.
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
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Öppna ${project.title} – ${project.link.replace('https://', '')} – i en ny flik`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={canHover ? { y: -6 } : undefined}
      onMouseEnter={() => { if (canHover) setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group block rounded-3xl p-[1.5px] bg-gradient-to-br from-grad1/40 via-grad2/30 to-grad3/40 transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-grad2 focus-visible:outline-offset-2 ${isHovered ? 'shadow-2xl shadow-grad2/15' : 'card-soft'}`}
    >
      <div className="rounded-[1.4rem] bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        {/* Image panel — object-contain keeps the whole laptop mockup visible,
            mix-blend-multiply melts its white backdrop into the tinted panel */}
        <div className="relative flex items-center bg-gradient-to-br from-slate-100 via-white to-slate-50 p-5 md:p-8">
          <img
            src={project.imageUrl}
            alt={`${project.title} webbplats – ${project.tagline}`}
            loading="lazy"
            className={`w-full h-auto object-contain mix-blend-multiply transform transition-transform duration-500 ${isHovered ? 'scale-[1.03]' : 'scale-100'}`}
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-widest text-slate-400">
              SENASTE PROJEKTET
            </span>
            <span className="bg-gradient-to-r from-grad1 via-grad2 to-grad3 text-white text-[11px] font-medium px-3 py-1 rounded-full">
              NYTT · 2026
            </span>
          </div>

          <h3 className={`font-display text-3xl md:text-4xl font-semibold tracking-tight transition-colors ${isHovered ? 'text-gradient' : 'text-slate-900'}`}>
            {project.title}
          </h3>
          <p className="mt-2 text-lg text-slate-700">
            {project.tagline}
          </p>
          <p className="mt-4 text-[15px] text-slate-600 leading-[1.7]">
            {project.description}
          </p>

          {/* Social proof pills */}
          <div className="flex flex-wrap gap-3 mt-6">
            {project.stats.map((stat, i) => (
              <span
                key={stat.label}
                className="inline-flex items-center gap-2 border border-black/10 bg-slate-50 rounded-full px-4 py-2"
              >
                {i === 0 ? (
                  <Star size={16} className="text-amber-400 fill-current" />
                ) : (
                  <Users size={16} className="text-grad2" />
                )}
                <span className="font-display font-semibold text-slate-900 text-sm">{stat.value}</span>
                <span className="text-xs text-slate-500">{stat.label}</span>
              </span>
            ))}
          </div>

          {/* Result callout — the strongest selling point gets its own box */}
          <div className="mt-5 rounded-2xl bg-gradient-to-r from-grad1/10 via-grad2/10 to-grad3/10 border border-grad2/20 p-4 flex gap-3">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-grad1 via-grad2 to-grad3 text-white flex items-center justify-center">
              <Zap size={16} />
            </span>
            <span className="flex flex-col">
              <span className="font-mono text-[10px] tracking-widest text-grad2 mb-1">RESULTAT</span>
              <span className="text-[14px] text-slate-700 leading-[1.6]">{project.highlight}</span>
            </span>
          </div>

          {/* The whole card is the link — this is the visual affordance, not an <a> */}
          <span className="inline-flex items-center gap-2 self-start mt-7 rounded-full bg-gradient-to-r from-grad1 via-grad2 to-grad3 text-white font-medium px-6 py-3 text-sm shadow-lg shadow-grad2/20">
            Besök {project.link.replace('https://', '')}
            <ArrowUpRight size={16} className={`transition-transform duration-200 ${isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

export default FeaturedProject;
