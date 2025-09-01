'use client';

import { SessionData } from '@/lib/session';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useRef } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { saveUser } from '@/app/actions/authAction';

export const HydrateAuth = ({
  session,
  children,
}: {
  session: SessionData | null;
  children: React.ReactNode;
}) => {
  const { setUser, setInitialized, setLoading } = useAuthStore();
  const tokenRefreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to refresh token and update session
  const refreshUserToken = async (firebaseUser: User) => {
    try {
      console.log('Refreshing Firebase token...');
      const newToken = await firebaseUser.getIdToken(true); // Force refresh

      // Update session with new token
      await saveUser(newToken, true);
      console.log('Token refreshed successfully');

      // Schedule next refresh (45 minutes before expiration)
      scheduleTokenRefresh();
    } catch (error) {
      console.error('Failed to refresh token:', error);
      // If refresh fails, sign out the user
      setUser(null);
    }
  };

  // Schedule token refresh 45 minutes from now (tokens expire in 1 hour)
  const scheduleTokenRefresh = () => {
    if (tokenRefreshTimeoutRef.current) {
      clearTimeout(tokenRefreshTimeoutRef.current);
    }

    // Refresh token after 45 minutes (45 * 60 * 1000 ms)
    tokenRefreshTimeoutRef.current = setTimeout(() => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        refreshUserToken(currentUser);
      }
    }, 45 * 60 * 1000);
  };

  useEffect(() => {
    // Set initial auth state from server session
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }

    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        try {
          // Check if token is still valid by getting a fresh one
          const token = await firebaseUser.getIdToken();

          // If we have a valid token but no session user, update the session
          if (!session?.user) {
            await saveUser(token, true);
          }

          // Schedule token refresh
          scheduleTokenRefresh();
        } catch (error) {
          console.error('Error getting Firebase token:', error);
          setUser(null);
        }
      } else {
        // User is signed out
        setUser(null);
        if (tokenRefreshTimeoutRef.current) {
          clearTimeout(tokenRefreshTimeoutRef.current);
        }
      }

      setInitialized(true);
      setLoading(false);
    });

    // Cleanup function
    return () => {
      unsubscribe();
      if (tokenRefreshTimeoutRef.current) {
        clearTimeout(tokenRefreshTimeoutRef.current);
      }
    };
  }, [session, setUser, setInitialized, setLoading]);

  return <>{children}</>;
};
