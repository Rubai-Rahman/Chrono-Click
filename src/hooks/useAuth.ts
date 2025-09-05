'use client';

import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/lib/better-auth/auth';
import { isValidUrl } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { saveUser } from '@/app/actions/authAction';

export const useAuth = () => {
  const router = useRouter();
  const { user, isLoading, isInitialized, error, setLoading, setError } =
    useAuthStore();

  const googleSignIn = async (callbackUrl?: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authService.signInWithGoogle();
      const idToken = await result.user.getIdToken();
      await saveUser(idToken);
      // Handle callback redirect
      if (callbackUrl && isValidUrl(callbackUrl)) {
        router.push(callbackUrl);
      } else {
        router.push('/products/gents');
      }
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
