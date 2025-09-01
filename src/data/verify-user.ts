import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';

export const verifyUser = cache(async () => {
  const cookieStore = await cookies();
  const idToken = cookieStore.get('token')?.value;
  const userCookie = cookieStore.get('user')?.value;

  if (!idToken) {
    return null;
  }

  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (error) {
      console.error('Invalid user cookie:', error);
    }
  }

  return {
    idToken,
    user,
  };
});
