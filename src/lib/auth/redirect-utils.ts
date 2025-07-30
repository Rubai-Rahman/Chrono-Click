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

export const setReferrerUrl = (url: string) => {
  if (typeof window === 'undefined') return;

  // Store referrer URL separately
  sessionStorage.setItem('referrerUrl', url);
};

export const getReferrerUrl = (): string | null => {
  if (typeof window === 'undefined') return null;

  const referrerUrl = sessionStorage.getItem('referrerUrl');

  if (referrerUrl && isValidReturnUrl(referrerUrl)) {
    return referrerUrl;
  }

  return null;
};

export const clearReturnUrl = () => {
  if (typeof window === 'undefined') return;

  sessionStorage.removeItem('returnUrl');
  sessionStorage.removeItem('referrerUrl');
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
  console.log('🔍 URL return URL:', urlReturnUrl);
  if (urlReturnUrl !== '/dashboard') {
    console.log('✅ Using URL return URL:', urlReturnUrl);
    return urlReturnUrl;
  }

  // Then check sessionStorage (from manual storage)
  const storedReturnUrl = getStoredReturnUrl();
  console.log('🔍 Stored return URL:', storedReturnUrl);
  if (storedReturnUrl !== '/dashboard') {
    console.log('✅ Using stored return URL:', storedReturnUrl);
    return storedReturnUrl;
  }

  // Check if we have a referrer stored
  const referrerUrl = getReferrerUrl();
  console.log('🔍 Referrer URL:', referrerUrl);
  if (referrerUrl && referrerUrl !== '/dashboard') {
    console.log('✅ Using referrer URL:', referrerUrl);
    return referrerUrl;
  }

  // Only default to dashboard if we have no other option
  console.log('✅ Using default dashboard URL');
  return '/dashboard';
};

// Check if current path is a protected route
export const isProtectedRoute = (pathname: string): boolean => {
  const protectedRoutes = ['/dashboard', '/orders', '/checkout'];
  const adminRoutes = [
    '/admin',
    '/admin-dashboard',
    '/dashboard/manageOrders',
    '/dashboard/makeAdmin',
    '/dashboard/addProduct',
    '/dashboard/manageProduct',
    '/dashboard/addNews',
  ];

  return (
    protectedRoutes.some((route) => pathname.startsWith(route)) ||
    adminRoutes.some((route) => pathname.startsWith(route))
  );
};

// Check if current path is a public route
export const isPublicRoute = (pathname: string): boolean => {
  return !isProtectedRoute(pathname);
};
