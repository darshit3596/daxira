import React from 'react';
import { motion } from 'motion/react';
import { VALUE_PILLARS } from '../data/content.ts';

export const EthosSection: React.FC = () => {
  return (
    <section id="ethos" className="border-b border-[#e2e4ea] py-20 bg-[#faf9fd] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#4f47e6] font-semibold block mb-3">
                Why Work With Us
              </span>
              <h2 className="font-heading font-extrabold text-[32px] md:text-[38px] leading-tight text-[#191a20]">
                Honest work, direct communication, and no middlemen.
              </h2>
            </div>
            <div className="pt-8 text-[14.5px] text-[#4a4d57] leading-relaxed hidden lg:block">
              Many agencies charge high fees and pass your project to juniors. With us, you get direct access to the developer who builds your site, clear fixed pricing, and reliable support.
            </div>
          </motion.div>

          {/* Right Pillar Rail */}
          <div className="lg:col-span-7 border-t border-[#e2e4ea]">
            {VALUE_PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                id={`ethosPillar${pillar.number}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ x: 4 }}
                className="py-6 border-b border-[#e2e4ea] flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 group hover:bg-[#efedf1]/50 transition-all duration-200 px-3 -mx-3 rounded-md"
              >
                <span className="text-[14px] font-mono text-[#4f47e6] font-bold shrink-0">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-[18px] text-[#191a20] mb-1.5 group-hover:text-[#3527ce] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[14.5px] text-[#4a4d57] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
