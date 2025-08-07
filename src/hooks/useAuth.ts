'use client';

import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/lib/firebase/auth';
import { saveUser } from '@/app/actions/authAction';

export const useAuth = () => {
  const { user, isLoading, isInitialized, error, setLoading, setError } =
    useAuthStore();

  const googleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await authService.signInWithGoogle();
      const idToken = await result.user.getIdToken();
      await saveUser(
        result.user.email || 'test@gmail.com',
        result.user.displayName || '',
        idToken,
        result.user.photoURL || ''
      );
      toast.success('Welcome!');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Google sign-in failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    user,
    setLoading,
    isLoading,
    isInitialized,
    loginError: error ? { message: error } : null,
    registerError: error ? { message: error } : null,

    googleSignIn,
  };
};
