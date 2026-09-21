import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data/content.ts';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="border-b border-[#e2e4ea] py-20 bg-white overflow-hidden">
      <div className="max-w-[900px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center text-center mb-10 gap-2"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#4f47e6] font-semibold">
            Questions &amp; Answers
          </span>
          <h2 className="font-heading font-extrabold text-[32px] md:text-[38px] text-[#191a20] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] text-[#4a4d57]">
            Simple, honest answers to common questions about pricing, timelines, and how we work.
          </p>
        </motion.div>

        {/* Quick Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-8 relative max-w-md mx-auto"
        >
          <Search className="w-4 h-4 text-[#777587] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. cost, timeline, hosting)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-md border border-[#e2e4ea] bg-[#faf9fd] text-[13.5px] text-[#191a20] focus:border-[#4f47e6] focus:bg-white focus:shadow-xs outline-none transition-all duration-200"
          />
        </motion.div>

        {/* Accordion List */}
        <div className="divide-y divide-[#e2e4ea] border-y border-[#e2e4ea]">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="py-5"
                >
                  <button
                    onClick={() => toggleItem(idx)}
                    className="w-full flex items-center justify-between font-heading font-bold text-[16px] text-[#191a20] hover:text-[#4f47e6] transition-colors text-left gap-4 cursor-pointer group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#777587] shrink-0 transition-transform duration-250 ease-out ${
                        isOpen ? 'rotate-180 text-[#4f47e6]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 text-[14.5px] text-[#4a4d57] leading-relaxed pr-6">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="py-8 text-center text-[#777587] text-[13.5px]">
              No questions found matching &ldquo;{searchQuery}&rdquo;. Feel free to message Darshit directly below!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
