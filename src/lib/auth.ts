import { getSession } from '@/lib/session';

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    // Return the session token - you can decode it or verify with Firebase Admin if needed
    return { idToken: session };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Get user info including role from your backend
export async function getUserInfo(email: string) {
  try {
    const session = await getSession();
    if (!session) return null;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${email}`,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to get user info');
    }

    const data = await res.json();

    // Return user info with default role handling
    return {
      admin: data.admin || false,
      role: data.admin ? 'admin' : 'user', // Default to 'user' if not admin
    };
  } catch (error) {
    console.error('Error getting user info:', error);
    return { admin: false, role: 'user' }; // Default fallback
  }
}

// Check if current user is admin
export async function isCurrentUserAdmin(email: string) {
  const userInfo = await getUserInfo(email);
  return userInfo?.admin || false;
}

// Server-side function to require admin access
export async function requireAdmin(email: string) {
  const isAdmin = await isCurrentUserAdmin(email);
  if (!isAdmin) {
    throw new Error('Admin access required');
  }
  return true;
}
// Get user role (returns 'admin' or 'user')
export async function getUserRole(email: string) {
  const userInfo = await getUserInfo(email);
  return userInfo?.role || 'user';
}

// Check if user has specific role
export async function hasRole(email: string, role: 'admin' | 'user') {
  const userRole = await getUserRole(email);
  return userRole === role;
}

// Server-side function to require specific role
export async function requireRole(email: string, role: 'admin' | 'user') {
  const userRole = await getUserRole(email);
  if (userRole !== role) {
    throw new Error(`${role} access required`);
  }
  return true;
}
