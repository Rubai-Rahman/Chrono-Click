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
    } else {
      setUser(null);
    }

    // Always set initialized to true after processing session
    setInitialized(true);
    setLoading(false);

    // Cleanup function
    return () => {};
  }, [session, setUser, setInitialized, setLoading]);

  return <>{children}</>;
};
