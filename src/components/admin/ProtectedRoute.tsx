import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import { AdminLayout } from './AdminLayout.tsx';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  superAdminOnly?: boolean;
}

export function ProtectedRoute({ children, superAdminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isSuperAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf9fd] flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 rounded-xl bg-[#4f47e6] flex items-center justify-center text-white font-bold text-lg mb-4 animate-pulse">
          D
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5c5f73]">
          <Loader2 className="w-4 h-4 animate-spin text-[#4f47e6]" />
          <span>Verifying Admin Authorization...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (superAdminOnly && !isSuperAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
