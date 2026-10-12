import React from 'react';
import ProjectCard from './ProjectCard';
import CaseStudy from './CaseStudy';
import SectionHeading from './SectionHeading';
import { Project } from '../types';

// 95 Garage is presented as the case study above the grid
const projects: Project[] = [
  {
    id: 3,
    title: "Mindsport",
    description: "Webbplats för Mindsport AB med modern design och responsivt gränssnitt. Visar företagets tjänster och värderingar på ett professionellt sätt.",
    imageUrl: "/compressed 2/mindsport-skarm.jpg",
    link: "https://mindsport.se",
    category: "Webb"
  },
  {
    id: 2,
    title: "Josco Travel & Tours",
    description: "Resebyrå specialiserad på resor till södra Afrika. Visar aktuella resor, föreningsresor och recensioner med fokus på användarupplevelse.",
    imageUrl: "/compressed 2/josco-skarm.jpg",
    link: "https://www.joscotours.se/",
    category: "Webb"
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="yta-textur relative py-20 md:py-28 scroll-mt-24 [overflow:clip] w-full px-5 sm:px-6 lg:px-8">
      <div className="skiljelinje absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Utvalda Projekt"
          lead="Ett urval av projekt där jag hjälpt företag att synas bättre och sälja mer online."
        />

        <CaseStudy />

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
