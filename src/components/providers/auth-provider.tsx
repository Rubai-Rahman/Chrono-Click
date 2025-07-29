'use client';

import React, { useEffect, ReactNode, useCallback } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { authService, mapFirebaseUser } from '@/lib/firebase/auth';
import { useAuthStore } from '@/store/useAuthStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, setInitialized, clearAuth } = useAuthStore();

  const handleAuthStateChange = useCallback(
    (firebaseUser: FirebaseUser | null) => {
      const user = mapFirebaseUser(firebaseUser);

      if (user) {
        setUser(user);
      } else {
        clearAuth();
      }

      setInitialized(true);
    },
    [setUser, setInitialized, clearAuth]
  );

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = authService.onAuthStateChanged(handleAuthStateChange);

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [handleAuthStateChange]);

  return <>{children}</>;
};
