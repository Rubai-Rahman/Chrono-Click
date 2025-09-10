import { safeApi } from '@/lib/fetch/serverFetch';

/**
 * Fetch product by ID with structured error handling
 */
export async function fetchProductById<T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
) {
  return await safeApi.get<T>(path, {
    next: {
      revalidate: opts?.next?.revalidate,
      tags: opts?.next?.tags ?? ['products'],
    },
  });
}

/**
 * Fetch featured products with structured error handling
 */
export async function fetchFeaturedProducts<T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
) {
  return await safeApi.get<T>(path, {
    next: {
      revalidate: opts?.next?.revalidate ?? 180, // 3 minutes for featured products
      tags: opts?.next?.tags ?? ['products', 'featured'],
    },
  });
}

/**
 * Fetch products data with structured error handling
 */
export async function fetchProductsData<T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
) {
  return await safeApi.get<T>(path, {
    next: {
      revalidate: opts?.next?.revalidate ?? 120, // 2 minutes for product lists
      tags: opts?.next?.tags ?? ['products'],
    },
  });
}
