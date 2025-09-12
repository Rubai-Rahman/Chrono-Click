'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

export const HydrateAuth = ({ children }: { children: React.ReactNode }) => {
  const { setUser, setInitialized, setLoading } = useAuthStore();

  useEffect(() => {
    async function init() {
      setLoading(true);
      const user = await getCurrentUser(); // server action reads cookies
      setUser(user ?? null); // null if no user
      setInitialized(true);
      setLoading(false);
    }
    init();
  }, [setUser, setInitialized, setLoading]);

  return <>{children}</>;
};
