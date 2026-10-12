import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { useSceneInView } from './useSceneInView';

interface Step {
  title: string;
  text: string;
}

// Plain description of how a project runs — deliberately no promises (response times, fixed prices etc.)
const steps: Step[] = [
  { title: 'Samtal', text: 'Vi pratar om din verksamhet och vad webbplatsen ska åstadkomma.' },
  { title: 'Förslag', text: 'Jag tar fram ett upplägg och ett pris utifrån dina mål.' },
  { title: 'Bygge', text: 'Jag designar och bygger, och du får se arbetet växa fram under tiden.' },
  { title: 'Lansering', text: 'Sidan går live och du får en genomgång av hur allt fungerar.' },
];

const Process: React.FC = () => {
  const [ref, visible] = useSceneInView<HTMLOListElement>(0.3);

  return (
    <section id="process" className="yta-textur relative py-20 md:py-28 scroll-mt-24 [overflow:clip] w-full px-5 sm:px-6 lg:px-8">
      <div className="skiljelinje absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Så går det till"
          lead="Från första samtal till färdig webbplats, i fyra tydliga steg."
        />

        <ol ref={ref} className={`grid grid-cols-1 lg:grid-cols-4 lg:gap-6 ${visible ? 'is-visible' : ''}`}>
          {steps.map((step, i) => {
            const style = { '--i': i } as React.CSSProperties;
            return (
              <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:gap-6 lg:pb-0">
                {/* Connector to the next step: vertical on mobile, horizontal on desktop */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.375rem] top-[3.25rem] bottom-2 w-[2px] -translate-x-1/2 overflow-hidden rounded-full bg-linje lg:left-[3.25rem] lg:-right-4 lg:top-[1.375rem] lg:bottom-auto lg:h-[2px] lg:w-auto lg:translate-x-0 lg:-translate-y-1/2"
                  >
                    <span className="tl-fyll" style={style} />
                  </span>
                )}

                <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-linje bg-yta-hog font-display text-[15px] font-medium text-fg tabular-nums">
                  <span className="tl-glod" style={style} aria-hidden="true" />
                  {i + 1}
                </span>

                <div className="kort flex-1 p-5 md:p-6">
                  <h3 className="font-display text-xl md:text-2xl font-medium text-fg">{step.title}</h3>
                  <p className="mt-2 text-[15px] text-dump leading-[1.7]">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
          <a href="#contact" className="knapp knapp-primar">
            Boka ett samtal
            <ArrowRight className="h-[18px] w-[18px]" />
          </a>
          <p className="text-dump text-[15px]">Första steget är ett samtal om din verksamhet.</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Process;
