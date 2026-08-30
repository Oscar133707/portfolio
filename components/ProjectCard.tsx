import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={canHover ? { y: -8 } : undefined}
      onMouseEnter={() => { if (canHover) setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full rounded-3xl bg-white border border-black/5 overflow-hidden card-soft transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-grad2 focus-visible:outline-offset-2"
    >
      {/* Gradient top hairline that lights up on hover */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-grad1 via-grad2 to-grad3 transition-opacity duration-300 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={project.imageUrl}
          alt={project.title}
          className={`w-full h-full object-cover transform transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-slate-900/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="flex items-center gap-2 text-white font-medium">
            Besök sida
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className={`font-display text-xl font-semibold mb-2 transition-colors ${isHovered ? 'text-gradient' : 'text-slate-900'}`}>
          {project.title}
        </h3>
        <p className="text-slate-600 mb-5 flex-1 text-[15px] leading-[1.7]">
          {project.description}
        </p>

        <span className="inline-flex items-center gap-2 text-slate-900 font-medium text-sm mt-auto">
          Se projekt
          <ArrowUpRight size={16} className={`transition-transform duration-200 ${isHovered ? 'translate-x-0.5 -translate-y-0.5 text-grad2' : ''}`} />
        </span>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
