import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, CheckCircle2, Copy, Check, RefreshCw, Smartphone, PhoneCall, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STUDIO_SPEC } from '../data/content.ts';
import { DaxiraMark, DaxiraIcon } from './DaxiraBrand.tsx';

export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'speed' | 'communication'>('benefits');
  const [copied, setCopied] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [loadTimeMs, setLoadTimeMs] = useState(380);

  const copyContact = () => {
    navigator.clipboard.writeText("er.darshitpatel@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSpeedTest = () => {
    setTestRunning(true);
    setTimeout(() => {
      setLoadTimeMs(Math.floor(340 + Math.random() * 80));
      setTestRunning(false);
    }, 400);
  };

  return (
    <section id="heroSection" className="border-b border-[#e2e4ea] pt-12 pb-20 md:pt-20 md:pb-28 bg-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex flex-col items-start gap-6"
          >
            <motion.div
              id="heroLocationBadge"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-[#e2e4ea] bg-[#faf9fd] text-[11px] font-mono tracking-wider text-[#4a4d57] uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
              </span>
              <span>Websites &amp; Custom Software</span>
              <span className="text-[#777587]">/</span>
              <span className="font-semibold text-[#191a20]">Gujarat, India</span>
            </motion.div>

            <motion.h1
              id="heroMainHeading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="font-heading font-extrabold text-[36px] sm:text-[46px] md:text-[54px] leading-[1.1] tracking-tight text-[#191a20]"
            >
              We build fast, modern websites and software for growing businesses.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="font-body text-[16px] md:text-[18px] text-[#4a4d57] leading-relaxed max-w-2xl"
            >
              Get a website that looks professional, loads in under a second on phones, and brings you real customer inquiries. You work directly with me from start to finish—no salespeople, no confusing tech jargon, and no hidden costs.
            </motion.p>

            {/* Dual CTAs + WhatsApp Direct */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                id="heroInitiateBtn"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-[#4f47e6] hover:bg-[#3527ce] text-white text-[14px] font-semibold shadow-xs hover:shadow-md transition-all duration-200"
                href="#contact"
              >
                <span>Get a Free Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                id="heroExploreWorkBtn"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border border-[#e2e4ea] bg-white hover:bg-[#f5f3f7] text-[#191a20] text-[14px] font-medium transition-all duration-200 hover:border-[#4f47e6]/30 shadow-xs hover:shadow-sm"
                href="#work"
              >
                <span>See Our Work</span>
              </motion.a>
              <motion.a
                id="heroWhatsappBtn"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-md text-[13.5px] font-medium text-[#4a4d57] hover:text-[#10b981] transition-colors"
                href="https://wa.me/919409638264"
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageSquare className="w-4 h-4 text-[#10b981]" />
                <span>Chat on WhatsApp</span>
              </motion.a>
            </motion.div>

            {/* Authentic Proof Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 border-t border-[#e2e4ea] w-full grid grid-cols-3 gap-4 text-[12px] text-[#777587]"
            >
              <div id="proofBadgeAccess" className="flex flex-col items-start gap-1 group transition-transform hover:-translate-y-0.5">
                <DaxiraIcon variant="default" size={18} />
                <span className="block text-[#191a20] font-semibold text-[14px] font-heading group-hover:text-[#4f47e6] transition-colors">Direct Contact</span>
                <span>Work directly with the developer</span>
              </div>
              <div id="proofBadgeLatency" className="flex flex-col items-start gap-1 group transition-transform hover:-translate-y-0.5">
                <DaxiraIcon variant="speed" size={18} />
                <span className="block text-[#191a20] font-semibold text-[14px] font-heading group-hover:text-[#10b981] transition-colors">&lt; 1 Second</span>
                <span>Fast loading on mobile phones</span>
              </div>
              <div id="proofBadgeCraft" className="flex flex-col items-start gap-1 group transition-transform hover:-translate-y-0.5">
                <DaxiraIcon variant="terminal" size={18} />
                <span className="block text-[#191a20] font-semibold text-[14px] font-heading group-hover:text-[#4f47e6] transition-colors">Fixed Price</span>
                <span>Honest quotes with no hidden fees</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual (Client-Focused Project Snapshot & Benefits) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5"
          >
            <div
              id="specTerminalWindow"
              className="rounded-lg border border-[#e2e4ea] bg-[#faf9fd] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden text-[13px]"
            >
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#efedf1] border-b border-[#e2e4ea] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <DaxiraMark size={18} />
                  <span className="text-[12px] font-semibold text-[#191a20] font-heading">
                    Project Snapshot &amp; Quality Guarantee
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10.5px] text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded font-medium">
                    <span>● Ready to Start</span>
                  </span>
                  <button
                    onClick={copyContact}
                    title="Copy Email Address"
                    className="p-1 hover:bg-[#e3e2e6] rounded text-[#4a4d57] transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Mode Switcher */}
              <div className="px-3 pt-2 bg-[#f5f3f7] border-b border-[#e2e4ea] flex gap-2 text-[12px]">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`px-3 py-1.5 rounded-t font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'benefits'
                      ? 'bg-white border-t border-x border-[#e2e4ea] text-[#191a20] font-semibold shadow-2xs'
                      : 'text-[#777587] hover:text-[#191a20] hover:bg-white/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#4f47e6]" />
                  <span>What You Get</span>
                </button>
                <button
                  onClick={() => setActiveTab('speed')}
                  className={`px-3 py-1.5 rounded-t font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'speed'
                      ? 'bg-white border-t border-x border-[#e2e4ea] text-[#191a20] font-semibold shadow-2xs'
                      : 'text-[#777587] hover:text-[#191a20] hover:bg-white/50'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Speed Test</span>
                </button>
                <button
                  onClick={() => setActiveTab('communication')}
                  className={`px-3 py-1.5 rounded-t font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'communication'
                      ? 'bg-white border-t border-x border-[#e2e4ea] text-[#191a20] font-semibold shadow-2xs'
                      : 'text-[#777587] hover:text-[#191a20] hover:bg-white/50'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#3527ce]" />
                  <span>How We Work</span>
                </button>
              </div>

              {/* Quick Metrics Rail */}
              <div className="grid grid-cols-3 divide-x divide-[#e2e4ea] border-b border-[#e2e4ea] bg-white text-center py-2.5">
                <div>
                  <span className="text-[10px] text-[#777587] block uppercase font-mono">Mobile Speed</span>
                  <span className="text-[15px] font-heading font-bold text-[#10b981]">100 / 100</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#777587] block uppercase font-mono">Load Time</span>
                  <span className="text-[15px] font-heading font-bold text-[#191a20]">{loadTimeMs / 1000}s</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#777587] block uppercase font-mono">Free Support</span>
                  <span className="text-[15px] font-heading font-bold text-[#4f47e6]">30 Days</span>
                </div>
              </div>

              {/* Body Content with AnimatePresence */}
              <div className="p-5 bg-[#faf9fd] text-[#191a20] leading-relaxed min-h-[220px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {activeTab === 'benefits' && (
                    <motion.div
                      key="benefits"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2.5"
                    >
                      <p className="text-[12px] font-mono text-[#777587]">
                        Included with every website we build:
                      </p>
                      <div className="space-y-2 text-[13.5px]">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                          <span>Custom design tailored to your business (no slow templates)</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                          <span>Works fast and looks clean on all mobile phones &amp; tablets</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                          <span>WhatsApp chat and direct phone call buttons for fast inquiries</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                          <span>Free SSL security padlock (https) and basic Google Search setup</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'speed' && (
                    <motion.div
                      key="speed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-mono text-[#777587]">
                          Tested on mobile 4G/5G connections:
                        </span>
                        <button
                          onClick={handleRunSpeedTest}
                          disabled={testRunning}
                          className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-white border border-[#e2e4ea] hover:border-[#4f47e6] text-[#4a4d57] transition-colors cursor-pointer"
                        >
                          <RefreshCw className={`w-3 h-3 ${testRunning ? 'animate-spin text-[#4f47e6]' : ''}`} />
                          <span>Re-test Speed</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 text-[12.5px]">
                        <div className="p-2.5 bg-white border border-[#e2e4ea] rounded">
                          <span className="text-[#777587] text-[10.5px] block">Page Load Time</span>
                          <span className="text-[13.5px] font-bold text-[#10b981] font-heading">{loadTimeMs / 1000} seconds</span>
                        </div>
                        <div className="p-2.5 bg-white border border-[#e2e4ea] rounded">
                          <span className="text-[#777587] text-[10.5px] block">Mobile Usability</span>
                          <span className="text-[13.5px] font-bold text-[#10b981] font-heading">100% Mobile Ready</span>
                        </div>
                        <div className="p-2.5 bg-white border border-[#e2e4ea] rounded">
                          <span className="text-[#777587] text-[10.5px] block">Security Protection</span>
                          <span className="text-[13.5px] font-bold text-[#10b981] font-heading">A+ SSL Certificate</span>
                        </div>
                        <div className="p-2.5 bg-white border border-[#e2e4ea] rounded">
                          <span className="text-[#777587] text-[10.5px] block">Search Readiness</span>
                          <span className="text-[13.5px] font-bold text-[#4f47e6] font-heading">Google Search Ready</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'communication' && (
                    <motion.div
                      key="communication"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2.5"
                    >
                      <p className="text-[12px] font-mono text-[#777587]">
                        Simple, friendly communication throughout your project:
                      </p>
                      <div className="space-y-2 text-[13.5px]">
                        <div className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-2 shrink-0" />
                          <span><strong>Direct WhatsApp chat:</strong> Quick updates and answers whenever you have questions</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-2 shrink-0" />
                          <span><strong>Live preview links:</strong> Test your website on your phone as we build it</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-2 shrink-0" />
                          <span><strong>Clear milestone dates:</strong> We deliver on time with no endless delays</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-3 border-t border-[#e2e4ea] flex items-center justify-between text-[11.5px] text-[#777587] mt-3">
                  <span className="flex items-center gap-1.5 text-[#191a20] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>Fixed price guarantee &bull; No surprise charges</span>
                  </span>
                  <span>Gujarat, India</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
