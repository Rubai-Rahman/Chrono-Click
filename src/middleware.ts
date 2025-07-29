import { NextRequest, NextResponse } from 'next/server';

// Define protected routes
const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Get auth token from cookies (you might need to adjust this based on your auth implementation)
  const authToken = request.cookies.get('auth-storage')?.value;
  
  let isAuthenticated = false;
  
  if (authToken) {
    try {
      // Parse the auth storage to check if user exists
      const authData = JSON.parse(authToken);
      isAuthenticated = !!authData?.state?.user;
    } catch (error) {
      // Invalid token format
      isAuthenticated = false;
    }
  }

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    