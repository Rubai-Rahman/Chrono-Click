import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  name: string;
  email: string;
  photoURL?: string;
  role: 'user' | 'admin';
}

interface AuthState {
  accessToken: string;
  user: AuthUser | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: AuthUser | null) => void;
  setAccessToken: (accessToken: string) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      accessToken: '',
      user: null,
      isLoading: false,
      isInitialized: false,
      error: null,

      setUser: (user) => set({ user, error: null }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setLoading: (isLoading) => set({ isLoading }),
      setInitialized: (isInitialized) => set({ isInitialized }),
      setError: (error) => set({ error }),
      logout: async () => {
        try {
          set({
            user: null,
            isLoading: false,
            accessToken: '',
            error: null,
          });

          if (typeof window !== 'undefined') {
            const { logoutAction } = await import('@/app/actions/authAction');
            await logoutAction();
          }
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
      reset: () =>
        set({
          user: null,
          isLoading: false,
          accessToken: '',
          isInitialized: false,
          error: null,
        }),
    }),
    {
      name: 'auth-storage', // key in localStorage
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }), // optional: only persist what you need
    }
  )
);
