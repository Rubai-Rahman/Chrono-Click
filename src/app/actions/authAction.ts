'use server';
import { authService } from '@/lib/firebase/auth';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { isValidUrl } from '@/lib/utils';

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
    await saveUser(data.email, data.displayName, idToken);
  } catch (error) {
    console.error('Registration error:', error);
    return {
      errors: {
        email: ['Registration failed. Please try again.'],
      },
    };
  }

  // Redirect to dashboard on success
  redirect('/');
}

export async function loginAction(
  data: { email: string; password: string },
  callbackUrl?: string
) {
  const { email, password } = data;

  try {
    const userCred = await authService.signInWithEmail(email, password);
    const idToken = await userCred.user.getIdToken();

    await saveUser(email, userCred.user.displayName || '', idToken);
  } catch (error) {
    console.log(error);
    return {
      errors: {
        email: ['Invalid email or password'],
      },
    };
  }
  const redirectUrl =
    callbackUrl && isValidUrl(callbackUrl) ? callbackUrl : '/products';
  redirect(redirectUrl);
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

    await createSession(idToken, {
      email: userData.email || email,
      name: userData.name || displayName,
      role: userData.role || 'user',
    });

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

  redirect('/');
}

export async function resetPasswordAction(email: string) {
  try {
    await authService.resetPassword(email);
  } catch (error) {
    console.log('error', error);
  }
}
