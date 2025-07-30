import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Session API - Setting cookie...');
    const { idToken } = await request.json();

    if (!idToken) {
      console.log('❌ Session API - No token provided');
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    console.log('🔄 Session API - Token received, length:', idToken.length);

    // Set the auth token as an HTTP-only cookie
    const response = NextResponse.json({ success: true });

    // Set cookie with security options
    response.cookies.set('auth-token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/',
    });

    // Also set the cookie in the response headers as a fallback
    response.headers.set(
      'Set-Cookie',
      `auth-token=${idToken}; Path=/; Max-Age=${
        60 * 60 * 24 * 5
      }; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }; HttpOnly`
    );

    console.log('✅ Session API - Cookie set successfully');
    return response;
  } catch (error) {
    console.error('❌ Session API - Error setting session:', error);
    return NextResponse.json(
      { error: 'Failed to set session' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true });

    // Clear the auth token cookie
    response.cookies.delete('auth-token');

    return response;
  } catch (error) {
    console.error('Error clearing session:', error);
    return NextResponse.json(
      { error: 'Failed to clear session' },
      { status: 500 }
    );
  }
}
