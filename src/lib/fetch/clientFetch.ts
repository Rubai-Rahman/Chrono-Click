'use client';

import { fetchCore, DoFetch } from './fetchCore';
import { ApiError, FetchCoreError } from './apiError';
import { useAuthStore } from '@/store/useAuthStore';

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
 * Handles headers, body serialization, error responses, and automatic token refresh
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

  // Get auth token for client-side requests
  const { accessToken, setAccessToken, logout } = useAuthStore.getState();

  // Prepare headers with authentication
  const headers: Record<string, string> = {
    ...config.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  // Create client-specific doFetch
  const doFetch = createClientDoFetch(config.credentials);

  try {
    // Use fetchCore for all the heavy lifting
    return await fetchCore<T>(doFetch, url, {
      method,
      headers,
      body: data as Record<string, unknown> | BodyInit | undefined,
      responseType: config.responseType,
    });
  } catch (err) {
    if (err instanceof FetchCoreError && err.status === 401) {
      // try refresh
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include', // send cookies!
        });

        if (!refreshRes.ok) {
          await logout();
          throw new ApiError(401, 'Refresh failed', {});
        }

        const refreshData = await refreshRes.json();
        const newToken = refreshData?.payload?.accessToken;

        if (!newToken) {
          await logout();
          throw new ApiError(401, 'No new access token', {});
        }

        // update token in store
        setAccessToken(newToken);

        // retry original request with new token
        const retryHeaders = {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        };

        return await fetchCore<T>(doFetch, url, {
          method,
          headers: retryHeaders,
          body: data as Record<string, unknown> | BodyInit | undefined,
          responseType: config.responseType,
        });
      } catch (refreshError) {
        await logout();
        throw refreshError;
      }
    }
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
