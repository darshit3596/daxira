import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Database,
  ShieldCheck,
  Key,
  Copy,
  Check,
  Server,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase.ts';
import { useToast } from '../../components/admin/ToastNotification.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

export function Settings() {
  const { showToast } = useToast();
  const { profile } = useAuth();
  const [copied, setCopied] = useState(false);

  // Studio Settings State
  const [studioName, setStudioName] = useState('Daxira InfoTech');
  const [founderName, setFounderName] = useState('Darshit Sapariya');
  const [contactEmail, setContactEmail] = useState('er.darshitpatel@gmail.com');
  const [contactPhone, setContactPhone] = useState('+91 9409638264');
  const [whatsAppNumber, setWhatsAppNumber] = useState('919409638264');
  const [region, setRegion] = useState('Gujarat, India (Serving clients worldwide)');

  const sqlSuperAdminSnippet = `-- Step 1: Create your Super Admin in Supabase SQL Editor
-- Replace <YOUR_AUTH_USER_UUID> with the UID from Supabase Auth -> Users
INSERT INTO public.admin_profiles (id, email, full_name, role, is_active)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@daxira.com',
  'Darshit Sapariya',
  'super_admin',
  true
)
ON CONFLICT (id) DO UPDATE
SET role = 'super_admin', is_active = true;`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSuperAdminSnippet);
    setCopied(true);
    showToast('success', 'Copied to Clipboard', 'Super Admin SQL query copied');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Settings Saved', 'Studio configuration updated');
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
          Studio & System Settings
        </h1>
        <p className="text-sm text-[#5c5f73] mt-1">
          Configure studio contact details, check database connection status, and review security policies.
        </p>
      </div>

      {/* ---------------------------------------------------- */}
      {/* SUPABASE CONNECTION STATUS CARD */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-[#e6e4f0] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#e6e4f0]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-[#4f47e6]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-[#191a20]">
                Supabase Database & Authentication
              </h2>
              <p className="text-xs text-[#5c5f73]">Backend infrastructure & Row Level Security</p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              isSupabaseConfigured
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {isSupabaseConfigured ? '● Live Supabase Connected' : '● Local Demo Mode'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#faf9fd] rounded-2xl border border-[#e6e4f0]">
            <span className="text-[#8c8f9f] uppercase tracking-wider font-semibold block mb-1">
              Supabase Project URL
            </span>
            <span className="font-mono text-[#191a20] break-all">
              {import.meta.env.VITE_SUPABASE_URL || 'Not configured in .env'}
            </span>
          </div>

          <div className="p-4 bg-[#faf9fd] rounded-2xl border border-[#e6e4f0]">
            <span className="text-[#8c8f9f] uppercase tracking-wider font-semibold block mb-1">
              Publishable Anon Key Status
            </span>
            <span className="font-mono text-[#191a20]">
              {isSupabaseConfigured ? 'Valid & Active (Secure Client-Side Key)' : 'Placeholder Key'}
            </span>
          </div>
        </div>

        {/* SQL Setup Helper */}
        <div className="p-5 bg-gradient-to-br from-indigo-50/50 to-white rounded-2xl border border-indigo-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#191a20]">
              <ShieldCheck className="w-4 h-4 text-[#4f47e6]" />
              <span>How to setup your Supabase Database:</span>
            </div>
            <button
              onClick={handleCopySql}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#4f47e6] hover:bg-white bg-indigo-50 border border-indigo-200 rounded-lg transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
            </button>
          </div>

          <p className="text-xs text-[#5c5f73] leading-relaxed">
            Run the SQL script from <code className="font-mono text-indigo-700">supabase/schema.sql</code> in your
            Supabase Project SQL Editor to automatically create all tables, indexes, and Row Level Security (RLS) policies.
          </p>

          <pre className="p-3 bg-[#191a20] text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto">
            {sqlSuperAdminSnippet}
          </pre>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* STUDIO GENERAL SETTINGS FORM */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-[#e6e4f0] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#e6e4f0]">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold font-heading text-[#191a20]">
              Studio Information & Defaults
            </h2>
            <p className="text-xs text-[#5c5f73]">Public branding and contact details</p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                Studio Brand Name
              </label>
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                Lead Principal Developer
              </label>
              <input
                type="text"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                Inquiry Notification Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                Direct Phone
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                WhatsApp Dispatch ID
              </label>
              <input
                type="text"
                value={whatsAppNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
              Operating Region
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
            />
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-[#e6e4f0]">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#4f47e6] hover:bg-[#3b34c2] rounded-xl shadow-md shadow-indigo-200 transition-all"
            >
              Save Studio Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
