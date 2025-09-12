import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
const authRoutes = ['/login', '/signup', '/forgot-password'];
async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  let userData = accessToken ? await verifyJwt(accessToken) : null;

  const redirectToLogin = () => {
    // ✅ Don't redirect again if we're already on login/signup/forgot-password
    if (authRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.next(); // just let them stay there
    }

    url.pathname = '/login';
    url.searchParams.set(
      'callbackUrl',
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(url);
  };

  // 🔑 If no userData, try refresh once
  if (!userData && refreshToken) {
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

        // ✅ Verify the new token before proceeding
        if (accessToken) {
          userData = await verifyJwt(accessToken);
        }
        if (!userData) return redirectToLogin();

        // ✅ Build response with new cookies
        const response = NextResponse.next();

        // Only set the cookie if accessToken is defined
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

        return response;
      }

      // ❌ Refresh failed → force login
      return redirectToLogin();
    } catch (err) {
      console.error('Refresh error:', err);
      return redirectToLogin();
    }
  }

  if (!userData && !refreshToken) return redirectToLogin();

  const role = userData?.role ?? null;

  // Protected route logic
  const protectedRoutes = [
    { pattern: /^\/admin(\/|$)/, roles: ['admin'] },
    { pattern: /^\/orders(\/|$)/, roles: ['user', 'admin'] },
    { pattern: /^\/wishlist(\/|$)/, roles: ['user', 'admin'] },
    { pattern: /^\/addresses(\/|$)/, roles: ['user', 'admin'] },
    { pattern: /^\/payment-methods(\/|$)/, roles: ['user', 'admin'] },
    { pattern: /^\/settings(\/|$)/, roles: ['user', 'admin'] },
  ];

  for (const route of protectedRoutes) {
    if (route.pattern.test(url.pathname)) {
      if (!role) return redirectToLogin();
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
