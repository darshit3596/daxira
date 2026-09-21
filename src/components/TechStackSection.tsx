import React from 'react';
import { motion } from 'motion/react';
import { TECH_STACK } from '../data/content.ts';

export const TechStackSection: React.FC = () => {
  return (
    <section id="stack" className="border-b border-[#e2e4ea] py-20 bg-[#faf9fd] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-4"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#4f47e6] font-semibold block mb-2">
              Tools &amp; Technologies
            </span>
            <h2 className="font-heading font-extrabold text-[32px] md:text-[38px] text-[#191a20] tracking-tight">
              Built with Modern, Reliable Tools
            </h2>
            <p className="text-[14.5px] text-[#4a4d57] mt-4 leading-relaxed">
              We use trusted, industry-standard technologies so your website stays secure, loads fast, and is easy to update as your business grows.
            </p>

            <div className="mt-6 p-4 rounded-md border border-[#e2e4ea] bg-white text-[13px] text-[#4a4d57] shadow-2xs">
              <span className="text-[#10b981] font-bold block mb-1 font-heading">What this means for you:</span>
              Your website opens instantly on phones, keeps customer data protected with free SSL, and runs without annoying bugs or slow load times.
            </div>
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TECH_STACK.map((group, index) => (
              <motion.div
                key={group.category}
                id={`techGroup-${group.category.replace(/\s+/g, '-').toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-lg bg-white border border-[#e2e4ea] hover:border-[#4f47e6] transition-all duration-200 shadow-xs hover:shadow-md"
              >
                <span className="text-[11px] font-mono text-[#4f47e6] uppercase tracking-wider font-semibold block mb-3">
                  {group.number} / {group.category}
                </span>
                <ul className="space-y-3.5 text-[14px] text-[#191a20] font-medium">
                  {group.items.map((item) => (
                    <li key={item.name} className="group cursor-default">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#191a20] group-hover:bg-[#4f47e6] transition-colors" />
                        <span className="group-hover:text-[#4f47e6] transition-colors">{item.name}</span>
                      </div>
                      <p className="text-[12px] text-[#777587] pl-3.5 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
