'use client';

import { fetchCore, DoFetch } from './fetchCore';
import { ApiError, FetchCoreError } from './apiError';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/**
 * Structured response format for safe API calls
 */
export interface ClientApiResult<T> {
  data: T | null;
  error: {
    message: string;
    status: number;
    details?: Record<string, unknown>;
  } | null;
  success: boolean;
}

/**
 * Client request configuration options
 */
export interface ClientRequestConfig {
  headers?: Record<string, string>;
  credentials?: 'omit' | 'same-origin' | 'include';
  responseType?: 'json' | 'text';
}

/**
 * Client-side DoFetch implementation
 */
const createClientDoFetch = (
  credentials: ClientRequestConfig['credentials'] = 'include'
): DoFetch => {
  return (url: string, init: RequestInit) => {
    const finalInit: RequestInit = {
      ...init,
      credentials,
    };

    return fetch(url, finalInit);
  };
};

/**
 * Core client fetch function using fetchCore with automatic interceptor-like behavior
 * Handles headers, body serialization, and error responses
 */
async function coreClientFetch<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  path: string,
  data?: unknown,
  config: ClientRequestConfig = {}
): Promise<T> {
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
  }

  // Build complete URL
  const url = path.startsWith('http')
    ? path
    : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  // Prepare headers (client-side auth would be handled differently)
  const headers: Record<string, string> = {
    ...config.headers,
  };

  // Create client-specific doFetch
  const doFetch = createClientDoFetch(config.credentials);

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
async function safeCoreClientFetch<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  path: string,
  data?: unknown,
  config: ClientRequestConfig = {}
): Promise<ClientApiResult<T>> {
  try {
    const result = await coreClientFetch<T>(method, path, data, config);
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
 * Standard client API methods that throw on errors (like Axios)
 */
export const clientApi = {
  get: <T>(path: string, config?: ClientRequestConfig) =>
    coreClientFetch<T>('GET', path, undefined, config),

  post: <T>(path: string, data?: unknown, config?: ClientRequestConfig) =>
    coreClientFetch<T>('POST', path, data, config),

  put: <T>(path: string, data?: unknown, config?: ClientRequestConfig) =>
    coreClientFetch<T>('PUT', path, data, config),

  delete: <T>(path: string, config?: ClientRequestConfig) =>
    coreClientFetch<T>('DELETE', path, undefined, config),

  patch: <T>(path: string, data?: unknown, config?: ClientRequestConfig) =>
    coreClientFetch<T>('PATCH', path, data, config),
};

/**
 * Safe client API methods that return structured results instead of throwing
 */
export const safeClientApi = {
  get: <T>(path: string, config?: ClientRequestConfig) =>
    safeCoreClientFetch<T>('GET', path, undefined, config),

  post: <T>(path: string, data?: unknown, config?: ClientRequestConfig) =>
    safeCoreClientFetch<T>('POST', path, data, config),

  put: <T>(path: string, data?: unknown, config?: ClientRequestConfig) =>
    safeCoreClientFetch<T>('PUT', path, data, config),

  delete: <T>(path: string, config?: ClientRequestConfig) =>
    safeCoreClientFetch<T>('DELETE', path, undefined, config),

  patch: <T>(path: string, data?: unknown, config?: ClientRequestConfig) =>
    safeCoreClientFetch<T>('PATCH', path, data, config),
};

/**
 * Legacy clientFetch function for backward compatibility
 * @deprecated Use clientApi.* or safeClientApi.* methods instead
 */
export async function clientFetch<T>(
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    headers?: Record<string, string>;
    credentials?: 'omit' | 'same-origin' | 'include';
    responseType?: 'json' | 'text';
  } = {}
): Promise<T> {
  const { method = 'GET', body, ...config } = options;
  return coreClientFetch<T>(method, path, body, config);
}
