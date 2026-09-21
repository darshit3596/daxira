import React, { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  HelpCircle,
  CreditCard,
  Briefcase,
  Users,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Database,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { isSupabaseConfigured } from '../../lib/supabase.ts';
import { RoleBadge } from './StatusBadge.tsx';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  superAdminOnly?: boolean;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Pricing Plans', href: '/admin/pricing', icon: CreditCard },
  { label: 'Delivered Projects', href: '/admin/projects', icon: Briefcase },
  { label: 'Admin Users', href: '/admin/admin-users', icon: Users, superAdminOnly: true },
  { label: 'Activity Logs', href: '/admin/activity-logs', icon: History },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { profile, logout, isSuperAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#faf9fd] flex flex-col lg:flex-row text-[#191a20] antialiased">
      {/* ---------------------------------------------------- */}
      {/* DESKTOP / TABLET SIDEBAR */}
      {/* ---------------------------------------------------- */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#e6e4f0] shrink-0 sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#e6e4f0]">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4f47e6] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-200">
              D
            </div>
            <div>
              <span className="font-heading font-extrabold text-sm tracking-tight text-[#191a20]">
                Daxira
              </span>
              <span className="font-heading font-light text-xs text-[#5c5f73] block -mt-0.5">
                Admin Studio
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            if (item.superAdminOnly && !isSuperAdmin) return null;
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#eef0ff] text-[#4f47e6] font-semibold shadow-xs'
                    : 'text-[#5c5f73] hover:text-[#191a20] hover:bg-[#faf9fd]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#4f47e6]' : 'text-[#8c8f9f]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-[#4f47e6] text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Database Status & Footer */}
        <div className="p-4 border-t border-[#e6e4f0] bg-[#faf9fd]/50 space-y-3">
          {/* Connection Pill */}
          <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#e6e4f0]">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#4f47e6]" />
              <span className="font-medium text-[#5c5f73]">Supabase:</span>
            </div>
            <span
              className={`font-semibold ${
                isSupabaseConfigured ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {isSupabaseConfigured ? 'Live Connected' : 'Demo Mode'}
            </span>
          </div>

          {/* User Profile */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#4f47e6] font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-200">
                {profile?.full_name?.charAt(0) || 'A'}
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-semibold text-[#191a20] truncate">
                  {profile?.full_name || 'Admin'}
                </p>
                <p className="text-[10px] text-[#8c8f9f] truncate">{profile?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#8c8f9f] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------- */}
      {/* MOBILE TOPBAR & DRAWER */}
      {/* ---------------------------------------------------- */}
      <div className="lg:hidden flex flex-col bg-white border-b border-[#e6e4f0] sticky top-0 z-40">
        <div className="h-14 px-4 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#4f47e6] flex items-center justify-center text-white font-bold text-xs">
              D
            </div>
            <span className="font-heading font-extrabold text-sm text-[#191a20]">
              Daxira Admin
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-[#5c5f73] hover:text-[#191a20] rounded-lg"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#191a20] rounded-lg hover:bg-zinc-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileOpen && (
          <div className="p-4 border-t border-[#e6e4f0] space-y-1 bg-white animate-in slide-in-from-top-2">
            {NAV_ITEMS.map((item) => {
              if (item.superAdminOnly && !isSuperAdmin) return null;
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-[#eef0ff] text-[#4f47e6] font-semibold'
                      : 'text-[#5c5f73] hover:bg-[#faf9fd]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#4f47e6]' : 'text-[#8c8f9f]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-[#e6e4f0] flex items-center justify-between">
              <span className="text-xs text-[#5c5f73]">{profile?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-rose-600 font-medium px-2.5 py-1.5 rounded-lg hover:bg-rose-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* MAIN CONTENT AREA & TOPBAR */}
      {/* ---------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="hidden lg:flex h-16 bg-white border-b border-[#e6e4f0] px-8 items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-[#8c8f9f]">
              <span>Admin</span>
              <span>/</span>
              <span className="font-semibold text-[#191a20] capitalize">
                {location.pathname.replace('/admin/', '').replace('-', ' ') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* View Live Website link */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5c5f73] hover:text-[#4f47e6] bg-[#faf9fd] hover:bg-[#eef0ff] border border-[#e6e4f0] rounded-xl transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </a>

            {/* Role Badge */}
            {profile && <RoleBadge role={profile.role} />}
          </div>
        </header>

        {/* Page Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
