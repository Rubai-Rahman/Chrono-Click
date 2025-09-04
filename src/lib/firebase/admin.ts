import 'server-only';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  initializeApp({
    credential: cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

export const adminAuth = getAuth();

/**
 * Verify and refresh Firebase ID token on server side
 */
export async function verifyAndRefreshToken(idToken: string): Promise<{
  success: boolean;
  token?: string;
  uid?: string;
  error?: string;
}> {
  try {
    // Verify the token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Create a fresh custom token for the user
    const customToken = await adminAuth.createCustomToken(decodedToken.uid);

    return {
      success: true,
      token: customToken,
      uid: decodedToken.uid,
    };
  } catch (error) {
    console.error('Token verification/refresh failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Token refresh failed',
    };
  }
}

/**
 * Get user data from Firebase Admin
 */
export async function getAdminUserData(uid: string) {
  try {
    const userRecord = await adminAuth.getUser(uid);
    return {
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email || '',
        displayName: userRecord.displayName || '',
        emailVerified: userRecord.emailVerified,
      },
    };
  } catch (error) {
    console.error('Failed to get user data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get user data',
    };
  }
}
