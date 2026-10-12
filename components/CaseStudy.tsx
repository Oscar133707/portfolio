import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import Reveal from './Reveal';
import BrowserFrame from './BrowserFrame';

interface CaseResult {
  value: string;
  label: string;
}

// Verified proof points for 95 Garage — do not add numbers that aren't confirmed by Oscar
const results: CaseResult[] = [
  { value: '5,0', label: 'i snittbetyg från kunderna' },
  { value: '250+', label: 'nöjda kunder' },
  { value: '48 h', label: 'till första förfrågan efter lansering' },
];

const delivered = ['Bokningsformulär', 'Galleri med före & efter', 'Egna sidor per tjänst', 'Recensioner & FAQ'];

const CaseStudy: React.FC = () => {
  return (
    <Reveal>
      <article className="kort p-3 sm:p-4 lg:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Screenshot + handshake photo */}
          <div className="relative lg:col-span-7">
            <BrowserFrame
              url="95garage.se"
              src="/compressed 2/95garage-skarm.jpg"
              alt="Startsidan på 95garage.se, premium bilrekond i Ljungby"
            />
            <figure className="hidden sm:block absolute -bottom-6 -right-3 lg:-right-6 w-32 lg:w-36 rotate-[3deg] rounded-2xl border border-linje bg-yta p-1.5 shadow-svavande">
              <img
                src="/compressed 2/95garage-handslag.jpg"
                alt="Handslag med 95 Garage"
                className="aspect-[3/4] w-full rounded-xl object-cover"
                loading="lazy"
              />
            </figure>
          </div>

          {/* Story + results */}
          <div className="lg:col-span-5 px-3 pb-4 sm:px-4 lg:px-0 lg:pr-4 lg:py-4">
            <h3 className="font-display text-3xl md:text-4xl font-medium text-fg">95 Garage</h3>
            <p className="mt-1 text-sm font-medium text-guld">Bilrekond &amp; detailing i Ljungby</p>
            <p className="mt-5 text-[15px] md:text-base text-dump leading-[1.7]">
              En webbplats byggd för att göra besökare till bokningar: den lyfter fram kundernas
              omdömen och gör det enkelt att boka. De första förfrågningarna via sajten kom inom
              två dygn efter lansering.
            </p>

            <dl className="mt-7 grid grid-cols-3 gap-2">
              {results.map((r) => (
                <div key={r.value} className="rounded-2xl border border-linje bg-bas/50 px-3 py-4">
                  <dt className="sr-only">{r.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl md:text-[1.75rem] font-medium text-fg tabular-nums leading-none">
                      {r.value}
                    </span>
                    <span className="mt-2 block text-xs text-dump-svag leading-snug">{r.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2">
              {delivered.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5 rounded-full border border-linje px-3 py-1.5 text-[13px] text-dump">
                  <Check size={13} className="text-accent-ljus" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://95garage.se"
              target="_blank"
              rel="noopener noreferrer"
              className="knapp knapp-primar mt-8 w-full sm:w-auto"
            >
              Besök 95garage.se
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

export default CaseStudy;
