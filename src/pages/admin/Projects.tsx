import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Briefcase,
  ExternalLink,
  Search,
  CheckCircle,
  XCircle,
  X,
  Code2,
} from 'lucide-react';
import { adminService, Project } from '../../services/adminService.ts';
import { ActiveBadge } from '../../components/admin/StatusBadge.tsx';
import { ConfirmModal } from '../../components/admin/ConfirmModal.tsx';
import { useToast } from '../../components/admin/ToastNotification.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

export function Projects() {
  const { profile } = useAuth();
  const { showToast } = useToast();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [clientBusiness, setClientBusiness] = useState('');
  const [category, setCategory] = useState('Websites');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [technologiesText, setTechnologiesText] = useState('React, Django, PostgreSQL, Tailwind CSS');
  const [liveUrl, setLiveUrl] = useState('');
  const [completionDate, setCompletionDate] = useState('February 2026');
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Delete
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await adminService.getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setClientBusiness('');
    setCategory('Websites');
    setSubtitle('');
    setDescription('');
    setImageUrl('');
    setTechnologiesText('React, TypeScript, Tailwind CSS');
    setLiveUrl('');
    setCompletionDate('February 2026');
    setIsActive(true);
    setDisplayOrder(projects.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setClientBusiness(proj.client_business);
    setCategory(proj.category);
    setSubtitle(proj.subtitle || '');
    setDescription(proj.description);
    setImageUrl(proj.image_url || '');
    setTechnologiesText(proj.technologies ? proj.technologies.join(', ') : '');
    setLiveUrl(proj.live_url || '');
    setCompletionDate(proj.completion_date || '');
    setIsActive(proj.is_active);
    setDisplayOrder(proj.display_order);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const techArray = technologiesText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      client_business: clientBusiness,
      category,
      subtitle,
      description,
      image_url: imageUrl,
      technologies: techArray,
      live_url: liveUrl,
      completion_date: completionDate,
      is_active: isActive,
      display_order: Number(displayOrder),
    };

    if (editingProject) {
      const success = await adminService.updateProject(editingProject.id, payload);
      if (success) {
        await adminService.logActivity(
          'PROJECT_UPDATE',
          'Projects',
          `Updated case study project "${title}" for client ${clientBusiness}`,
          profile?.email
        );
        showToast('success', 'Project Updated', 'Case study changes saved');
        setIsModalOpen(false);
        loadProjects();
      } else {
        showToast('error', 'Update Failed', 'Could not save project');
      }
    } else {
      const created = await adminService.createProject(payload);
      if (created) {
        await adminService.logActivity(
          'PROJECT_CREATE',
          'Projects',
          `Added new delivered project "${title}" for client ${clientBusiness}`,
          profile?.email
        );
        showToast('success', 'Project Created', 'New case study published');
        setIsModalOpen(false);
        loadProjects();
      } else {
        showToast('error', 'Create Failed', 'Could not create project');
      }
    }

    setIsSaving(false);
  };

  const handleToggleActive = async (proj: Project) => {
    const next = !proj.is_active;
    const success = await adminService.updateProject(proj.id, { is_active: next });

    if (success) {
      await adminService.logActivity(
        'PROJECT_TOGGLE',
        'Projects',
        `Toggled project active state to ${next ? 'Active' : 'Disabled'} for "${proj.title}"`,
        profile?.email
      );
      showToast('info', 'Status Updated', `Project is now ${next ? 'Active' : 'Disabled'}`);
      loadProjects();
    }
  };

  const handleDeleteProject = async () => {
    if (!deleteTargetId) return;
    const target = projects.find((p) => p.id === deleteTargetId);
    const success = await adminService.deleteProject(deleteTargetId);

    if (success) {
      await adminService.logActivity(
        'PROJECT_DELETE',
        'Projects',
        `Deleted delivered client project: "${target?.title || deleteTargetId}"`,
        profile?.email
      );
      showToast('info', 'Project Deleted', 'Project removed from showcase');
      setDeleteTargetId(null);
      loadProjects();
    } else {
      showToast('error', 'Delete Failed', 'Could not delete project');
    }
  };

  const filtered = projects.filter(
    (p) =>
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client_business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
            Delivered Client Projects
          </h1>
          <p className="text-sm text-[#5c5f73] mt-1">
            Manage showcase case studies and engineering portfolio highlights.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#4f47e6] hover:bg-[#3b34c2] rounded-xl shadow-md shadow-indigo-200 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Project</span>
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
            placeholder="Search projects by title, client, category, or tech stack..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-[#8c8f9f]">
            Loading projects...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-[#8c8f9f]">
            No projects found. Click &quot;Add Client Project&quot; to publish your first case study.
          </div>
        ) : (
          filtered.map((proj) => (
            <div
              key={proj.id}
              className={`bg-white rounded-3xl border p-6 shadow-xs flex flex-col justify-between transition-all ${
                proj.is_active ? 'border-[#e6e4f0]' : 'border-zinc-200 bg-zinc-50/50 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#4f47e6] border border-indigo-200">
                      {proj.category}
                    </span>
                    <ActiveBadge active={proj.is_active} />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleActive(proj)}
                      className="p-1.5 text-[#5c5f73] hover:text-[#191a20] rounded-lg hover:bg-[#faf9fd]"
                      title={proj.is_active ? 'Disable Project' : 'Enable Project'}
                    >
                      {proj.is_active ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-zinc-400" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-1.5 text-[#5c5f73] hover:text-[#4f47e6] rounded-lg hover:bg-[#eef0ff]"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(proj.id)}
                      className="p-1.5 text-[#8c8f9f] hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold font-heading text-[#191a20] mb-0.5">
                  {proj.title}
                </h3>
                <p className="text-xs font-semibold text-[#4f47e6] mb-2">
                  Client: {proj.client_business}
                </p>

                {proj.subtitle && (
                  <p className="text-xs text-[#5c5f73] italic mb-3">&quot;{proj.subtitle}&quot;</p>
                )}

                <p className="text-xs text-[#5c5f73] leading-relaxed line-clamp-3 mb-4">
                  {proj.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#e6e4f0]">
                  {proj.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-[#faf9fd] border border-[#e6e4f0] text-[#191a20]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#e6e4f0] flex items-center justify-between text-xs text-[#8c8f9f]">
                <span>Completed: {proj.completion_date || 'Recently'}</span>
                {proj.live_url && (
                  <a
                    href={proj.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#4f47e6] hover:underline font-medium"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
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
                {editingProject ? 'Edit Client Project' : 'Add Delivered Project'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Project Headline / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern E-Commerce Store & UPI Engine"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Client / Business Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientBusiness}
                    onChange={(e) => setClientBusiness(e.target.value)}
                    placeholder="e.g. Artisan Goods Co."
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="E-Commerce / Custom Software / Corporate"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Completion Date
                  </label>
                  <input
                    type="text"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    placeholder="February 2026"
                    className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Value Proposition Tagline (Subtitle)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Sub-second checkout flow with instant UPI payment confirmation"
                  className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Detailed Case Study Breakdown
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the client problem solved, custom code written, and key results..."
                  className="w-full p-3 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Technologies Used (Comma-separated)
                </label>
                <input
                  type="text"
                  value={technologiesText}
                  onChange={(e) => setTechnologiesText(e.target.value)}
                  placeholder="React, Django, PostgreSQL, Razorpay, Tailwind CSS"
                  className="w-full px-3 py-2 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                    Live Demo / Project URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
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

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#191a20]">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-[#4f47e6] rounded-md"
                  />
                  <span>Showcase as Live Project on Website</span>
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
                  {isSaving ? 'Saving...' : editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Case Study Project"
        message="Are you sure you want to delete this case study? It will be removed from your portfolio showcase."
        confirmLabel="Delete Project"
        isDestructive={true}
        onConfirm={handleDeleteProject}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
