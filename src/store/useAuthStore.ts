import { create } from 'zustand';

export interface AuthUser {
  email: string;
  name: string;
  displayName?: string;
  photoURL?: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean; // optional, depending on your usage
  isInitialized: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,
  error: null,

  setUser: (user) => set({ user, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      user: null,
      isLoading: false,
      isInitialized: false,
      error: null,
    }),
}));
