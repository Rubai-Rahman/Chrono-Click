'use server';

import { authService } from '@/lib/firebase/auth';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { isValidUrl } from '@/lib/utils';
import { UsersDAL, ProductsDAL, type Product } from '@/lib/dal';

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

    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string };
      switch (firebaseError.code) {
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
    // Create session first to enable authenticated API calls
    await createSession(
      idToken,
      {
        email,
        name: displayName,
        role: 'user',
      },
      rememberMe
    );

    // Now use DAL to save user data
    const userData = await UsersDAL.upsertUser({
      email,
      name: displayName,
      photoURL,
      role: 'user',
    });

    // Update session with actual user data from server
    await createSession(
      idToken,
      {
        email: userData.email,
        name: userData.name,
        role: userData.role,
      },
      rememberMe
    );

    return userData;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const getProduct = async (): Promise<Product[]> => {
  try {
    const response = await ProductsDAL.getProducts();
    return response.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array instead of throwing to prevent page crashes
    return [];
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
