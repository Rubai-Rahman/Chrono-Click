import { safeApi } from '@/lib/fetch/serverFetch';

/**
 * Fetch news data with structured error handling
 * Returns structured response instead of null on errors
 */
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

/**
 * Backward compatibility function - returns data or null like before
 * @deprecated Use fetchNewsData for better error handling
 */
export async function fetchNewsDataLegacy<T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
): Promise<T | null> {
  const result = await fetchNewsData<T>(path, opts);
  return result.success ? result.data : null;
}
