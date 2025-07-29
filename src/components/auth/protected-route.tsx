'use client';

import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { user, isInitialized } = useAuthStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isInitialized && !user) {
      startTransition(() => {
        router.push('/login');
      });
    }
  }, [user, isInitialized, router]);

  // Show loading while checking auth state
  if (!isInitialized) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      )
    );
  }

  // Show loading while redirecting
  if (!user || isPending) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p>{isPending ? 'Redirecting to login...' : 'Loading...'}</p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};
