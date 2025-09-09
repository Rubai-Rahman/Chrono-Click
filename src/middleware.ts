import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { createSession, deleteSession } from './lib/session';

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

const protectedRoutes = [
  { pattern: /^\/admin(\/|$)/, roles: ['admin'] },
  { pattern: /^\/orders(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/wishlist(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/addresses(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/payment-methods(\/|$)/, roles: ['user', 'admin'] },
  { pattern: /^\/settings(\/|$)/, roles: ['user', 'admin'] },
];

const authRoutes = ['/login', '/signup', '/forgot-password'];

async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    return payload as { userId: string; role: string };
  } catch (err) {
    if (err) {
      console.log('Expired===');
      throw new Error('Expired');
    }
    // console.error('JWT verification failed:', err);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  let accessToken = req.cookies.get('accessToken')?.value;
  console.log('accessToken===', accessToken);
  let role: string | null = null;
  let userData: { userId: string; role: string } | null = null;
  console.log('role===', role, '===userData===', userData);
  if (accessToken) {
    try {
      userData = await verifyJwt(accessToken);
      console.log('innerUserData===', userData);
      role = userData?.role ?? null;
    } catch (err) {
      console.log('err===', err);
      if (err instanceof Error && err.message === 'Expired') {
        try {
          const refreshToken = req.cookies.get('refreshToken')?.value;

          const refreshRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                cookie: req.cookies.toString(), // forward cookies
              },
              body: JSON.stringify({ refreshToken }),
            }
          );

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            accessToken = refreshData?.payload?.accessToken;

            if (accessToken) {
              // ✅ Save new tokens in cookies/session
              createSession(
                refreshData.payload.accessToken,
                refreshData.payload.refreshToken,
                refreshData.payload.maxAge
              );

              // Re-verify new token
              userData = await verifyJwt(accessToken);
              role = userData?.role ?? null;
            }
          }
          console.log('userData===', userData);
          if (!role) {
            deleteSession();
            const loginUrl = req.nextUrl.clone();
            loginUrl.pathname = '/login';
            return NextResponse.redirect(loginUrl);
          }
        } catch (refreshErr) {
          console.error('Refresh token failed:', refreshErr);
          deleteSession();
          const loginUrl = req.nextUrl.clone();
          loginUrl.pathname = '/login';
          return NextResponse.redirect(loginUrl);
        }
      }
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
