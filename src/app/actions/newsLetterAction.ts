'use server';

import { safeApi } from '@/lib/fetch/serverFetch';

export async function subscribeAction(email: string) {
  const result = await safeApi.post<{ success: boolean; message?: string }>(
    '/newsletter',
    { email }
  );

  if (result.success) {
    return {
      success: true,
      message: result.data?.message || 'Successfully subscribed!',
    };
  }

  return {
    success: false,
    message: result.error?.message || 'Subscription failed',
  };
}
