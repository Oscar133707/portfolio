import React from 'react';
import { Monitor, Sparkles, Check, ArrowUpRight, Mail, Send, MousePointer2, LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { useSceneInView } from './useSceneInView';

// Stagger index for the CSS micro-scenes (read as var(--i) in index.css)
const stagger = (i: number) => ({ '--i': i } as React.CSSProperties);

/* ---- Micro-scene: a site building itself, then going live --------------- */

const WebScene: React.FC = () => {
  const [ref, visible] = useSceneInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative h-[252px] overflow-hidden rounded-2xl border border-linje bg-bas-djup ${visible ? 'is-visible' : ''}`}
    >
      <div className="fonster-list">
        <span className="fonster-prick" />
        <span className="fonster-prick" />
        <span className="fonster-prick" />
        <span className="ml-2 flex-1 rounded-full bg-bas/70 px-3 py-0.5 text-center text-[11px] text-dump-svag">dittforetag.se</span>
        <span className="w-10" />
      </div>

      <div className="relative p-5">
        <div className="flex items-center justify-between">
          <span className="bygg-block h-2.5 w-16 rounded-full bg-fg/30" style={stagger(0)} />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <span key={i} className="bygg-block h-2 w-8 rounded-full bg-fg/10" style={stagger(i)} />
            ))}
          </div>
        </div>

        <span className="bygg-block mt-5 block h-3.5 w-3/4 rounded-md bg-fg/25" style={stagger(4)} />
        <span className="bygg-block mt-2 block h-3.5 w-1/2 rounded-md bg-fg/25" style={stagger(5)} />
        <span className="bygg-block mt-3 block h-2 w-2/3 rounded-full bg-fg/10" style={stagger(6)} />
        <span className="bygg-block mt-4 block h-7 w-24 rounded-full bg-accent" style={stagger(7)} />

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[8, 9, 10].map((i) => (
            <span key={i} className="bygg-block h-9 rounded-lg border border-linje bg-yta-hog" style={stagger(i)} />
          ))}
        </div>

        <span className="bygg-svep" />

        {/* Cursor glides to the CTA and "clicks" it */}
        <MousePointer2
          className="bygg-markor absolute left-[160px] top-[70px] h-4 w-4 fill-fg text-fg"
          style={{ '--mx': '-90px', '--my': '68px' } as React.CSSProperties}
        />

        {/* "Published" toast — outer span positions, inner span animates (keeps transforms apart) */}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <span className="bygg-live inline-flex items-center gap-1.5 rounded-full border border-guld/30 bg-bas/90 px-3 py-1.5 text-[11px] font-semibold text-guld shadow-svavande backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-guld" />
            Publicerad
          </span>
        </span>
      </div>
    </div>
  );
};

/* ---- Micro-scene: an enquiry flowing through an AI step ----------------- */

interface FlowNodeProps {
  icon: LucideIcon;
  label: string;
  center?: boolean;
}

const FlowNode: React.FC<FlowNodeProps> = ({ icon: Icon, label, center }) => (
  <div className="flex flex-col items-center gap-2">
    <span
      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${
        center ? 'bg-accent text-white shadow-[0_0_32px_-6px_rgb(61_91_240/0.9)]' : 'border border-linje bg-yta-hog text-dump'
      }`}
    >
      {center && (
        <>
          <span className="puls-ring" style={stagger(0)} />
          <span className="puls-ring" style={stagger(1)} />
        </>
      )}
      <Icon size={20} />
    </span>
    <span className="text-[11px] font-medium text-dump-svag">{label}</span>
  </div>
);

const logRows = ['Förfrågan sorterad som offert', 'Personligt svar skickat', 'Kontakten sparad i kundregistret'];

const AiScene: React.FC = () => {
  const [ref, visible] = useSceneInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative h-[252px] overflow-hidden rounded-2xl border border-linje bg-bas-djup px-5 py-6 ${visible ? 'is-visible' : ''}`}
    >
      <div className="flex items-start gap-3">
        <FlowNode icon={Mail} label="Förfrågan" />
        <div className="flode-spar mt-6"><span className="flode-paket" style={stagger(0)} /></div>
        <FlowNode icon={Sparkles} label="AI" center />
        <div className="flode-spar mt-6"><span className="flode-paket" style={stagger(1)} /></div>
        <FlowNode icon={Send} label="Svar" />
      </div>

      <ul className="mt-6 space-y-2">
        {logRows.map((row, i) => (
          <li
            key={row}
            className="logg-rad flex items-center gap-2.5 rounded-xl border border-linje bg-yta/70 px-3 py-2 text-[13px] text-dump"
            style={stagger(i)}
          >
            <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-guld/15 text-guld">
              <Check size={10} strokeWidth={3.5} />
            </span>
            {row}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---- Service card -------------------------------------------------------- */

interface ServiceCardProps {
  index: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  scene: React.ReactNode;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ index, title, description, features, icon: Icon, scene, delay }) => {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="kort kort-interaktiv flex h-full flex-col p-3 sm:p-4">
        {scene}

        <div className="flex flex-1 flex-col px-2 pb-2 pt-7 sm:px-4 sm:pb-3">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-ljus">
              <Icon size={22} />
            </span>
            <span className="text-sm text-dump-svag tabular-nums">{index}</span>
          </div>

          <h3 className="mt-5 font-display text-3xl font-medium text-fg">{title}</h3>
          <p className="mt-3 text-base md:text-lg text-dump leading-[1.7]">{description}</p>

          <ul className="mt-6 mb-8 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-ljus">
                  <Check size={11} strokeWidth={3.5} />
                </span>
                <span className="text-[15px] text-dump leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-auto flex items-center justify-between gap-3 border-t border-linje pt-5 font-medium text-fg"
          >
            Diskutera ditt projekt
            <span className="kort-pil">
              <ArrowUpRight size={18} />
            </span>
          </a>
        </div>
      </article>
    </Reveal>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="yta-textur yta-spegel relative py-20 md:py-28 scroll-mt-24 [overflow:clip] w-full px-5 sm:px-6 lg:px-8">
      <div className="skiljelinje absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Tjänster"
          lead="Helhetslösningar inom digital utveckling. Jag kombinerar teknisk expertis med affärsförståelse för att skapa värde."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <ServiceCard
            index="01"
            icon={Monitor}
            scene={<WebScene />}
            title="Webbutveckling"
            description="Responsiva, snabba och användarvänliga hemsidor byggda med modern teknik som React och Tailwind CSS."
            features={[
              "Responsiv design för alla enheter",
              "Snabb laddningstid & SEO-optimering",
              "Modern tech stack (React, TypeScript, Next.js)",
              "Underhållbar och skalbar kod"
            ]}
            delay={0}
          />

          <ServiceCard
            index="02"
            icon={Sparkles}
            scene={<AiScene />}
            title="AI-Automation"
            description="Effektivisera arbetsflöden genom att implementera smarta AI-assistenter och automatiseringar som sparar tid."
            features={[
              "Automatisera repetitiva uppgifter",
              "AI-chattbotar & assistenter",
              "Integration med befintliga system",
              "Skräddarsydda lösningar för din verksamhet"
            ]}
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
