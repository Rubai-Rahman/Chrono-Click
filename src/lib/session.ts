import 'server-only';
import { cookies } from 'next/headers';

export interface SessionData {
  idToken: string;
  user?: {
    email: string;
    name: string;
    role: 'admin' | 'user';
  };
}

export async function createSession({
  idToken,
  userData,
  rememberMe,
}: {
  idToken: string;
  userData?: { email: string; name: string; role: 'admin' | 'user' };
  rememberMe?: boolean;
}) {
  const expiresAt = rememberMe
    ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    : new Date(Date.now() + 2 * 60 * 60 * 1000);

  const cookieStore = await cookies();

  cookieStore.set('token', idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  // Optional: user info cookie (frontend-readable, no auth role)
  if (userData) {
    cookieStore.set('user', JSON.stringify(userData), {
      httpOnly: false, // frontend can access
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
  }
}

//delete session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('user');
}

// get session data
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const idToken = cookieStore.get('token')?.value;
  const userCookie = cookieStore.get('user')?.value;

  if (!idToken) return null;

  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (e) {
      console.error('Invalid user cookie:', e);
    }
  }
  return { idToken, user };
}

// get just the ID token (for API calls)
export async function getIdToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

// get current user data from session
export async function getCurrentUserFromSession() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;

  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie);
  } catch (e) {
    console.error('Invalid user cookie:', e);
    return null;
  }
}
