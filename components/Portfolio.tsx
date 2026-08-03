import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Delita Advise",
    description: "Modern webbplats för Delita Advise, en digital redovisningsbyrå i Malmö. Professionell design med fokus på användarvänlighet och tillgänglighet.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    imageUrl: "/compressed 2/Namnlös design (4).webp",
    link: "https://delita.se",
    category: "Webb"
  },
  {
    id: 2,
    title: "Josco Travel & Tours",
    description: "Resebyrå specialiserad på resor till södra Afrika. Visar aktuella resor, föreningsresor och recensioner med fokus på användarupplevelse.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    imageUrl: "/compressed 2/Namnlös design (2).jpg",
    link: "https://www.joscotours.se/",
    category: "Webb"
  },
  {
    id: 3,
    title: "Mindsport",
    description: "Webbplats för Mindsport AB med modern design och responsivt gränssnitt. Visar företagets tjänster och värderingar på ett professionellt sätt.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    imageUrl: "/compressed 2/Namnlös design (5).webp",
    link: "https://mindsport.se",
    category: "Webb"
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="relative py-20 md:py-28 scroll-mt-24 [overflow:clip] w-full px-5 sm:px-6 lg:px-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mb-14 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-display font-semibold text-4xl md:text-5xl text-slate-900 tracking-tight leading-[1.1]"
          >
            Utvalda Projekt
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="mt-5 text-lg text-slate-600 leading-[1.7]"
          >
            Här är ett urval av projekt där jag kombinerat kod och kreativitet för att lösa verkliga problem.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
