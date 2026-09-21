import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Mail, Phone, MapPin, CheckCircle2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InquiryFormData } from '../types.ts';
import { adminService } from '../services/adminService.ts';

interface ContactSectionProps {
  selectedScope: string;
  selectedBudget: string;
  onScopeChange: (scope: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedScope,
  selectedBudget,
  onScopeChange,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    scope: selectedScope || 'commercial_web',
    budget: selectedBudget || 'starter',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSpec, setCopiedSpec] = useState(false);

  useEffect(() => {
    if (selectedScope) {
      setFormData((prev) => ({ ...prev, scope: selectedScope }));
    }
  }, [selectedScope]);

  useEffect(() => {
    if (selectedBudget) {
      setFormData((prev) => ({ ...prev, budget: selectedBudget }));
    }
  }, [selectedBudget]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const keyMap: { [key: string]: keyof InquiryFormData } = {
      formName: 'name',
      formBusiness: 'businessName',
      formEmail: 'email',
      formPhone: 'phone',
      formScope: 'scope',
      formBudget: 'budget',
      formDetails: 'details',
    };

    const field = keyMap[id];
    if (field) {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (field === 'scope') {
        onScopeChange(value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await adminService.createInquiry({
        name: formData.name,
        business: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        service: formData.scope,
        budget: formData.budget,
        message: formData.details || 'Consultation request submitted from website contact form.',
      });
    } catch (err) {
      console.warn('Could not record inquiry in background:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getScopeLabel = (scope: string) => {
    switch (scope) {
      case 'commercial_web': return 'Business Website (₹4,000 – ₹7,000)';
      case 'ecommerce': return 'E-Commerce Website (₹11,000 – ₹15,000)';
      case 'custom_app': return 'Custom Web Application (from ₹18,000+)';
      case 'redesign': return 'Website Redesign & Speed Optimization';
      case 'maintenance': return 'Monthly Updates & Maintenance';
      default: return scope;
    }
  };

  const getWhatsAppMessageUrl = () => {
    const text = `Hi Darshit, I would like to discuss a project with Daxira InfoTech.
Name: ${formData.name || 'Client'}
Business: ${formData.businessName || 'N/A'}
Service Needed: ${getScopeLabel(formData.scope)}
Details: ${formData.details || 'Let us discuss on WhatsApp'}`;
    return `https://wa.me/919409638264?text=${encodeURIComponent(text)}`;
  };

  const handleCopyInquiry = () => {
    const text = `Inquiry for Daxira InfoTech:
Name: ${formData.name}
Business: ${formData.businessName}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${getScopeLabel(formData.scope)}
Details: ${formData.details}`;
    navigator.clipboard.writeText(text);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#faf9fd] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Direct Access Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#4f47e6] font-semibold">
                Contact Us
              </span>
              <h2 className="font-heading font-extrabold text-[32px] md:text-[40px] text-[#191a20] tracking-tight">
                Let&apos;s discuss your website or software.
              </h2>
              <p className="text-[15px] text-[#4a4d57] leading-relaxed">
                Need a new website, an online store, or custom software? Fill out the short form or reach out directly via WhatsApp or phone. Darshit reads every inquiry and replies promptly.
              </p>

              {/* Direct Channels */}
              <div className="space-y-3 pt-3">
                {/* WhatsApp */}
                <motion.a
                  whileHover={{ x: 3 }}
                  className="p-4 rounded-md border border-[#e2e4ea] bg-white hover:border-[#10b981] flex items-center gap-3.5 transition-all group shadow-2xs hover:shadow-xs"
                  href={getWhatsAppMessageUrl()}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="w-10 h-10 rounded bg-[#10b981]/10 text-[#10b981] flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11.5px] font-mono text-[#777587] block">Fastest Reply &bull; WhatsApp</span>
                    <span className="text-[14px] font-semibold text-[#191a20] group-hover:text-[#10b981] transition-colors">
                      +91 9409638264
                    </span>
                  </div>
                </motion.a>

                {/* Direct Phone Call */}
                <motion.a
                  whileHover={{ x: 3 }}
                  className="p-4 rounded-md border border-[#e2e4ea] bg-white hover:border-[#4f47e6] flex items-center gap-3.5 transition-all group shadow-2xs hover:shadow-xs"
                  href="tel:+919409638264"
                >
                  <div className="w-10 h-10 rounded bg-[#4f47e6]/10 text-[#4f47e6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11.5px] font-mono text-[#777587] block">Direct Call</span>
                    <span className="text-[14px] font-semibold text-[#191a20] group-hover:text-[#4f47e6] transition-colors">
                      +91 9409638264
                    </span>
                  </div>
                </motion.a>

                {/* Email */}
                <div className="p-4 rounded-md border border-[#e2e4ea] bg-white flex items-center gap-3.5 shadow-2xs">
                  <div className="w-10 h-10 rounded bg-[#efedf1] text-[#191a20] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#4f47e6]" />
                  </div>
                  <div>
                    <span className="text-[11.5px] font-mono text-[#777587] block">Email Us</span>
                    <a
                      href="mailto:er.darshitpatel@gmail.com"
                      className="text-[14px] font-semibold text-[#191a20] hover:text-[#4f47e6] transition-colors"
                    >
                      er.darshitpatel@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="p-4 rounded-md border border-[#e2e4ea] bg-white flex items-center gap-3.5 shadow-2xs">
                  <div className="w-10 h-10 rounded bg-[#efedf1] text-[#191a20] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#4f47e6]" />
                  </div>
                  <div>
                    <span className="text-[11.5px] font-mono text-[#777587] block">Location</span>
                    <span className="text-[14px] font-semibold text-[#191a20]">
                      Gujarat, India • Serving clients worldwide
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#e2e4ea] text-[12.5px] font-mono text-[#777587] flex items-center gap-2 mt-6 lg:mt-0">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span>Available for new website &amp; software projects</span>
            </div>
          </motion.div>

          {/* Right Structured Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  id="formSuccessCard"
                  className="p-8 sm:p-10 rounded-lg border border-[#10b981]/30 bg-white shadow-sm space-y-5"
                >
                  <div className="w-12 h-12 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-extrabold text-[24px] text-[#191a20]">
                    Thank you! Your inquiry has been received.
                  </h3>
                  <p className="text-[14.5px] text-[#4a4d57] leading-relaxed">
                    Thanks, <strong className="text-[#191a20]">{formData.name}</strong>. Darshit will review your details for{' '}
                    <strong className="text-[#191a20]">{formData.businessName || 'your business'}</strong> and get back to you within 24 hours with a fixed quote.
                  </p>

                  <div className="p-4 rounded-md bg-[#faf9fd] border border-[#e2e4ea] text-[13px] text-[#4a4d57] space-y-1.5 font-mono">
                    <div><strong>Service:</strong> {getScopeLabel(formData.scope)}</div>
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Phone:</strong> {formData.phone}</div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={getWhatsAppMessageUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-[13.5px] transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send details to WhatsApp now</span>
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopyInquiry}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-[#e2e4ea] text-[#191a20] hover:bg-[#faf9fd] font-semibold text-[13px] transition-colors cursor-pointer"
                    >
                      {copiedSpec ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4 text-[#777587]" />}
                      <span>{copiedSpec ? 'Copied to Clipboard' : 'Copy Message'}</span>
                    </motion.button>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          businessName: '',
                          email: '',
                          phone: '',
                          scope: 'commercial_web',
                          budget: 'starter',
                          details: '',
                        });
                      }}
                      className="text-[13px] text-[#777587] hover:text-[#191a20] underline ml-auto self-center cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  id="scopeIntakeForm"
                  onSubmit={handleSubmit}
                  className="p-8 rounded-lg border border-[#e2e4ea] bg-white shadow-sm space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12.5px] font-medium text-[#191a20] mb-1.5" htmlFor="formName">
                        Your Name *
                      </label>
                      <input
                        id="formName"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full rounded-md border border-[#e2e4ea] bg-[#faf9fd] text-[#191a20] text-[14px] px-3.5 py-2.5 focus:border-[#4f47e6] focus:bg-white focus:ring-1 focus:ring-[#4f47e6] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12.5px] font-medium text-[#191a20] mb-1.5" htmlFor="formBusiness">
                        Business or Company Name
                      </label>
                      <input
                        id="formBusiness"
                        type="text"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g. Patel Brothers Traders"
                        className="w-full rounded-md border border-[#e2e4ea] bg-[#faf9fd] text-[#191a20] text-[14px] px-3.5 py-2.5 focus:border-[#4f47e6] focus:bg-white focus:ring-1 focus:ring-[#4f47e6] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12.5px] font-medium text-[#191a20] mb-1.5" htmlFor="formEmail">
                        Email Address *
                      </label>
                      <input
                        id="formEmail"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full rounded-md border border-[#e2e4ea] bg-[#faf9fd] text-[#191a20] text-[14px] px-3.5 py-2.5 focus:border-[#4f47e6] focus:bg-white focus:ring-1 focus:ring-[#4f47e6] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12.5px] font-medium text-[#191a20] mb-1.5" htmlFor="formPhone">
                        Phone Number / WhatsApp *
                      </label>
                      <input
                        id="formPhone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-md border border-[#e2e4ea] bg-[#faf9fd] text-[#191a20] text-[14px] px-3.5 py-2.5 focus:border-[#4f47e6] focus:bg-white focus:ring-1 focus:ring-[#4f47e6] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12.5px] font-medium text-[#191a20] mb-1.5" htmlFor="formScope">
                        What do you need? *
                      </label>
                      <select
                        id="formScope"
                        required
                        value={formData.scope}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#e2e4ea] bg-[#faf9fd] text-[#191a20] text-[14px] px-3.5 py-2.5 focus:border-[#4f47e6] focus:bg-white focus:ring-1 focus:ring-[#4f47e6] outline-none transition-colors cursor-pointer"
                      >
                        <option value="commercial_web">Business Website (₹4,000 – ₹7,000)</option>
                        <option value="ecommerce">Online Store / E-Commerce (₹11,000 – ₹15,000)</option>
                        <option value="custom_app">Custom Web Application (from ₹18,000+)</option>
                        <option value="redesign">Website Redesign &amp; Speed Optimization</option>
                        <option value="maintenance">Monthly Updates &amp; Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[12.5px] font-medium text-[#191a20] mb-1.5" htmlFor="formBudget">
                        Approximate Budget
                      </label>
                      <select
                        id="formBudget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full rounded-md border border-[#e2e4ea] bg-[#faf9fd] text-[#191a20] text-[14px] px-3.5 py-2.5 focus:border-[#4f47e6] focus:bg-white focus:ring-1 focus:ring-[#4f47e6] outline-none transition-colors cursor-pointer"
                      >
                        <option value="starter">₹4,000 – ₹7,000 (Business Website)</option>
                        <option value="growth">₹11,000 – ₹15,000 (E-Commerce Store)</option>
                        <option value="application">₹18,000+ (Custom Web Application)</option>
                        <option value="undecided">Let&apos;s discuss on phone / WhatsApp first</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12.5px] font-medium text-[#191a20] mb-1.5" htmlFor="formDetails">
                      Tell us about your business &amp; project *
                    </label>
                    <textarea
                      id="formDetails"
                      rows={4}
                      required
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Tell us what services or products you offer, what pages you want on your website, and any other requirements..."
                      className="w-full rounded-md border border-[#e2e4ea] bg-[#faf9fd] text-[#191a20] text-[14px] px-3.5 py-2.5 focus:border-[#4f47e6] focus:bg-white focus:ring-1 focus:ring-[#4f47e6] outline-none transition-colors"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      id="submitBtn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-md bg-[#4f47e6] hover:bg-[#3527ce] text-white font-heading font-semibold text-[14.5px] shadow-xs hover:shadow transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Get a Free Quote'}</span>
                      <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
