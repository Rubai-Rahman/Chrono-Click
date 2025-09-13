import { safeApi } from '@/lib/fetch';

export async function fetchReviewData<T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
) {
  return await safeApi.get<T>(path, {
    next: {
      tags: opts?.next?.tags ?? ['reviews'],
    },
  });
}
