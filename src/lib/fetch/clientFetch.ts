// lib/clientFetch.ts
import { fetchCore, CoreOptions, DoFetch } from './fetchCore';
import { ApiError, FetchCoreError } from './apiError';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const clientDoFetch: DoFetch = (url: string, init: RequestInit) => {
  // In browser environment window.fetch is available
  return fetch(url, init);
};

export type ClientFetchOptions = CoreOptions & {
  /**
   * If you store token in localStorage and want to pass it explicitly:
   */
  token?: string | null;
  /**
   * optionally override credentials default (defaults to 'include' to send cookies)
   */
  credentials?: RequestCredentials;
  signal?: AbortSignal;
};

export async function clientFetch<T, E = { message?: string }>(
  path: string,
  opts: ClientFetchOptions = {}
): Promise<T> {
  if (!BASE) throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');

  const url = path.startsWith('http')
    ? path
    : `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers: Record<string, string> = {
    ...(opts.headers ?? {}),
  };

  if (opts.token) {
    headers['Authorization'] = `Bearer ${opts.token}`;
  }

  // Build a wrapper doFetch that injects credentials and signal if provided
  const doFetchWithDefaults: DoFetch = (u: string, init: RequestInit) => {
    const finalInit: RequestInit = {
      ...init,
      credentials: opts.credentials ?? 'include',
      signal: opts.signal,
    };
    return clientDoFetch(u, finalInit);
  };

  try {
    return await fetchCore<T, E>(doFetchWithDefaults, url, {
      method: opts.method,
      headers,
      body: opts.body,
      responseType: opts.responseType,
    });
  } catch (err) {
    if (err instanceof FetchCoreError) {
      throw new ApiError<E>(err.status, err.message, (err.payload ?? {}) as E);
    }
    throw err;
  }
}
