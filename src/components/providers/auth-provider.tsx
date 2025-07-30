'use client';

import React, { useEffect, ReactNode, useCallback } from 'react';
import { authService } from '@/lib/firebase/auth';
import { useAuthStore, AuthUser } from '@/store/useAuthStore';
import { setAuthCookie, clearAuthCookie } from '@/lib/auth/cookie-sync';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, setInitialized, reset } = useAuthStore();

  const handleAuthStateChange = useCallback(
    async (user: AuthUser | null) => {
      console.log('🔥 Firebase auth state changed:', user);

      if (user) {
        console.log('✅ Setting user in auth provider');
        setUser(user);
        // Set HTTP cookie for middleware
        await setAuthCookie();
      } else {
        console.log('❌ Clearing auth in auth provider');
        reset();
        // Clear HTTP cookie
        await clearAuthCookie();
      }

      setInitialized(true);
    },
    [setUser, setInitialized, reset]
  );

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = authService.onAuthStateChanged(handleAuthStateChange);

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [handleAuthStateChange]);

  return <>{children}</>;
};
