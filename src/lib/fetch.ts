// lib/dal/http/serverFetch.ts
import 'server-only';
import { ApiError } from './apiError';
import { cookies } from 'next/headers';

type FetchOptions<T> = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  tags?: string[];
  revalidate?: number | false; // false = cache forever in RSC
  schema?: { parse: (data: unknown) => T };
};

export async function serverFetch<T>(
  path: string,
  { method = 'GET', body, tags, revalidate, schema }: FetchOptions<T> = {}
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = (await cookies()).get('session')?.value;

  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    next: { tags, revalidate },
    cache: method === 'GET' ? 'force-cache' : 'no-store',
    // leverages Next RSC cache; override as needed
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new ApiError(res.status, text || res.statusText);
  }

  const json = (await res.json()) as unknown;
  return schema ? schema.parse(json as unknown) : (json as T);
}
