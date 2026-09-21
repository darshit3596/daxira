import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  HelpCircle,
  CreditCard,
  Briefcase,
  Users,
  ArrowUpRight,
  Clock,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { adminService, DashboardStats, Inquiry, ActivityLog } from '../../services/adminService.ts';
import { InquiryStatusBadge } from '../../components/admin/StatusBadge.tsx';

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentLogs, setRecentLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, inquiriesData, logsData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getInquiries(),
        adminService.getActivityLogs(),
      ]);

      setStats(statsData);
      setRecentInquiries(inquiriesData.slice(0, 5));
      setRecentLogs(logsData.slice(0, 6));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* ---------------------------------------------------- */}
      {/* HEADER BAR & REFRESH */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
            Studio Overview & Insights
          </h1>
          <p className="text-sm text-[#5c5f73] mt-1">
            Real-time analytics, client consultation pipeline, and operational activity.
          </p>
        </div>

        <button
          onClick={loadDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#5c5f73] hover:text-[#191a20] bg-white border border-[#e6e4f0] rounded-xl hover:bg-[#faf9fd] shadow-xs transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#4f47e6]' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 6 TOP STAT METRIC CARDS */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: Total Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6e4f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c8f9f]">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Leads</span>
            <Inbox className="w-4 h-4 text-[#4f47e6]" />
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
              {loading ? '—' : stats?.totalInquiries ?? 0}
            </p>
            <p className="text-[11px] text-[#5c5f73] mt-0.5">Consultations received</p>
          </div>
        </div>

        {/* Card 2: New Inquiries */}
        <div className="bg-gradient-to-br from-indigo-50/70 to-white p-5 rounded-2xl border border-indigo-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#4f47e6]">
            <span className="text-xs font-semibold uppercase tracking-wider">New Unread</span>
            <Sparkles className="w-4 h-4 text-[#4f47e6]" />
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-bold font-heading text-[#4f47e6]">
              {loading ? '—' : stats?.newInquiries ?? 0}
            </p>
            <p className="text-[11px] text-indigo-700/80 font-medium mt-0.5">Needs review</p>
          </div>
        </div>

        {/* Card 3: Active FAQs */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6e4f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c8f9f]">
            <span className="text-xs font-semibold uppercase tracking-wider">Active FAQs</span>
            <HelpCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
              {loading ? '—' : `${stats?.activeFaqs ?? 0}/${stats?.totalFaqs ?? 0}`}
            </p>
            <p className="text-[11px] text-[#5c5f73] mt-0.5">Published answers</p>
          </div>
        </div>

        {/* Card 4: Pricing Plans */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6e4f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c8f9f]">
            <span className="text-xs font-semibold uppercase tracking-wider">Pricing Plans</span>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
              {loading ? '—' : stats?.activePricingPlans ?? 0}
            </p>
            <p className="text-[11px] text-[#5c5f73] mt-0.5">Active tier options</p>
          </div>
        </div>

        {/* Card 5: Delivered Projects */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6e4f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c8f9f]">
            <span className="text-xs font-semibold uppercase tracking-wider">Projects</span>
            <Briefcase className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
              {loading ? '—' : stats?.totalProjects ?? 0}
            </p>
            <p className="text-[11px] text-[#5c5f73] mt-0.5">Portfolio case studies</p>
          </div>
        </div>

        {/* Card 6: Admin Users */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6e4f0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c8f9f]">
            <span className="text-xs font-semibold uppercase tracking-wider">Admins</span>
            <Users className="w-4 h-4 text-slate-700" />
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
              {loading ? '—' : stats?.totalAdmins ?? 0}
            </p>
            <p className="text-[11px] text-[#5c5f73] mt-0.5">Active operators</p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2-COLUMN SECTION: RECENT INQUIRIES & RECENT LOGS */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#e6e4f0] p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold font-heading text-[#191a20]">
                Recent Inquiries & Leads
              </h2>
              <p className="text-xs text-[#5c5f73] mt-0.5">
                Latest client consultation requests received from website
              </p>
            </div>
            <Link
              to="/admin/inquiries"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#4f47e6] hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-[#8c8f9f]">Loading inquiries...</div>
          ) : recentInquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8c8f9f]">No inquiries received yet.</div>
          ) : (
            <div className="divide-y divide-[#e6e4f0] overflow-x-auto">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#191a20] truncate">{inq.name}</p>
                      <InquiryStatusBadge status={inq.status} />
                    </div>
                    <p className="text-xs text-[#5c5f73] mt-0.5 truncate">
                      {inq.business ? `${inq.business} • ` : ''}
                      {inq.email} • {inq.phone}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono text-[#8c8f9f] block">
                      {new Date(inq.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <Link
                      to={`/admin/inquiries?id=${inq.id}`}
                      className="text-xs font-medium text-[#4f47e6] hover:underline"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Recent Activity Logs */}
        <div className="bg-white rounded-3xl border border-[#e6e4f0] p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold font-heading text-[#191a20]">Activity Audit</h2>
              <p className="text-xs text-[#5c5f73] mt-0.5">Recent system actions</p>
            </div>
            <Link
              to="/admin/activity-logs"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#4f47e6] hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-[#8c8f9f]">Loading activity...</div>
          ) : recentLogs.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8c8f9f]">No activity logs found.</div>
          ) : (
            <div className="space-y-3.5 overflow-hidden">
              {recentLogs.map((log) => (
                <div key={log.id} className="p-3 bg-[#faf9fd] rounded-xl border border-[#e6e4f0]/80">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-[#4f47e6] font-mono">{log.module}</span>
                    <span className="text-[#8c8f9f]">
                      {new Date(log.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-[#191a20] line-clamp-2 leading-relaxed">
                    {log.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
