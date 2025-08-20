# Data Access Layer Migration Guide

## Overview

This guide helps you migrate from the old API patterns to the new Data Access Layer (DAL) following Next.js best practices.

## Key Changes

### 1. Centralized API Calls

**Before:**

```typescript
// Mixed patterns across files
const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
const res = await axiosInstance.get('/products');
```

**After:**

```typescript
// Consistent DAL pattern
import { ProductsDAL } from '@/lib/dal';
const products = await ProductsDAL.getProducts();
```

### 2. Server-Only Operations

All DAL operations are marked with `'server-only'` directive and should only be used in:

- Server Components
- Server Actions
- API Routes
- Middleware

### 3. Authentication Handling

**Before:**

```typescript
// Manual token handling
headers: {
  authorization: `Bearer ${localStorage.getItem("idToken")}`,
}
```

**After:**

```typescript
// Automatic token injection from session
const products = await ProductsDAL.getProducts(); // Token handled automatically
```

## Migration Steps

### Step 1: Replace API Lib Imports

```typescript
// Old
import { fetchData, postData } from '@/api-lib/products';

// New
import { ProductsDAL } from '@/lib/dal';
```

### Step 2: Update Function Calls

```typescript
// Old
const products = await fetchData<ProductType[]>('/products');

// New
const response = await ProductsDAL.getProducts();
const products = response.products;
```

### Step 3: Use Service Layer for Caching

```typescript
// For server components that need caching
import { getProducts } from '@/lib/services/products';
const response = await getProducts();
```

### Step 4: Error Handling

```typescript
// Old
try {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed');
} catch (error) {
  console.error(error);
}

// New
import { APIError } from '@/lib/dal';
try {
  const products = await ProductsDAL.getProducts();
} catch (error) {
  if (error instanceof APIError) {
    console.error(`API Error ${error.status}: ${error.message}`);
  }
}
```

## File Mapping

| Old File                  | New DAL                   | Service Layer              |
| ------------------------- | ------------------------- | -------------------------- |
| `api-lib/products.ts`     | `lib/dal/products.ts`     | `lib/services/products.ts` |
| `api-lib/orders.ts`       | `lib/dal/orders.ts`       | `lib/services/orders.ts`   |
| `api-lib/users.ts`        | `lib/dal/users.ts`        | `lib/services/users.ts`    |
| `api-lib/news.ts`         | `lib/dal/news.ts`         | -                          |
| `api-lib/testimonials.ts` | `lib/dal/testimonials.ts` | -                          |

## Best Practices

### 1. Use Service Layer for Server Components

```typescript
// In server components
import { getProducts } from '@/lib/services/products';

export default async function ProductsPage() {
  const { products } = await getProducts();
  return <ProductList products={products} />;
}
```

### 2. Use DAL Directly in Server Actions

```typescript
// In server actions
import { ProductsDAL } from '@/lib/dal';

export async function createProductAction(data: FormData) {
  'use server';

  const product = await ProductsDAL.createProduct({
    name: data.get('name') as string,
    price: data.get('price') as string,
    details: data.get('details') as string,
  });

  revalidatePath('/admin/products');
}
```

### 3. Error Boundaries

```typescript
import { APIError } from '@/lib/dal';

export default function ProductsPage() {
  return (
    <ErrorBoundary
      fallback={<div>Failed to load products</div>}
      onError={(error) => {
        if (error instanceof APIError) {
          console.error(`Products API Error: ${error.message}`);
        }
      }}
    >
      <ProductsList />
    </ErrorBoundary>
  );
}
```

## Client-Side Data Fetching

For client-side operations, continue using TanStack Query with the DAL through API routes:

```typescript
// app/api/products/route.ts
import { ProductsDAL } from '@/lib/dal';

export async function GET() {
  try {
    const products = await ProductsDAL.getProducts();
    return Response.json(products);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Client component
import { useQuery } from '@tanstack/react-query';

function ProductsList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return <div>{/* Render products */}</div>;
}
```

## Environment Variables

Ensure your environment variables are properly set:

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

## Testing

Update your tests to use the new DAL:

```typescript
// __tests__/products.test.ts
import { ProductsDAL } from '@/lib/dal';

// Mock the DAL
jest.mock('@/lib/dal', () => ({
  ProductsDAL: {
    getProducts: jest.fn(),
    createProduct: jest.fn(),
  },
}));

test('should fetch products', async () => {
  const mockProducts = { products: [], count: 0 };
  (ProductsDAL.getProducts as jest.Mock).mockResolvedValue(mockProducts);

  const result = await ProductsDAL.getProducts();
  expect(result).toEqual(mockProducts);
});
```

## Troubleshooting

### Common Issues

1. **"server-only" errors**: Make sure DAL is only used in server contexts
2. **Authentication errors**: Verify session management is working correctly
3. **Type errors**: Update imports to use new DAL types

### Debug Mode

Enable debug logging by setting:

```env
DEBUG_DAL=true
```

This will log all API requests and responses for debugging purposes.
