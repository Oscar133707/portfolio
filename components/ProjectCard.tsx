import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full active:translate-y-[-2px] active:shadow-xl transition-transform duration-300"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
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
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-accent transition-colors">
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
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;