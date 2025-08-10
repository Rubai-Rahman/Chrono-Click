import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to validate URLs
export function isValidUrl(url: string): boolean {
  // Only allow relative URLs or same origin
  return url.startsWith('/') && !url.startsWith('//');
}

/**
 * Validates callback URLs to prevent open redirect attacks
 * @param url - The callback URL to validate
 * @param trustedDomains - Optional array of trusted domains
 * @returns Validated URL or undefined if invalid
 */
export function validateCallbackUrl(
  url: string | null,
  trustedDomains: string[] = []
): string | undefined {
  if (!url) return undefined;

  try {
    // For relative paths, ensure they're safe
    if (url.startsWith('/') && !url.startsWith('//')) {
      return url;
    }

    // Parse the URL to validate it
    const parsedUrl = new URL(
      url,
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000'
    );

    // Only allow same-origin URLs in browser environment
    if (
      typeof window !== 'undefined' &&
      parsedUrl.origin === window.location.origin
    ) {
      return parsedUrl.pathname + parsedUrl.search;
    }

    // Check against trusted domains if provided
    if (trustedDomains.length > 0 && trustedDomains.includes(parsedUrl.host)) {
      return url;
    }

    // Log blocked attempts for security monitoring
    console.warn('Callback URL blocked for security:', url);
    return undefined;
  } catch {
    // Invalid URL format
    console.warn('Malformed callback URL blocked:', url);
    return undefined;
  }
}
