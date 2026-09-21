# Architecture & Engineering Standards — Daxira InfoTech

This document details the software architecture, component hierarchy, build configuration, and engineering conventions for **Daxira InfoTech**.

---

## 1. System Technology Stack

| Layer | Technology | Version / Spec |
| :--- | :--- | :--- |
| **Framework / Core** | React | 19.x (ES Module, Functional Hooks) |
| **Routing** | React Router DOM | 7.x (Client routing with protected auth guards) |
| **Language** | TypeScript | 7.x (Strict mode enabled) |
| **Build Tool & Dev Server** | Vite | 8.x (Port 3000, Host `0.0.0.0`) |
| **Styling** | Tailwind CSS | 4.x via `@tailwindcss/vite` |
| **Database & Auth** | Supabase | PostgreSQL 15+ & Row Level Security (RLS) |
| **Icons** | Lucide React | Modern SVG icons |
| **Animation Library** | Motion | 12.x (Framer Motion API compatible) |

---

## 2. Directory & Route Hierarchy

```
c:\Users\Darshit\OneDrive\Desktop\daxira-infotech\
├── .datafolder/                   # Documentation & Consistency Blueprint Specifications
│   ├── design.md                  # UI/UX design tokens, colors, typography
│   ├── database.md                # Data models, DB schema, & TypeScript interfaces
│   ├── architecture.md            # System architecture & component structure
│   └── content-spec.md            # Studio messaging, service tiers, & brand copy
├── supabase/
│   └── schema.sql                 # Complete Supabase PostgreSQL schema, RLS policies & triggers
├── src/
│   ├── components/
│   │   ├── admin/                 # Admin Panel Modular Components
│   │   │   ├── AdminLayout.tsx    # Sidebar, Topbar, User menu & status indicator
│   │   │   ├── ProtectedRoute.tsx # Route guard checking Supabase Auth & Super Admin role
│   │   │   ├── ToastNotification.tsx # Toast provider & floating notification alerts
│   │   │   ├── StatusBadge.tsx    # Badges for status, roles, & visibility
│   │   │   └── ConfirmModal.tsx   # Reusable confirmation modal dialog
│   │   ├── Header.tsx             # Public top navigation
│   │   ├── Hero.tsx               # Public landing hero
│   │   ├── EthosSection.tsx       # Studio value pillars
│   │   ├── AboutFounder.tsx       # Bio & credentials of Darshit Sapariya
│   │   ├── ServicesSection.tsx    # 4 core service disciplines
│   │   ├── CaseStudiesSection.tsx # Selected client work & portfolio cards
│   │   ├── TechStackSection.tsx   # Interactive technical mastery display
│   │   ├── SprintProcessSection.tsx # 5-stage engineering sprint breakdown
│   │   ├── PricingSection.tsx     # Transparent pricing packages & scopes
│   │   ├── FaqSection.tsx         # Accordion FAQ
│   │   ├── ContactSection.tsx     # Scope intake form & Supabase lead capture
│   │   ├── Footer.tsx             # Minimalist editorial footer
│   │   └── DaxiraBrand.tsx        # SVG brand mark & logotype
│   ├── context/
│   │   └── AuthContext.tsx        # Supabase Auth provider & session management
│   ├── lib/
│   │   └── supabase.ts            # Supabase client singleton
│   ├── pages/
│   │   └── admin/                 # Dedicated Admin Route Pages
│   │       ├── Login.tsx          # /admin/login
│   │       ├── Dashboard.tsx      # /admin/dashboard
│   │       ├── Inquiries.tsx      # /admin/inquiries
│   │       ├── Faqs.tsx           # /admin/faqs
│   │       ├── Pricing.tsx        # /admin/pricing
│   │       ├── Projects.tsx       # /admin/projects
│   │       ├── AdminUsers.tsx     # /admin/admin-users (Super Admin only)
│   │       ├── ActivityLogs.tsx   # /admin/activity-logs (Immutable audit trail)
│   │       └── Settings.tsx       # /admin/settings
│   ├── services/
│   │   └── adminService.ts        # Data layer with live Supabase + local cache fallback
│   ├── App.tsx                    # Master Router & Public/Admin route tree
│   ├── index.css                  # Global Tailwind CSS imports & base tokens
│   ├── main.tsx                   # DOM entrypoint
│   └── types.ts                   # Core data interfaces
├── .env                           # Environment configuration
├── .env.example                   # Reference environment template
└── vite.config.ts                 # Vite bundler configuration
```

---

## 3. Route Security & Access Control

| Route Pattern | Access Level | Description |
| :--- | :--- | :--- |
| `/` | **Public** | Public landing website for Daxira InfoTech (100% intact) |
| `/admin/login` | **Public / Guest** | Admin credentials login screen |
| `/admin/dashboard` | **Authenticated Admin** | Overview statistics, recent leads, recent audit logs |
| `/admin/inquiries` | **Authenticated Admin** | Manage consultation submissions, filter, edit status/notes |
| `/admin/faqs` | **Authenticated Admin** | CRUD frequently asked questions |
| `/admin/pricing` | **Authenticated Admin** | CRUD pricing plans and feature checklists |
| `/admin/projects` | **Authenticated Admin** | CRUD delivered client case studies |
| `/admin/admin-users`| **Super Admin Only** | Manage administrator accounts, invite users, revoke access |
| `/admin/activity-logs` | **Authenticated Admin** | Immutable security audit trail |
| `/admin/settings` | **Authenticated Admin** | Studio settings & Supabase database diagnostics |

---

## 4. Verification Commands

- **Development Server**: `npm run dev` (`http://localhost:3000`)
- **Strict TypeScript Check**: `npm run lint` (`tsc --noEmit`)
- **Production Build**: `npm run build` (`vite build`)
