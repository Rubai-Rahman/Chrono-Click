/**
 * Security utility functions for the application
 */

/**
 * Configuration for trusted domains
 */
export const TRUSTED_DOMAINS = {
  development: ['localhost:3000', '127.0.0.1:3000'],
  staging: ['your-staging-domain.com'],
  production: ['your-domain.com'],
} as const;

/**
 * Get trusted domains based on environment
 */
export function getTrustedDomains(): string[] {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'development':
      return [...TRUSTED_DOMAINS.development];
    case 'production':
      return [...TRUSTED_DOMAINS.production, ...TRUSTED_DOMAINS.staging];
    default:
      return [...TRUSTED_DOMAINS.development];
  }
}

/**
 * Enhanced callback URL validation with environment-aware trusted domains
 * @param url - The callback URL to validate
 * @param customTrustedDomains - Optional custom trusted domains
 * @returns Validated URL or undefined if invalid
 */
export function validateCallbackUrl(
  url: string | null,
  customTrustedDomains?: string[]
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

    // Use custom domains or environment-based trusted domains
    const trustedDomains = customTrustedDomains || getTrustedDomains();

    // Check against trusted domains
    if (trustedDomains.includes(parsedUrl.host)) {
      return url;
    }

    // Log blocked attempts for security monitoring
    console.warn('Callback URL blocked for security:', {
      url,
      host: parsedUrl.host,
      trustedDomains,
      timestamp: new Date().toISOString(),
    });

    return undefined;
  } catch (error) {
    // Invalid URL format
    console.warn('Malformed callback URL blocked:', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    return undefined;
  }
}

/**
 * Sanitize URL to prevent XSS attacks
 * @param url - URL to sanitize
 * @returns Sanitized URL or undefined if invalid
 */
export function sanitizeUrl(url: string): string | undefined {
  if (!url) return undefined;

  // Block javascript: and data: protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = url.toLowerCase().trim();

  if (dangerousProtocols.some((protocol) => lowerUrl.startsWith(protocol))) {
    console.warn('Dangerous URL protocol blocked:', url);
    return undefined;
  }

  return url;
}

/**
 * Validate and sanitize redirect URL
 * @param url - URL to validate and sanitize
 * @param customTrustedDomains - Optional custom trusted domains
 * @returns Safe URL or undefined if invalid
 */
export function validateRedirectUrl(
  url: string | null,
  customTrustedDomains?: string[]
): string | undefined {
  if (!url) return undefined;

  // First sanitize the URL
  const sanitizedUrl = sanitizeUrl(url);
  if (!sanitizedUrl) return undefined;

  // Then validate as callback URL
  return validateCallbackUrl(sanitizedUrl, customTrustedDomains);
}
