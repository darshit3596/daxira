import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { DaxiraLogo } from './DaxiraBrand.tsx';

export const Footer: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="mainFooter" className="w-full bg-white border-t border-[#e2e4ea] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-[1280px] mx-auto px-6 py-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-[#e2e4ea]">
          {/* Studio Wordmark & Info */}
          <div className="space-y-3">
            <DaxiraLogo markSize={32} subtitle={false} />
            <p className="text-[13.5px] text-[#777587] max-w-sm">
              Fast, modern websites and custom software for growing businesses. Built by Darshit Sapariya.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[13px] font-mono text-[#4a4d57] pt-1">
              <a
                href="mailto:er.darshitpatel@gmail.com"
                className="hover:text-[#4f47e6] transition-colors"
              >
                er.darshitpatel@gmail.com
              </a>
              <span>&bull;</span>
              <a
                href="https://wa.me/919409638264"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#10b981] transition-colors font-medium text-[#191a20]"
              >
                +91 9409638264
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-[#4a4d57]">
            <a
              className="hover:text-[#191a20] transition-colors hover:-translate-y-0.5"
              href="#services"
              onClick={(e) => handleScrollTo(e, '#services')}
            >
              Services
            </a>
            <a
              className="hover:text-[#191a20] transition-colors hover:-translate-y-0.5"
              href="#work"
              onClick={(e) => handleScrollTo(e, '#work')}
            >
              Our Work
            </a>
            <a
              className="hover:text-[#191a20] transition-colors hover:-translate-y-0.5"
              href="#ethos"
              onClick={(e) => handleScrollTo(e, '#ethos')}
            >
              Why Us
            </a>
            <a
              className="hover:text-[#191a20] transition-colors hover:-translate-y-0.5"
              href="#process"
              onClick={(e) => handleScrollTo(e, '#process')}
            >
              How We Work
            </a>
            <a
              className="hover:text-[#191a20] transition-colors hover:-translate-y-0.5"
              href="#pricing"
              onClick={(e) => handleScrollTo(e, '#pricing')}
            >
              Pricing
            </a>
            <a
              className="hover:text-[#191a20] transition-colors hover:-translate-y-0.5"
              href="#faq"
              onClick={(e) => handleScrollTo(e, '#faq')}
            >
              FAQ
            </a>
            <a
              className="hover:text-[#3527ce] transition-colors text-[#4f47e6] font-semibold hover:-translate-y-0.5"
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
            >
              Get a Quote
            </a>
          </div>
        </div>

        {/* Attribution & Copyright Rail */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] font-mono text-[#777587]">
          <div>
            &copy; 2026 Daxira InfoTech. Founded by Darshit Sapariya. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>Gujarat, India</span>
            <span>&bull;</span>
            <span>Serving clients across India &amp; worldwide</span>
            <span>&bull;</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium text-[#5c5f73] hover:text-[#4f47e6] bg-[#faf9fd] hover:bg-[#eef0ff] border border-[#e6e4f0] rounded-lg transition-all"
              title="Studio Administration Portal"
            >
              <Shield className="w-3 h-3 text-[#4f47e6]" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
