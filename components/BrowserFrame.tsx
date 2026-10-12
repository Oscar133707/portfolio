import React from 'react';

interface BrowserFrameProps {
  url: string;
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

// Minimal browser window around a site screenshot (keeps screenshots on-brand on the dark base)
const BrowserFrame: React.FC<BrowserFrameProps> = ({ url, src, alt, className = '', imgClassName = '' }) => {
  return (
    <div className={`fonster ${className}`}>
      <div className="fonster-list" aria-hidden="true">
        <span className="fonster-prick" />
        <span className="fonster-prick" />
        <span className="fonster-prick" />
        <span className="ml-2 flex-1 truncate rounded-full bg-bas/70 px-3 py-0.5 text-center text-[11px] text-dump-svag">
          {url}
        </span>
        <span className="w-10" />
      </div>
      <div className="relative aspect-[1290/712] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover object-top ${imgClassName}`}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default BrowserFrame;
