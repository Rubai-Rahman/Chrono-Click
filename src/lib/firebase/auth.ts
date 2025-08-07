import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  UserCredential,
} from 'firebase/auth';
import { auth } from './config';

// Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

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
};
