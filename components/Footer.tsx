import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3 text-lg">Kontakt</h4>
            <a 
              href="mailto:kontakt@oscarjohansson.eu"
              className="text-lg text-blue-400 hover:text-blue-300 transition-colors duration-200 inline-block"
            >
              kontakt@oscarjohansson.eu
            </a>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-white font-semibold mb-3 text-lg">Följ mig</h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a 
                href="https://www.instagram.com/oscar.johansso/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/oscar-johansson-8aa589364/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-500">
            {new Date().getFullYear()} skapad av Oscar Johansson
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;