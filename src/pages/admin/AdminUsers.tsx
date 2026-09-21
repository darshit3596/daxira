import React, { useEffect, useState } from 'react';
import {
  Users,
  Plus,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  CheckCircle,
  XCircle,
  Lock,
  Mail,
  User,
  X,
  AlertCircle,
} from 'lucide-react';
import { adminService, AdminProfile, AdminRole } from '../../services/adminService.ts';
import { RoleBadge, ActiveBadge } from '../../components/admin/StatusBadge.tsx';
import { ConfirmModal } from '../../components/admin/ConfirmModal.tsx';
import { useToast } from '../../components/admin/ToastNotification.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { isSupabaseConfigured, supabase } from '../../lib/supabase.ts';

export function AdminUsers() {
  const { profile: currentProfile, isSuperAdmin } = useAuth();
  const { showToast } = useToast();

  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Add User Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminRole>('admin');
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Delete
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAdminProfiles();
      setAdmins(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load admin users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  if (!isSuperAdmin) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-[#e6e4f0] max-w-lg mx-auto mt-12 space-y-3">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold font-heading text-[#191a20]">Super Admin Access Required</h2>
        <p className="text-xs text-[#5c5f73] leading-relaxed">
          Only users with the <span className="font-semibold text-purple-700">Super Admin</span> role
          can manage administrator accounts, invite team members, or modify permissions.
        </p>
      </div>
    );
  }

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isSupabaseConfigured) {
        // Sign up new user via Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password: password || 'Daxira@Admin2026',
          options: {
            data: { full_name: fullName },
          },
        });

        if (authError) throw authError;

        if (authData.user) {
          await supabase.from('admin_profiles').insert([
            {
              id: authData.user.id,
              email,
              full_name: fullName,
              role,
              is_active: true,
            },
          ]);
        }
      }

      await adminService.createAdminProfile({
        email,
        full_name: fullName,
        role,
        is_active: true,
      });

      await adminService.logActivity(
        'ADMIN_USER_CREATE',
        'Admin Users',
        `Super Admin created new admin account for "${email}" with role "${role}"`,
        currentProfile?.email
      );

      showToast('success', 'Admin Created', `Account for ${email} is now ready`);
      setIsModalOpen(false);
      setFullName('');
      setEmail('');
      setPassword('');
      setRole('admin');
      loadAdmins();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Could not create admin account';
      showToast('error', 'Creation Failed', errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (target: AdminProfile) => {
    if (target.id === currentProfile?.id) {
      showToast('warning', 'Action Denied', 'You cannot disable your own active account');
      return;
    }

    const next = !target.is_active;
    const success = await adminService.updateAdminProfile(target.id, { is_active: next });

    if (success) {
      await adminService.logActivity(
        'ADMIN_USER_TOGGLE',
        'Admin Users',
        `Toggled active status of admin "${target.email}" to ${next ? 'Active' : 'Disabled'}`,
        currentProfile?.email
      );
      showToast('info', 'Status Updated', `Admin account is now ${next ? 'Active' : 'Disabled'}`);
      loadAdmins();
    }
  };

  const handleDeleteAdmin = async () => {
    if (!deleteTargetId) return;

    if (deleteTargetId === currentProfile?.id) {
      showToast('warning', 'Action Denied', 'You cannot delete your own account');
      setDeleteTargetId(null);
      return;
    }

    const target = admins.find((a) => a.id === deleteTargetId);
    const success = await adminService.deleteAdminProfile(deleteTargetId);

    if (success) {
      await adminService.logActivity(
        'ADMIN_USER_DELETE',
        'Admin Users',
        `Removed admin privileges for account "${target?.email || deleteTargetId}"`,
        currentProfile?.email
      );
      showToast('info', 'Admin Removed', 'User has been removed from admin access');
      setDeleteTargetId(null);
      loadAdmins();
    } else {
      showToast('error', 'Delete Failed', 'Could not delete admin account');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
              Administrator Accounts
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
              Super Admin Control
            </span>
          </div>
          <p className="text-sm text-[#5c5f73] mt-1">
            Manage authorized staff members, role tiers, and access permissions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#4f47e6] hover:bg-[#3b34c2] rounded-xl shadow-md shadow-indigo-200 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Admin Table */}
      <div className="bg-white rounded-3xl border border-[#e6e4f0] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-[#8c8f9f]">Loading admin accounts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf9fd] border-b border-[#e6e4f0] text-[#5c5f73] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Administrator</th>
                  <th className="py-3.5 px-6">Role Tier</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Created On</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e4f0] text-[#191a20]">
                {admins.map((adm) => (
                  <tr key={adm.id} className="hover:bg-[#faf9fd]/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#eef0ff] text-[#4f47e6] font-bold text-xs flex items-center justify-center border border-indigo-200">
                          {adm.full_name?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-[#191a20] flex items-center gap-2">
                            <span>{adm.full_name}</span>
                            {adm.id === currentProfile?.id && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-indigo-50 text-[#4f47e6]">
                                (You)
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#5c5f73] font-mono">{adm.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <RoleBadge role={adm.role} />
                    </td>

                    <td className="py-4 px-6">
                      <ActiveBadge active={adm.is_active} />
                    </td>

                    <td className="py-4 px-6 font-mono text-[#8c8f9f] text-[11px]">
                      {new Date(adm.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleActive(adm)}
                          disabled={adm.id === currentProfile?.id}
                          className="p-1.5 text-[#5c5f73] hover:text-[#191a20] rounded-lg hover:bg-[#faf9fd] disabled:opacity-30"
                          title={adm.is_active ? 'Disable Account' : 'Enable Account'}
                        >
                          {adm.is_active ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-zinc-400" />
                          )}
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(adm.id)}
                          disabled={adm.id === currentProfile?.id}
                          className="p-1.5 text-[#8c8f9f] hover:text-rose-600 rounded-lg hover:bg-rose-50 disabled:opacity-30"
                          title="Remove Access"
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

      {/* Add Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#e6e4f0] space-y-5">
            <div className="flex items-center justify-between border-b border-[#e6e4f0] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#4f47e6]" />
                <h2 className="text-lg font-bold font-heading text-[#191a20]">Invite Admin User</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8c8f9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Darshit Sapariya"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8c8f9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@daxira.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Initial Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8c8f9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] outline-hidden text-[#191a20]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                  Role Permission Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      role === 'admin'
                        ? 'border-[#4f47e6] bg-[#eef0ff] text-[#4f47e6] font-semibold'
                        : 'border-[#e6e4f0] bg-[#faf9fd] text-[#5c5f73]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={role === 'admin'}
                      onChange={() => setRole('admin')}
                      className="hidden"
                    />
                    <span className="text-xs">Staff Admin</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      role === 'super_admin'
                        ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold'
                        : 'border-[#e6e4f0] bg-[#faf9fd] text-[#5c5f73]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="super_admin"
                      checked={role === 'super_admin'}
                      onChange={() => setRole('super_admin')}
                      className="hidden"
                    />
                    <span className="text-xs">Super Admin</span>
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
                  {isSaving ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Revoke Admin Access"
        message="Are you sure you want to remove admin access for this user? They will no longer be able to log into the Daxira InfoTech Admin Panel."
        confirmLabel="Revoke Access"
        isDestructive={true}
        onConfirm={handleDeleteAdmin}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
