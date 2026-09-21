# Database & Data Model Specification — Daxira InfoTech

This specification defines the frontend TypeScript interfaces, Supabase PostgreSQL database schemas, Row Level Security (RLS) policies, and data consistency rules for **Daxira InfoTech**.

---

## 1. Frontend TypeScript Data Interfaces (`src/types.ts` & `src/services/adminService.ts`)

### 1.1 Studio Specification (`STUDIO_SPEC`)
Describes the studio metadata and operational parameters.

```typescript
export interface StudioSpec {
  version: string;             // e.g., "2026 Edition"
  status: string;              // e.g., "Available for new projects"
  foundingPrincipal: string;   // "Darshit Sapariya"
  studioModel: string;         // "Independent Web Development Studio"
  coreStack: string[];         // ["Python", "Django", "React", "Tailwind CSS"]
  codeHygiene: string;         // "Clean custom code • No slow templates"
  contractSla: string;         // "Direct WhatsApp support & weekly updates"
  region: string;              // "Gujarat, India (Serving clients worldwide)"
  uptime: string;              // "99.9%"
  averageResponseMs: string;   // "Under 1 second load time"
}
```

### 1.2 Inquiry Model (`Inquiry`)
Payload and database representation for client consultation inquiries.

```typescript
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
```

### 1.3 Admin User Profile (`AdminProfile`)
Linked directly to Supabase Auth `auth.users`.

```typescript
export type AdminRole = 'super_admin' | 'admin';

export interface AdminProfile {
  id: string;                  // UUID matching auth.users(id)
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
  avatar_url?: string;
  created_at: string;
}
```

---

## 2. Supabase PostgreSQL Relational Schema (`supabase/schema.sql`)

### 2.1 Table: `admin_profiles`
| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, REFERENCES auth.users(id) ON DELETE CASCADE | User UUID |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Admin email |
| `full_name` | VARCHAR(150) | NOT NULL | Display name |
| `role` | VARCHAR(30) | NOT NULL, CHECK in ('super_admin', 'admin') | Role tier |
| `is_active` | BOOLEAN | NOT NULL DEFAULT true | Status flag |
| `created_at`| TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Timestamp |

### 2.2 Table: `inquiries`
| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique ID |
| `name` | VARCHAR(150) | NOT NULL | Client full name |
| `business` | VARCHAR(200) | NULLABLE | Business / Company |
| `email` | VARCHAR(255) | NOT NULL | Email |
| `phone` | VARCHAR(40) | NOT NULL | WhatsApp / Phone |
| `service` | VARCHAR(80) | NOT NULL | Scope slug |
| `budget` | VARCHAR(50) | NOT NULL | Budget tier |
| `message` | TEXT | NOT NULL | Project description |
| `status` | VARCHAR(30) | NOT NULL DEFAULT 'New' | Pipeline status |
| `admin_notes` | TEXT | NULLABLE | Internal staff notes |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Creation date |

### 2.3 Table: `faqs`
| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique ID |
| `question` | TEXT | NOT NULL | Question string |
| `answer` | TEXT | NOT NULL | Answer description |
| `category` | VARCHAR(80) | DEFAULT 'General' | Category grouping |
| `display_order` | INT | NOT NULL DEFAULT 0 | Sort order |
| `is_active` | BOOLEAN | NOT NULL DEFAULT true | Visibility toggle |

### 2.4 Table: `pricing_plans`
| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique ID |
| `name` | VARCHAR(150) | NOT NULL | Plan name |
| `starting_price` | VARCHAR(80) | NOT NULL | Starting price e.g. "₹14,999" |
| `price_range` | VARCHAR(100) | NULLABLE | Price subtext |
| `features` | JSONB | NOT NULL DEFAULT '[]'::jsonb | Feature checklist |
| `is_popular` | BOOLEAN | NOT NULL DEFAULT false | Popular highlight |
| `is_active` | BOOLEAN | NOT NULL DEFAULT true | Visibility toggle |
| `display_order` | INT | NOT NULL DEFAULT 0 | Sort order |
| `scope_value` | VARCHAR(80) | NOT NULL DEFAULT 'commercial_web' | Mapped form scope |

### 2.5 Table: `projects`
| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique ID |
| `title` | VARCHAR(200) | NOT NULL | Case study headline |
| `client_business` | VARCHAR(200) | NOT NULL | Client name |
| `category` | VARCHAR(80) | NOT NULL | Category label |
| `description` | TEXT | NOT NULL | Detailed case study |
| `technologies` | JSONB | NOT NULL DEFAULT '[]'::jsonb | Tech tags |
| `live_url` | TEXT | NULLABLE | External preview link |
| `is_active` | BOOLEAN | NOT NULL DEFAULT true | Visibility toggle |
| `display_order` | INT | NOT NULL DEFAULT 0 | Sort order |

### 2.6 Table: `activity_logs` (Audit Log)
| Field Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Log ID |
| `admin_id` | UUID | REFERENCES auth.users(id) | Admin UID |
| `admin_email` | VARCHAR(255) | NOT NULL | Admin email |
| `action` | VARCHAR(80) | NOT NULL | Action code |
| `module` | VARCHAR(80) | NOT NULL | Target module |
| `description` | TEXT | NOT NULL | Audit description |
| `metadata` | JSONB | DEFAULT '{}'::jsonb | Extra JSON payload |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Action timestamp |

---

## 3. Row Level Security (RLS) Policy Rules

| Table | Public / Anon Access | Authenticated Admin Access | Super Admin Access |
| :--- | :--- | :--- | :--- |
| `inquiries` | `INSERT` only | `SELECT`, `UPDATE`, `DELETE` | Full Access |
| `faqs` | `SELECT` where `is_active = true` | `ALL` (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) | Full Access |
| `pricing_plans` | `SELECT` where `is_active = true` | `ALL` (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) | Full Access |
| `projects` | `SELECT` where `is_active = true` | `ALL` (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) | Full Access |
| `admin_profiles` | None (No public access) | `SELECT` | `ALL` (`INSERT`, `UPDATE`, `DELETE`) |
| `activity_logs` | None (No public access) | `SELECT`, `INSERT` (Immutable, no update/delete) | `SELECT`, `INSERT` |
| `system_settings` | None (No public access) | `SELECT` | `UPDATE` |
