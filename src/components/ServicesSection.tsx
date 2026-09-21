import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/content.ts';
import { DaxiraIcon, DaxiraIconVariant } from './DaxiraBrand.tsx';

interface ServicesSectionProps {
  onSelectScope: (scopeValue: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectScope }) => {
  const getServiceVariant = (id: string): DaxiraIconVariant => {
    if (id === 'fullstack-saas') return 'saas';
    if (id === 'commercial-web') return 'web';
    if (id === 'ecommerce-payments') return 'ecommerce';
    if (id === 'optimization-sla') return 'optimization';
    return 'default';
  };

  const handleCommissionClick = (e: React.MouseEvent, scopeId: string) => {
    e.preventDefault();
    let formScopeVal = 'commercial_web';
    if (scopeId === 'fullstack-saas') formScopeVal = 'custom_app';
    if (scopeId === 'commercial-web') formScopeVal = 'commercial_web';
    if (scopeId === 'ecommerce-payments') formScopeVal = 'ecommerce';
    if (scopeId === 'optimization-sla') formScopeVal = 'maintenance';

    onSelectScope(formScopeVal);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="border-b border-[#e2e4ea] py-20 bg-[#faf9fd] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
        >
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#4f47e6] font-semibold block mb-2">
              What We Do
            </span>
            <h2 className="font-heading font-extrabold text-[32px] md:text-[40px] text-[#191a20] tracking-tight">
              Services &amp; What You Get
            </h2>
          </div>
          <p className="text-[14.5px] text-[#4a4d57] max-w-md">
            Clear, reliable web development services tailored to help your business look professional and gain new customers.
          </p>
        </motion.div>

        {/* Ledger Rows */}
        <div className="divide-y divide-[#e2e4ea] border-y border-[#e2e4ea] bg-white rounded-lg shadow-xs overflow-hidden">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              id={`serviceRow-${service.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="p-6 md:p-8 hover:bg-[#faf9fd] transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
            >
              <div className="lg:col-span-5 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#faf9fd] border border-[#e2e4ea] shadow-xs shrink-0 group-hover:border-[#4f47e6]/40 transition-colors group-hover:scale-105 duration-200">
                  <DaxiraIcon variant={getServiceVariant(service.id)} size={28} />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#4f47e6] font-semibold block mb-1">
                    {service.number} / {service.category}
                  </span>
                  <h3 className="font-heading font-bold text-[20px] text-[#191a20] group-hover:text-[#3527ce] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[13.5px] text-[#777587] mt-1.5 leading-normal">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 text-[14px] text-[#4a4d57] space-y-2">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
                <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[11px] text-[#777587]">
                  {service.tech.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-[#efedf1] text-[#191a20] transition-colors hover:bg-[#e2e0e8]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 flex lg:justify-end items-center">
                <motion.button
                  whileHover={{ scale: 1.03, x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => handleCommissionClick(e, service.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#e2e4ea] hover:border-[#4f47e6] text-[#191a20] text-[13px] font-semibold bg-white hover:bg-[#faf9fd] transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#4f47e6]" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
