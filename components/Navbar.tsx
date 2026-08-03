import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Code2, User, Briefcase, Wrench, Calendar, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Om Mig', href: '#about', icon: User },
  { name: 'Portfolio', href: '#portfolio', icon: Briefcase },
  { name: 'Tjänster', href: '#services', icon: Wrench },
];

// Sections tracked by the scroll-spy — ids must match the sections in App.tsx
const spySectionIds = ['about', 'portfolio', 'services'];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  // Tracks the previous open state so we only restore focus after a real close,
  // never on the initial mount.
  const wasOpen = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view
  useEffect(() => {
    const elements = spySectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll lock, Escape-to-close and Tab-trap for the mobile drawer.
  // The drawer is aria-modal, so keyboard focus must not escape it while open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (e.key !== 'Tab') return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!drawer.contains(active)) {
        // Focus drifted outside the modal (e.g. onto the page behind) — pull it back
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  // Close the drawer when the viewport grows past the `md` breakpoint (e.g. rotating
  // a phone to landscape). Without this the drawer is display:none'd while the body
  // scroll-lock stays on, freezing the page.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Move focus into the drawer on open, and back to the burger button on close
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      burgerRef.current?.focus();
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    requestAnimationFrame(() => {
      const el = href === '#hero' ? null : document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-[background-color,box-shadow,padding,border-color] duration-300 ease-in-out ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-black/5 py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center space-x-2.5 group"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-grad1 via-grad2 to-grad3 text-white shadow-sm transform transition-transform group-hover:scale-110 group-hover:rotate-3">
              <Code2 size={22} strokeWidth={2.25} />
            </div>
            <span className={`font-display font-semibold text-lg tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white lg:text-slate-900'}`}>
              Oscar Johansson
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[15px] font-medium transition-colors relative group ${
                    isActive
                      ? 'text-grad2'
                      : isScrolled
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-white/90 hover:text-white lg:text-slate-600 lg:hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-grad1 to-grad3 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-gradient-to-r from-grad1 via-grad2 to-grad3 text-white px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all hover:shadow-lg hover:shadow-grad2/25 transform hover:-translate-y-0.5"
            >
              Boka samtal
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              ref={burgerRef}
              onClick={toggleMenu}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus:outline-none ${
                isScrolled ? 'border-black/10 text-slate-900' : 'border-white/25 text-white'
              }`}
              aria-label={isOpen ? 'Stäng meny' : 'Öppna meny'}
              aria-expanded={isOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer + scrim — portalled to <body> so they escape the nav's stacking/clip context */}
      {mounted &&
        createPortal(
          <>
            {/* Scrim */}
            <div
              className={`md:hidden fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <aside
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobilmeny"
              // Keeps the off-screen drawer out of the tab order and the a11y tree
              inert={!isOpen}
              className={`md:hidden fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-black/5 px-5 py-5">
                <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gradient">
                  Meny
                </span>
                <button
                  ref={closeRef}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-slate-700 focus:outline-none"
                  aria-label="Stäng meny"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-3 py-5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeId === link.href.replace('#', '');
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 font-display text-base font-medium transition-colors duration-200 ${
                        isActive ? 'bg-grad2/10 text-grad2' : 'text-slate-700 active:bg-black/5'
                      }`}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="space-y-3 border-t border-black/5 px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center gap-2 w-full min-h-[44px] bg-gradient-to-r from-grad1 via-grad2 to-grad3 text-white px-6 py-3.5 rounded-2xl font-display font-semibold text-base shadow-lg active:scale-[0.98] transition-transform duration-200"
                >
                  <Calendar size={18} className="flex-shrink-0" />
                  <span>Boka ett samtal</span>
                </a>
                <a
                  href="mailto:info@oscarjohansson.eu"
                  className="flex items-center justify-center gap-2 w-full min-h-[44px] border border-black/10 text-slate-700 px-6 py-3.5 rounded-2xl font-display font-medium text-sm active:bg-black/5 transition-colors duration-200"
                >
                  <Mail size={16} className="flex-shrink-0" />
                  <span>info@oscarjohansson.eu</span>
                </a>
              </div>
            </aside>
          </>,
          document.body
        )}
    </nav>
  );
};

export default Navbar;
