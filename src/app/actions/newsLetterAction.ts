'use server';

import { serverFetch } from '@/lib/fetch/serverFetch';

export async function subscribeAction(email: string) {
  try {
    const res = await serverFetch<{ success: boolean; message?: string }>(
      '/newsletter/subscribe',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }
    );

    return { success: res.success, message: res.message ?? null };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, message: errorMessage };
  }
}
