import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DaxiraLogo } from './DaxiraBrand.tsx';

interface HeaderProps {
  onSelectScope?: (scope: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectScope }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="topNav"
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-[#e2e4ea] shadow-sm py-0.5'
          : 'bg-white/80 backdrop-blur-xs border-transparent shadow-none'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Wordmark & Location Beacon */}
        <a
          href="/"
          id="brandLogo"
          aria-label="Daxira InfoTech — Home"
          className="flex items-center gap-3.5 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <DaxiraLogo markSize={32} subtitle={false} />
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-widest text-[#777587] border-l border-[#e2e4ea] pl-3 transition-colors group-hover:text-[#4f47e6]">
            Studio • GJ, IN
          </span>
        </a>

        {/* Minimal Editorial Nav Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-[#4a4d57]">
          {[
            { href: '#services', label: 'Services' },
            { href: '#work', label: 'Our Work' },
            { href: '#ethos', label: 'Why Us' },
            { href: '#process', label: 'How We Work' },
            { href: '#pricing', label: 'Pricing' },
            { href: '#faq', label: 'FAQ' },
          ].map((item) => (
            <a
              key={item.href}
              className="relative py-1 hover:text-[#191a20] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#4f47e6] hover:after:w-full after:transition-all after:duration-200"
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Direct Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <motion.a
            id="headerWhatsappLink"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-[#4a4d57] hover:text-[#191a20] hover:bg-[#efedf1] transition-colors"
            href="https://wa.me/919409638264"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>WhatsApp</span>
          </motion.a>
          <motion.a
            id="headerStartProjectBtn"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#4f47e6] hover:bg-[#3527ce] text-white text-[13px] font-semibold tracking-tight shadow-xs hover:shadow-md transition-all duration-200"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Mobile Nav Trigger */}
        <button
          id="navToggleBtn"
          aria-label="Toggle navigation"
          className="md:hidden p-2 text-[#4a4d57] hover:text-[#191a20] rounded-md hover:bg-[#efedf1] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobileNav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-[#e2e4ea] bg-white px-6 py-4 flex flex-col gap-3 font-heading text-[14px] overflow-hidden"
          >
            <a
              className="py-1 text-[#4a4d57] hover:text-[#191a20] transition-colors"
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
            >
              Services
            </a>
            <a
              className="py-1 text-[#4a4d57] hover:text-[#191a20] transition-colors"
              href="#work"
              onClick={(e) => handleNavClick(e, '#work')}
            >
              Our Work
            </a>
            <a
              className="py-1 text-[#4a4d57] hover:text-[#191a20] transition-colors"
              href="#ethos"
              onClick={(e) => handleNavClick(e, '#ethos')}
            >
              Why Us
            </a>
            <a
              className="py-1 text-[#4a4d57] hover:text-[#191a20] transition-colors"
              href="#process"
              onClick={(e) => handleNavClick(e, '#process')}
            >
              How We Work
            </a>
            <a
              className="py-1 text-[#4a4d57] hover:text-[#191a20] transition-colors"
              href="#pricing"
              onClick={(e) => handleNavClick(e, '#pricing')}
            >
              Pricing
            </a>
            <a
              className="py-1 text-[#4a4d57] hover:text-[#191a20] transition-colors"
              href="#faq"
              onClick={(e) => handleNavClick(e, '#faq')}
            >
              FAQ
            </a>

            <div className="pt-3 border-t border-[#e2e4ea] flex flex-col gap-2">
              <a
                className="w-full text-center py-2.5 rounded-md bg-[#4f47e6] text-white font-semibold text-[13px] flex items-center justify-center gap-2"
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                className="w-full text-center py-2.5 rounded-md border border-[#e2e4ea] text-[#191a20] text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-[#faf9fd]"
                href="https://wa.me/919409638264"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
