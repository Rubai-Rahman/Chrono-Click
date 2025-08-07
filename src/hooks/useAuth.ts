'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/lib/firebase/auth';

interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    isLoading,
    isInitialized,
    error,
    setUser,
    setLoading,
    setInitialized,
    setError,
    reset,
  } = useAuthStore();

  // Initialize auth state listener
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (!isInitialized) {
        setInitialized(true);
      }
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setInitialized, isInitialized]);

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
      console.log('token', idToken, 'result', result);

      toast.success('Welcome!');
      router.push('/dashboard');
    } catch (error: any) {
      const errorMessage = error.message || 'Google sign-in failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // const resetPassword = async (email: string) => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     await authService.resetPassword(email);
  //     toast.success('Password reset email sent!');
  //   } catch (error: any) {
  //     const errorMessage =
  //       error.code === 'auth/user-not-found'
  //         ? 'No account found with this email'
  //         : error.message || 'Password reset failed';

  //     setError(errorMessage);
  //     toast.error(errorMessage);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    // State
    user,
    isLoading,
    isInitialized,
    loginError: error ? { message: error } : null,
    registerError: error ? { message: error } : null,

    // Actions
    register: register,
    googleSignIn,
  };
};
