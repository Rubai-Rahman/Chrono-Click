// app/lib/dal.ts
import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt } from '@/lib/session';

type Session = { userId: string; role?: string };

export const verifySession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies(); // ← Important: await cookies()
  const token = cookieStore.get('accessToken')?.value;
  if (!token) return null;

  const session = await decrypt(token);
  if (!session?.userId) return null;
  return session as Session;
});

export async function requireSession() {
  const session = await verifySession();
  if (!session) redirect('/login');
  return session;
}
