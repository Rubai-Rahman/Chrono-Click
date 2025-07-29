import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import firebaseConfig from './config';
import { UserRole } from '@/lib/auth-utils';

// Initialize Firebase only if it hasn't been initialized already
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

// User profile interface for Firestore
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Get user role from Firestore
export const getUserRole = async (uid: string): Promise<UserRole> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserProfile;
      return userData.role || UserRole.USER;
    }
    return UserRole.USER;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return UserRole.USER;
  }
};

// Create or update user profile
export const createUserProfile = async (
  uid: string,
  email: string,
  displayName: string,
  role: UserRole = UserRole.USER
): Promise<void> => {
  try {
    const userProfile: UserProfile = {
      uid,
      email,
      displayName,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    await setDoc(doc(db, 'users', uid), userProfile, { merge: true });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// Update user role (admin only)
export const updateUserRole = async (
  uid: string,
  newRole: UserRole
): Promise<void> => {
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        role: newRole,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};
