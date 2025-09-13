'use client';

import { useAuthStore } from '@/store/useAuthStore';

export const useAuth = () => {
  const { user, isLoading, isInitialized, error, setLoading } = useAuthStore();

  return {
    // State
    user,
    setLoading,
    isLoading,
    isInitialized,
    loginError: error ? { message: error } : null,
    registerError: error ? { message: error } : null,
  };
};
