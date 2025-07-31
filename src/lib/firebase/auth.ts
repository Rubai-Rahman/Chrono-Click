import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  UserCredential,
  User,
} from 'firebase/auth';
import { auth } from './config';
import { AuthUser } from '@/store/useAuthStore';

// Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Helper function to determine user role from Firebase claims only
const getUserRole = async (user: User): Promise<'user' | 'admin'> => {
  try {
    const idTokenResult = await user.getIdTokenResult();
    return idTokenResult.claims.admin === true ? 'admin' : 'user';
  } catch {
    return 'user';
  }
};
// Convert Firebase User to AuthUser
export const mapFirebaseUser = async (
  user: User | null
): Promise<AuthUser | null> => {
  if (!user) return null;

  const role = await getUserRole(user);

  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    role,
    emailVerified: user.emailVerified,
  };
};
// Auth service functions
export const authService = {
  // Create user with email and password
  createUserWithEmail: async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update profile with display name if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }

    return userCredential;
  },

  // Sign in with email and password
  signInWithEmail: async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  },
  // Sign in with Google
  signInWithGoogle: async (): Promise<UserCredential> => {
    return await signInWithPopup(auth, googleProvider);
  },

  // Sign out
  signOut: async (): Promise<void> => {
    return await signOut(auth);
  },

  // Send password reset email
  resetPassword: async (email: string): Promise<void> => {
    return await sendPasswordResetEmail(auth, email);
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  // Auth State Listener
  onAuthStateChanged: (callback: (user: AuthUser | null) => void) => {
    return onAuthStateChanged(auth, async (user) => {
      const authUser = await mapFirebaseUser(user);
      callback(authUser);
    });
  },

  // Get ID Token
  getIdToken: async (forceRefresh = false) => {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken(forceRefresh);
  },
};
