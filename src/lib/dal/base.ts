import 'server-only';
import { getIdToken } from '@/lib/session';

// Base configuration for API calls
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
} as const;

// Custom error class for API errors
export class APIError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = 'APIError';
  }
}

// Base fetch wrapper with authentication and error handling
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const idToken = await getIdToken();

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if token exists
  if (idToken) {
    defaultHeaders.Authorization = `Bearer ${idToken}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      if (!response.ok) {
        throw new APIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }
      return response.text() as T;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        data.code
      );
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    // Network or other errors
    throw new APIError(
      error instanceof Error ? error.message : 'Network error occurred',
      0
    );
  }
}

// Utility functions for different HTTP methods
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { method: 'DELETE', ...options }),
};
