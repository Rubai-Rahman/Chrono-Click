// Utility functions for handling redirect after login

export const getReturnUrl = (): string => {
  if (typeof window === 'undefined') return '/dashboard';

  const urlParams = new URLSearchParams(window.location.search);
  const returnUrl = urlParams.get('returnUrl');

  // Validate the return URL to prevent open redirect attacks
  if (returnUrl && isValidReturnUrl(returnUrl)) {
    return returnUrl;
  }

  return '/dashboard';
};

export const setReturnUrl = (url: string) => {
  if (typeof window === 'undefined') return;

  // Store in sessionStorage for persistence across page reloads
  sessionStorage.setItem('returnUrl', url);
};

export const clearReturnUrl = () => {
  if (typeof window === 'undefined') return;

  sessionStorage.removeItem('returnUrl');
};

export const getStoredReturnUrl = (): string => {
  if (typeof window === 'undefined') return '/dashboard';

  const storedUrl = sessionStorage.getItem('returnUrl');

  if (storedUrl && isValidReturnUrl(storedUrl)) {
    return storedUrl;
  }

  return '/dashboard';
};

// Validate return URL to prevent open redirect attacks
const isValidReturnUrl = (url: string): boolean => {
  try {
    // Must be a relative URL or same origin
    if (url.startsWith('/')) {
      // Prevent redirect to external sites via protocol-relative URLs
      if (url.startsWith('//')) return false;
      return true;
    }

    // If it's an absolute URL, check if it's same origin
    const urlObj = new URL(url);
    return urlObj.origin === window.location.origin;
  } catch {
    return false;
  }
};

// Get the appropriate redirect URL after successful login
export const getPostLoginRedirect = (): string => {
  // First check URL params (from middleware redirect)
  const urlReturnUrl = getReturnUrl();
  if (urlReturnUrl !== '/dashboard') {
    return urlReturnUrl;
  }

  // Then check sessionStorage (from manual storage)
  const storedReturnUrl = getStoredReturnUrl();
  if (storedReturnUrl !== '/dashboard') {
    clearReturnUrl(); // Clear after use
    return storedReturnUrl;
  }

  // Default to dashboard
  return '/dashboard';
};
