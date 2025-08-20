import { APIError } from './base';

// Error handling utilities for the DAL
export function handleDALError(error: unknown): never {
  if (error instanceof APIError) {
    // Log the error for monitoring
    console.error('DAL API Error:', {
      message: error.message,
      status: error.status,
      code: error.code,
    });

    // Re-throw with additional context
    throw error;
  }

  // Handle other types of errors
  if (error instanceof Error) {
    console.error('DAL Error:', error.message);
    throw new APIError(error.message, 0);
  }

  // Unknown error
  console.error('Unknown DAL Error:', error);
  throw new APIError('An unexpected error occurred', 0);
}

// Utility to safely execute DAL operations with error handling
export async function safeDALOperation<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error('Safe DAL operation failed:', error);

    if (fallback !== undefined) {
      return fallback;
    }

    return null;
  }
}

// Retry mechanism for failed operations
export async function retryDALOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      // Don't retry on client errors (4xx)
      if (
        error instanceof APIError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        break;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError;
}
