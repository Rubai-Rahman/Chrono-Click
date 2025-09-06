'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export const HydrateAuth = ({ children }: { children: React.ReactNode }) => {
  const { setInitialized, setLoading } = useAuthStore();

  useEffect(() => {
    // Just mark store as ready
    setInitialized(true);
    setLoading(false);
  }, [setInitialized, setLoading]);

  return <>{children}</>;
};
