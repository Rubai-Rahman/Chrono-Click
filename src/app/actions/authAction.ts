'use server';
import { authService } from '@/lib/firebase/auth';
import { createSession, deleteSession, getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import axiosInstance from '@/lib/axios';

export async function loginAction(data: { email: string; password: string }) {
  const { email, password } = data;

  try {
    const userCred = await authService.signInWithEmail(email, password);
    const idToken = await userCred.user.getIdToken();

    const userData = await saveUser(
      email,
      userCred.user.displayName || '',
      idToken
    );

    // Create session with user data
    await createSession(idToken, {
      email: userData.email,
      name: userData.name,
      role: userData.role || 'user',
    });
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
    const response = await axiosInstance.put(
      '/users',
      {
        email,
        name: displayName,
        role: 'user',
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    const userData =
      typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data;

    return userData;
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

// Make user admin (requires admin privileges)
export async function makeUserAdmin(adminEmail: string) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error('No session found');
    }

    const response = await axiosInstance.put(
      '/users/admin',
      {
        email: adminEmail, // User to make admin
      },
      {
        headers: {
          Authorization: `Bearer ${session.idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error making user admin:', error);
    throw error;
  }
}
