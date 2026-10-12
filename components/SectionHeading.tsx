import React from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  title: string;
  lead?: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, lead, className = '' }) => {
  return (
    <div className={`max-w-2xl mb-12 md:mb-16 ${className}`}>
      <Reveal as="h2" className="font-display font-medium text-[2.5rem] leading-[1.05] md:text-6xl text-fg">
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" delay={0.08} className="mt-5 text-lg text-dump leading-[1.7]">
          {lead}
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
