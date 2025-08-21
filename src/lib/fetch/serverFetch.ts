// lib/serverFetch.ts
import 'server-only';
import { cookies } from 'next/headers';
import { fetchCore, CoreOptions, DoFetch } from './fetchCore';
import { ApiError, FetchCoreError } from './apiError';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/**
 * serverDoFetch wraps native fetch to allow forwarding Next-specific init props
 * (e.g., next: { revalidate, tags }) from server adapter to fetch.
 */
const serverDoFetch: DoFetch = (url: string, init: RequestInit) => {
  // TypeScript may complain about extra props like init['next'] — it's acceptable in Next server environment.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return fetch(url, init);
};

export type ServerFetchOptions = CoreOptions & {
  /**
   * Next-specific server options:
   * - revalidate: seconds or false (cache forever in RSC)
   * - tags: array of tag strings for revalidation grouping
   */
  next?: { revalidate?: number | false; tags?: string[] };
  /**
   * Extra headers to merge
   */
  headers?: Record<string, string>;
  /**
   * Force credentials behavior (default include)
   */
  credentials?: 'omit' | 'same-origin' | 'include';
};

export async function serverFetch<T, E = { message?: string }>(
  path: string,
  opts: ServerFetchOptions = {}
): Promise<T> {
  if (!BASE) throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');

  const token = (await cookies()).get('session')?.value;
  const url = path.startsWith('http')
    ? path
    : `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;

  const mergedHeaders: Record<string, string> = {
    ...(opts.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Build a DoFetch wrapper that attaches Next options (if present) into init.
  const doFetchWithNext: DoFetch = (u: string, init: RequestInit) => {
    // attach credentials and next options to init for Next runtime
    const finalInit: RequestInit & { next?: NextFetchRequestConfig } = {
      ...init,
      credentials: opts.credentials ?? 'include',
    };

    if (opts.next) {
      finalInit.next = {
        ...(opts.next.tags ? { tags: opts.next.tags } : {}),
        ...(opts.next.revalidate === undefined
          ? {}
          : { revalidate: opts.next.revalidate }),
      };
    }

    // forward to serverDoFetch (which calls global fetch)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return serverDoFetch(u, finalInit);
  };

  try {
    return await fetchCore<T, E>(doFetchWithNext, url, {
      method: opts.method,
      headers: mergedHeaders,
      body: opts.body,
      responseType: opts.responseType,
    });
  } catch (err) {
    if (err instanceof FetchCoreError) {
      // map to your ApiError type (preserve payload)
      throw new ApiError<E>(
        err.status,
        err.message,
        (err.payload ?? {}) as E
      );
    }
    // unknown error
    throw err;
  }
}
