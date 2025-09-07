import 'server-only';
import { cookies } from 'next/headers';

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
