import React from 'react';
import { motion } from 'framer-motion';
import TaekwondoCarousel from './TaekwondoCarousel';

interface ImageItem {
  src: string;
  alt: string;
  label: string;
}

const About: React.FC = () => {
  // Mix of international competition shots + one clear SM 2026 win image
  const images: ImageItem[] = [
    { src: "/compressed 2/sm2026-guld.jpg", alt: "Oscar Johansson som Svensk Mästare 2026 med pokal och guldmedaljer", label: "Svensk Mästare 2026" },
    { src: "/compressed 2/031EAC96-CABA-47BF-B058-6D094FDB808F.jpg", alt: "SM-final 2025, Oscar Johansson slår motståndaren", label: "SM-final 2025" },
    { src: "/compressed 2/IMG_3531.jpg", alt: "VM Kroatien 2025, Oscar Johansson i tävling", label: "VM Kroatien 2025" },
    { src: "/compressed 2/592ab3c0-18ad-4c40-9c6d-abaa3181cca6 2.jpg", alt: "Sveriges landslag, MMC Polen 2023", label: "MMC Polen 2023" },
    { src: "/compressed 2/IMG_3505.jpg", alt: "Irländska mästerskapen 2024, Oscar Johansson", label: "Irländska mästerskapen 2024" },
  ];

  return (
    <section id="about" className="relative py-16 lg:py-24 scroll-mt-24 [overflow:clip] w-full px-5 sm:px-6 lg:px-8">
      <div className="grain-overlay opacity-[0.12]" aria-hidden="true" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Mobile / tablet carousel */}
          <TaekwondoCarousel images={images} />

          {/* Desktop image collage — international shots + one clear SM win */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="hidden lg:grid grid-cols-5 gap-4 aspect-[5/4] xl:aspect-[6/5] min-w-0"
          >
            {/* SM 2026 gold — the clear "I won" image */}
            <div className="col-span-3 relative overflow-hidden rounded-2xl card-soft group min-h-0">
              <img
                src="/compressed 2/sm2026-guld.jpg"
                alt="Oscar Johansson som Svensk Mästare 2026 med pokal och guldmedaljer"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 text-sm font-medium px-4 py-2 rounded-full">Svensk Mästare 2026</span>
              </div>
            </div>

            {/* Right stack — international competitions */}
            <div className="col-span-2 grid grid-rows-2 gap-4 min-h-0">
              {/* Crop anchored below centre — the source has ~13% ceiling on top,
                  so object-top framed the roof instead of the two subjects. */}
              <div className="relative overflow-hidden rounded-2xl card-soft group min-h-0">
                <img
                  src="/compressed 2/em-slovenien-2026.jpg"
                  alt="EM Slovenien 2026, Oscar Johansson med tränare"
                  className="absolute inset-0 w-full h-full object-cover object-[50%_55%] transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-medium px-3 py-1.5 rounded-full">EM Slovenien 2026</span>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl card-soft group min-h-0">
                <img
                  src="/compressed 2/IMG_3531.jpg"
                  alt="VM Kroatien 2025, Oscar Johansson i tävling"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-medium px-3 py-1.5 rounded-full">VM Kroatien 2025</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col justify-center lg:pt-2 min-w-0"
          >
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-slate-900 mb-5 tracking-tight">
              Om mig
            </h2>

            <div className="space-y-5 text-base md:text-lg text-slate-700 leading-[1.7]">
              <p>
                Jag heter Oscar Johansson. Jag är landslagstävlande i Taekwon-do och regerande
                svensk mästare, och samtidigt passionerad webbutvecklare och AI-specialist.
              </p>

              <p>
                Under sex år på Taekwon-do-mattan har jag lärt mig att excellens kräver disciplin,
                precision och att aldrig ge upp. Dessa värderingar formar också mitt arbete inom
                webbutveckling och AI-automation.
              </p>

              {/* Highlighted callout */}
              <div className="mt-6 rounded-2xl p-[1.5px] bg-gradient-to-br from-grad1/50 via-grad2/40 to-grad3/50">
                <div className="rounded-2xl bg-white/90 backdrop-blur p-5">
                  <h3 className="font-display text-lg md:text-xl font-semibold text-slate-900 mb-3">
                    Varje projekt finansierar min Taekwon-do-karriär
                  </h3>
                  <p className="text-slate-700 leading-[1.7]">
                    Pengarna jag tjänar går direkt till internationella tävlingar, träningsläger och
                    utrustning på elitnivå. När du arbetar med mig blir du en del av min resa mot
                    VM-medaljer och internationell framgång.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
