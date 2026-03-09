import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

// Only enable hover animations on devices with a real pointer (mouse), not touch screens
const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={supportsHover ? { y: -8 } : undefined}
      transition={{ type: 'spring', stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full active:translate-y-[-2px] active:shadow-xl transition-transform duration-300"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={project.imageUrl}
          alt={project.title}
          className={`w-full h-full object-cover transform transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-slate-900/60 transition-opacity duration-300 flex items-center justify-center gap-4 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-full text-slate-900 hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            title="Besök sida"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className={`text-xl font-bold mb-2 transition-colors ${isHovered ? 'text-accent' : 'text-slate-900'}`}>
          {project.title}
        </h3>
        <p className="text-slate-600 mb-4 flex-1 text-base leading-[1.7]">
          {project.description}
        </p>

        {/* View Project CTA */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent hover:text-blue-600 font-medium text-sm mt-auto transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
        >
          Se projekt
          <ArrowRight size={16} className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
