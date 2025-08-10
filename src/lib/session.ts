import 'server-only';
import { cookies } from 'next/headers';

export interface SessionData {
  idToken: string;
  user: {
    email: string;
    name: string;
    role: 'admin' | 'user';
  };
  expiresAt: string;
}

export async function createSession(
  idToken: string,
  userData: {
    email: string;
    name: string;
    role: 'admin' | 'user';
  },
  rememberMe: boolean
) {
  let expiresAt;
  if (rememberMe) {
    expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  } else {
    expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
  }
  const cookieStore = await cookies();

  const sessionData: SessionData = {
    idToken,
    user: userData,
    expiresAt: expiresAt.toISOString(),
  };

  // Store the session data as JSON
  cookieStore.set('session', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

//update session
export async function updateSession() {
  const sessionCookie = (await cookies()).get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const sessionData: SessionData = JSON.parse(sessionCookie);
    const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    // Update expiration time
    sessionData.expiresAt = expires.toISOString();

    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expires,
      sameSite: 'lax',
      path: '/',
    });

    return sessionData;
  } catch (error) {
    console.error('Error updating session:', error);
    return null;
  }
}

//delete session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

// get session data
export async function getSession(): Promise<SessionData | null> {
  const sessionCookie = (await cookies()).get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const sessionData: SessionData = JSON.parse(sessionCookie);

    // Check if session is expired
    if (new Date(sessionData.expiresAt) < new Date()) {
      await deleteSession();
      return null;
    }

    return sessionData;
  } catch (error) {
    console.error('Error parsing session:', error);
    await deleteSession(); // Clear invalid session
    return null;
  }
}

// get just the ID token (for API calls)
export async function getIdToken(): Promise<string | null> {
  const session = await getSession();
  return session?.idToken || null;
}

// get current user data from session
export async function getCurrentUserFromSession() {
  const session = await getSession();
  return session?.user || null;
}
