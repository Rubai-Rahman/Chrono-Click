import 'server-only';
import { cookies } from 'next/headers';

export interface SessionData {
  accessToken: string;
}

export async function createSession({ accessToken }: { accessToken: string }) {
  const expiresAt = rememberMe
    ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    : new Date(Date.now() + 2 * 60 * 60 * 1000);

  const cookieStore = await cookies();

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
  cookieStore.delete('user');
}

// get session data
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;

  if (!userCookie) return null;

  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (e) {
      console.error('Invalid user cookie:', e);
    }
  }
  return { user };
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
