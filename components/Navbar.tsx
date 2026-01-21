import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Om Mig', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Tjänster', href: '#services' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Lock/unlock body scroll when menu opens/closes
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(prev => {
      const newState = !prev;
      if (!newState) {
        // Restore body scroll when closing
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
      return newState;
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 overflow-x-hidden ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center space-x-2 group"
          >
            <div className={`p-2 rounded-lg transform transition-transform group-hover:scale-110 ${isScrolled ? 'bg-accent text-white' : 'bg-white text-accent'}`}>
              <Code2 size={24} />
            </div>
            <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              Oscar Johansson
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium transition-colors relative group ${
                  isScrolled 
                    ? 'text-slate-600 hover:text-accent' 
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-accent' : 'bg-white'}`}></span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`${
                isScrolled 
                  ? 'bg-primary text-white hover:bg-accent' 
                  : 'bg-white text-primary hover:bg-blue-50'
              } px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg transform hover:-translate-y-0.5`}
            >
              Boka Samtal
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`focus:outline-none p-2 ${isScrolled ? 'text-slate-900 hover:text-accent' : 'text-white hover:text-blue-200'}`}
              aria-label="Öppna meny"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-white z-[100] flex flex-col"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Header with logo and close button */}
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white z-[101]">
              <a 
                href="#hero" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(e, '#hero');
                }}
                className="flex items-center space-x-2 group"
              >
                <div className="p-2 rounded-lg transform transition-transform group-hover:scale-110 bg-accent text-white">
                  <Code2 size={24} />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  Oscar Johansson
                </span>
              </a>
              <button
                onClick={toggleMenu}
                className="p-2 text-slate-700 hover:text-accent focus:outline-none rounded-lg hover:bg-slate-100 transition-colors z-[102]"
                aria-label="Stäng meny"
              >
                <X size={28} />
              </button>
            </div>
            
            {/* Menu content */}
            <div className="flex-1 flex flex-col justify-center px-6 py-8 space-y-3 overflow-y-auto -mt-16">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-4 py-4 text-xl font-medium text-slate-700 hover:text-accent hover:bg-slate-50 rounded-lg transition-all text-center active:scale-95"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="block w-full text-center mt-4 bg-accent text-white px-6 py-4 rounded-lg font-bold text-lg shadow-lg active:scale-95 transition-transform hover:bg-blue-600"
              >
                Boka ett samtal
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;