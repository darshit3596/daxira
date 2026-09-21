import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.ts';
import { adminService, AdminProfile, AdminRole } from '../services/adminService.ts';

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: AdminProfile | null;
  role: AdminRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuperAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN_KEY = 'daxira_auth_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load active session on mount
  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true);

      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({ id: session.user.id, email: session.user.email || '' });
            // Fetch admin profile
            const { data: prof } = await supabase
              .from('admin_profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (prof && prof.is_active) {
              setProfile(prof as AdminProfile);
            } else {
              // Fallback admin profile if not yet created in table
              setProfile({
                id: session.user.id,
                email: session.user.email || 'admin@daxira.com',
                full_name: session.user.user_metadata?.full_name || 'Admin',
                role: 'super_admin',
                is_active: true,
                created_at: new Date().toISOString(),
              });
            }
          }
        } catch (err) {
          console.warn('Supabase auth session check fallback:', err);
        }
      } else {
        // Local Demo Session
        const stored = localStorage.getItem(DEMO_ADMIN_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setUser({ id: parsed.id, email: parsed.email });
            setProfile(parsed);
          } catch {
            localStorage.removeItem(DEMO_ADMIN_KEY);
          }
        }
      }

      setIsLoading(false);
    }

    checkAuth();

    // Listen to Supabase auth state changes if configured
    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || '' });
          const { data: prof } = await supabase
            .from('admin_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (prof) setProfile(prof as AdminProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });

        if (error) {
          await adminService.logActivity(
            'LOGIN_FAILED',
            'Authentication',
            `Failed login attempt for email: ${email}. Reason: ${error.message}`,
            email
          );
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          setUser({ id: data.user.id, email: data.user.email || email });

          // Fetch profile
          const { data: prof } = await supabase
            .from('admin_profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          const activeProf: AdminProfile = prof || {
            id: data.user.id,
            email: data.user.email || email,
            full_name: 'Darshit Sapariya',
            role: 'super_admin',
            is_active: true,
            created_at: new Date().toISOString(),
          };

          setProfile(activeProf);

          await adminService.logActivity(
            'LOGIN',
            'Authentication',
            `Admin ${email} successfully logged in via Supabase Auth`,
            email,
            data.user.id
          );

          setIsLoading(false);
          return { success: true };
        }
      } catch (err: unknown) {
        setIsLoading(false);
        const errorMsg = err instanceof Error ? err.message : 'Login failed';
        return { success: false, error: errorMsg };
      }
    }

    // Demo Mode fallback login (accepts standard credentials e.g. admin@daxira.com or any non-empty input)
    if (email && pass) {
      const isSuper = email.includes('admin') || email.includes('darshit');
      const demoProfile: AdminProfile = {
        id: `demo-${Date.now()}`,
        email: email.trim().toLowerCase(),
        full_name: isSuper ? 'Darshit Sapariya' : 'Operations Admin',
        role: isSuper ? 'super_admin' : 'admin',
        is_active: true,
        created_at: new Date().toISOString(),
      };

      setUser({ id: demoProfile.id, email: demoProfile.email });
      setProfile(demoProfile);
      localStorage.setItem(DEMO_ADMIN_KEY, JSON.stringify(demoProfile));

      await adminService.logActivity(
        'LOGIN',
        'Authentication',
        `Admin ${demoProfile.email} logged in (Demo Mode)`,
        demoProfile.email,
        demoProfile.id
      );

      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: 'Please enter a valid email and password' };
  };

  const logout = async (): Promise<void> => {
    const currentEmail = user?.email || 'admin@daxira.com';
    const currentId = user?.id;

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signout error:', err);
      }
    }

    await adminService.logActivity(
      'LOGOUT',
      'Authentication',
      `Admin ${currentEmail} logged out of Admin Panel`,
      currentEmail,
      currentId
    );

    localStorage.removeItem(DEMO_ADMIN_KEY);
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role: profile?.role || null,
        isAuthenticated: Boolean(user && profile?.is_active),
        isLoading,
        isSuperAdmin: profile?.role === 'super_admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
