import React, { useEffect, useState } from 'react';
import { History, Search, Shield, Filter, Lock, Clock, User, Sparkles } from 'lucide-react';
import { adminService, ActivityLog } from '../../services/adminService.ts';
import { useToast } from '../../components/admin/ToastNotification.tsx';

const MODULE_FILTERS = [
  'All',
  'Authentication',
  'Inquiries',
  'FAQs',
  'Pricing',
  'Projects',
  'Admin Users',
];

export function ActivityLogs() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await adminService.getActivityLogs();
      setLogs(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filtered = logs.filter((log) => {
    const matchesModule = selectedModule === 'All' || log.module === selectedModule;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      log.description.toLowerCase().includes(q) ||
      log.admin_email.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.module.toLowerCase().includes(q);

    return matchesModule && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
              System Activity & Audit Trail
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
              <Lock className="w-3 h-3" /> Immutable Logs
            </span>
          </div>
          <p className="text-sm text-[#5c5f73] mt-1">
            Tamper-proof record of logins, client lead updates, catalog changes, and administrative actions.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-[#e6e4f0] p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Module Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {MODULE_FILTERS.map((mod) => (
              <button
                key={mod}
                onClick={() => setSelectedModule(mod)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedModule === mod
                    ? 'bg-[#4f47e6] text-white font-semibold shadow-xs'
                    : 'bg-[#faf9fd] text-[#5c5f73] hover:text-[#191a20] hover:bg-[#eef0ff]'
                }`}
              >
                {mod}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8c8f9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit trail..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
            />
          </div>
        </div>
      </div>

      {/* Logs Feed / Table */}
      <div className="bg-white rounded-3xl border border-[#e6e4f0] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-[#8c8f9f]">Loading audit trail...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#8c8f9f]">
            No activity logs match your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf9fd] border-b border-[#e6e4f0] text-[#5c5f73] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-6">Administrator</th>
                  <th className="py-3.5 px-6">Module</th>
                  <th className="py-3.5 px-6">Action Code</th>
                  <th className="py-3.5 px-6">Audit Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e4f0] text-[#191a20]">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-[#faf9fd]/70 transition-colors">
                    <td className="py-4 px-6 font-mono text-[#8c8f9f] text-[11px] whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                          {log.admin_email?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <span className="font-mono text-xs text-[#191a20]">{log.admin_email}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-indigo-50 text-[#4f47e6] border border-indigo-200">
                        {log.module}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-mono text-[11px] text-[#5c5f73] whitespace-nowrap">
                      {log.action}
                    </td>

                    <td className="py-4 px-6 text-[#191a20] leading-relaxed max-w-md">
                      {log.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
