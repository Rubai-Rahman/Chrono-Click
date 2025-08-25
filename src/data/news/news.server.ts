import { safeApi } from '@/lib/fetch/serverFetch';

export async function fetchNewsData<T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
) {
  return await safeApi.get<T>(path, {
    next: {
      revalidate: opts?.next?.revalidate ?? 300,
      tags: opts?.next?.tags ?? ['news'],
    },
  });
}
