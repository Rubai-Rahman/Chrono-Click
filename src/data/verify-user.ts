import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { SessionData } from '@/lib/session';

export const verifyUser = cache(async () => {
  const sessionCookie = (await cookies()).get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const sessionData: SessionData = JSON.parse(sessionCookie);

    // Check if session is expired
    if (new Date(sessionData.expiresAt) < new Date()) {
      return null;
    }

    return {
      idToken: sessionData.idToken,
      user: sessionData.user,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
});
