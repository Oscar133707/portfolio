import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageItem {
  src: string;
  alt: string;
  label: string;
}

interface TaekwondoCarouselProps {
  images: ImageItem[];
}

const TaekwondoCarousel: React.FC<TaekwondoCarouselProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
      duration: 20,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [showArrows, setShowArrows] = useState(true);

  // Update selected index when carousel changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handle autoplay pause/resume
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    if (isAutoplayPaused) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  }, [emblaApi, isAutoplayPaused]);

  // Resume autoplay after 10 seconds of inactivity
  useEffect(() => {
    if (!isAutoplayPaused) return;

    const timer = setTimeout(() => {
      setIsAutoplayPaused(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [isAutoplayPaused]);

  // Hide arrows after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrows(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Navigation functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setIsAutoplayPaused(true);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setIsAutoplayPaused(true);
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setIsAutoplayPaused(true);
      }
    },
    [emblaApi]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        scrollNext();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsAutoplayPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  // Handle touch/swipe interactions
  const handleInteraction = useCallback(() => {
    setIsAutoplayPaused(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('pointerDown', handleInteraction);
    emblaApi.on('touchStart', handleInteraction);

    return () => {
      emblaApi.off('pointerDown', handleInteraction);
      emblaApi.off('touchStart', handleInteraction);
    };
  }, [emblaApi, handleInteraction]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="block md:hidden w-full"
      role="region"
      aria-label="Taekwon-do competition photos carousel"
      aria-live="polite"
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 relative"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                {/* Image Label */}
                {image.label && (
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="inline-block bg-black/60 backdrop-blur-sm text-white font-medium text-sm px-3 py-1.5 rounded-tr-lg">
                      {image.label}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Show initially, fade after 3 seconds */}
        {showArrows && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4 text-base font-medium text-slate-700">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default TaekwondoCarousel;

