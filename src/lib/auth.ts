import { getSession, getCurrentUserFromSession } from '@/lib/session';

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    return {
      idToken: session.idToken,
      user: session.user,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Get user info from session (no database call needed)
export async function getUserInfo() {
  const userData = await getCurrentUserFromSession();

  if (!userData) {
    return { admin: false, role: 'user' as const };
  }

  return {
    admin: userData.role === 'admin',
    role: userData.role,
    email: userData.email,
    name: userData.name,
  };
}

// Check if current user is admin
export async function isCurrentUserAdmin() {
  const userInfo = await getUserInfo();
  return userInfo.admin;
}

// Server-side function to require admin access
export async function requireAdmin() {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    throw new Error('Admin access required');
  }
  return true;
}

// Get user role (returns 'admin' or 'user')
export async function getUserRole() {
  const userInfo = await getUserInfo();
  return userInfo.role;
}

// Check if user has specific role
export async function hasRole(role: 'admin' | 'user') {
  const userRole = await getUserRole();
  return userRole === role;
}

// Server-side function to require specific role
export async function requireRole(role: 'admin' | 'user') {
  const userRole = await getUserRole();
  if (userRole !== role) {
    throw new Error(`${role} access required`);
  }
  return true;
}
