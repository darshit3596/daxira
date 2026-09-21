import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  HelpCircle,
  CheckCircle,
  XCircle,
  Search,
  ArrowUpDown,
  X,
} from 'lucide-react';
import { adminService, Faq } from '../../services/adminService.ts';
import { ActiveBadge } from '../../components/admin/StatusBadge.tsx';
import { ConfirmModal } from '../../components/admin/ConfirmModal.tsx';
import { useToast } from '../../components/admin/ToastNotification.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

export function Faqs() {
  const { profile } = useAuth();
  const { showToast } = useToast();

  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Form Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Delete
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const data = await adminService.getFaqs();
      setFaqs(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    setCategory('General');
    setDisplayOrder(faqs.length + 1);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (faq: Faq) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category || 'General');
    setDisplayOrder(faq.display_order);
    setIsActive(faq.is_active);
    setIsModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (editingFaq) {
      // Update
      const success = await adminService.updateFaq(editingFaq.id, {
        question,
        answer,
        category,
        display_order: Number(displayOrder),
        is_active: isActive,
      });

      if (success) {
        await adminService.logActivity(
          'FAQ_UPDATE',
          'FAQs',
          `Updated FAQ item: "${question}"`,
          profile?.email
        );
        showToast('success', 'FAQ Updated', 'Changes saved successfully');
        setIsModalOpen(false);
        loadFaqs();
      } else {
        showToast('error', 'Update Failed', 'Could not save FAQ changes');
      }
    } else {
      // Create
      const created = await adminService.createFaq({
        question,
        answer,
        category,
        display_order: Number(displayOrder),
        is_active: isActive,
      });

      if (created) {
        await adminService.logActivity(
          'FAQ_CREATE',
          'FAQs',
          `Created new FAQ item: "${question}"`,
          profile?.email
        );
        showToast('success', 'FAQ Created', 'New question published');
        setIsModalOpen(false);
        loadFaqs();
      } else {
        showToast('error', 'Create Failed', 'Could not create FAQ');
      }
    }

    setIsSaving(false);
  };

  const handleToggleActive = async (faq: Faq) => {
    const newStatus = !faq.is_active;
    const success = await adminService.updateFaq(faq.id, { is_active: newStatus });

    if (success) {
      await adminService.logActivity(
        'FAQ_TOGGLE',
        'FAQs',
        `Toggled FAQ status to ${newStatus ? 'Active' : 'Disabled'} for "${faq.question}"`,
        profile?.email
      );
      showToast('info', 'Status Updated', `FAQ is now ${newStatus ? 'Active' : 'Disabled'}`);
      loadFaqs();
    }
  };

  const handleDeleteFaq = async () => {
    if (!deleteTargetId) return;
    const target = faqs.find((f) => f.id === deleteTargetId);
    const success = await adminService.deleteFaq(deleteTargetId);

    if (success) {
      await adminService.logActivity(
        'FAQ_DELETE',
        'FAQs',
        `Deleted FAQ item: "${target?.question || deleteTargetId}"`,
        profile?.email
      );
      showToast('info', 'FAQ Deleted', 'Question removed from database');
      setDeleteTargetId(null);
      loadFaqs();
    } else {
      showToast('error', 'Delete Failed', 'Could not delete FAQ');
    }
  };

  const filtered = faqs.filter(
    (f) =>
      !searchQuery ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#5c5f73] mt-1">
            Manage answers displayed on the public website FAQ accordion.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#4f47e6] hover:bg-[#3b34c2] rounded-xl shadow-md shadow-indigo-200 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="bg-white rounded-2xl border border-[#e6e4f0] p-4 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#8c8f9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by question, category, or answer..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
          />
        </div>
      </div>

      {/* FAQs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-[#8c8f9f]">
            Loading FAQs...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-[#8c8f9f]">
            No FAQ items found. Click &quot;Add New FAQ&quot; to create one.
          </div>
        ) : (
          filtered.map((faq) => (
            <div
              key={faq.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col justify-between ${
                faq.is_active ? 'border-[#e6e4f0]' : 'border-zinc-200 bg-zinc-50/50 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#faf9fd] border border-[#e6e4f0] text-[#4f47e6]">
                      #{faq.display_order} • {faq.category}
                    </span>
                    <ActiveBadge active={faq.is_active} />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleActive(faq)}
                      className="p-1.5 text-[#5c5f73] hover:text-[#191a20] rounded-lg hover:bg-[#faf9fd]"
                      title={faq.is_active ? 'Disable FAQ' : 'Enable FAQ'}
                    >
                      {faq.is_active ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-zinc-400" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(faq)}
                      className="p-1.5 text-[#5c5f73] hover:text-[#4f47e6] rounded-lg hover:bg-[#eef0ff]"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(faq.id)}
                      className="p-1.5 text-[#8c8f9f] hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-[#191a20] font-heading mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs text-[#5c5f73] leading-relaxed line-clamp-4">{faq.answer}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e6e4f0] space-y-5">
            <div className="flex items-center justify-between border-b border-[#e6e4f0] pb-4">
              <h2 className="text-lg font-bold font-heading text-[#191a20]">
                {editingFaq ? 'Edit FAQ Item' : 'Create New FAQ'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. How much does a website cost?"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Answer
                </label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Provide a clear, helpful response for business owners..."
                  className="w-full p-3 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Pricing & Cost"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="faqActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-[#4f47e6] rounded-md border-[#e6e4f0] focus:ring-[#4f47e6]"
                />
                <label htmlFor="faqActive" className="text-xs font-medium text-[#191a20]">
                  Publish immediately (Active on public website)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#e6e4f0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#5c5f73] bg-[#faf9fd] hover:bg-[#e6e4f0] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#4f47e6] hover:bg-[#3b34c2] rounded-xl shadow-md shadow-indigo-200 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingFaq ? 'Save Changes' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete FAQ Item"
        message="Are you sure you want to permanently delete this FAQ item? It will be removed from your public website."
        confirmLabel="Delete FAQ"
        isDestructive={true}
        onConfirm={handleDeleteFaq}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
