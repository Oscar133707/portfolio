import React from 'react';
import { Linkedin, Instagram, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bas-djup border-t border-linje text-dump py-14 [overflow-x:clip] w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-accent text-white">
                <Code2 size={20} strokeWidth={2.25} />
              </div>
              <span className="font-display font-medium text-lg text-fg">Oscar Johansson</span>
            </div>
            <p className="text-sm text-dump-svag max-w-xs mx-auto md:mx-0 leading-relaxed">
              Elitidrottare, webbutvecklare &amp; AI-specialist. Bygger digitala lösningar med disciplin och precision.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="text-sm font-medium text-dump-svag mb-3">Kontakt</h4>
            <a
              href="mailto:kontakt@oscarjohansson.eu"
              className="text-base inline-block"
            >
              kontakt@oscarjohansson.eu
            </a>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-medium text-dump-svag mb-3">Följ mig</h4>
            <div className="flex justify-center md:justify-end gap-3">
              <a
                href="https://www.instagram.com/oscar.johansso/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-linje text-dump hover:border-accent hover:bg-accent hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/oscar-johansson-8aa589364/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-linje text-dump hover:border-accent hover:bg-accent hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-linje pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-dump-svag">
            © {new Date().getFullYear()} Oscar Johansson
          </p>
          <p className="text-xs text-dump-svag">Byggd med React · TypeScript · Tailwind</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
