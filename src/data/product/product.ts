import { serverFetch } from '@/lib/fetch/serverFetch';

export async function fetchProductById<T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
): Promise<T> {
  return serverFetch<T>(`/products`, {
    method: 'GET',
    next: {
      revalidate: opts?.next?.revalidate ?? 60,
      tags:opts?.next?.tags,
     },
  });
}
export async function fetchFeaturedProducts<T>(
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

export async function fetchProductsData<T>(
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
