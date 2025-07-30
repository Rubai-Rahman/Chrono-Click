import { authService } from '@/lib/firebase/auth';
import { setClientCookie, clearClientCookie } from './client-cookie';

// Set auth cookie when user logs in
export const setAuthCookie = async () => {
  try {
    console.log('🔄 Attempting to get ID token...');
    const idToken = await authService.getIdToken(true); // Force refresh

    if (!idToken) {
      console.log('❌ No ID token available');
      throw new Error('No ID token available');
    }

    console.log('🔄 ID token obtained, setting cookie...');
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Cookie setting failed:', response.status, errorText);
      throw new Error(
        `Failed to set auth cookie: ${response.status} ${errorText}`
      );
    }

    console.log('✅ Auth cookie set successfully');

    // Also set client-side cookie as backup
    if (typeof window !== 'undefined') {
      setClientCookie('auth-token-backup', idToken, 5);
    }

    // Add a small delay to ensure cookie is set before any navigation
    await new Promise((resolve) => setTimeout(resolve, 100));
  } catch (error) {
    console.error('❌ Failed to set auth cookie:', error);
  }
};

// Clear auth cookie when user logs out
export const clearAuthCookie = async () => {
  try {
    const response = await fetch('/api/auth/session', {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to clear auth cookie');
    }

    console.log('✅ Auth cookie cleared successfully');

    // Also clear client-side backup cookie
    if (typeof window !== 'undefined') {
      clearClientCookie('auth-token-backup');
    }
  } catch (error) {
    console.error('❌ Failed to clear auth cookie:', error);
  }
};
