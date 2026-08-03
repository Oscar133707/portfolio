import React from 'react';
import { Linkedin, Instagram, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400 py-14 [overflow-x:clip] w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-grad1 via-grad2 to-grad3 text-white">
                <Code2 size={20} strokeWidth={2.25} />
              </div>
              <span className="font-display font-semibold text-lg text-white">Oscar Johansson</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs mx-auto md:mx-0 leading-relaxed">
              Elitidrottare, webbutvecklare &amp; AI-specialist. Bygger digitala lösningar med disciplin och precision.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="font-mono text-xs tracking-widest text-slate-500 mb-3">KONTAKT</h4>
            <a
              href="mailto:kontakt@oscarjohansson.eu"
              className="text-base text-blue-400 hover:text-grad3 transition-colors duration-200 inline-block"
            >
              kontakt@oscarjohansson.eu
            </a>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h4 className="font-mono text-xs tracking-widest text-slate-500 mb-3">FÖLJ MIG</h4>
            <div className="flex justify-center md:justify-end gap-3">
              <a
                href="https://www.instagram.com/oscar.johansso/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 hover:border-transparent hover:bg-gradient-to-br hover:from-grad1 hover:via-grad2 hover:to-grad3 hover:text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-grad2 focus-visible:outline-offset-2"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/oscar-johansson-8aa589364/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 hover:border-transparent hover:bg-gradient-to-br hover:from-grad1 hover:via-grad2 hover:to-grad3 hover:text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-grad2 focus-visible:outline-offset-2"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Oscar Johansson
          </p>
          <p className="font-mono text-xs text-slate-600">Byggd med React · TypeScript · Tailwind</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
