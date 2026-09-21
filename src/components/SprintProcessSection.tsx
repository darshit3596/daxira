import React from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  Paintbrush,
  Code2,
  ShieldCheck,
  Rocket,
  FileText,
  Image as ImageIcon,
  Monitor,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SPRINT_STAGES } from '../data/content.ts';

export const SprintProcessSection: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'chat':
        return <MessageSquare className="w-6 h-6 text-[#4f47e6]" />;
      case 'design':
        return <Paintbrush className="w-6 h-6 text-[#4f47e6]" />;
      case 'code':
        return <Code2 className="w-6 h-6 text-[#4f47e6]" />;
      case 'test':
        return <ShieldCheck className="w-6 h-6 text-[#4f47e6]" />;
      case 'launch':
        return <Rocket className="w-6 h-6 text-[#4f47e6]" />;
      default:
        return <Code2 className="w-6 h-6 text-[#4f47e6]" />;
    }
  };

  const getResultIcon = (iconName: string) => {
    switch (iconName) {
      case 'chat':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#4f47e6] text-white flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
        );
      case 'design':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#eef2ff] border border-[#c7d2fe] text-[#4f47e6] flex items-center justify-center shrink-0">
            <ImageIcon className="w-4 h-4" />
          </div>
        );
      case 'code':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#eef2ff] border border-[#c7d2fe] text-[#4f47e6] flex items-center justify-center shrink-0">
            <Monitor className="w-4 h-4" />
          </div>
        );
      case 'test':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#eef2ff] border border-[#c7d2fe] text-[#4f47e6] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'launch':
        return (
          <div className="w-8 h-8 rounded-lg bg-[#eef2ff] border border-[#c7d2fe] text-[#4f47e6] flex items-center justify-center shrink-0">
            <Rocket className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-[#4f47e6] text-white flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#faf9fd] border-b border-[#e2e4ea] relative overflow-hidden">
      {/* Top Left Annotation */}
      <div className="hidden xl:flex items-center gap-2.5 absolute left-8 top-12 text-[#4f47e6] select-none">
        <span className="w-7 h-[2px] bg-[#4f47e6] inline-block"></span>
        <div className="leading-tight">
          <span className="block text-[#191a20] font-bold text-[10.5px] tracking-wider uppercase font-mono">HOW WE WORK</span>
          <span className="block text-[#777587] text-[9px] tracking-widest font-mono uppercase">SIMPLE. CLEAR. RELIABLE.</span>
        </div>
      </div>

      {/* Top Right Handwritten Script & Arrow */}
      <div className="hidden xl:block absolute right-12 top-10 text-[#4f47e6] select-none">
        <div className="font-handwriting text-[24px] text-[#4f47e6] leading-tight rotate-[-6deg]">
          From idea<br />to launch
        </div>
        <svg
          className="w-12 h-14 text-[#818cf8] -ml-3 mt-1"
          viewBox="0 0 50 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 36,4 C 42,20 38,38 12,48" />
          <path d="M 12,48 L 22,46" />
          <path d="M 12,48 L 18,38" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="text-[11.5px] font-mono uppercase tracking-[0.2em] text-[#4f47e6] font-semibold block mb-3">
            OUR WORK PROCESS
          </span>
          <h2 className="font-heading font-extrabold text-[34px] sm:text-[42px] lg:text-[46px] text-[#191a20] tracking-tight">
            Our Simple <span className="text-[#4f47e6]">5-Step</span> Process
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#4a4d57] mt-3.5 leading-relaxed">
            A clear and simple process from start to finish. No confusion. No hidden steps.
            <br className="hidden sm:inline" />
            {' '}Just a smooth journey to your new website.
          </p>
        </motion.div>

        {/* 5-Step Stepper Layout */}
        <div className="relative">
          {/* Continuous Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-[#e2e4ea] z-0" />

          {/* Connected Small Intermediate Dots */}
          <div className="hidden lg:block absolute top-[41px] left-[27.5%] w-2 h-2 rounded-full bg-[#4f47e6] z-0 shadow-xs" />
          <div className="hidden lg:block absolute top-[41px] left-[47.5%] w-2 h-2 rounded-full bg-[#4f47e6] z-0 shadow-xs" />
          <div className="hidden lg:block absolute top-[41px] left-[67.5%] w-2 h-2 rounded-full bg-[#4f47e6] z-0 shadow-xs" />
          <div className="hidden lg:block absolute top-[41px] left-[87.5%] w-2 h-2 rounded-full bg-[#4f47e6] z-0 shadow-xs" />

          {/* Grid of Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-5 relative z-10">
            {SPRINT_STAGES.map((stage, index) => (
              <motion.div
                key={stage.number}
                id={`stepCard-${stage.number}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular Icon with Layered Outer/Inner Halos */}
                <div className="relative mb-5">
                  <div className="w-[88px] h-[88px] rounded-full bg-white flex items-center justify-center shadow-xs border border-[#e2e4ea] transition-transform duration-300 group-hover:scale-105">
                    <div className="w-[62px] h-[62px] rounded-full bg-[#eef2ff] flex items-center justify-center transition-colors group-hover:bg-[#e0e7ff]">
                      {getStepIcon(stage.icon)}
                    </div>
                  </div>
                </div>

                {/* Step Number */}
                <span className="font-heading font-extrabold text-[28px] text-[#191a20] leading-none">
                  {stage.number}
                </span>

                {/* Step Title */}
                <h3 className="font-heading font-bold text-[18px] text-[#191a20] mt-3.5 group-hover:text-[#4f47e6] transition-colors">
                  {stage.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-[#4a4d57] mt-2 leading-relaxed min-h-[64px]">
                  {stage.description}
                </p>

                {/* Result Card at Bottom */}
                <div className="w-full mt-6 p-3 rounded-xl bg-white border border-[#e2e4ea] shadow-2xs flex items-center gap-3 text-left transition-all duration-200 group-hover:border-[#4f47e6] group-hover:shadow-xs">
                  {getResultIcon(stage.icon)}
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-[#4f47e6] block leading-tight">
                      Result:
                    </span>
                    <span className="text-[12.5px] font-bold text-[#191a20] block truncate">
                      {stage.deliverable}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center CTA Button and Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 sm:mt-16 text-center relative z-10"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4f47e6] hover:bg-[#3730a3] text-white font-heading font-semibold text-[14.5px] shadow-xs hover:shadow transition-all duration-150 cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <div className="flex items-center justify-center gap-2 mt-4 text-[12.5px] text-[#777587]">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
            <span>Regular progress updates and live preview links provided at every step.</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Left Script Annotation & Arrow */}
      <div className="hidden xl:block absolute left-8 bottom-6 text-[#4f47e6] select-none">
        <div className="font-handwriting text-[23px] text-[#4f47e6] leading-tight rotate-[-7deg]">
          Let&apos;s build<br />something great together
        </div>
        <svg
          className="w-14 h-12 text-[#818cf8] ml-28 -mt-3"
          viewBox="0 0 60 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 6,32 C 24,34 40,24 50,8" />
          <path d="M 50,8 L 38,10" />
          <path d="M 50,8 L 48,20" />
        </svg>
      </div>

      {/* Bottom Right Annotation */}
      <div className="hidden xl:flex items-center gap-2.5 absolute right-8 bottom-10 text-[#4f47e6] select-none">
        <span className="w-7 h-[2px] bg-[#4f47e6] inline-block"></span>
        <div className="leading-tight text-right">
          <span className="block text-[#191a20] font-bold text-[10.5px] tracking-wider uppercase font-mono">YOUR SUCCESS</span>
          <span className="block text-[#777587] text-[9px] tracking-widest font-mono uppercase">IS OUR GOAL</span>
        </div>
      </div>
    </section>
  );
};

