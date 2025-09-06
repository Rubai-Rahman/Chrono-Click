import 'server-only';
import { cookies } from 'next/headers';

export interface SessionData {
  accessToken: string;
}

export async function createSession(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
//
//delete session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
}

// get session data
export async function getSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value ?? null;

  return {
    accessToken,
    isAuthenticated: !!accessToken,
  };
}
