import { serverFetch } from '@/lib/fetch/serverFetch';

export async function fetchDat2<T>(
  path: string,
  opts?: { next?: { revalidate?: number } }
): Promise<T> {
  return serverFetch<T>(`/products`, {
    method: 'GET',
    next: { revalidate: opts?.next?.revalidate ?? 60 },
  });
}
export async function fetchFeaturedData<T>(
  path: string,
  opts?: { next?: { revalidate?: number } }
): Promise<T> {
  return serverFetch<T>(`${path}`, {
    method: 'GET',
    next: { revalidate: opts?.next?.revalidate ?? 60 },
  });
}
