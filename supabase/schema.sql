-- =====================================================================
-- DAXIRA INFOTECH — PRODUCTION HARDENED SUPABASE SCHEMA & RLS POLICIES
-- =====================================================================
-- This script configures all database tables, foreign keys, triggers,
-- indexes, Row Level Security (RLS) policies, and validation checks.
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
    name VARCHAR(150) NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 150),
    business VARCHAR(200) CHECK (business IS NULL OR char_length(business) <= 200),
    email VARCHAR(255) NOT NULL CHECK (char_length(email) >= 5 AND char_length(email) <= 255),
    phone VARCHAR(40) NOT NULL CHECK (char_length(phone) >= 7 AND char_length(phone) <= 40),
    service VARCHAR(80) NOT NULL DEFAULT 'commercial_web' CHECK (char_length(service) <= 80),
    budget VARCHAR(50) NOT NULL DEFAULT 'growth' CHECK (char_length(budget) <= 50),
    message TEXT NOT NULL CHECK (char_length(message) >= 5 AND char_length(message) <= 5000),
    status VARCHAR(30) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Converted', 'Closed')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.3 FAQS (Frequently Asked Questions)
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL CHECK (char_length(question) >= 5),
    answer TEXT NOT NULL CHECK (char_length(answer) >= 5),
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
-- 3. INDEXES FOR QUERY OPTIMIZATION
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_faqs_active_order ON public.faqs(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_pricing_active_order ON public.pricing_plans(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_active_order ON public.projects(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- =====================================================================
-- 4. SECURITY & HELPER FUNCTIONS (WITH SEARCH_PATH HARDENING)
-- =====================================================================

-- Check if current authenticated user is an active admin
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public, auth
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
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND is_active = true AND role = 'super_admin'
  );
$$;

-- Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

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
-- 5. ROW LEVEL SECURITY (RLS) POLICIES — LEAST PRIVILEGE
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
DROP POLICY IF EXISTS "Admins can view admin profiles" ON public.admin_profiles;
CREATE POLICY "Admins can view admin profiles"
ON public.admin_profiles FOR SELECT
TO authenticated
USING (public.is_active_admin());

DROP POLICY IF EXISTS "Super admins can manage admin profiles" ON public.admin_profiles;
CREATE POLICY "Super admins can manage admin profiles"
ON public.admin_profiles FOR ALL
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- 5.2 INQUIRIES POLICIES (Hardened public insert validation)
DROP POLICY IF EXISTS "Public users can insert inquiries" ON public.inquiries;
CREATE POLICY "Public users can insert inquiries"
ON public.inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'New' AND
  (admin_notes IS NULL OR admin_notes = '') AND
  char_length(name) >= 2 AND char_length(name) <= 150 AND
  char_length(email) >= 5 AND char_length(email) <= 255 AND
  char_length(phone) >= 7 AND char_length(phone) <= 40 AND
  char_length(message) >= 5 AND char_length(message) <= 5000
);

DROP POLICY IF EXISTS "Admins can view inquiries" ON public.inquiries;
CREATE POLICY "Admins can view inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;
CREATE POLICY "Admins can update inquiries"
ON public.inquiries FOR UPDATE
TO authenticated
USING (public.is_active_admin())
WITH CHECK (public.is_active_admin());

DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.inquiries;
CREATE POLICY "Admins can delete inquiries"
ON public.inquiries FOR DELETE
TO authenticated
USING (public.is_active_admin());

-- 5.3 FAQS POLICIES
DROP POLICY IF EXISTS "Public can view active FAQs" ON public.faqs;
CREATE POLICY "Public can view active FAQs"
ON public.faqs FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.is_active_admin());

DROP POLICY IF EXISTS "Admins can manage FAQs" ON public.faqs;
CREATE POLICY "Admins can manage FAQs"
ON public.faqs FOR ALL
TO authenticated
USING (public.is_active_admin())
WITH CHECK (public.is_active_admin());

-- 5.4 PRICING PLANS POLICIES
DROP POLICY IF EXISTS "Public can view active pricing plans" ON public.pricing_plans;
CREATE POLICY "Public can view active pricing plans"
ON public.pricing_plans FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.is_active_admin());

DROP POLICY IF EXISTS "Admins can manage pricing plans" ON public.pricing_plans;
CREATE POLICY "Admins can manage pricing plans"
ON public.pricing_plans FOR ALL
TO authenticated
USING (public.is_active_admin())
WITH CHECK (public.is_active_admin());

-- 5.5 PROJECTS POLICIES
DROP POLICY IF EXISTS "Public can view active projects" ON public.projects;
CREATE POLICY "Public can view active projects"
ON public.projects FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.is_active_admin());

DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
CREATE POLICY "Admins can manage projects"
ON public.projects FOR ALL
TO authenticated
USING (public.is_active_admin())
WITH CHECK (public.is_active_admin());

-- 5.6 ACTIVITY LOGS POLICIES (Immutable: Only view and insert by authenticated admins)
DROP POLICY IF EXISTS "Admins can view activity logs" ON public.activity_logs;
CREATE POLICY "Admins can view activity logs"
ON public.activity_logs FOR SELECT
TO authenticated
USING (public.is_active_admin());

DROP POLICY IF EXISTS "Admins can insert activity logs" ON public.activity_logs;
CREATE POLICY "Admins can insert activity logs"
ON public.activity_logs FOR INSERT
TO authenticated
WITH CHECK (public.is_active_admin());

-- 5.7 SYSTEM SETTINGS POLICIES
DROP POLICY IF EXISTS "Admins can view system settings" ON public.system_settings;
CREATE POLICY "Admins can view system settings"
ON public.system_settings FOR SELECT
TO authenticated
USING (public.is_active_admin());

DROP POLICY IF EXISTS "Super admins can update system settings" ON public.system_settings;
CREATE POLICY "Super admins can update system settings"
ON public.system_settings FOR ALL
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- =====================================================================
-- 6. HOW TO CONFIGURE YOUR SUPER ADMIN USER
-- =====================================================================
-- Step 1: In Supabase Dashboard -> Authentication -> Users, click 'Add User'.
-- Step 2: Provide your admin email and a strong password.
-- Step 3: Run the command below replacing <USER_UUID> with the newly created user's ID:
--
-- INSERT INTO public.admin_profiles (id, email, full_name, role, is_active)
-- VALUES ('<USER_UUID>', 'admin@daxira.com', 'Darshit Sapariya', 'super_admin', true)
-- ON CONFLICT (id) DO UPDATE SET role = 'super_admin', is_active = true;
-- =====================================================================
