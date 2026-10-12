import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import Reveal from './Reveal';
import BrowserFrame from './BrowserFrame';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const host = new URL(project.link).hostname.replace(/^www\./, '');

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="kort kort-interaktiv group flex h-full flex-col p-3"
      >
        <BrowserFrame
          url={host}
          src={project.imageUrl}
          alt={`Startsidan på ${host}`}
          imgClassName="transition-transform duration-700 ease-mjuk group-hover:scale-[1.03]"
        />
        <div className="flex flex-1 items-start justify-between gap-4 px-3 pb-3 pt-6">
          <div>
            <h3 className="font-display text-2xl font-medium text-fg">{project.title}</h3>
            <p className="mt-2 text-[15px] text-dump leading-[1.7]">{project.description}</p>
          </div>
          <span className="kort-pil" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <span className="sr-only">(öppnas i ny flik)</span>
      </a>
    </Reveal>
  );
};

export default ProjectCard;
