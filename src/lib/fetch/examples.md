# ServerFetch API Examples

## ✅ New Optimized API (Axios-like Interceptors)

### Server Actions (Mutations)

```typescript
// Newsletter subscription - NO boilerplate needed!
'use server';
import { safeApi } from '@/lib/fetch/serverFetch';

export async function subscribeAction(email: string) {
  const result = await safeApi.post<{ success: boolean; message?: string }>(
    '/newsletter',
    { email } // Automatically serialized to JSON
  );

  return result.success
    ? { success: true, message: result.data?.message || 'Success!' }
    : { success: false, message: result.error?.message || 'Failed' };
}
```

### Data Fetching (Queries)

```typescript
// News data fetching - Clean and simple!
import { safeApi } from '@/lib/fetch/serverFetch';

export async function fetchNewsData<T>(path: string) {
  return await safeApi.get<T>(path, {
    next: { revalidate: 300, tags: ['news'] },
  });
}

// Usage in component:
const result = await fetchNewsData('/api/news');
if (result.success) {
  console.log('News:', result.data);
} else {
  console.error('Error:', result.error?.message);
}
```

### Different HTTP Methods

```typescript
import { api, safeApi } from '@/lib/fetch/serverFetch';

// Standard API (throws errors like Axios)
const user = await api.get<User>('/users/123');
const newUser = await api.post<User>('/users', { name: 'John' });
const updatedUser = await api.put<User>('/users/123', { name: 'Jane' });
await api.delete('/users/123');

// Safe API (returns structured results)
const userResult = await safeApi.get<User>('/users/123');
const createResult = await safeApi.post<User>('/users', { name: 'John' });
const updateResult = await safeApi.put<User>('/users/123', { name: 'Jane' });
const deleteResult = await safeApi.delete('/users/123');
```

## ❌ Old Boilerplate Code (What we eliminated)

```typescript
// OLD WAY - Lots of repetitive boilerplate
export async function fetchNewsData<T>(path: string): Promise<T | null> {
  try {
    return await serverFetch<T>(path, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: undefined,
      next: { revalidate: 300, tags: ['news'] },
      credentials: 'include',
      responseType: 'json',
    });
  } catch (err) {
    if (err instanceof ApiError) {
      console.error(`Failed to fetch ${path}:`, err.message);
      // Extract error message manually
      const errorMessage = err.data?.message || err.message || 'Failed';
      // Components can't distinguish between "no data" and "error"
    } else {
      console.error(`Unexpected error fetching ${path}:`, err);
    }
    return null; // Lost all error context!
  }
}
```

## 🚀 Key Benefits

### 1. **Zero Boilerplate**

- No more try-catch blocks
- No manual header setting
- No manual body serialization
- No repetitive error handling

### 2. **Axios-like Interceptors**

- Automatic authentication headers
- Automatic content-type detection
- Automatic JSON serialization/parsing
- Automatic error response handling

### 3. **Type Safety**

- Full TypeScript support
- No `any` types
- Proper error type inference
- Generic response types

### 4. **Flexible Error Handling**

- `api.*` methods throw errors (like Axios)
- `safeApi.*` methods return structured results
- Choose the pattern that fits your use case

### 5. **Next.js Integration**

- Automatic ISR caching
- Server-side authentication
- Proper cookie handling
- Next.js fetch options support

## 📊 Code Reduction

**Before**: ~25 lines of boilerplate per function
**After**: ~3 lines of actual logic

**Before**: Manual error handling in every function
**After**: Centralized error handling with structured responses

**Before**: Components get `null` on errors (no context)
**After**: Components get detailed error information for better UX
