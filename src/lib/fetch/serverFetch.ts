// lib/serverFetch.ts
import 'server-only';
import { cookies } from 'next/headers';
import { fetchCore, DoFetch } from './fetchCore';
import { ApiError, FetchCoreError } from './apiError';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/**
 * Structured response format for safe API calls
 */
export interface ApiResult<T> {
  data: T | null;
  error: {
    message: string;
    status: number;
    details?: Record<string, unknown>;
  } | null;
  success: boolean;
}

/**
 * Request configuration options
 */
export interface RequestConfig {
  headers?: Record<string, string>;
  next?: { revalidate?: number | false; tags?: string[] };
  credentials?: 'omit' | 'same-origin' | 'include';
  responseType?: 'json' | 'text';
}

/**
 * Server-side DoFetch implementation with Next.js support
 */
const createServerDoFetch = (
  credentials: RequestConfig['credentials'] = 'include',
  nextOptions?: { revalidate?: number | false; tags?: string[] }
): DoFetch => {
  return (url: string, init: RequestInit) => {
    const finalInit: RequestInit & { next?: NextFetchRequestConfig } = {
      ...init,
      credentials,
    };

    // Add Next.js caching options
    if (nextOptions) {
      finalInit.next = {
        revalidate: nextOptions.revalidate ?? 60,
        tags: nextOptions.tags,
      };
    }

    return fetch(url, finalInit);
  };
};

/**
 * Core server fetch function using fetchCore with automatic interceptor-like behavior
 * Handles authentication, headers, body serialization, and error responses
 */
async function coreServerFetch<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  path: string,
  data?: Record<string, unknown> | BodyInit,
  config: RequestConfig = {}
): Promise<T> {
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
  }

  // Build complete URL
  const url = path.startsWith('http')
    ? path
    : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  // Get authentication token automatically
  const token = (await cookies()).get('session')?.value;

  // Prepare headers with automatic auth
  const headers: Record<string, string> = {
    ...config.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Create server-specific doFetch with Next.js options
  const doFetch = createServerDoFetch(config.credentials, config.next);

  try {
    // Use fetchCore for all the heavy lifting
    return await fetchCore<T>(doFetch, url, {
      method,
      headers,
      body: data, // fetchCore handles serialization
      responseType: config.responseType,
    });
  } catch (err) {
    // Convert FetchCoreError to ApiError for consistency
    if (err instanceof FetchCoreError) {
      throw new ApiError(err.status, err.message, err.payload ?? {});
    }
    throw err;
  }
}

/**
 * Safe wrapper that returns structured results instead of throwing
 */
async function safeCoreServerFetch<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  path: string,
  data?: Record<string, unknown> | BodyInit,
  config: RequestConfig = {}
): Promise<ApiResult<T>> {
  try {
    const result = await coreServerFetch<T>(method, path, data, config);
    return {
      data: result,
      error: null,
      success: true,
    };
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        data: null,
        error: {
          message: err.message,
          status: err.status,
          details: err.data as Record<string, unknown>,
        },
        success: false,
      };
    }

    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred';
    return {
      data: null,
      error: {
        message: errorMessage,
        status: 0,
        details: {},
      },
      success: false,
    };
  }
}

/**
 * Standard API methods that throw on errors (like Axios)
 */
export const api = {
  get: <T>(path: string, config?: RequestConfig) =>
    coreServerFetch<T>('GET', path, undefined, config),

  post: <T>(
    path: string,
    data?: Record<string, unknown> | BodyInit,
    config?: RequestConfig
  ) => coreServerFetch<T>('POST', path, data, config),

  put: <T>(
    path: string,
    data?: Record<string, unknown> | BodyInit,
    config?: RequestConfig
  ) => coreServerFetch<T>('PUT', path, data, config),

  delete: <T>(path: string, config?: RequestConfig) =>
    coreServerFetch<T>('DELETE', path, undefined, config),

  patch: <T>(
    path: string,
    data?: Record<string, unknown> | BodyInit,
    config?: RequestConfig
  ) => coreServerFetch<T>('PATCH', path, data, config),
};

/**
 * Safe API methods that return structured results instead of throwing
 */
export const safeApi = {
  get: <T>(path: string, config?: RequestConfig) =>
    safeCoreServerFetch<T>('GET', path, undefined, config),

  post: <T>(
    path: string,
    data?: Record<string, unknown> | BodyInit,
    config?: RequestConfig
  ) => safeCoreServerFetch<T>('POST', path, data, config),

  put: <T>(
    path: string,
    data?: Record<string, unknown> | BodyInit,
    config?: RequestConfig
  ) => safeCoreServerFetch<T>('PUT', path, data, config),

  delete: <T>(path: string, config?: RequestConfig) =>
    safeCoreServerFetch<T>('DELETE', path, undefined, config),

  patch: <T>(
    path: string,
    data?: Record<string, unknown> | BodyInit,
    config?: RequestConfig
  ) => safeCoreServerFetch<T>('PATCH', path, data, config),
};
