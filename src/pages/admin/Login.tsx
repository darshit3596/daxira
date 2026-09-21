import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { isSupabaseConfigured } from '../../lib/supabase.ts';

export function Login() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.error || 'Invalid credentials. Please check your email and password.');
    }
  };

  const handleFillDemo = (role: 'super' | 'admin') => {
    if (role === 'super') {
      setEmail('admin@daxira.com');
      setPassword('admin123');
    } else {
      setEmail('support@daxira.com');
      setPassword('support123');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9fd] flex flex-col items-center justify-center p-4 sm:p-6 text-[#191a20]">
      {/* Background ambient gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-100/40 blur-[100px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand Logotype */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#4f47e6] text-white font-extrabold text-2xl shadow-xl shadow-indigo-200 mb-4">
            D
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#191a20]">
            Daxira InfoTech
          </h1>
          <p className="text-sm text-[#5c5f73] mt-1">
            Studio Management & Administration Suite
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#e6e4f0] p-6 sm:p-8 shadow-xl shadow-indigo-100/50">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e6e4f0]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#4f47e6]" />
              <h2 className="font-semibold text-base text-[#191a20]">Admin Authentication</h2>
            </div>
            <span
              className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                isSupabaseConfigured
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {isSupabaseConfigured ? 'Supabase Live' : 'Demo Active'}
            </span>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8c8f9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@daxira.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] focus:ring-2 focus:ring-[#4f47e6]/10 outline-hidden transition-all text-[#191a20]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191a20] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8c8f9f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#faf9fd] border border-[#e6e4f0] rounded-xl focus:bg-white focus:border-[#4f47e6] focus:ring-2 focus:ring-[#4f47e6]/10 outline-hidden transition-all text-[#191a20]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c8f9f] hover:text-[#191a20]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full mt-2 py-3 px-4 bg-[#4f47e6] hover:bg-[#3b34c2] text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          {!isSupabaseConfigured && (
            <div className="mt-6 pt-5 border-t border-[#e6e4f0]/80">
              <div className="flex items-center gap-1.5 text-xs text-[#5c5f73] font-medium mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Demo Login Presets:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillDemo('super')}
                  className="p-2 text-xs text-left bg-[#faf9fd] hover:bg-[#eef0ff] hover:text-[#4f47e6] border border-[#e6e4f0] rounded-xl transition-all"
                >
                  <span className="font-semibold block">Super Admin</span>
                  <span className="text-[10px] text-[#8c8f9f] block">admin@daxira.com</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('admin')}
                  className="p-2 text-xs text-left bg-[#faf9fd] hover:bg-[#eef0ff] hover:text-[#4f47e6] border border-[#e6e4f0] rounded-xl transition-all"
                >
                  <span className="font-semibold block">Staff Admin</span>
                  <span className="text-[10px] text-[#8c8f9f] block">support@daxira.com</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Back to Public Website */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-[#5c5f73] hover:text-[#4f47e6] transition-colors inline-flex items-center gap-1"
          >
            ← Return to Daxira InfoTech Website
          </a>
        </div>
      </div>
    </div>
  );
}
