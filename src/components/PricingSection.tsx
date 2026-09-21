import React from 'react';
import { Check, ArrowRight, ShieldCheck, Globe, Server, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_PACKAGES } from '../data/content.ts';
import { DaxiraIcon, DaxiraIconVariant } from './DaxiraBrand.tsx';

interface PricingSectionProps {
  onSelectScope: (scopeValue: string, budgetValue?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectScope }) => {
  const getPricingVariant = (id: string): DaxiraIconVariant => {
    if (id === 'business-website') return 'web';
    if (id === 'ecommerce-website') return 'ecommerce';
    if (id === 'custom-web-application') return 'saas';
    return 'default';
  };

  const handleQuoteClick = (scopeValue: string) => {
    let budget = 'starter';
    if (scopeValue === 'ecommerce') budget = 'growth';
    if (scopeValue === 'custom_app') budget = 'application';

    onSelectScope(scopeValue, budget);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="border-b border-[#e2e4ea] py-24 bg-[#faf9fd] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 gap-3"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#4f47e6] font-semibold">
            Simple &amp; Transparent Pricing
          </span>
          <h2 className="font-heading font-extrabold text-[32px] md:text-[40px] text-[#191a20] tracking-tight">
            Clear, Honest Website Pricing
          </h2>
          <p className="text-[15px] text-[#4a4d57] leading-relaxed">
            Transparent pricing with no hidden charges. Every package includes custom design, mobile testing, and 30 days of post-launch support.
          </p>
        </motion.div>

        {/* 3 Simple, Clean Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg, index) => {
            const isFeatured = pkg.isPopular;
            return (
              <motion.div
                key={pkg.id}
                id={`pricingCard-${pkg.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -4 }}
                className={`p-8 md:p-9 rounded-lg bg-white flex flex-col justify-between transition-all duration-200 ${
                  isFeatured
                    ? 'border-2 border-[#4f47e6] relative shadow-md lg:scale-[1.02]'
                    : 'border border-[#e2e4ea] shadow-xs hover:border-[#c7c4d8] hover:shadow-sm'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-8 px-3 py-0.5 rounded bg-[#4f47e6] text-white text-[11px] font-medium uppercase tracking-wider shadow-xs font-heading">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Card Title & Derived Brand Icon */}
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-heading font-bold text-[22px] text-[#191a20]">
                      {pkg.title}
                    </h3>
                    <div className="p-2 rounded-md bg-[#faf9fd] border border-[#e2e4ea] shrink-0">
                      <DaxiraIcon variant={getPricingVariant(pkg.id)} size={24} />
                    </div>
                  </div>

                  {/* Pricing Header with "Starting price" */}
                  <div className="mt-4 pb-5 border-b border-[#e2e4ea]">
                    <span className="text-[11.5px] font-mono uppercase tracking-wider text-[#777587] block mb-1">
                      Starting price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-extrabold text-[34px] md:text-[36px] tracking-tight text-[#191a20]">
                        {pkg.startingPrice}
                      </span>
                      {pkg.priceRange && (
                        <span className="text-[12.5px] font-medium text-[#777587] bg-[#faf9fd] px-2 py-0.5 rounded border border-[#e2e4ea]">
                          {pkg.priceRange}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[14px] text-[#4a4d57] mt-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Domain & Hosting Row (Clear & Transparent) */}
                  <div className="mt-5 p-3 rounded-md bg-[#faf9fd] border border-[#e2e4ea] flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-[#4f47e6] shrink-0 mt-0.5" />
                    <div className="text-[12.5px] leading-snug">
                      <span className="font-medium text-[#191a20] block">Domain &amp; hosting:</span>
                      <span className="text-[#4a4d57]">Additional / Based on actual provider cost</span>
                    </div>
                  </div>

                  {/* What is included */}
                  <div className="mt-6 pt-5 border-t border-[#efedf1]">
                    <span className="text-[11.5px] font-mono uppercase tracking-wider text-[#777587] font-semibold block mb-3">
                      What is included:
                    </span>
                    <div className="space-y-2.5">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-[13.5px] text-[#191a20]">
                          <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Get a Quote Button */}
                <div className="pt-8 mt-8 border-t border-[#e2e4ea]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuoteClick(pkg.scopeValue)}
                    className={`w-full py-3.5 px-5 rounded-md font-heading font-semibold text-[13.5px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs ${
                      isFeatured
                        ? 'bg-[#4f47e6] hover:bg-[#3527ce] text-white shadow-xs hover:shadow-md'
                        : 'border border-[#e2e4ea] hover:border-[#4f47e6] text-[#191a20] hover:bg-[#faf9fd]'
                    }`}
                  >
                    <span>{pkg.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dedicated Domain & Hosting Information Card Below Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="p-6 md:p-8 rounded-lg bg-white border border-[#e2e4ea] shadow-xs">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#e2e4ea]">
              <div className="w-8 h-8 rounded-md bg-[#faf9fd] border border-[#e2e4ea] flex items-center justify-center text-[#4f47e6] shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-[16px] text-[#191a20]">
                  Domain &amp; Web Hosting Details
                </h4>
                <p className="text-[12.5px] text-[#777587]">
                  Transparent billing with zero markup on third-party provider costs
                </p>
              </div>
            </div>

            {/* Prominent Notes requested by client */}
            <div className="space-y-3.5 mb-6">
              <div className="flex items-start gap-3 p-3.5 rounded-md bg-[#faf9fd] border border-[#e2e4ea]">
                <HelpCircle className="w-4 h-4 text-[#4f47e6] shrink-0 mt-0.5" />
                <p className="text-[13.5px] text-[#191a20] leading-relaxed">
                  <strong>Note on domain &amp; hosting costs:</strong> &ldquo;Domain &amp; hosting charges may vary depending on the domain name, extension and hosting plan selected. We will discuss the options with you before purchase.&rdquo;
                </p>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-md bg-[#faf9fd] border border-[#e2e4ea]">
                <Server className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                <p className="text-[13.5px] text-[#191a20] leading-relaxed">
                  <strong>Flexible purchase options:</strong> &ldquo;Domain &amp; Hosting can be arranged by us or purchased by the client.&rdquo;
                </p>
              </div>
            </div>

            {/* Non-Technical Client Purchase Options Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-md border border-[#e2e4ea] bg-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4f47e6]" />
                  <span className="font-heading font-bold text-[13.5px] text-[#191a20]">
                    Option A: Purchased by Client
                  </span>
                </div>
                <p className="text-[12.5px] text-[#4a4d57] leading-relaxed">
                  You purchase the domain (e.g. on GoDaddy, Namecheap) and hosting in your own name with our guidance. You retain direct ownership and control of billing from day one.
                </p>
              </div>

              <div className="p-4 rounded-md border border-[#e2e4ea] bg-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  <span className="font-heading font-bold text-[13.5px] text-[#191a20]">
                    Option B: Arranged by Daxira InfoTech
                  </span>
                </div>
                <p className="text-[12.5px] text-[#4a4d57] leading-relaxed">
                  We handle the complete setup, SSL certificate installation, and DNS configuration on your behalf. Charges are billed at exact provider invoice cost with zero markup.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Spacious Trustworthy Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-8 max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 text-[13px] text-[#4a4d57] bg-white px-5 py-2.5 rounded-full border border-[#e2e4ea] shadow-xs hover:border-[#4f47e6]/30 transition-colors">
            <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
            <span>Includes 30 days of free support, mobile testing, and 100% ownership of your code.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
