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
    console.log('payload', payload);
    return payload as { userId: string; role: string };
  } catch {
    throw new Error('Expired');
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let accessToken = req.cookies.get('accessToken')?.value;
  let role: string | null = null;
  let userData: { userId: string; role: string } | null = null;

  const redirectToLogin = () => {
    url.pathname = '/login';
    url.searchParams.set(
      'callbackUrl',
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(url);
  };

  // ---- Verify or refresh token ----
  if (accessToken) {
    try {
      console.log('verifying',accessToken);
      userData = await verifyJwt(accessToken);
      role = userData?.role ?? null;
      console.log('userData===', userData);
    } catch {
      // Token expired → try refresh
      const refreshToken = req.cookies.get('refreshToken')?.value;
      console.log('refreshToken', refreshToken);
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
          console.log('refreshToken response', refreshRes);
          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            accessToken = refreshData.payload.accessToken;

            // Create response
            const response = NextResponse.next();

            // 🔑 Inject new accessToken into *current request*
            if (accessToken) {
              response.cookies.set('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: refreshData.payload.maxAge,
              });

              // <-- This is the fix
              req.cookies.set('accessToken', accessToken);

              try {
                userData = await verifyJwt(accessToken);
                role = userData?.role ?? null;
              } catch {
                return redirectToLogin();
              }
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

              req.cookies.set('refreshToken', refreshData.payload.refreshToken);
            }

            return response;
          }
        } catch (refreshErr) {
          console.error('Refresh failed:', refreshErr);
          return redirectToLogin();
        }
      }

      return redirectToLogin();
    }
  }

  // ---- Redirect authenticated users away from auth pages ----
  if (role && authRoutes.includes(url.pathname)) {
    const redirectPath = role === 'admin' ? '/admin' : '/orders';
    return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));
  }

  // ---- Protected route checks ----
  for (const route of protectedRoutes) {
    if (route.pattern.test(url.pathname)) {
      if (!role) {
        return redirectToLogin();
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
