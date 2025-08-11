import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  { pattern: /^\/admin(\/|$)/, roles: ['admin'] },
  { pattern: /^\/orders(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/wishlist(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/addresses(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/payment-methods(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/settings(\/|$)/, roles: ['user', 'admin'] },
  // Legacy dashboard routes - will be redirected
  { pattern: /^\/dashboard(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/account(\/|$)/, roles: ['user', 'admin'] },
];

const authRoutes = ['/login', '/signup', '/forgot-password'];

// Route mapping for legacy dashboard routes
const legacyRouteMapping: Record<string, (role: string) => string> = {
  '/dashboard': (role) => (role === 'admin' ? '/admin' : '/orders'),
  '/dashboard/myOrders': () => '/orders',
  '/dashboard/payment': () => '/payment-methods',
  '/dashboard/review': () => '/reviews',
  '/dashboard/manageOrders': () => '/admin/orders',
  '/dashboard/makeAdmin': () => '/admin/customers',
  '/dashboard/addProduct': () => '/admin/products',
  '/dashboard/manageProduct': () => '/admin/products',
  '/dashboard/addNews': () => '/admin/news',
  // Redirect old account routes to new simplified routes
  '/account': () => '/orders',
  '/account/orders': () => '/orders',
  '/account/wishlist': () => '/wishlist',
  '/account/addresses': () => '/addresses',
  '/account/payment-methods': () => '/payment-methods',
  '/account/settings': () => '/settings',
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  let role = null;

  if (token) {
    try {
      const sessionData = JSON.parse(token);
      if (new Date(sessionData.expiresAt) > new Date()) {
        role = sessionData.user.role;
      }
    } catch {
      // invalid session
    }
  }

  const url = req.nextUrl.clone();

  // Handle legacy route redirects
  if (
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/account')
  ) {
    const newRoute = legacyRouteMapping[url.pathname];
    if (newRoute) {
      const redirectPath =
        typeof newRoute === 'function' ? newRoute(role || 'user') : newRoute;
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));
    }
  }

  // Redirect authenticated users away from auth pages
  if (role && authRoutes.includes(url.pathname)) {
    const redirectPath = role === 'admin' ? '/admin' : '/account';
    return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));
  }

  // Check protected routes
  for (const route of protectedRoutes) {
    if (route.pattern.test(url.pathname)) {
      if (!role) {
        url.pathname = '/login';
        url.searchParams.set(
          'callbackUrl',
          req.nextUrl.pathname + req.nextUrl.search
        );
        return NextResponse.redirect(url);
      }
      if (!route.roles.includes(role)) {
        return NextResponse.redirect(
          new URL('/unauthorized', req.nextUrl.origin)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/account/:path*',
    '/admin/:path*',
    '/orders/:path*',
    '/wishlist/:path*',
    '/addresses/:path*',
    '/payment-methods/:path*',
    '/settings/:path*',
    '/login',
    '/signup',
    '/forgot-password',
  ],
};
