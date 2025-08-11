'use server';
import { authService } from '@/lib/firebase/auth';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { isValidUrl } from '@/lib/utils';
import { ProductType } from '@/api-lib/api-type';

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
  data: { email: string; password: string; rememberMe: boolean },
  callbackUrl?: string
) {
  const { email, password, rememberMe } = data;

  try {
    const userCred = await authService.signInWithEmail(email, password);
    const idToken = await userCred.user.getIdToken();

    await saveUser(
      email,
      userCred.user.displayName || '',
      idToken,
      undefined,
      rememberMe
    );
  } catch (error: unknown) {
    console.log(error);

    // Provide more specific error messages based on Firebase error codes
    let errorMessage = 'Invalid email or password';

    if (error?.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        default:
          errorMessage = 'Invalid email or password';
      }
    }

    return {
      errors: {
        email: [errorMessage],
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
  photoURL?: string,
  rememberMe: boolean = false
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

    await createSession(
      idToken,
      {
        email: userData.email || email,
        name: userData.name || displayName,
        role: userData.role || 'user',
      },
      rememberMe
    );

    return userData;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const getProduct = async (): Promise<ProductType[]> => {
  try {
    const response = await axiosInstance.get<ProductType[]>('/products');
    return response.data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
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
