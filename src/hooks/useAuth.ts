'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/lib/firebase/auth';
import { saveUser } from '@/app/actions/authAction';

interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}

export const useAuth = () => {
  const router = useRouter();
  const { user, isLoading, isInitialized, error, setLoading, setError } =
    useAuthStore();

  // Initialize auth state listener

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      await authService.createUserWithEmail(
        data.email,
        data.password,
        data.displayName
      );
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error: Error) {
      const errorMessage =
        error.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists'
          : error.message || 'Registration failed';

      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
      const errorMessage = error.message || 'Google sign-in failed';
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

    // Actions
    register: register,
    googleSignIn,
  };
};
