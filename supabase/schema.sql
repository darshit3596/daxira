-- =====================================================================
-- DAXIRA INFOTECH — COMPLETE SUPABASE DATABASE SCHEMA & RLS POLICIES
-- =====================================================================
-- This script configures all database tables, foreign keys, triggers,
-- indexes, Row Level Security (RLS) policies, and initial seed data.
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query).
-- =====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================================
-- 2. TABLES DEFINITIONS
-- =====================================================================

-- 2.1 ADMIN PROFILES (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL DEFAULT 'Admin User',
    role VARCHAR(30) NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.2 CONSULTATION INQUIRIES
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    business VARCHAR(200),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    service VARCHAR(80) NOT NULL DEFAULT 'commercial_web',
    budget VARCHAR(50) NOT NULL DEFAULT 'growth',
    message TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Converted', 'Closed')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.3 FAQS (Frequently Asked Questions)
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(80) DEFAULT 'General',
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.4 PRICING PLANS
CREATE TABLE IF NOT EXISTS public.pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    starting_price VARCHAR(80) NOT NULL,
    price_range VARCHAR(100),
    domain_hosting VARCHAR(150),
    description TEXT NOT NULL,
    timeline VARCHAR(80),
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    scope_value VARCHAR(80) NOT NULL DEFAULT 'commercial_web',
    button_text VARCHAR(80) NOT NULL DEFAULT 'Select Scope',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.5 DELIVERED CLIENT PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    client_business VARCHAR(200) NOT NULL,
    category VARCHAR(80) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT NOT NULL,
    image_url TEXT,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    live_url TEXT,
    completion_date VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.6 AUDIT ACTIVITY LOGS (Immutable security logs)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    admin_email VARCHAR(255) NOT NULL,
    action VARCHAR(80) NOT NULL,
    module VARCHAR(80) NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.7 SYSTEM & STUDIO SETTINGS
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- 3. INDEXES FOR HIGH QUERY PERFORMANCE
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_faqs_active_order ON public.faqs(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_pricing_active_order ON public.pricing_plans(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_active_order ON public.projects(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- =====================================================================
-- 4. SECURITY & HELPER FUNCTIONS
-- =====================================================================

-- Check if current authenticated user is an active admin
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND is_active = true
  );
$$;

-- Check if current authenticated user is a super_admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND is_active = true AND role = 'super_admin'
  );
$$;

-- Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS set_updated_at_inquiries ON public.inquiries;
CREATE TRIGGER set_updated_at_inquiries
BEFORE UPDATE ON public.inquiries
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_faqs ON public.faqs;
CREATE TRIGGER set_updated_at_faqs
BEFORE UPDATE ON public.faqs
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_pricing ON public.pricing_plans;
CREATE TRIGGER set_updated_at_pricing
BEFORE UPDATE ON public.pricing_plans
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_projects ON public.projects;
CREATE TRIGGER set_updated_at_projects
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

-- Enable RLS on ALL tables
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- 5.1 ADMIN PROFILES POLICIES
-- Active admins can read profiles
CREATE POLICY "Admins can view admin profiles"
ON public.admin_profiles FOR SELECT
TO authenticated
USING (public.is_active_admin());

-- Only super admins can insert, update, or delete profiles
CREATE POLICY "Super admins can manage admin profiles"
ON public.admin_profiles FOR ALL
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- 5.2 INQUIRIES POLICIES
-- Public & Anon can submit new inquiries (INSERT only)
CREATE POLICY "Public users can insert inquiries"
ON public.inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only active admins can read inquiries
CREATE POLICY "Admins can view inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (public.is_active_admin());

-- Only active admins can update inquiries
CREATE POLICY "Admins can update inquiries"
ON public.inquiries FOR UPDATE
TO authenticated
USING (public.is_active_admin())
WITH CHECK (public.is_active_admin());

-- Only active admins can delete inquiries
CREATE POLICY "Admins can delete inquiries"
ON public.inquiries FOR DELETE
TO authenticated
USING (public.is_active_admin());

-- 5.3 FAQS POLICIES
-- Public can read active FAQs
CREATE POLICY "Public can view active FAQs"
ON public.faqs FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.is_active_admin());

-- Admins can manage FAQs
CREATE POLICY "Admins can manage FAQs"
ON public.faqs FOR ALL
TO authenticated
USING (public.is_active_admin())
WITH CHECK (public.is_active_admin());

-- 5.4 PRICING PLANS POLICIES
-- Public can read active pricing plans
CREATE POLICY "Public can view active pricing plans"
ON public.pricing_plans FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.is_active_admin());

-- Admins can manage pricing plans
CREATE POLICY "Admins can manage pricing plans"
ON public.pricing_plans FOR ALL
TO authenticated
USING (public.is_active_admin())
WITH CHECK (public.is_active_admin());

-- 5.5 PROJECTS POLICIES
-- Public can read active projects
CREATE POLICY "Public can view active projects"
ON public.projects FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.is_active_admin());

-- Admins can manage projects
CREATE POLICY "Admins can manage projects"
ON public.projects FOR ALL
TO authenticated
USING (public.is_active_admin())
WITH CHECK (public.is_active_admin());

-- 5.6 ACTIVITY LOGS POLICIES
-- Only active admins can view audit logs
CREATE POLICY "Admins can view activity logs"
ON public.activity_logs FOR SELECT
TO authenticated
USING (public.is_active_admin());

-- Active admins can insert activity logs
CREATE POLICY "Admins can insert activity logs"
ON public.activity_logs FOR INSERT
TO authenticated
WITH CHECK (public.is_active_admin());

-- No one can update or delete activity logs (Immutable)

-- 5.7 SYSTEM SETTINGS POLICIES
CREATE POLICY "Admins can view system settings"
ON public.system_settings FOR SELECT
TO authenticated
USING (public.is_active_admin());

CREATE POLICY "Super admins can update system settings"
ON public.system_settings FOR ALL
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- =====================================================================
-- 6. SEED DATA (Default FAQs, Pricing, Projects)
-- =====================================================================

-- 6.1 SEED FAQS
INSERT INTO public.faqs (question, answer, category, display_order, is_active)
VALUES
(
  'How much does a website cost?',
  'A Business Website typically ranges between ₹4,000 and ₹7,000 (starting from ₹4,000). An E-Commerce Website ranges between ₹11,000 and ₹15,000. Custom Web Applications start from ₹18,000+ based on specific requirements. Domain and hosting costs are additional based on actual provider cost without markup. After our first discussion, you will receive a fixed, itemized quote.',
  'Pricing',
  1,
  true
),
(
  'How long will it take to build my website?',
  'A standard 3 to 5 page business website usually takes 1 to 2 weeks. An online store takes 2 to 3 weeks. Custom web applications typically take 3 to 6 weeks depending on the features you need. We give you a clear completion date before starting.',
  'Timelines',
  2,
  true
),
(
  'Do I need to buy web hosting and a domain beforehand?',
  'No, you don''t need to buy anything in advance. If you already have a domain or hosting, we can use that. If not, we will guide you to buy the right domain and set up fast, affordable, and secure hosting for you.',
  'Hosting & Setup',
  3,
  true
),
(
  'Can you redesign and speed up my current website?',
  'Yes! If your existing website is slow, looks outdated, or doesn''t work well on mobile phones, we can rebuild it. We keep the content you like, modernize the design, and make it load in under a second.',
  'Redesign',
  4,
  true
),
(
  'Do you work with clients outside Gujarat or India?',
  'Yes. We work with clients across India and internationally. We communicate easily through WhatsApp, phone calls, and Google Meet, and share private preview links so you can see your website as we build it.',
  'Communication',
  5,
  true
),
(
  'What if I don''t have all the text or photos ready?',
  'That is completely normal! We help you organize the pages you need, write clean and simple text for your services, and supply quality photos until your own official pictures are ready.',
  'Content',
  6,
  true
),
(
  'Will my website look good on mobile phones?',
  'Yes, 100%. More than 70% of people browse the web on their phones. We test every page thoroughly on iPhones, Android phones, and tablets to ensure buttons are easy to tap and text is comfortable to read.',
  'Mobile Design',
  7,
  true
),
(
  'What support do I get after the website is launched?',
  'Every project includes 30 days of free post-launch support for any minor tweaks, text changes, or questions. After that, we also offer simple monthly maintenance plans if you want us to handle updates and backups for you.',
  'Support',
  8,
  true
)
ON CONFLICT DO NOTHING;

-- 6.2 SEED PRICING PLANS
INSERT INTO public.pricing_plans (name, starting_price, price_range, domain_hosting, description, timeline, features, is_popular, is_active, display_order, scope_value, button_text)
VALUES
(
  'Business Website',
  '₹4,000',
  '₹4,000 – ₹7,000',
  'Additional / Based on actual provider cost',
  'Best for local businesses, shops, consultants, and service providers who need a clean, mobile-optimized website to attract inquiries.',
  '1 to 2 Weeks',
  '["Custom responsive design (Home, About, Services, Contact, etc.)", "Direct WhatsApp chat button & click-to-call for quick inquiries", "Fast page load speed tested on Android and iOS devices", "Google Search & Maps visibility setup (basic local SEO)", "Contact inquiry form connected directly to your email/phone", "30 days of free support after launch for any tweaks"]'::jsonb,
  false,
  true,
  1,
  'commercial_web',
  'Get a Free Quote'
),
(
  'E-Commerce Website',
  '₹11,000',
  '₹11,000 – ₹15,000',
  'Additional / Based on actual provider cost',
  'Best for businesses wanting to sell products online and accept payments directly into their bank account.',
  '2 to 3 Weeks',
  '["Full online store with catalog, search, categories & product variants", "Accept UPI, Google Pay, PhonePe, Debit/Credit Cards & Net Banking", "Instant order confirmations sent to customer WhatsApp or email", "Easy admin dashboard to add products, adjust prices and manage stock", "Cart, checkout, coupon discount codes & invoice generation", "30 days of free support after launch for any questions"]'::jsonb,
  true,
  true,
  2,
  'ecommerce',
  'Get a Free Quote'
),
(
  'Custom Web Application',
  '₹18,000+',
  '₹18,000+ according to requirement',
  'Additional / Based on actual provider cost',
  'Best for businesses that need custom management portals, internal billing systems, or specialized database workflows.',
  '3 to 6 Weeks',
  '["Custom software built around your exact business processes", "Secure user logins, staff permissions, and role management", "Automated PDF receipts, billing, invoice generation & reports", "Connects to hardware (printers/scanners) or third-party APIs", "Offline-first or cloud-hosted database architecture", "Full walkthrough training and 60 days of free support"]'::jsonb,
  false,
  true,
  3,
  'custom_app',
  'Get a Free Quote'
)
ON CONFLICT DO NOTHING;

-- 6.3 SEED PROJECTS
INSERT INTO public.projects (title, client_business, category, subtitle, description, technologies, completion_date, is_active, display_order)
VALUES
(
  'Vyaparix',
  'Retail Client',
  'Custom Software',
  'Complete Business Management & Billing System',
  'A complete billing and business management system custom-built and successfully delivered for a retail client. It solves slow manual billing, stock confusion, and lost receipts by letting the business generate GST bills in seconds, track inventory in real-time, and send invoices directly to customer WhatsApp numbers—even when the internet is down.',
  '["Desktop Application", "Fast Local Database", "WhatsApp Integration", "Thermal Printer Ready"]'::jsonb,
  'Delivered & In Daily Use',
  true,
  1
)
ON CONFLICT DO NOTHING;

-- =====================================================================
-- 7. HOW TO CREATE YOUR FIRST SUPER ADMIN USER
-- =====================================================================
-- Step 1: Go to Supabase Dashboard -> Authentication -> Users -> Add User.
-- Step 2: Enter your email (e.g., admin@daxira.com) and password.
-- Step 3: Copy the generated User UID and run the query below:
--
-- INSERT INTO public.admin_profiles (id, email, full_name, role, is_active)
-- VALUES ('<YOUR-USER-UUID-HERE>', 'admin@daxira.com', 'Darshit Sapariya', 'super_admin', true);
-- =====================================================================
