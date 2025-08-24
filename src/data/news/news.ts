import { serverFetch } from '@/lib/fetch/serverFetch';

export async function fetchNewsData<T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
): Promise<T> {
  return serverFetch<T>(`${path}`, {
    method: 'GET',
    next: {
      revalidate: opts?.next?.revalidate,
      tags: opts?.next?.tags,
    },
  });
}
