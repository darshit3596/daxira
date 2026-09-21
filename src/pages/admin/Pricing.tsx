import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  CreditCard,
  CheckCircle,
  XCircle,
  Search,
  Sparkles,
  X,
  PlusCircle,
  MinusCircle,
} from 'lucide-react';
import { adminService, PricingPlan } from '../../services/adminService.ts';
import { ActiveBadge } from '../../components/admin/StatusBadge.tsx';
import { ConfirmModal } from '../../components/admin/ConfirmModal.tsx';
import { useToast } from '../../components/admin/ToastNotification.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

export function Pricing() {
  const { profile } = useAuth();
  const { showToast } = useToast();

  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [domainHosting, setDomainHosting] = useState('');
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState('');
  const [scopeValue, setScopeValue] = useState('commercial_web');
  const [buttonText, setButtonText] = useState('Select Scope');
  const [features, setFeatures] = useState<string[]>(['']);
  const [isPopular, setIsPopular] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Delete
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await adminService.getPricingPlans();
      setPlans(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load pricing plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const openCreateModal = () => {
    setEditingPlan(null);
    setName('');
    setStartingPrice('₹19,999');
    setPriceRange('One-time fee • No monthly lock-in');
    setDomainHosting('Includes domain & hosting setup');
    setDescription('');
    setTimeline('5 to 7 Days');
    setScopeValue('commercial_web');
    setButtonText('Select Scope');
    setFeatures(['Custom responsive design', 'Direct WhatsApp lead button', '30 days support']);
    setIsPopular(false);
    setIsActive(true);
    setDisplayOrder(plans.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setName(plan.name);
    setStartingPrice(plan.starting_price);
    setPriceRange(plan.price_range || '');
    setDomainHosting(plan.domain_hosting || '');
    setDescription(plan.description);
    setTimeline(plan.timeline || '');
    setScopeValue(plan.scope_value || 'commercial_web');
    setButtonText(plan.button_text || 'Select Scope');
    setFeatures(plan.features?.length > 0 ? plan.features : ['']);
    setIsPopular(plan.is_popular);
    setIsActive(plan.is_active);
    setDisplayOrder(plan.display_order);
    setIsModalOpen(true);
  };

  const handleAddFeatureField = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeatureField = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, val: string) => {
    const next = [...features];
    next[index] = val;
    setFeatures(next);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const cleanFeatures = features.map((f) => f.trim()).filter(Boolean);

    const payload = {
      name,
      starting_price: startingPrice,
      price_range: priceRange,
      domain_hosting: domainHosting,
      description,
      timeline,
      scope_value: scopeValue,
      button_text: buttonText,
      features: cleanFeatures,
      is_popular: isPopular,
      is_active: isActive,
      display_order: Number(displayOrder),
    };

    if (editingPlan) {
      const success = await adminService.updatePricingPlan(editingPlan.id, payload);
      if (success) {
        await adminService.logActivity(
          'PRICING_UPDATE',
          'Pricing',
          `Updated pricing plan "${name}" (${startingPrice})`,
          profile?.email
        );
        showToast('success', 'Plan Updated', 'Pricing changes saved successfully');
        setIsModalOpen(false);
        loadPlans();
      } else {
        showToast('error', 'Update Failed', 'Could not save pricing plan');
      }
    } else {
      const created = await adminService.createPricingPlan(payload);
      if (created) {
        await adminService.logActivity(
          'PRICING_CREATE',
          'Pricing',
          `Created new pricing plan "${name}" (${startingPrice})`,
          profile?.email
        );
        showToast('success', 'Plan Created', 'New pricing tier created');
        setIsModalOpen(false);
        loadPlans();
      } else {
        showToast('error', 'Create Failed', 'Could not create pricing plan');
      }
    }

    setIsSaving(false);
  };

  const handleToggleActive = async (plan: PricingPlan) => {
    const next = !plan.is_active;
    const success = await adminService.updatePricingPlan(plan.id, { is_active: next });

    if (success) {
      await adminService.logActivity(
        'PRICING_TOGGLE',
        'Pricing',
        `Toggled plan active state to ${next ? 'Active' : 'Disabled'} for "${plan.name}"`,
        profile?.email
      );
      showToast('info', 'Status Updated', `Plan is now ${next ? 'Active' : 'Disabled'}`);
      loadPlans();
    }
  };

  const handleDeletePlan = async () => {
    if (!deleteTargetId) return;
    const target = plans.find((p) => p.id === deleteTargetId);
    const success = await adminService.deletePricingPlan(deleteTargetId);

    if (success) {
      await adminService.logActivity(
        'PRICING_DELETE',
        'Pricing',
        `Deleted pricing tier: "${target?.name || deleteTargetId}"`,
        profile?.email
      );
      showToast('info', 'Plan Deleted', 'Tier removed from database');
      setDeleteTargetId(null);
      loadPlans();
    } else {
      showToast('error', 'Delete Failed', 'Could not delete pricing tier');
    }
  };

  const filtered = plans.filter(
    (p) =>
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.starting_price.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
            Website & Application Pricing Plans
          </h1>
          <p className="text-sm text-[#5c5f73] mt-1">
            Manage transparent tier pricing, feature checklists, and CTA button scopes.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#4f47e6] hover:bg-[#3b34c2] rounded-xl shadow-md shadow-indigo-200 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Pricing Plan</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#e6e4f0] p-4 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#8c8f9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plans by title, price, or description..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
          />
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-[#8c8f9f]">
            Loading plans...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-[#8c8f9f]">
            No pricing plans found.
          </div>
        ) : (
          filtered.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl border p-6 shadow-xs flex flex-col justify-between relative transition-all ${
                plan.is_popular
                  ? 'border-[#4f47e6] ring-2 ring-[#4f47e6]/10'
                  : plan.is_active
                  ? 'border-[#e6e4f0]'
                  : 'border-zinc-200 bg-zinc-50/50 opacity-75'
              }`}
            >
              {plan.is_popular && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#4f47e6] text-white shadow-sm">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#faf9fd] border border-[#e6e4f0] text-[#4f47e6]">
                      Tier #{plan.display_order}
                    </span>
                    <ActiveBadge active={plan.is_active} />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleActive(plan)}
                      className="p-1.5 text-[#5c5f73] hover:text-[#191a20] rounded-lg hover:bg-[#faf9fd]"
                      title={plan.is_active ? 'Disable Plan' : 'Enable Plan'}
                    >
                      {plan.is_active ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-zinc-400" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(plan)}
                      className="p-1.5 text-[#5c5f73] hover:text-[#4f47e6] rounded-lg hover:bg-[#eef0ff]"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(plan.id)}
                      className="p-1.5 text-[#8c8f9f] hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-heading text-[#191a20] mb-1">{plan.name}</h3>
                <p className="text-2xl font-extrabold font-heading text-[#4f47e6]">
                  {plan.starting_price}
                </p>
                {plan.price_range && (
                  <p className="text-xs text-[#5c5f73] mt-0.5">{plan.price_range}</p>
                )}

                <p className="text-xs text-[#5c5f73] mt-3 leading-relaxed border-t border-[#e6e4f0] pt-3">
                  {plan.description}
                </p>

                {/* Features List */}
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] font-semibold text-[#191a20] uppercase tracking-wider block">
                    Included Deliverables:
                  </span>
                  {plan.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#5c5f73]">
                      <span className="text-[#4f47e6] font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e6e4f0] flex items-center justify-between text-xs text-[#8c8f9f]">
                <span>Timeline: {plan.timeline || 'Flexible'}</span>
                <span className="font-mono text-[10px]">{plan.scope_value}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#e6e4f0] space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e6e4f0] pb-4">
              <h2 className="text-lg font-bold font-heading text-[#191a20]">
                {editingPlan ? 'Edit Pricing Plan' : 'Create Pricing Plan'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Plan Title
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Business Website Starter"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Starting Price Display
                  </label>
                  <input
                    type="text"
                    required
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    placeholder="₹14,999"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Price Subtitle / Range
                  </label>
                  <input
                    type="text"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="One-time fee • No monthly lock-in"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Timeline Delivery
                  </label>
                  <input
                    type="text"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    placeholder="5 to 7 Days"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Plan Scope Summary Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of who this plan is for..."
                  className="w-full p-3 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                />
              </div>

              {/* Dynamic Feature Bullets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#191a20] uppercase tracking-wider">
                    Feature Bullet Points
                  </label>
                  <button
                    type="button"
                    onClick={handleAddFeatureField}
                    className="text-xs text-[#4f47e6] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Bullet</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder={`Feature #${idx + 1}`}
                        className="flex-1 px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                      />
                      {features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFeatureField(idx)}
                          className="p-1.5 text-[#8c8f9f] hover:text-rose-600 rounded-lg"
                        >
                          <MinusCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#e6e4f0]">
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

                <div className="flex items-center gap-2 sm:col-span-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#191a20]">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="w-4 h-4 text-[#4f47e6] rounded-md"
                    />
                    <span>Highlight as Popular Plan</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#191a20] ml-4">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 text-[#4f47e6] rounded-md"
                    />
                    <span>Publish Active</span>
                  </label>
                </div>
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
                  {isSaving ? 'Saving...' : editingPlan ? 'Save Changes' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Pricing Tier"
        message="Are you sure you want to delete this pricing plan? It will no longer be visible on your website."
        confirmLabel="Delete Plan"
        isDestructive={true}
        onConfirm={handleDeletePlan}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
