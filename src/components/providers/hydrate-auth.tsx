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
  const { setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
    setInitialized(true);
  }, [session, setUser, setInitialized]);

  return <>{children}</>;
};
