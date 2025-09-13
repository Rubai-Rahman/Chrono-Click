'use client';

import { fetchCore, DoFetch } from './fetchCore';
import { ApiError, FetchCoreError } from './apiError';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/** Standard API response from your backend */
export interface BackendResponse<T> {
  success: boolean;
  message: string;
  payload: T;
}

/** Structured response format for safe API calls */
export interface ClientApiResult<T> {
  data: T | null;
  error: {
    message: string;
    status: number;
    details?: Record<string, unknown>;
  } | null;
  success: boolean;
}

/** Client request configuration options */
export interface ClientRequestConfig {
  headers?: Record<string, string>;
  credentials?: 'omit' | 'same-origin' | 'include';
  responseType?: 'json' | 'text';
}

/** Client-side DoFetch implementation */
const createClientDoFetch = (
  credentials: ClientRequestConfig['credentials'] = 'include'
): DoFetch => {
  return (url: string, init: RequestInit) => {
    return fetch(url, { ...init, credentials });
  };
};

/** Core client fetch function using fetchCore with automatic refresh */
async function coreClientFetch<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  path: string,
  data?: unknown,
  config: ClientRequestConfig = {}
): Promise<T> {
  if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');

  const url = path.startsWith('http')
    ? path
    : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers: Record<string, string> = {
    ...config.headers,
  };

  const doFetch = createClientDoFetch(config.credentials);

  try {
    return await fetchCore<T>(doFetch, url, {
      method,
      headers,
      body: data as Record<string, unknown> | BodyInit | undefined,
      responseType: config.responseType,
    });
  } catch (err) {
    if (err instanceof FetchCoreError && err.status === 401) {
      // Attempt refresh
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!refreshRes.ok) throw new ApiError(401, 'Refresh failed', {});

        const refreshData: BackendResponse<{
          accessToken: string;
          refreshToken?: string;
        }> = await refreshRes.json();

        const newAccessToken = refreshData.payload.accessToken;

        if (!newAccessToken)
          throw new ApiError(401, 'No access token returned', {});

        // Retry original request (cookies will handle auth automatically)
        return await fetchCore<T>(doFetch, url, {
          method,
          headers,
          body: data as Record<string, unknown> | BodyInit | undefined,
          responseType: config.responseType,
        });
      } catch (refreshErr) {
        throw refreshErr;
      }
    }

    if (err instanceof FetchCoreError) {
      throw new ApiError(err.status, err.message, err.payload ?? {});
    }

    throw err;
  }
}

/** Safe wrapper that returns structured results instead of throwing */
async function safeCoreClientFetch<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  path: string,
  data?: unknown,
  config: ClientRequestConfig = {}
): Promise<ClientApiResult<T>> {
  try {
    const result = await coreClientFetch<T>(method, path, data, config);
    return { data: result, error: null, success: true };
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
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { data: null, error: { message, status: 0 }, success: false };
  }
}

/** Standard client API methods */
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

/** Safe API methods */
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
