import React, { useState } from 'react';
import {
  ArrowRight,
  Send,
  CheckCircle2,
  Plus,
  Check,
  Building2,
  Monitor,
  CheckCircle,
  Clock,
  Printer,
  Barcode,
  WifiOff,
  MessageSquare,
  BarChart3,
  Layers,
  ArrowUpRight,
  Package,
  ShieldCheck,
  AlertCircle,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DaxiraIcon } from './DaxiraBrand.tsx';

interface CaseStudiesProps {
  onCommissionClick: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesProps> = ({ onCommissionClick }) => {
  // Interactive state for Vyaparix demo terminal
  const [activeTab, setActiveTab] = useState<'pos' | 'inventory'>('pos');
  const [posItems, setPosItems] = useState([
    { code: 'SKU-7821', name: 'Thermal Paper Rolls (50 rolls)', qty: 1, gst: '12%', amount: 1500 },
    { code: 'SKU-4910', name: 'Laser Barcode Scanner USB', qty: 2, gst: '18%', amount: 4800 },
  ]);
  const [whatsappSent, setWhatsappSent] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  const totalAmount = posItems.reduce((acc, item) => acc + item.amount, 0);

  const handleAddSampleItem = () => {
    setIsScanning(true);
    setTimeout(() => {
      setPosItems((prev) => [
        ...prev,
        {
          code: 'SKU-9902',
          name: '80mm High-Speed Thermal Printer',
          qty: 1,
          gst: '18%',
          amount: 3200,
        },
      ]);
      setWhatsappSent(false);
      setIsScanning(false);
    }, 320);
  };

  const handleDispatchWhatsApp = () => {
    setWhatsappSent(true);
  };

  return (
    <section id="work" className="border-b border-[#e2e4ea] py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Very subtle architectural accent to keep background refined and clean */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#4f47e6]/[0.025] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4f47e6]/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-[11.5px] font-mono uppercase tracking-[0.2em] text-[#4f47e6] font-semibold block mb-3">
              REAL DELIVERED CLIENT WORK
            </span>
            <h2 className="font-heading font-extrabold text-[34px] sm:text-[42px] lg:text-[46px] text-[#191a20] tracking-tight leading-[1.12]">
              Delivered Client Project
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#4a4d57] mt-3.5 leading-relaxed">
              Real custom software built from the ground up and deployed into everyday retail operations.
              Fast, reliable, and completely tailored to the business owner&apos;s daily routine.
            </p>
          </div>

          {/* Prominent Trust Verification Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-[13px] font-medium self-start lg:self-end shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-semibold text-[#047857]">Successfully Delivered</span>
            <span className="text-[#059669]">• In Active Daily Operation</span>
          </div>
        </motion.div>

        {/* Project Meta Information Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-[#faf9fd] border border-[#e2e4ea] mb-12 shadow-2xs"
        >
          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-white border border-[#e2e4ea] flex items-center justify-center text-[#4f47e6] shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-[#777587] block">Industry</span>
              <span className="text-[13px] font-heading font-bold text-[#191a20] block truncate">Retail &amp; Electronics</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-white border border-[#e2e4ea] flex items-center justify-center text-[#4f47e6] shrink-0">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-[#777587] block">Platform</span>
              <span className="text-[13px] font-heading font-bold text-[#191a20] block truncate">Desktop POS Suite</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-white border border-[#e2e4ea] flex items-center justify-center text-[#4f47e6] shrink-0">
              <CheckCircle className="w-4 h-4 text-[#10b981]" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-[#777587] block">Delivery Status</span>
              <span className="text-[13px] font-heading font-bold text-[#10b981] block truncate">100% Deployed &amp; Live</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-white border border-[#e2e4ea] flex items-center justify-center text-[#4f47e6] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-[#777587] block">Delivery Sprint</span>
              <span className="text-[13px] font-heading font-bold text-[#191a20] block truncate">Turnkey Handover</span>
            </div>
          </div>
        </motion.div>

        {/* Two-Column Case Study Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Narrative & Problem → Solution → Result */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Project Title and Overview */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#eef2ff] border border-[#e0e7ff] text-[#4f47e6] text-[11px] font-mono font-semibold uppercase">
                  CUSTOM SOFTWARE CASE STUDY
                </span>
                <span className="text-[12px] font-mono text-[#777587]">Store Terminal v2.4</span>
              </div>
              <h3 className="font-heading font-extrabold text-[26px] sm:text-[30px] text-[#191a20] tracking-tight leading-tight">
                Vyaparix — Complete Business Management &amp; Billing System
              </h3>
              <p className="text-[14.5px] text-[#4a4d57] mt-3 leading-relaxed">
                Engineered for a high-traffic retail hardware and electronics store. The client needed a bulletproof
                counter system that could withstand busy evening foot traffic, keep exact stock records, and eliminate
                manual calculation mistakes without requiring constant internet connectivity.
              </p>
            </div>

            {/* Problem → Solution → Result Flow */}
            <div className="space-y-3.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777587] font-semibold block">
                THE TRANSFORMATION JOURNEY
              </span>

              {/* 1. Problem */}
              <div className="p-4 rounded-xl bg-[#faf9fd] border border-[#e2e4ea] flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[14px] text-[#191a20] flex items-center gap-2">
                    <span>Problem</span>
                    <span className="text-[11px] font-mono text-[#dc2626] font-normal">• Long queues &amp; manual math</span>
                  </h4>
                  <p className="text-[13px] text-[#4a4d57] mt-1 leading-relaxed">
                    Staff struggled with slow handwritten bills, calculation errors during rush hours, lost customer records,
                    and constant stockouts because inventory counts were only reconciled at the end of the month.
                  </p>
                </div>
              </div>

              {/* 2. Solution */}
              <div className="p-4 rounded-xl bg-[#faf9fd] border border-[#e2e4ea] flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#eef2ff] border border-[#c7d2fe] text-[#4f47e6] flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[14px] text-[#191a20] flex items-center gap-2">
                    <span>Solution</span>
                    <span className="text-[11px] font-mono text-[#4f47e6] font-normal">• 100% Offline custom POS engine</span>
                  </h4>
                  <p className="text-[13px] text-[#4a4d57] mt-1 leading-relaxed">
                    Daxira built a tailored desktop application with sub-second barcode recognition, automated GST splitting,
                    instant 80mm thermal receipt printing, and seamless WhatsApp PDF invoice delivery directly to customer phones.
                  </p>
                </div>
              </div>

              {/* 3. Result */}
              <div className="p-4 rounded-xl bg-[#faf9fd] border border-[#e2e4ea] flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] text-[#10b981] flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[14px] text-[#191a20] flex items-center gap-2">
                    <span>Result</span>
                    <span className="text-[11px] font-mono text-[#10b981] font-normal">• Under 35-second checkouts &amp; zero errors</span>
                  </h4>
                  <p className="text-[13px] text-[#4a4d57] mt-1 leading-relaxed">
                    Average checkout duration dropped by over 65%. In-store paper waste was cut in half, and the owner now
                    receives automatic low-stock alerts before items sell out, plus verified daily net-profit reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features: Clean Horizontal Icon Grid */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777587] font-semibold block mb-3">
                KEY DELIVERED CAPABILITIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-[#e2e4ea] bg-white flex items-start gap-2.5 hover:border-[#4f47e6] transition-colors">
                  <Barcode className="w-4 h-4 text-[#4f47e6] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[12.5px] font-bold text-[#191a20] block">Sub-Second Barcode Scanning</span>
                    <span className="text-[11.5px] text-[#777587] block leading-tight mt-0.5">Instant SKU lookup &amp; auto-calculated GST tax rate.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#e2e4ea] bg-white flex items-start gap-2.5 hover:border-[#4f47e6] transition-colors">
                  <WifiOff className="w-4 h-4 text-[#4f47e6] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[12.5px] font-bold text-[#191a20] block">100% Offline Capability</span>
                    <span className="text-[11.5px] text-[#777587] block leading-tight mt-0.5">Keeps billing during network or broadband cuts.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#e2e4ea] bg-white flex items-start gap-2.5 hover:border-[#4f47e6] transition-colors">
                  <MessageSquare className="w-4 h-4 text-[#4f47e6] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[12.5px] font-bold text-[#191a20] block">WhatsApp Digital Receipts</span>
                    <span className="text-[11.5px] text-[#777587] block leading-tight mt-0.5">Invoices sent directly to customer phones instantly.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#e2e4ea] bg-white flex items-start gap-2.5 hover:border-[#4f47e6] transition-colors">
                  <Package className="w-4 h-4 text-[#4f47e6] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[12.5px] font-bold text-[#191a20] block">Live Inventory &amp; Low Alerts</span>
                    <span className="text-[11.5px] text-[#777587] block leading-tight mt-0.5">Automatic deduction and reorder warnings.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#e2e4ea] bg-white flex items-start gap-2.5 hover:border-[#4f47e6] transition-colors">
                  <Printer className="w-4 h-4 text-[#4f47e6] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[12.5px] font-bold text-[#191a20] block">Thermal &amp; A4 Printing</span>
                    <span className="text-[11.5px] text-[#777587] block leading-tight mt-0.5">Hardware drivers for 80mm rolls &amp; laser paper.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#e2e4ea] bg-white flex items-start gap-2.5 hover:border-[#4f47e6] transition-colors">
                  <BarChart3 className="w-4 h-4 text-[#4f47e6] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[12.5px] font-bold text-[#191a20] block">Daily Profit &amp; Tax Audit</span>
                    <span className="text-[11.5px] text-[#777587] block leading-tight mt-0.5">One-click day-end totals for sales and margins.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Client Feedback Quote */}
            <div className="p-4 rounded-xl bg-[#faf9fd] border border-[#e2e4ea] text-[13px] text-[#4a4d57] leading-relaxed relative">
              <div className="text-[20px] font-serif text-[#4f47e6] leading-none mb-1">&ldquo;</div>
              <p className="italic text-[#191a20]">
                Before Daxira built Vyaparix, our evening checkout rush was chaotic and we constantly lost count of fast-moving items.
                Now billing takes seconds, customers appreciate receiving their receipts on WhatsApp, and we have absolute clarity
                on our daily cash and profit every night.
              </p>
              <div className="mt-3 pt-3 border-t border-[#e2e4ea] flex items-center justify-between text-[11.5px]">
                <span className="font-heading font-bold text-[#191a20]">Retail Store Owner • Hardware &amp; Electronics</span>
                <span className="text-[#10b981] font-mono font-medium">Verified Client Review</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Large Project Screenshot / Interactive Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6"
          >
            {/* The Large Desktop Window Frame */}
            <div className="rounded-xl border border-[#e2e4ea] bg-[#faf9fd] shadow-sm overflow-hidden text-[12px] font-mono">
              {/* Window Title Bar */}
              <div className="px-4 py-3 bg-[#f3f2f7] border-b border-[#e2e4ea] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-[#e0443e]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-[#dea123]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-[#1aab29]" />
                  </div>
                  <DaxiraIcon variant="terminal" size={17} />
                  <span className="font-heading font-bold text-[13px] text-[#191a20] tracking-tight">
                    Vyaparix OS — In-Store Counter Terminal
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-[#e2e4ea] text-[10.5px] text-[#059669] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    Offline Sync Active
                  </span>
                </div>
              </div>

              {/* Sub-Header & Live Terminal Actions */}
              <div className="px-4 py-2.5 bg-white border-b border-[#e2e4ea] flex flex-wrap items-center justify-between gap-2 font-sans">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('pos')}
                    className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors cursor-pointer ${
                      activeTab === 'pos'
                        ? 'bg-[#4f47e6] text-white shadow-2xs'
                        : 'text-[#777587] hover:text-[#191a20]'
                    }`}
                  >
                    Live Counter Invoice
                  </button>
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors cursor-pointer ${
                      activeTab === 'inventory'
                        ? 'bg-[#4f47e6] text-white shadow-2xs'
                        : 'text-[#777587] hover:text-[#191a20]'
                    }`}
                  >
                    Stock &amp; Low Alerts (3)
                  </button>
                </div>

                {activeTab === 'pos' && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddSampleItem}
                    disabled={isScanning || posItems.length >= 3}
                    className="text-[11.5px] px-2.5 py-1 rounded-md bg-[#faf9fd] border border-[#e2e4ea] hover:border-[#4f47e6] text-[#4f47e6] font-semibold inline-flex items-center gap-1 disabled:opacity-50 cursor-pointer shadow-2xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isScanning ? 'Scanning Barcode...' : 'Scan Sample Barcode'}</span>
                  </motion.button>
                )}
              </div>

              {/* Window Content Body */}
              <div className="p-4 sm:p-5 bg-white">
                {activeTab === 'pos' ? (
                  <div className="space-y-4 font-mono">
                    {/* Invoice Metadata Header */}
                    <div className="p-3 rounded-lg bg-[#faf9fd] border border-[#e2e4ea] grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-sans">
                      <div>
                        <span className="text-[#777587] block">Invoice No.</span>
                        <span className="font-bold text-[#191a20]">INV-2024-8842</span>
                      </div>
                      <div>
                        <span className="text-[#777587] block">Payment Type</span>
                        <span className="font-bold text-[#059669]">UPI Transfer Verified</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-[#777587] block">Printer Target</span>
                        <span className="font-bold text-[#191a20]">80mm Thermal POS-01</span>
                      </div>
                    </div>

                    {/* Scanned Items Table */}
                    <div className="border border-[#e2e4ea] rounded-lg overflow-hidden">
                      <div className="bg-[#f8f9fc] border-b border-[#e2e4ea] grid grid-cols-12 py-2 px-3 text-[#777587] font-semibold text-[11px]">
                        <span className="col-span-6">ITEM / SKU</span>
                        <span className="col-span-2 text-right">QTY</span>
                        <span className="col-span-2 text-right">GST</span>
                        <span className="col-span-2 text-right">PRICE</span>
                      </div>

                      <div className="divide-y divide-[#e2e4ea] text-[12px]">
                        <AnimatePresence>
                          {posItems.map((item) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                              className="grid grid-cols-12 py-2.5 px-3 text-[#191a20] items-center hover:bg-[#faf9fd]"
                            >
                              <div className="col-span-6 pr-2">
                                <span className="font-medium font-sans text-[12.5px] block truncate">{item.name}</span>
                                <span className="text-[10px] text-[#777587] font-mono">{item.code}</span>
                              </div>
                              <span className="col-span-2 text-right font-medium">{item.qty}</span>
                              <span className="col-span-2 text-right text-[#777587]">{item.gst}</span>
                              <span className="col-span-2 text-right font-semibold text-[#191a20]">
                                ₹{item.amount.toLocaleString('en-IN')}
                              </span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Financial Summary & Instant Dispatch */}
                    <div className="p-3.5 rounded-lg bg-[#faf9fd] border border-[#e2e4ea] space-y-3 font-sans">
                      <div className="space-y-1.5 text-[12px] text-[#4a4d57] border-b border-[#e2e4ea] pb-2.5 font-mono">
                        <div className="flex justify-between">
                          <span>Taxable Value:</span>
                          <span>₹{(totalAmount * 0.84).toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-[#777587]">
                          <span>CGST (9%) + SGST (9%):</span>
                          <span>₹{(totalAmount * 0.16).toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-[16px] text-[#191a20] pt-1">
                          <span className="font-sans">Grand Total:</span>
                          <span>₹{totalAmount.toLocaleString('en-IN')}.00</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                        <div className="text-[11.5px] text-[#777587]">
                          Customer: <span className="font-semibold text-[#191a20] font-mono">+91 98••• ••210</span>
                        </div>

                        {whatsappSent ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] text-[11.5px] font-semibold"
                          >
                            <Check className="w-3.5 h-3.5 text-[#10b981]" />
                            <span>PDF Invoice Sent to WhatsApp</span>
                          </motion.div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleDispatchWhatsApp}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-[#4f47e6] text-white text-[11.5px] font-semibold hover:bg-[#3527ce] transition-colors cursor-pointer shadow-2xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Dispatch WhatsApp Receipt</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Inventory Screen Preview */
                  <div className="space-y-3 font-sans">
                    <div className="p-3 rounded-lg bg-[#fffbeb] border border-[#fef3c7] flex items-center justify-between text-[12px] text-[#92400e]">
                      <span className="font-medium">⚠ 3 items currently below minimum stock threshold</span>
                      <span className="font-mono text-[11px] font-bold underline">Reorder Sheet</span>
                    </div>

                    <div className="border border-[#e2e4ea] rounded-lg overflow-hidden text-[12px]">
                      <div className="bg-[#f8f9fc] border-b border-[#e2e4ea] grid grid-cols-12 py-2 px-3 text-[#777587] font-semibold text-[11px] font-mono">
                        <span className="col-span-5">PRODUCT</span>
                        <span className="col-span-3">CATEGORY</span>
                        <span className="col-span-2 text-right">ON HAND</span>
                        <span className="col-span-2 text-right">STATUS</span>
                      </div>
                      <div className="divide-y divide-[#e2e4ea]">
                        <div className="grid grid-cols-12 py-2 px-3 items-center">
                          <span className="col-span-5 font-medium text-[#191a20]">Cat6 Ethernet Cable (305m)</span>
                          <span className="col-span-3 text-[#777587]">Networking</span>
                          <span className="col-span-2 text-right font-mono font-bold text-[#dc2626]">2 left</span>
                          <span className="col-span-2 text-right text-[11px] text-[#dc2626] font-semibold">Low</span>
                        </div>
                        <div className="grid grid-cols-12 py-2 px-3 items-center">
                          <span className="col-span-5 font-medium text-[#191a20]">HDMI 2.1 4K Braided Cord</span>
                          <span className="col-span-3 text-[#777587]">Accessories</span>
                          <span className="col-span-2 text-right font-mono font-bold text-[#dc2626]">3 left</span>
                          <span className="col-span-2 text-right text-[11px] text-[#dc2626] font-semibold">Low</span>
                        </div>
                        <div className="grid grid-cols-12 py-2 px-3 items-center">
                          <span className="col-span-5 font-medium text-[#191a20]">12V 2A Regulated Power Adapter</span>
                          <span className="col-span-3 text-[#777587]">Electronics</span>
                          <span className="col-span-2 text-right font-mono font-bold text-[#059669]">48 left</span>
                          <span className="col-span-2 text-right text-[11px] text-[#059669] font-semibold">Good</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mockup Operational Proof Footer */}
              <div className="px-4 py-2.5 bg-[#faf9fd] border-t border-[#e2e4ea] flex flex-wrap items-center justify-between text-[11px] text-[#777587]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Installed &amp; running on client counter hardware</span>
                </div>
                <span className="font-mono text-[#4f47e6]">30-Day Onsite Warranty Fulfilled</span>
              </div>
            </div>

            {/* Micro Badges below Mockup */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11.5px] font-mono text-[#777587]">
              <div className="p-2 rounded-md bg-[#faf9fd] border border-[#e2e4ea]">
                <span className="block font-bold text-[#191a20] text-[13px] font-heading">&lt; 35 sec</span>
                <span>Avg. Checkout Time</span>
              </div>
              <div className="p-2 rounded-md bg-[#faf9fd] border border-[#e2e4ea]">
                <span className="block font-bold text-[#191a20] text-[13px] font-heading">100%</span>
                <span>Zero Internet Downtime</span>
              </div>
              <div className="p-2 rounded-md bg-[#faf9fd] border border-[#e2e4ea]">
                <span className="block font-bold text-[#191a20] text-[13px] font-heading">10,000+</span>
                <span>Invoices Generated</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Consultation Banner */}
        <motion.div
          id="pipelineBanner"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-14 lg:mt-18 p-8 rounded-xl border border-[#e2e4ea] bg-[#faf9fd] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs"
        >
          <div className="max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#4f47e6] font-semibold block mb-1">
              HAVE A SPECIFIC SYSTEM OR WEBSITE IN MIND?
            </span>
            <h4 className="font-heading font-bold text-[20px] sm:text-[22px] text-[#191a20]">
              Let&apos;s build software or a website that solves your exact problem
            </h4>
            <p className="text-[14px] text-[#4a4d57] mt-1.5 leading-relaxed">
              We design, build, and deploy turnkey digital products with upfront fixed pricing, realistic timelines, and zero technical confusion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.a
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                onCommissionClick();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#4f47e6] hover:bg-[#3527ce] text-white font-semibold text-[13.5px] transition-all duration-200 shadow-xs cursor-pointer"
              href="#contact"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white border border-[#e2e4ea] hover:border-[#4f47e6] text-[#191a20] font-semibold text-[13.5px] transition-all duration-200 cursor-pointer shadow-2xs"
              href="https://wa.me/919409638264"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-[#777587]" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

