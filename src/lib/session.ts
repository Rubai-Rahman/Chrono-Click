import 'server-only';
import { cookies } from 'next/headers';

export async function createSession(idToken: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set('session', idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

//update session
export async function updateSession() {
  const session = (await cookies()).get('session')?.value;

  if (!session) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

//delete session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

// get session (Firebase ID token)
export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  return session || null;
}
