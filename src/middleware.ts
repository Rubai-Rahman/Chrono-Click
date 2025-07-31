// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminAuth } from './lib/firebase/admin';

const protectedRoutes = [
  { pattern: /^\/private(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/admin(\/|$)/, roles: ['admin'] },
];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  let role = null;
  if (token) {
    try {
      const decoded = await adminAuth.verifySessionCookie(token, true);
      role = decoded.role as string; // include role via custom claim or Firestore
    } catch {
      // invalid
    }
  }

  const url = req.nextUrl.clone();
  for (const rule of protectedRoutes) {
    if (rule.pattern.test(url.pathname)) {
      if (!role) {
        url.pathname = '/login';
        url.searchParams.set('callbackUrl', req.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
      if (!rule.roles.includes(role)) {
        return NextResponse.redirect(
          new URL('/unauthorized', req.nextUrl.origin)
        );
      }
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ['/private/:path*', '/admin/:path*'] };
