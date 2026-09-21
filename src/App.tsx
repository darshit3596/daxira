import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// SEO & Metadata Manager
import { SEO } from './components/SEO.tsx';

// Context Providers
import { AuthProvider } from './context/AuthContext.tsx';
import { ToastProvider } from './components/admin/ToastNotification.tsx';
import { ProtectedRoute } from './components/admin/ProtectedRoute.tsx';

// Public Website Components (100% Intact & Untouched Design)
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { EthosSection } from './components/EthosSection.tsx';
import { AboutFounder } from './components/AboutFounder.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { CaseStudiesSection } from './components/CaseStudiesSection.tsx';
import { TechStackSection } from './components/TechStackSection.tsx';
import { SprintProcessSection } from './components/SprintProcessSection.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';

// Admin Pages
import { Login } from './pages/admin/Login.tsx';
import { Dashboard } from './pages/admin/Dashboard.tsx';
import { Inquiries } from './pages/admin/Inquiries.tsx';
import { Faqs } from './pages/admin/Faqs.tsx';
import { Pricing } from './pages/admin/Pricing.tsx';
import { Projects } from './pages/admin/Projects.tsx';
import { AdminUsers } from './pages/admin/AdminUsers.tsx';
import { ActivityLogs } from './pages/admin/ActivityLogs.tsx';
import { Settings } from './pages/admin/Settings.tsx';

/**
 * Route-specific SEO Metadata Configurations
 */
const ROUTE_SEO: Record<string, { title: string; description: string; canonical: string; targetId?: string }> = {
  '/': {
    title: 'Daxira InfoTech — Custom Websites & Web Development in Gujarat, India',
    description: 'Fast, mobile-friendly websites, online stores, and custom software for businesses in Gujarat, Ahmedabad, and worldwide. Work directly with developer Darshit Sapariya with clear fixed pricing from ₹4,000.',
    canonical: 'https://daxirainfo.site/',
    targetId: 'topNav',
  },
  '/services': {
    title: 'Web Development Services & Solutions | Daxira InfoTech',
    description: 'Custom business websites, e-commerce stores with UPI payments, custom web applications, and website speed optimization in Gujarat, India.',
    canonical: 'https://daxirainfo.site/services',
    targetId: 'services',
  },
  '/projects': {
    title: 'Delivered Client Projects & Case Studies | Daxira InfoTech',
    description: 'Explore custom software and websites built and delivered for clients by Daxira InfoTech, including retail POS and billing systems.',
    canonical: 'https://daxirainfo.site/projects',
    targetId: 'work',
  },
  '/work': {
    title: 'Delivered Client Projects & Case Studies | Daxira InfoTech',
    description: 'Explore custom software and websites built and delivered for clients by Daxira InfoTech, including retail POS and billing systems.',
    canonical: 'https://daxirainfo.site/projects',
    targetId: 'work',
  },
  '/why-us': {
    title: 'Why Work With Daxira InfoTech | Direct Developer Access',
    description: 'No salespeople, no junior handoffs. Speak directly with developer Darshit Sapariya for custom, fast, and secure business websites.',
    canonical: 'https://daxirainfo.site/why-us',
    targetId: 'ethos',
  },
  '/ethos': {
    title: 'Why Work With Daxira InfoTech | Direct Developer Access',
    description: 'No salespeople, no junior handoffs. Speak directly with developer Darshit Sapariya for custom, fast, and secure business websites.',
    canonical: 'https://daxirainfo.site/why-us',
    targetId: 'ethos',
  },
  '/how-we-work': {
    title: 'Our 5-Step Web Development Process | Daxira InfoTech',
    description: 'Simple 5-stage website sprint: Free discussion, design layout, coding, speed testing, and turnkey launch with 30 days free support.',
    canonical: 'https://daxirainfo.site/how-we-work',
    targetId: 'process',
  },
  '/process': {
    title: 'Our 5-Step Web Development Process | Daxira InfoTech',
    description: 'Simple 5-stage website sprint: Free discussion, design layout, coding, speed testing, and turnkey launch with 30 days free support.',
    canonical: 'https://daxirainfo.site/how-we-work',
    targetId: 'process',
  },
  '/pricing': {
    title: 'Transparent Website Development Pricing & Packages | Daxira InfoTech',
    description: 'Clear, upfront website development pricing. Business websites from ₹4,000, online stores from ₹11,000, and custom web apps from ₹18,000.',
    canonical: 'https://daxirainfo.site/pricing',
    targetId: 'pricing',
  },
  '/faq': {
    title: 'Website Development FAQ & Answers | Daxira InfoTech',
    description: 'Frequently asked questions about website costs, development timelines, domain & hosting setup, mobile usability, and post-launch support.',
    canonical: 'https://daxirainfo.site/faq',
    targetId: 'faq',
  },
  '/contact': {
    title: 'Get a Free Website Quote & Consultation | Daxira InfoTech',
    description: 'Get in touch with Darshit Sapariya at Daxira InfoTech for a free quote on your business website, online store, or custom software.',
    canonical: 'https://daxirainfo.site/contact',
    targetId: 'contact',
  },
};

/**
 * Public Landing Page Component
 * Preserves the exact design, layout, animations, and state flow of Daxira InfoTech.
 */
function PublicWebsite() {
  const location = useLocation();
  const [selectedScope, setSelectedScope] = useState<string>('commercial_web');
  const [selectedBudget, setSelectedBudget] = useState<string>('growth');

  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const seoConfig = ROUTE_SEO[normalizedPath] || ROUTE_SEO['/'];

  // Smooth scroll to targeted section when navigating directly to a route
  useEffect(() => {
    if (seoConfig.targetId && normalizedPath !== '/') {
      const el = document.getElementById(seoConfig.targetId);
      if (el) {
        // Small timeout allows DOM layout to stabilize
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [normalizedPath, seoConfig.targetId]);

  const handleSelectScope = (scope: string, budget?: string) => {
    setSelectedScope(scope);
    if (budget) {
      setSelectedBudget(budget);
    }
  };

  const handleCommissionClick = () => {
    setSelectedScope('commercial_web');
    setSelectedBudget('growth');
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#faf9fd] text-[#191a20] font-body antialiased min-h-screen flex flex-col selection:bg-[#4f47e6] selection:text-white">
      {/* Dynamic SEO Meta Tags for Current Public Route */}
      <SEO
        title={seoConfig.title}
        description={seoConfig.description}
        canonicalUrl={seoConfig.canonical}
      />

      {/* 1. ARCHITECTURAL TOP NAVIGATION */}
      <Header onSelectScope={handleSelectScope} />

      <main className="flex-grow">
        {/* 2. HERO SECTION */}
        <Hero />

        {/* 3. VALUE PILLARS / ETHOS */}
        <EthosSection />

        {/* 4. ABOUT & FOUNDER */}
        <AboutFounder />

        {/* 5. SERVICES & DISCIPLINES */}
        <ServicesSection onSelectScope={handleSelectScope} />

        {/* 6. SELECTED CLIENT WORK / CASE STUDIES */}
        <CaseStudiesSection onCommissionClick={handleCommissionClick} />

        {/* 7. TECHNICAL MASTERY & STACK */}
        <TechStackSection />

        {/* 8. 5-STAGE ENGINEERING SPRINT */}
        <SprintProcessSection />

        {/* 9. PRICING & SCOPES */}
        <PricingSection onSelectScope={handleSelectScope} />

        {/* 10. FAQ ACCORDION */}
        <FaqSection />

        {/* 11. CONTACT & SCOPE INTAKE */}
        <ContactSection
          selectedScope={selectedScope}
          selectedBudget={selectedBudget}
          onScopeChange={(scope) => setSelectedScope(scope)}
        />
      </main>

      {/* 12. MINIMALIST EDITORIAL FOOTER */}
      <Footer />
    </div>
  );
}

/**
 * Master Application Root with Routing & Security Context
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* PUBLIC WEBSITE ROUTES */}
            <Route path="/" element={<PublicWebsite />} />
            <Route path="/services" element={<PublicWebsite />} />
            <Route path="/projects" element={<PublicWebsite />} />
            <Route path="/work" element={<PublicWebsite />} />
            <Route path="/why-us" element={<PublicWebsite />} />
            <Route path="/ethos" element={<PublicWebsite />} />
            <Route path="/how-we-work" element={<PublicWebsite />} />
            <Route path="/process" element={<PublicWebsite />} />
            <Route path="/pricing" element={<PublicWebsite />} />
            <Route path="/faq" element={<PublicWebsite />} />
            <Route path="/contact" element={<PublicWebsite />} />

            {/* ADMIN AUTHENTICATION (NOINDEX) */}
            <Route
              path="/admin/login"
              element={
                <>
                  <SEO title="Admin Login | Daxira InfoTech" noindex={true} />
                  <Login />
                </>
              }
            />

            {/* ADMIN PROTECTED ROUTES (NOINDEX) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Navigate to="/admin/dashboard" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <SEO title="Admin Dashboard | Daxira InfoTech" noindex={true} />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/inquiries"
              element={
                <ProtectedRoute>
                  <SEO title="Inquiries Management | Daxira InfoTech" noindex={true} />
                  <Inquiries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faqs"
              element={
                <ProtectedRoute>
                  <SEO title="FAQs Management | Daxira InfoTech" noindex={true} />
                  <Faqs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pricing"
              element={
                <ProtectedRoute>
                  <SEO title="Pricing Management | Daxira InfoTech" noindex={true} />
                  <Pricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <SEO title="Projects Management | Daxira InfoTech" noindex={true} />
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admin-users"
              element={
                <ProtectedRoute superAdminOnly={true}>
                  <SEO title="Admin Users | Daxira InfoTech" noindex={true} />
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/activity-logs"
              element={
                <ProtectedRoute>
                  <SEO title="Activity Logs | Daxira InfoTech" noindex={true} />
                  <ActivityLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <SEO title="Admin Settings | Daxira InfoTech" noindex={true} />
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* FALLBACK CATCH-ALL */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
