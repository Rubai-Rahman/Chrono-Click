import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    return payload as {
      userId?: string;
      role?: string;
      email?: string;
      name?: string;
    };
  } catch {
    return null;
  }
}

// Only protect these routes
const protectedRoutes = [
  { pattern: /^\/admin(\/|$)/, roles: ['admin'] },
  { pattern: /^\/orders(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/wishlist(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/addresses(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/payment-methods(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/settings(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/order-success(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/checkout(\/|$)/, roles: ['user', 'admin'] },
];

export async function middleware(req: NextRequest) {
  // Get cookies manually
  const cookieHeader = req.headers.get('cookie') ?? '';
  const accessMatch = cookieHeader.match(/accessToken=([^;]+)/);
  const refreshMatch = cookieHeader.match(/refreshToken=([^;]+)/);
  const accessToken = accessMatch ? decodeURIComponent(accessMatch[1]) : null;
  const refreshToken = refreshMatch
    ? decodeURIComponent(refreshMatch[1])
    : null;

  const userData = accessToken ? await verifyJwt(accessToken) : null;

  const redirectToLogin = () => {
    // Clear cookies if invalid
    const response = NextResponse.redirect(
      new URL('/login', req.nextUrl.origin)
    );
    response.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
    response.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });
    return response;
  };

  // Try refresh if access token missing/invalid and refresh token exists
  if (!userData && refreshToken) {
    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', cookie: cookieHeader },
          body: JSON.stringify({}),
        }
      );

      if (!refreshRes.ok) return redirectToLogin();

      const refreshData = await refreshRes.json();
      const newAccess = refreshData?.payload?.accessToken;
      const newRefresh = refreshData?.payload?.refreshToken;

      if (!newAccess) return redirectToLogin();
      const newPayload = await verifyJwt(newAccess);
      if (!newPayload) return redirectToLogin();

      const response = NextResponse.next();

      response.cookies.set('accessToken', newAccess, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: refreshData?.payload?.maxAge ?? 60 * 15,
      });

      if (newRefresh) {
        response.cookies.set('refreshToken', newRefresh, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: refreshData?.payload?.refreshMaxAge ?? 60 * 60 * 24 * 30,
        });
      }

      return response;
    } catch (err) {
      console.error('Middleware refresh error', err);
      return redirectToLogin();
    }
  }

  if (!userData) return redirectToLogin();

  // Role-based checks
  const role = userData?.role ?? null;
  for (const r of protectedRoutes) {
    if (r.pattern.test(req.nextUrl.pathname)) {
      if (!role) return redirectToLogin();
      if (!r.roles.includes(role)) {
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
    '/order-success/:path*',
    '/checkout/:path*',
  ],
};
