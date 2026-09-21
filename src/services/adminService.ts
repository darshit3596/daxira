import { supabase, isSupabaseConfigured } from '../lib/supabase.ts';

// ----------------------------------------------------
// TYPES & INTERFACES
// ----------------------------------------------------

export type AdminRole = 'super_admin' | 'admin';

export interface AdminProfile {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
  avatar_url?: string;
  created_at: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';

export interface Inquiry {
  id: string;
  name: string;
  business?: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  status: InquiryStatus;
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  starting_price: string;
  price_range?: string;
  domain_hosting?: string;
  description: string;
  timeline?: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
  scope_value: string;
  button_text: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  client_business: string;
  category: string;
  subtitle?: string;
  description: string;
  image_url?: string;
  technologies: string[];
  live_url?: string;
  completion_date?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  admin_id?: string;
  admin_email: string;
  action: string;
  module: string;
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  totalFaqs: number;
  activeFaqs: number;
  totalPricingPlans: number;
  activePricingPlans: number;
  totalProjects: number;
  totalAdmins: number;
}

// ----------------------------------------------------
// LOCAL STORAGE DEMO CACHE (Initial Fallback)
// ----------------------------------------------------

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Rajesh Sharma',
    business: 'Sharma Logistics & Transport',
    email: 'rajesh@sharmalogistics.in',
    phone: '+91 98765 43210',
    service: 'commercial_web',
    budget: 'starter',
    message: 'Need a modern 5-page website with WhatsApp lead tracking for our fleet management company in Ahmedabad.',
    status: 'New',
    admin_notes: 'High priority lead. Scheduled callback for tomorrow 11 AM.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'inq-2',
    name: 'Priya Patel',
    business: 'Vedic Organic Essentials',
    email: 'priya@vedicorganic.com',
    phone: '+91 98250 11223',
    service: 'ecommerce_payments',
    budget: 'growth',
    message: 'We are launching a line of organic beauty items and need an online shop with Razorpay and automatic invoices.',
    status: 'Contacted',
    admin_notes: 'Sent initial pricing scope. Waiting for product catalog spreadsheet.',
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
  },
  {
    id: 'inq-3',
    name: 'Amitabh Verma',
    business: 'Nexora HealthTech',
    email: 'amitabh@nexora.health',
    phone: '+91 99001 88776',
    service: 'fullstack_saas',
    budget: 'application',
    message: 'Looking for a custom patient appointment and doctor consultation booking portal with role authentication.',
    status: 'In Progress',
    admin_notes: 'Architecture wireframe approved. Sprint 1 kickoff on Monday.',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
  {
    id: 'inq-4',
    name: 'Sunil Mehta',
    business: 'Mehta & Sons Jewellers',
    email: 'sunil@mehtajewels.in',
    phone: '+91 94260 55443',
    service: 'commercial_web',
    budget: 'growth',
    message: 'We want to revamp our showroom showcase website with fast mobile loading and video galleries.',
    status: 'Converted',
    admin_notes: 'Project completed and delivered on time. Client rated 5 stars.',
    created_at: new Date(Date.now() - 3600000 * 120).toISOString(),
  },
];

const INITIAL_FAQS: Faq[] = [
  {
    id: 'faq-1',
    question: 'How much does a website cost?',
    answer:
      'A Business Website typically ranges between ₹4,000 and ₹7,000 (starting from ₹4,000). An E-Commerce Website ranges between ₹11,000 and ₹15,000. Custom Web Applications start from ₹18,000+ based on specific requirements. Domain and hosting costs are additional based on actual provider cost without markup. After our first discussion, you will receive a fixed, itemized quote.',
    category: 'Pricing',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-2',
    question: 'How long will it take to build my website?',
    answer:
      'A standard 3 to 5 page business website usually takes 1 to 2 weeks. An online store takes 2 to 3 weeks. Custom web applications typically take 3 to 6 weeks depending on the features you need. We give you a clear completion date before starting.',
    category: 'Timelines',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-3',
    question: 'Do I need to buy web hosting and a domain beforehand?',
    answer:
      "No, you don't need to buy anything in advance. If you already have a domain or hosting, we can use that. If not, we will guide you to buy the right domain and set up fast, affordable, and secure hosting for you.",
    category: 'Hosting & Setup',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-4',
    question: 'Can you redesign and speed up my current website?',
    answer:
      "Yes! If your existing website is slow, looks outdated, or doesn't work well on mobile phones, we can rebuild it. We keep the content you like, modernize the design, and make it load in under a second.",
    category: 'Redesign',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-5',
    question: 'Do you work with clients outside Gujarat or India?',
    answer:
      'Yes. We work with clients across India and internationally. We communicate easily through WhatsApp, phone calls, and Google Meet, and share private preview links so you can see your website as we build it.',
    category: 'Communication',
    display_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-6',
    question: "What if I don't have all the text or photos ready?",
    answer:
      'That is completely normal! We help you organize the pages you need, write clean and simple text for your services, and supply quality photos until your own official pictures are ready.',
    category: 'Content',
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-7',
    question: 'Will my website look good on mobile phones?',
    answer:
      'Yes, 100%. More than 70% of people browse the web on their phones. We test every page thoroughly on iPhones, Android phones, and tablets to ensure buttons are easy to tap and text is comfortable to read.',
    category: 'Mobile Design',
    display_order: 7,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-8',
    question: 'What support do I get after the website is launched?',
    answer:
      'Every project includes 30 days of free post-launch support for any minor tweaks, text changes, or questions. After that, we also offer simple monthly maintenance plans if you want us to handle updates and backups for you.',
    category: 'Support',
    display_order: 8,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

const INITIAL_PRICING: PricingPlan[] = [
  {
    id: 'plan-1',
    name: 'Business Website',
    starting_price: '₹4,000',
    price_range: '₹4,000 – ₹7,000',
    domain_hosting: 'Additional / Based on actual provider cost',
    description:
      'Best for local businesses, shops, consultants, and service providers who need a clean, mobile-optimized website to attract inquiries.',
    timeline: '1 to 2 Weeks',
    features: [
      'Custom responsive design (Home, About, Services, Contact, etc.)',
      'Direct WhatsApp chat button & click-to-call for quick inquiries',
      'Fast page load speed tested on Android and iOS devices',
      'Google Search & Maps visibility setup (basic local SEO)',
      'Contact inquiry form connected directly to your email/phone',
      '30 days of free support after launch for any tweaks',
    ],
    is_popular: false,
    is_active: true,
    display_order: 1,
    scope_value: 'commercial_web',
    button_text: 'Get a Free Quote',
    created_at: new Date().toISOString(),
  },
  {
    id: 'plan-2',
    name: 'E-Commerce Website',
    starting_price: '₹11,000',
    price_range: '₹11,000 – ₹15,000',
    domain_hosting: 'Additional / Based on actual provider cost',
    description:
      'Best for businesses wanting to sell products online and accept payments directly into their bank account.',
    timeline: '2 to 3 Weeks',
    features: [
      'Full online store with catalog, search, categories & product variants',
      'Accept UPI, Google Pay, PhonePe, Debit/Credit Cards & Net Banking',
      'Instant order confirmations sent to customer WhatsApp or email',
      'Easy admin dashboard to add products, adjust prices and manage stock',
      'Cart, checkout, coupon discount codes & invoice generation',
      '30 days of free support after launch for any questions',
    ],
    is_popular: true,
    is_active: true,
    display_order: 2,
    scope_value: 'ecommerce',
    button_text: 'Get a Free Quote',
    created_at: new Date().toISOString(),
  },
  {
    id: 'plan-3',
    name: 'Custom Web Application',
    starting_price: '₹18,000+',
    price_range: '₹18,000+ according to requirement',
    domain_hosting: 'Additional / Based on actual provider cost',
    description:
      'Best for businesses that need custom management portals, internal billing systems, or specialized database workflows.',
    timeline: '3 to 6 Weeks',
    features: [
      'Custom software built around your exact business processes',
      'Secure user logins, staff permissions, and role management',
      'Automated PDF receipts, billing, invoice generation & reports',
      'Connects to hardware (printers/scanners) or third-party APIs',
      'Offline-first or cloud-hosted database architecture',
      'Full walkthrough training and 60 days of free support',
    ],
    is_popular: false,
    is_active: true,
    display_order: 3,
    scope_value: 'custom_app',
    button_text: 'Get a Free Quote',
    created_at: new Date().toISOString(),
  },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Vyaparix',
    client_business: 'Retail Client',
    category: 'Custom Software',
    subtitle: 'Complete Business Management & Billing System',
    description:
      'A complete billing and business management system custom-built and successfully delivered for a retail client. It solves slow manual billing, stock confusion, and lost receipts by letting the business generate GST bills in seconds, track inventory in real-time, and send invoices directly to customer WhatsApp numbers—even when the internet is down.',
    technologies: [
      'Desktop Application',
      'Fast Local Database',
      'WhatsApp Integration',
      'Thermal Printer Ready',
    ],
    live_url: '',
    completion_date: 'Delivered & In Daily Use',
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
];

const INITIAL_ADMINS: AdminProfile[] = [
  {
    id: 'admin-darshit',
    email: 'admin@daxira.com',
    full_name: 'Darshit Sapariya',
    role: 'super_admin',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'admin-support',
    email: 'support@daxira.com',
    full_name: 'Operations Team',
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    admin_email: 'admin@daxira.com',
    action: 'LOGIN',
    module: 'Authentication',
    description: 'Super Admin logged in successfully from Dashboard',
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'log-2',
    admin_email: 'admin@daxira.com',
    action: 'INQUIRY_STATUS_UPDATE',
    module: 'Inquiries',
    description: 'Updated inquiry status for "Rajesh Sharma" to New with callback notes',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'log-3',
    admin_email: 'support@daxira.com',
    action: 'FAQ_UPDATE',
    module: 'FAQs',
    description: 'Updated answer wording for FAQ item #1 regarding pricing estimates',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

// Helper to get / set LocalStorage
function getLocal<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(`daxira_${key}`);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(`daxira_${key}`, JSON.stringify(val));
  } catch {
    // Ignore storage quota
  }
}

// ----------------------------------------------------
// ADMIN DATA SERVICE CLASS
// ----------------------------------------------------

export const adminService = {
  // --------------------------------------------------
  // INQUIRIES
  // --------------------------------------------------
  async getInquiries(): Promise<Inquiry[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) return data as Inquiry[];
      } catch (err) {
        console.warn('Supabase inquiries query fallback to local cache:', err);
      }
    }
    return getLocal<Inquiry[]>('inquiries', INITIAL_INQUIRIES);
  },

  async createInquiry(payload: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      ...payload,
      id: isSupabaseConfigured ? undefined as unknown as string : `inq-${Date.now()}`,
      status: 'New',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .insert([
            {
              name: payload.name,
              business: payload.business,
              email: payload.email,
              phone: payload.phone,
              service: payload.service,
              budget: payload.budget,
              message: payload.message,
              status: 'New',
            },
          ])
          .select()
          .single();
        if (error) throw error;
        if (data) return data as Inquiry;
      } catch (err) {
        console.warn('Supabase insert inquiry fallback to local:', err);
      }
    }

    const current = getLocal<Inquiry[]>('inquiries', INITIAL_INQUIRIES);
    const updated = [newInquiry, ...current];
    setLocal('inquiries', updated);
    return newInquiry;
  },

  async updateInquiry(id: string, updates: Partial<Inquiry>): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('inquiries')
          .update(updates)
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase update inquiry fallback to local:', err);
      }
    }

    const list = getLocal<Inquiry[]>('inquiries', INITIAL_INQUIRIES);
    const idx = list.findIndex((i) => i.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates, updated_at: new Date().toISOString() };
      setLocal('inquiries', list);
      return true;
    }
    return false;
  },

  async deleteInquiry(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('inquiries').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase delete inquiry fallback to local:', err);
      }
    }

    const list = getLocal<Inquiry[]>('inquiries', INITIAL_INQUIRIES);
    const filtered = list.filter((i) => i.id !== id);
    setLocal('inquiries', filtered);
    return true;
  },

  // --------------------------------------------------
  // FAQS
  // --------------------------------------------------
  async getFaqs(onlyActive = false): Promise<Faq[]> {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('faqs').select('*').order('display_order', { ascending: true });
        if (onlyActive) {
          query = query.eq('is_active', true);
        }
        const { data, error } = await query;
        if (error) throw error;
        if (data && data.length > 0) return data as Faq[];
      } catch (err) {
        console.warn('Supabase faqs query fallback:', err);
      }
    }

    const list = getLocal<Faq[]>('faqs', INITIAL_FAQS);
    return onlyActive ? list.filter((f) => f.is_active) : list;
  },

  async createFaq(faq: Omit<Faq, 'id' | 'created_at'>): Promise<Faq> {
    const newFaq: Faq = {
      ...faq,
      id: `faq-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('faqs').insert([faq]).select().single();
        if (error) throw error;
        if (data) return data as Faq;
      } catch (err) {
        console.warn('Supabase create faq fallback:', err);
      }
    }

    const list = getLocal<Faq[]>('faqs', INITIAL_FAQS);
    const updated = [...list, newFaq];
    setLocal('faqs', updated);
    return newFaq;
  },

  async updateFaq(id: string, updates: Partial<Faq>): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('faqs').update(updates).eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase update faq fallback:', err);
      }
    }

    const list = getLocal<Faq[]>('faqs', INITIAL_FAQS);
    const idx = list.findIndex((f) => f.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setLocal('faqs', list);
      return true;
    }
    return false;
  },

  async deleteFaq(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('faqs').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase delete faq fallback:', err);
      }
    }

    const list = getLocal<Faq[]>('faqs', INITIAL_FAQS);
    setLocal('faqs', list.filter((f) => f.id !== id));
    return true;
  },

  // --------------------------------------------------
  // PRICING PLANS
  // --------------------------------------------------
  async getPricingPlans(onlyActive = false): Promise<PricingPlan[]> {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('pricing_plans').select('*').order('display_order', { ascending: true });
        if (onlyActive) {
          query = query.eq('is_active', true);
        }
        const { data, error } = await query;
        if (error) throw error;
        if (data && data.length > 0) return data as PricingPlan[];
      } catch (err) {
        console.warn('Supabase pricing query fallback:', err);
      }
    }

    const list = getLocal<PricingPlan[]>('pricing', INITIAL_PRICING);
    return onlyActive ? list.filter((p) => p.is_active) : list;
  },

  async createPricingPlan(plan: Omit<PricingPlan, 'id' | 'created_at'>): Promise<PricingPlan> {
    const newPlan: PricingPlan = {
      ...plan,
      id: `plan-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('pricing_plans').insert([plan]).select().single();
        if (error) throw error;
        if (data) return data as PricingPlan;
      } catch (err) {
        console.warn('Supabase create pricing fallback:', err);
      }
    }

    const list = getLocal<PricingPlan[]>('pricing', INITIAL_PRICING);
    const updated = [...list, newPlan];
    setLocal('pricing', updated);
    return newPlan;
  },

  async updatePricingPlan(id: string, updates: Partial<PricingPlan>): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('pricing_plans').update(updates).eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase update pricing fallback:', err);
      }
    }

    const list = getLocal<PricingPlan[]>('pricing', INITIAL_PRICING);
    const idx = list.findIndex((p) => p.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setLocal('pricing', list);
      return true;
    }
    return false;
  },

  async deletePricingPlan(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('pricing_plans').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase delete pricing fallback:', err);
      }
    }

    const list = getLocal<PricingPlan[]>('pricing', INITIAL_PRICING);
    setLocal('pricing', list.filter((p) => p.id !== id));
    return true;
  },

  // --------------------------------------------------
  // DELIVERED PROJECTS
  // --------------------------------------------------
  async getProjects(onlyActive = false): Promise<Project[]> {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('projects').select('*').order('display_order', { ascending: true });
        if (onlyActive) {
          query = query.eq('is_active', true);
        }
        const { data, error } = await query;
        if (error) throw error;
        if (data && data.length > 0) return data as Project[];
      } catch (err) {
        console.warn('Supabase projects query fallback:', err);
      }
    }

    const list = getLocal<Project[]>('projects', INITIAL_PROJECTS);
    return onlyActive ? list.filter((p) => p.is_active) : list;
  },

  async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('projects').insert([project]).select().single();
        if (error) throw error;
        if (data) return data as Project;
      } catch (err) {
        console.warn('Supabase create project fallback:', err);
      }
    }

    const list = getLocal<Project[]>('projects', INITIAL_PROJECTS);
    const updated = [...list, newProj];
    setLocal('projects', updated);
    return newProj;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('projects').update(updates).eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase update project fallback:', err);
      }
    }

    const list = getLocal<Project[]>('projects', INITIAL_PROJECTS);
    const idx = list.findIndex((p) => p.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setLocal('projects', list);
      return true;
    }
    return false;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase delete project fallback:', err);
      }
    }

    const list = getLocal<Project[]>('projects', INITIAL_PROJECTS);
    setLocal('projects', list.filter((p) => p.id !== id));
    return true;
  },

  // --------------------------------------------------
  // ADMIN USERS & PROFILES
  // --------------------------------------------------
  async getAdminProfiles(): Promise<AdminProfile[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('admin_profiles')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) return data as AdminProfile[];
      } catch (err) {
        console.warn('Supabase admin profiles query fallback:', err);
      }
    }

    return getLocal<AdminProfile[]>('admins', INITIAL_ADMINS);
  },

  async createAdminProfile(profile: Omit<AdminProfile, 'id' | 'created_at'>): Promise<AdminProfile> {
    const newProfile: AdminProfile = {
      ...profile,
      id: `admin-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('admin_profiles')
          .insert([profile])
          .select()
          .single();
        if (error) throw error;
        if (data) return data as AdminProfile;
      } catch (err) {
        console.warn('Supabase create admin profile fallback:', err);
      }
    }

    const list = getLocal<AdminProfile[]>('admins', INITIAL_ADMINS);
    const updated = [newProfile, ...list];
    setLocal('admins', updated);
    return newProfile;
  },

  async updateAdminProfile(id: string, updates: Partial<AdminProfile>): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('admin_profiles').update(updates).eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase update admin profile fallback:', err);
      }
    }

    const list = getLocal<AdminProfile[]>('admins', INITIAL_ADMINS);
    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setLocal('admins', list);
      return true;
    }
    return false;
  },

  async deleteAdminProfile(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('admin_profiles').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.warn('Supabase delete admin profile fallback:', err);
      }
    }

    const list = getLocal<AdminProfile[]>('admins', INITIAL_ADMINS);
    setLocal('admins', list.filter((a) => a.id !== id));
    return true;
  },

  // --------------------------------------------------
  // ACTIVITY LOGS
  // --------------------------------------------------
  async getActivityLogs(): Promise<ActivityLog[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
        if (error) throw error;
        if (data && data.length > 0) return data as ActivityLog[];
      } catch (err) {
        console.warn('Supabase activity logs fallback:', err);
      }
    }

    return getLocal<ActivityLog[]>('logs', INITIAL_LOGS);
  },

  async logActivity(
    action: string,
    module: string,
    description: string,
    adminEmail = 'admin@daxira.com',
    adminId?: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      admin_id: adminId,
      admin_email: adminEmail,
      action,
      module,
      description,
      metadata: metadata || {},
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from('activity_logs').insert([
          {
            admin_id: adminId,
            admin_email: adminEmail,
            action,
            module,
            description,
            metadata: metadata || {},
          },
        ]);
      } catch (err) {
        console.warn('Supabase log activity fallback:', err);
      }
    }

    const logs = getLocal<ActivityLog[]>('logs', INITIAL_LOGS);
    const updated = [newLog, ...logs.slice(0, 99)];
    setLocal('logs', updated);
  },

  // --------------------------------------------------
  // DASHBOARD STATS
  // --------------------------------------------------
  async getDashboardStats(): Promise<DashboardStats> {
    const [inquiries, faqs, pricing, projects, admins] = await Promise.all([
      this.getInquiries(),
      this.getFaqs(),
      this.getPricingPlans(),
      this.getProjects(),
      this.getAdminProfiles(),
    ]);

    return {
      totalInquiries: inquiries.length,
      newInquiries: inquiries.filter((i) => i.status === 'New').length,
      totalFaqs: faqs.length,
      activeFaqs: faqs.filter((f) => f.is_active).length,
      totalPricingPlans: pricing.length,
      activePricingPlans: pricing.filter((p) => p.is_active).length,
      totalProjects: projects.length,
      totalAdmins: admins.filter((a) => a.is_active).length,
    };
  },
};
