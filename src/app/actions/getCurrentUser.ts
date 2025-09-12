// app/actions/getCurrentUser.ts
'use server';

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    return {
      userId: payload.userId as string,
      role: payload.role as 'user' | 'admin',
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}
