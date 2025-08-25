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
      revalidate: opts?.next?.revalidate ?? 60, // 1 minute for product details
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


//old code


export interface ProductData {
  name: string;
  price: string;
  details: string;
}

export const addProduct = async (productData: ProductData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    throw new Error('Failed to add product');
  }
  return res.json();
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to delete product');
  }
  return res.json();
};
