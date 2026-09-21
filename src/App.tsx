import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext.tsx';
import { ToastProvider } from './components/admin/ToastNotification.tsx';
import { ProtectedRoute } from './components/admin/ProtectedRoute.tsx';

// Public Website Components (100% Intact & Untouched)
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
 * Public Landing Page Component
 * Preserves the exact design, layout, animations, and state flow of Daxira InfoTech.
 */
function PublicWebsite() {
  const [selectedScope, setSelectedScope] = useState<string>('commercial_web');
  const [selectedBudget, setSelectedBudget] = useState<string>('growth');

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
            {/* PUBLIC WEBSITE ROUTE */}
            <Route path="/" element={<PublicWebsite />} />

            {/* ADMIN AUTHENTICATION */}
            <Route path="/admin/login" element={<Login />} />

            {/* ADMIN PROTECTED ROUTES */}
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
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/inquiries"
              element={
                <ProtectedRoute>
                  <Inquiries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faqs"
              element={
                <ProtectedRoute>
                  <Faqs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pricing"
              element={
                <ProtectedRoute>
                  <Pricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admin-users"
              element={
                <ProtectedRoute superAdminOnly={true}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/activity-logs"
              element={
                <ProtectedRoute>
                  <ActivityLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
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
