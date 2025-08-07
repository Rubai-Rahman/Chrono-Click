'use server';
import { authService } from '@/lib/firebase/auth';
import { createSession, deleteSession, getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import axiosInstance from '@/lib/axios';

export async function registerAction(data: {
  email: string;
  password: string;
  displayName: string;
}) {
  try {
    const userCred = await authService.createUserWithEmail(
      data.email,
      data.password,
      data.displayName
    );
    const idToken = await userCred.user.getIdToken();

    const userData = await saveUser(data.email, data.displayName, idToken);
    console.log('Registration successful for user:', userData);
  } catch (error: unknown) {
    console.error('Registration error:', error);
    return {
      errors: {
        email: ['Registration failed. Please try again.'],
      },
    };
  }

  // Redirect to dashboard on success
  redirect('/dashboard');
}

export async function loginAction(data: { email: string; password: string }) {
  const { email, password } = data;

  try {
    const userCred = await authService.signInWithEmail(email, password);
    const idToken = await userCred.user.getIdToken();

    await saveUser(email, userCred.user.displayName || '', idToken);
  } catch (error: unknown) {
    return {
      errors: {
        email: ['Invalid email or password'],
      },
    };
  }

  redirect('/dashboard');
}

export const saveUser = async (
  email: string,
  displayName: string,
  idToken: string,
  photoURL?: string
) => {
  try {
    const response = await axiosInstance.put(
      '/users',
      {
        email,
        name: displayName,
        photoURL: photoURL,
        role: 'user',
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    const userData = response.data;

    console.log('userDatain server', userData);

    await createSession(idToken, {
      email: userData.email || email,
      name: userData.name || displayName,
      role: userData.role || 'user',
    });

    // Return the user data for the frontend
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

export async function resetPasswordAction(email: string) {
  try {
    await authService.resetPassword(email);
  } catch (error) {
    console.log('error', error);
  }
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
