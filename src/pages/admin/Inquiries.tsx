import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Trash2,
  Edit3,
  Mail,
  Phone,
  MessageSquare,
  Building,
  Calendar,
  CheckCircle,
  ExternalLink,
  X,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { adminService, Inquiry, InquiryStatus } from '../../services/adminService.ts';
import { InquiryStatusBadge } from '../../components/admin/StatusBadge.tsx';
import { ConfirmModal } from '../../components/admin/ConfirmModal.tsx';
import { useToast } from '../../components/admin/ToastNotification.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

const STATUS_TABS: (InquiryStatus | 'All')[] = [
  'All',
  'New',
  'Contacted',
  'In Progress',
  'Converted',
  'Closed',
];

export function Inquiries() {
  const { profile } = useAuth();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<InquiryStatus | 'All'>('All');

  // Modal states
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [editingStatus, setEditingStatus] = useState<InquiryStatus>('New');
  const [editingNotes, setEditingNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Delete state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await adminService.getInquiries();
      setInquiries(data);

      // If URL has ?id=..., open that inquiry detail
      const queryId = searchParams.get('id');
      if (queryId) {
        const found = data.find((i) => i.id === queryId);
        if (found) {
          openDetailModal(found);
        }
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const openDetailModal = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setEditingStatus(inq.status);
    setEditingNotes(inq.admin_notes || '');
  };

  const handleUpdateInquiry = async () => {
    if (!selectedInquiry) return;
    setIsSaving(true);

    const success = await adminService.updateInquiry(selectedInquiry.id, {
      status: editingStatus,
      admin_notes: editingNotes,
    });

    setIsSaving(false);

    if (success) {
      await adminService.logActivity(
        'INQUIRY_UPDATE',
        'Inquiries',
        `Updated inquiry for "${selectedInquiry.name}" to status "${editingStatus}"`,
        profile?.email
      );

      showToast('success', 'Inquiry Updated', `Status changed to ${editingStatus}`);
      setSelectedInquiry(null);
      loadInquiries();
    } else {
      showToast('error', 'Update Failed', 'Could not save inquiry changes');
    }
  };

  const handleDeleteInquiry = async () => {
    if (!deleteTargetId) return;

    const target = inquiries.find((i) => i.id === deleteTargetId);
    const success = await adminService.deleteInquiry(deleteTargetId);

    if (success) {
      await adminService.logActivity(
        'INQUIRY_DELETE',
        'Inquiries',
        `Deleted inquiry lead from "${target?.name || deleteTargetId}"`,
        profile?.email
      );

      showToast('info', 'Inquiry Deleted', 'Record has been removed');
      setDeleteTargetId(null);
      if (selectedInquiry?.id === deleteTargetId) {
        setSelectedInquiry(null);
      }
      loadInquiries();
    } else {
      showToast('error', 'Delete Failed', 'Could not delete inquiry');
    }
  };

  // Filter & Search
  const filtered = inquiries.filter((inq) => {
    const matchesTab = activeTab === 'All' || inq.status === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      (inq.business && inq.business.toLowerCase().includes(q)) ||
      inq.email.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      inq.message.toLowerCase().includes(q);

    return matchesTab && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
            Consultation Inquiries
          </h1>
          <p className="text-sm text-[#5c5f73] mt-1">
            Manage incoming client leads, status progression, and notes.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-[#4f47e6] self-start sm:self-auto">
          {inquiries.filter((i) => i.status === 'New').length} New Leads Pending
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-[#e6e4f0] p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {STATUS_TABS.map((tab) => {
              const count =
                tab === 'All'
                  ? inquiries.length
                  : inquiries.filter((i) => i.status === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeTab === tab
                      ? 'bg-[#4f47e6] text-white shadow-xs font-semibold'
                      : 'bg-[#faf9fd] text-[#5c5f73] hover:text-[#191a20] hover:bg-[#eef0ff]'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeTab === tab ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8c8f9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden transition-all text-[#191a20]"
            />
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-3xl border border-[#e6e4f0] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-[#8c8f9f]">Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#8c8f9f]">
            No inquiries match your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf9fd] border-b border-[#e6e4f0] text-[#5c5f73] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Client / Business</th>
                  <th className="py-3.5 px-6">Contact Details</th>
                  <th className="py-3.5 px-6">Scope & Budget</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Received Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e4f0] text-[#191a20]">
                {filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-[#faf9fd]/70 transition-colors cursor-pointer group"
                    onClick={() => openDetailModal(inq)}
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-sm text-[#191a20]">{inq.name}</div>
                      {inq.business && (
                        <div className="text-xs text-[#5c5f73] flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-[#8c8f9f]" />
                          <span>{inq.business}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-xs text-[#191a20]">{inq.email}</div>
                      <div className="text-[11px] text-[#5c5f73] font-mono mt-0.5">{inq.phone}</div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-[#faf9fd] border border-[#e6e4f0] text-[#4f47e6]">
                        {inq.service}
                      </span>
                      <span className="block text-[11px] text-[#5c5f73] mt-1 capitalize">
                        Budget: {inq.budget}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <InquiryStatusBadge status={inq.status} />
                    </td>

                    <td className="py-4 px-6 font-mono text-[#8c8f9f] text-[11px]">
                      {new Date(inq.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openDetailModal(inq)}
                          className="p-1.5 text-[#5c5f73] hover:text-[#4f47e6] hover:bg-[#eef0ff] rounded-lg transition-colors"
                          title="View & Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(inq.id)}
                          className="p-1.5 text-[#8c8f9f] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* INQUIRY DETAIL & STATUS MODAL */}
      {/* ---------------------------------------------------- */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#e6e4f0] space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#e6e4f0] pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold font-heading text-[#191a20]">
                    {selectedInquiry.name}
                  </h2>
                  <InquiryStatusBadge status={editingStatus} />
                </div>
                <p className="text-xs text-[#5c5f73] mt-1">
                  Received on{' '}
                  {new Date(selectedInquiry.created_at).toLocaleString([], {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Contact Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${selectedInquiry.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#e6e4f0] bg-[#faf9fd] hover:bg-[#eef0ff] hover:text-[#4f47e6] text-xs font-semibold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Phone</span>
              </a>
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open WhatsApp</span>
              </a>
              <a
                href={`mailto:${selectedInquiry.email}`}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#e6e4f0] bg-[#faf9fd] hover:bg-[#eef0ff] hover:text-[#4f47e6] text-xs font-semibold transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#4f47e6]" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-[#faf9fd] p-4 rounded-2xl border border-[#e6e4f0]">
              <div>
                <span className="text-[#8c8f9f] uppercase tracking-wider font-semibold block mb-0.5">
                  Business / Company
                </span>
                <span className="font-semibold text-[#191a20]">
                  {selectedInquiry.business || 'Not Provided'}
                </span>
              </div>
              <div>
                <span className="text-[#8c8f9f] uppercase tracking-wider font-semibold block mb-0.5">
                  Selected Scope
                </span>
                <span className="font-semibold text-[#4f47e6] font-mono">
                  {selectedInquiry.service}
                </span>
              </div>
              <div>
                <span className="text-[#8c8f9f] uppercase tracking-wider font-semibold block mb-0.5">
                  Budget Preference
                </span>
                <span className="font-semibold text-[#191a20] capitalize">
                  {selectedInquiry.budget}
                </span>
              </div>
              <div>
                <span className="text-[#8c8f9f] uppercase tracking-wider font-semibold block mb-0.5">
                  Direct Contact Number
                </span>
                <span className="font-mono text-[#191a20]">{selectedInquiry.phone}</span>
              </div>
            </div>

            {/* Inquiry Message */}
            <div>
              <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-2">
                Client Message & Project Scope
              </label>
              <div className="p-4 rounded-2xl bg-white border border-[#e6e4f0] text-sm text-[#191a20] leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status & Admin Notes Editing */}
            <div className="space-y-4 pt-2 border-t border-[#e6e4f0]">
              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-2">
                  Update Lead Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['New', 'Contacted', 'In Progress', 'Converted', 'Closed'] as InquiryStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setEditingStatus(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          editingStatus === st
                            ? 'bg-[#4f47e6] text-white shadow-xs font-semibold'
                            : 'bg-[#faf9fd] border border-[#e6e4f0] text-[#5c5f73] hover:bg-[#eef0ff]'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-2">
                  Admin Internal Notes (Private)
                </label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add private notes about calls, client preferences, or follow-ups..."
                  className="w-full p-3 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#e6e4f0]">
              <button
                type="button"
                onClick={() => setDeleteTargetId(selectedInquiry.id)}
                className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 text-xs font-medium text-[#5c5f73] bg-[#faf9fd] hover:bg-[#e6e4f0] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleUpdateInquiry}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#4f47e6] hover:bg-[#3b34c2] rounded-xl shadow-md shadow-indigo-200 disabled:opacity-50 transition-all"
                >
                  {isSaving ? 'Saving...' : 'Save Updates'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Consultation Lead"
        message="Are you sure you want to delete this consultation inquiry? This action cannot be undone."
        confirmLabel="Delete Lead"
        isDestructive={true}
        onConfirm={handleDeleteInquiry}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
