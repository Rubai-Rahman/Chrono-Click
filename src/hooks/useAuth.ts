import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { authService, mapFirebaseUser } from '@/lib/firebase/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { FirebaseError } from 'firebase/app';

export const useAuth = () => {
  const { user, isLoading, setUser, setLoading, clearAuth } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const userCredential = await authService.signInWithEmail(email, password);
      return mapFirebaseUser(userCredential.user);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (user) => {
      setUser(user);
      setLoading(false);
      toast.success('Welcome back!');
      startTransition(() => {
        router.push('/dashboard');
      });
    },
    onError: (error: FirebaseError) => {
      setLoading(false);
      const errorMessage = getAuthErrorMessage(error.code);
      toast.error(errorMessage);
      throw error;
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      displayName,
    }: {
      email: string;
      password: string;
      displayName: string;
    }) => {
      const userCredential = await authService.createUserWithEmail(
        email,
        password,
        displayName
      );
      return mapFirebaseUser(userCredential.user);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (user) => {
      setUser(user);
      setLoading(false);
      toast.success('Account created successfully!');
      startTransition(() => {
        router.push('/dashboard');
      });
    },
    onError: (error: FirebaseError) => {
      setLoading(false);
      const errorMessage = getAuthErrorMessage(error.code);
      toast.error(errorMessage);
      throw error;
    },
  });

  // Google sign in mutation
  const googleSignInMutation = useMutation({
    mutationFn: async () => {
      const userCredential = await authService.signInWithGoogle();
      return mapFirebaseUser(userCredential.user);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (user) => {
      setUser(user);
      setLoading(false);
      toast.success('Welcome!');
      startTransition(() => {
        router.push('/dashboard');
      });
    },
    onError: (error: FirebaseError) => {
      setLoading(false);
      const errorMessage = getAuthErrorMessage(error.code);
      toast.error(errorMessage);
      throw error;
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authService.signOut();
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear(); // Clear all cached data
      toast.success('Logged out successfully');
      startTransition(() => {
        router.push('/login');
      });
    },
    onError: (error: Error) => {
      setLoading(false);
      toast.error('Failed to logout');
      console.error('Logout error:', error);
    },
  });

  // Password reset mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      await authService.resetPassword(email);
    },
    onSuccess: () => {
      toast.success('Password reset email sent!');
    },
    onError: (error: FirebaseError) => {
      const errorMessage = getAuthErrorMessage(error.code);
      toast.error(errorMessage);
    },
  });

  return {
    // State
    user,
    isLoading:
      isLoading ||
      loginMutation.isPending ||
      registerMutation.isPending ||
      googleSignInMutation.isPending ||
      logoutMutation.isPending ||
      isPending,
    isAuthenticated: !!user,

    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    googleSignIn: googleSignInMutation.mutate,
    logout: logoutMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,

    // Mutation states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
  };
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled.';
    default:
      return 'An error occurred. Please try again.';
  }
};
