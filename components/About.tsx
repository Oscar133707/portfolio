import React from 'react';
import { Trophy } from 'lucide-react';
import Reveal from './Reveal';
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
    <section id="about" className="yta-textur yta-spegel relative py-20 lg:py-28 scroll-mt-24 [overflow:clip] w-full px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Mobile / tablet carousel */}
          <TaekwondoCarousel images={images} />

          {/* Desktop image collage — international shots + one clear SM win */}
          <Reveal className="hidden lg:grid grid-cols-5 gap-3 aspect-[5/4] xl:aspect-[6/5] min-w-0">
            {/* SM 2026 gold — the clear "I won" image */}
            <CollageImage
              className="col-span-3"
              src="/compressed 2/sm2026-guld.jpg"
              alt="Oscar Johansson som Svensk Mästare 2026 med pokal och guldmedaljer"
              label="Svensk Mästare 2026"
              imgClassName="object-top"
              gold
            />

            {/* Right stack — international competitions */}
            <div className="col-span-2 grid grid-rows-2 gap-3 min-h-0">
              {/* Crop anchored below centre — the source has ~13% ceiling on top,
                  so object-top framed the roof instead of the two subjects. */}
              <CollageImage
                src="/compressed 2/em-slovenien-2026.jpg"
                alt="EM Slovenien 2026, Oscar Johansson med tränare"
                label="EM Slovenien 2026"
                imgClassName="object-[50%_55%]"
              />
              <CollageImage
                src="/compressed 2/IMG_3531.jpg"
                alt="VM Kroatien 2025, Oscar Johansson i tävling"
                label="VM Kroatien 2025"
              />
            </div>
          </Reveal>

          {/* Text content */}
          <div className="flex flex-col justify-center min-w-0">
            <Reveal as="h2" className="font-display font-medium text-[2.5rem] leading-[1.05] md:text-6xl text-fg mb-6">
              Om mig
            </Reveal>

            <Reveal delay={0.08} className="space-y-5 text-base md:text-lg text-dump leading-[1.7]">
              <p>
                Jag heter Oscar Johansson. Jag är landslagstävlande i Taekwon-do och regerande
                svensk mästare, och samtidigt passionerad webbutvecklare och AI-specialist.
              </p>

              <p>
                Under sex år på Taekwon-do-mattan har jag lärt mig att excellens kräver disciplin,
                precision och att aldrig ge upp. Dessa värderingar formar också mitt arbete inom
                webbutveckling och AI-automation.
              </p>
            </Reveal>

            {/* Highlighted callout */}
            <Reveal delay={0.16} className="mt-8">
              <div className="kort kort-guld p-6">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-guld/15 text-guld">
                    <Trophy size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-medium text-fg mb-2">
                      Varje projekt finansierar min Taekwon-do-karriär
                    </h3>
                    <p className="text-dump leading-[1.7]">
                      Pengarna jag tjänar går direkt till internationella tävlingar, träningsläger och
                      utrustning på elitnivå. När du arbetar med mig blir du en del av min resa mot
                      VM-medaljer och internationell framgång.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

interface CollageImageProps {
  src: string;
  alt: string;
  label: string;
  className?: string;
  imgClassName?: string;
  gold?: boolean;
}

const CollageImage: React.FC<CollageImageProps> = ({ src, alt, label, className = '', imgClassName = '', gold }) => (
  <div className={`group relative min-h-0 overflow-hidden rounded-2xl border border-linje shadow-upphojd ${className}`}>
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-mjuk group-hover:scale-[1.04] ${imgClassName}`}
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-bas/80 via-bas/10 to-transparent" />
    <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-bas/60 px-3 py-1.5 text-xs font-medium text-fg backdrop-blur-md">
      <span className={`h-1.5 w-1.5 rounded-full ${gold ? 'bg-guld' : 'bg-accent-ljus'}`} />
      {label}
    </span>
  </div>
);

export default About;
