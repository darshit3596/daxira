import React from 'react';
import { Phone, MapPin, Globe, Sparkles, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { DaxiraMark } from './DaxiraBrand.tsx';

export const AboutFounder: React.FC = () => {
  return (
    <section id="about" className="border-b border-[#e2e4ea] py-20 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Founder Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5"
          >
            <div
              id="founderCard"
              className="rounded-lg border border-[#e2e4ea] bg-[#faf9fd] p-8 space-y-6 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-md bg-white border border-[#e2e4ea] flex items-center justify-center p-2 shadow-xs group-hover:border-[#4f47e6] transition-colors">
                  <DaxiraMark size={36} glow />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[18px] text-[#191a20]">Darshit Sapariya</h3>
                  <p className="text-[12.5px] font-mono text-[#777587]">Founder &amp; Web Developer</p>
                </div>
              </div>

              <div className="space-y-2.5 text-[13.5px] font-body text-[#4a4d57] border-y border-[#e2e4ea] py-5">
                <div className="flex items-center justify-between">
                  <span className="text-[#777587] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#4f47e6]" />
                    <span>Location:</span>
                  </span>
                  <span className="text-[#191a20] font-medium">Gujarat, India</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777587] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#4f47e6]" />
                    <span>How We Work:</span>
                  </span>
                  <span className="text-[#191a20] font-medium">Direct 1-on-1 with you</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777587] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#4f47e6]" />
                    <span>Clients Served:</span>
                  </span>
                  <span className="text-[#191a20] font-medium">India &amp; International</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777587] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#4f47e6]" />
                    <span>Specialization:</span>
                  </span>
                  <span className="text-[#4f47e6] font-medium">Websites &amp; Software</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.a
                  id="founderWhatsappBtn"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#e2e4ea] bg-white text-[12.5px] font-medium text-[#191a20] hover:border-[#10b981] hover:text-[#10b981] transition-colors shadow-2xs"
                  href="https://wa.me/919409638264"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Phone className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Chat on WhatsApp</span>
                </motion.a>
                <motion.a
                  id="founderInquiryBtn"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#efedf1] text-[12.5px] font-medium text-[#4a4d57] hover:text-[#191a20] hover:bg-[#e3e2e6] transition-colors"
                  href="#contact"
                >
                  <span>Get a Free Quote &rarr;</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex flex-col gap-5 text-[#4a4d57] text-[15.5px] leading-relaxed"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#4f47e6] font-semibold">
              About the Developer
            </span>
            <h2 className="font-heading font-extrabold text-[28px] sm:text-[34px] leading-tight text-[#191a20]">
              &ldquo;You speak directly with the person who builds your website.&rdquo;
            </h2>
            <p>
              When you hire a traditional agency, you often talk to a salesperson who makes big promises, but your project is handed over to junior staff who don't understand your business.
            </p>
            <p>
              I run Daxira InfoTech differently. When you work with us, you work directly with me. I listen to what your business needs, design the layout, write the code, and ensure it loads fast on every phone.
            </p>
            <p>
              You get an honest price, a clear deadline, and direct access on WhatsApp whenever you need an update or have a question.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
