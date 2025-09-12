'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

export const HydrateAuth = ({ children }: { children: React.ReactNode }) => {
  const { setUser, setAccessToken, setInitialized, setLoading } =
    useAuthStore();

  useEffect(() => {
    async function init() {
      setLoading(true);
      const user = await getCurrentUser();
      if (user) {
        setUser({
          name: user.name,
          email: user.email,
          role: user.role,
        });
        setAccessToken(
          document.cookie.includes('accessToken') ? 'cookie-exists' : ''
        );
      } else {
        setUser(null);
        setAccessToken('');
      }
      setInitialized(true);
      setLoading(false);
    }
    init();
  }, [setUser, setAccessToken, setInitialized, setLoading]);

  return <>{children}</>;
};
