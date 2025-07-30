import { NextRequest, NextResponse } from 'next/server';

// Define protected routes
const protectedRoutes = ['/dashboard', '/orders', '/checkout'];
const authRoutes = ['/login', '/signup', '/forgot-password'];
const adminRoutes = [
  '/admin',
  '/admin-dashboard',
  '/dashboard/manageOrders',
  '/dashboard/makeAdmin',
  '/dashboard/addProduct',
  '/dashboard/manageProduct',
  '/dashboard/addNews',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token =
    request.cookies.get('auth-token')?.value ||
    request.cookies.get('auth-token-backup')?.value;
  console.log('🔍 Middleware - Path:', pathname);
  console.log('🔍 Middleware - Token:', token);
  console.log('🔍 Middleware - All cookies:', request.cookies.getAll());
  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If no token and accessing protected route, redirect to login
  if ((isProtectedRoute || isAdminRoute) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If token exists, verify it
  if (token) {
    try {
      // Call our API route to verify the token
      const verifyResponse = await fetch(
        new URL('/api/auth/verify', request.url),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!verifyResponse.ok) {
        throw new Error('Token verification failed');
      }

      const decodedToken = await verifyResponse.json();

      // If accessing auth routes while authenticated, redirect to dashboard
      if (isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Check admin access
      console.log(
        '🛡️ Middleware - Decoded token admin claim:',
        decodedToken.admin
      );
      console.log('🛡️ Middleware - Is admin route:', isAdminRoute);
      console.log(
        '🛡️ Middleware - Admin access granted:',
        isAdminRoute ? decodedToken.admin : 'N/A'
      );

      if (isAdminRoute && !decodedToken.admin) {
        console.log(
          '❌ Middleware - Admin access denied, redirecting to dashboard'
        );
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Add user info to headers for API routes
      const response = NextResponse.next();
      response.headers.set('x-user-id', decodedToken.uid);
      response.headers.set(
        'x-user-role',
        decodedToken.admin ? 'admin' : 'user'
      );

      return response;
    } catch (error) {
      console.log(error);
      const response =
        isProtectedRoute || isAdminRoute
          ? NextResponse.redirect(new URL('/login', request.url))
          : NextResponse.next();

      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
