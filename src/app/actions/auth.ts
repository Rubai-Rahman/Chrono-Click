'use server';
import { authService } from '@/lib/firebase/auth';
import { createSession, deleteSession, getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function loginAction(data: { email: string; password: string }) {
  const { email, password } = data;

  try {
    // Sign in with Firebase
    const userCred = await authService.signInWithEmail(email, password);
    const idToken = await userCred.user.getIdToken();

    // Create session with the ID token
    await createSession(idToken);

    // Save/update user in your backend
    await saveUser(email, userCred.user.displayName || '', idToken);
  } catch (error: unknown) {
    return {
      errors: {
        email: ['Invalid email or password'],
      },
    };
  }

  // Redirect to dashboard on success
  redirect('/dashboard');
}

export const saveUser = async (
  email: string,
  displayName: string,
  idToken: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        email,
        name: displayName,
        role: 'user',
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to save user');
    }

    return res.json();
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export async function logoutAction() {
  try {
    await authService.signOut();

    await deleteSession();
  } catch (error) {
    console.error('Logout error:', error);
  }

  // Redirect to home page
  redirect('/');
}

// Check if user is admin
export async function checkAdminRole(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${email}`
    );

    if (!res.ok) {
      throw new Error('Failed to check admin role');
    }

    const data = await res.json();
    return data.admin || false;
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
}

// Get user role (returns 'admin' or 'user')
export async function getUserRole(email: string) {
  try {
    const isAdmin = await checkAdminRole(email);
    return isAdmin ? 'admin' : 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'user'; // Default to 'user' on error
  }
}

// Make user admin (requires admin privileges)
export async function makeUserAdmin(adminEmail: string) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error('No session found');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/admin`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify({
          email: adminEmail, // User to make admin
        }),
      }
    );

    if (!res.ok) {
      throw new Error('Failed to make user admin');
    }

    return res.json();
  } catch (error) {
    console.error('Error making user admin:', error);
    throw error;
  }
}
