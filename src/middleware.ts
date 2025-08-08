// src/middleware.ts - CORRECTED VERSION
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  { pattern: /^\/orders(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/dashboard(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/admin(\/|$)/, roles: ['admin'] },
  { pattern: /^\/profile(\/|$)/, roles: ['user', 'admin'] },
];

const authRoutes = ['/login', '/signup', '/forgot-password'];

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

  // Redirect authenticated users away from auth pages
  if (role && authRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
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
    '/orders/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/login',
    '/signup',
    '/forgot-password',
  ],
};
