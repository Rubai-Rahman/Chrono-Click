'use client';

import { SessionData } from '@/lib/session';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export const HydrateAuth = ({
  session,
  children,
}: {
  session: SessionData | null;
  children: React.ReactNode;
}) => {
  const { setUser, setInitialized, setLoading } = useAuthStore();

  useEffect(() => {
    // Set initial auth state from server session
    if (session?.user) {
      setUser(session.user);
      setInitialized(true);
    } else {
      setUser(null);
    }

    // Cleanup function
    return () => {};
  }, [session, setUser, setInitialized, setLoading]);

  return <>{children}</>;
};
