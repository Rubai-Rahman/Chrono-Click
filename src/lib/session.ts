import 'server-only';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { SessionPayload } from '@/data/auth';

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

export async function createSession(
  accessToken: string,
  refreshToken?: string,
  maxAge?: number
) {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  if (refreshToken) {
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
    });
  }
}
//
//delete session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}

// Decrypt JWT back into session payload
export async function decrypt(session: string | undefined = '') {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.error('Session decrypt failed:', error);
    return null;
  }
}
// get session data
export async function getSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value ?? null;
  const refreshToken = cookieStore.get('refreshToken')?.value ?? null;

  return {
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
  };
}
