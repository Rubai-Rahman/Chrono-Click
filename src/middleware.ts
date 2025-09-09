import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

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
    throw new Error('Expired');
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let accessToken = req.cookies.get('accessToken')?.value;
  let role: string | null = null;
  let userData: { userId: string; role: string } | null = null;

  if (accessToken) {
    try {
      userData = await verifyJwt(accessToken);
      role = userData?.role ?? null;
    } catch (err) {
      // Token expired → try refresh
      const refreshToken = req.cookies.get('refreshToken')?.value;
      if (refreshToken) {
        try {
          const refreshRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                cookie: req.headers.get('cookie') ?? '',
              },
              body: JSON.stringify({ refreshToken }),
            }
          );

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            accessToken = refreshData.payload.accessToken;

            // Create response and set refreshed cookies
            const response = NextResponse.next();
            if (accessToken) {
              response.cookies.set('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: refreshData.payload.maxAge,
              });
            }

            if (refreshData.payload.refreshToken) {
              response.cookies.set(
                'refreshToken',
                refreshData.payload.refreshToken,
                {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'lax',
                  maxAge: refreshData.payload.maxAge,
                }
              );
            }

            if (refreshData.payload.refreshToken) {
              response.cookies.set(
                'refreshToken',
                refreshData.payload.refreshToken,
                {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'lax',
                  maxAge: refreshData.payload.maxAge,
                }
              );
            }

            // Re-verify token
            if (accessToken) {
              userData = await verifyJwt(accessToken);
              role = userData?.role ?? null;
            }

            return response; // continue with refreshed token
          }
        } catch (refreshErr) {
          console.error('Refresh failed:', refreshErr);
        }
      }

      // Refresh failed or missing → redirect to login
      url.pathname = '/login';
      url.searchParams.set(
        'callbackUrl',
        req.nextUrl.pathname + req.nextUrl.search
      );
      return NextResponse.redirect(url);
    }
  }

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
