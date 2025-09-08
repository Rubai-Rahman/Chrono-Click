import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  { pattern: /^\/admin(\/|$)/, roles: ['admin'] },
  { pattern: /^\/orders(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/wishlist(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/addresses(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/payment-methods(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/settings(\/|$)/, roles: ['user', 'admin'] },
];

const authRoutes = ['/login', '/signup', '/forgot-password'];

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const userCookie = req.cookies.get('user')?.value;
  let role = null;

  if (accessToken && userCookie) {
    try {
      const userData = JSON.parse(userCookie);
      role = userData.role;
    } catch {
      // invalid user cookie
    }
  }

  const url = req.nextUrl.clone();

  // Redirect authenticated users away from auth pages
  if (role && authRoutes.includes(url.pathname)) {
    const redirectPath = role === 'admin' ? '/admin' : '/orders';
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
