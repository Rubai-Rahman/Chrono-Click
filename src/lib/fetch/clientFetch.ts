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
 * Get auth token from cookies (client-side)
 */
function getClientAuthToken(): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith('clientToken=')
  );

  return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
}

/**
 * Refresh Firebase token and update session
 */
async function refreshAuthToken(): Promise<string | null> {
  try {
    // Dynamic import to avoid SSR issues
    const { auth } = await import('@/lib/firebase/config');
    const { saveUser } = await import('@/app/actions/authAction');

    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log('No Firebase user found for token refresh');
      return null;
    }

    console.log('Refreshing expired token...');
    const newToken = await currentUser.getIdToken(true); // Force refresh

    // Update session with new token
    await saveUser(newToken, true);
    console.log('Token refreshed and session updated');

    return newToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
}

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
  let token = getClientAuthToken();

  // Prepare headers with authentication
  const headers: Record<string, string> = {
    ...config.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Create client-specific doFetch
  const doFetch = createClientDoFetch(config.credentials);

  try {
    // Use fetchCore for all the heavy lifting
    return await fetchCore<T>(doFetch, url, {
      method,
      headers,
      body: data ?? undefined,
      responseType: config.responseType,
    });
  } catch (err) {
    // Handle token expiration with automatic refresh and retry
    if (err instanceof FetchCoreError && err.status === 401) {
      const errorPayload = err.payload as any;

      // Check if it's a Firebase token expiration error
      if (
        errorPayload?.code === 'auth/id-token-expired' ||
        errorPayload?.message?.includes('id-token-expired') ||
        errorPayload?.message?.includes('token has expired')
      ) {
        console.log('Token expired, attempting refresh...');

        // Try to refresh the token
        const newToken = await refreshAuthToken();

        if (newToken) {
          // Retry the request with the new token
          const newHeaders = {
            ...config.headers,
            Authorization: `Bearer ${newToken}`,
          };

          console.log('Retrying request with refreshed token...');

          try {
            return await fetchCore<T>(doFetch, url, {
              method,
              headers: newHeaders,
              body: data ?? undefined,
              responseType: config.responseType,
            });
          } catch (retryErr) {
            console.error('Request failed even after token refresh:', retryErr);
            // If retry also fails, throw the original error
            if (retryErr instanceof FetchCoreError) {
              throw new ApiError(
                retryErr.status,
                retryErr.message,
                retryErr.payload ?? {}
              );
            }
            throw retryErr;
          }
        } else {
          console.error('Failed to refresh token, logging out user');
          // If token refresh failed, logout the user
          try {
            const { useAuthStore } = await import('@/store/useAuthStore');
            const { logout } = useAuthStore.getState();
            await logout();

            // Redirect to login page
            if (typeof window !== 'undefined') {
              window.location.href =
                '/login?message=Session expired, please login again';
            }
          } catch (logoutError) {
            console.error('Error during automatic logout:', logoutError);
          }
        }
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
