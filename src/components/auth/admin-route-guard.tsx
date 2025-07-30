'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminRouteGuardProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

export const AdminRouteGuard = ({
  children,
  fallbackPath = '/dashboard',
}: AdminRouteGuardProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // If user is authenticated but not admin, redirect
      if (user?.role !== 'admin') {
        router.push(fallbackPath);
      }
    }
  }, [user, isLoading, isAuthenticated, router, fallbackPath]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render if not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
};
