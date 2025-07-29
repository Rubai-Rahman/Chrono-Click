import { NextRequest, NextResponse } from 'next/server';

// Define protected routes
const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get auth token from cookies
  const authToken = request.cookies.get('auth-storage')?.value;

  let isAuthenticated = false;
  let userRole = null;

  if (authToken) {
    try {
      // Parse the auth storage to check if user exists
      const authData = JSON.parse(authToken);
      isAuthenticated = !!authData?.state?.user;
      userRole = authData?.state?.user?.role || null;
    } catch (error) {
      // Invalid token format - clear the cookie
      console.warn('Invalid auth token format:', error);
      isAuthenticated = false;

      // Clear invalid cookie
      const response = NextResponse.next();
      response.cookies.delete('auth-storage');
      return response;
    }
  }

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from auth routes to dashboard
  if (isAuthRoute && isAuthenticated) {
    const redirectUrl =
      request.nextUrl.searchParams.get('redirect') || '/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Add user info to headers for server components (optional)
  if (isAuthenticated) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-authenticated', 'true');
    if (userRole) {
      requestHeaders.set('x-user-role', userRole);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
