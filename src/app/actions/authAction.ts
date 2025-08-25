'use server';

import { authService } from '@/lib/firebase/auth';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { isValidUrl } from '@/lib/utils';
import { safeApi } from '@/lib/fetch/serverFetch';
import { ProductType } from '@/lib/types/api/product-types';

//
// ---- Types ----
//
export type RegisterResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

type SaveUserOk = {
  success: true;
  data: { email: string; name: string; role: 'user' | 'admin' };
};
type SaveUserErr = {
  success: false;
  error: { message: string; status?: number; details?: unknown };
};
type SaveUserResult = SaveUserOk | SaveUserErr;

//
// ---- saveUser ----
//
export async function saveUser(
  email: string,
  displayName: string,
  idToken: string,
  photoURL?: string,
  rememberMe: boolean = false
): Promise<SaveUserResult> {
  console.log(
    'email',
    email,
    'dispalyName',
    displayName,
    'idToken',
    idToken,
    'photoURL',
    photoURL,
    'rememberMe',
    rememberMe
  );
  const result = await safeApi.put<{
    email: string;
    name: string;
    role: 'user' | 'admin';
  }>('/users', {
    email,
    displayName,
    name: displayName,
    idToken,
    photoURL,
    rememberMe,
  });

  if (!result.success || !result.data) {
    return {
      success: false,
      error: {
        message: result.error?.message || 'Failed to save user',
        status: result.error?.status,
        details: result.error?.details,
      },
    };
  }

  const userData = result.data;

  await createSession(
    idToken,
    {
      email: userData.email || email,
      name: userData.name || displayName,
      role: userData.role || 'user',
    },
    rememberMe
  );

  return { success: true, data: userData };
}

//
// ---- registerAction ----
//
export async function registerAction(data: {
  email: string;
  password: string;
  displayName: string;
}): Promise<RegisterResult> {
  try {
    const userCred = await authService.createUserWithEmail(
      data.email,
      data.password,
      data.displayName
    );
    const idToken = await userCred.user.getIdToken();

    const saveResult = await saveUser(data.email, data.displayName, idToken);

    if (!saveResult.success) {
      return {
        success: false,
        errors: { email: [saveResult.error.message] },
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      errors: { email: ['Registration failed. Please try again.'] },
    };
  }
}

//
// ---- loginAction ----
//
export async function loginAction(
  data: { email: string; password: string; rememberMe: boolean },
  callbackUrl?: string
) {
  const { email, password, rememberMe } = data;

  try {
    const userCred = await authService.signInWithEmail(email, password);
    const idToken = await userCred.user.getIdToken();

    const saveResult = await saveUser(
      email,
      userCred.user.displayName || '',
      idToken,
      undefined,
      rememberMe
    );

    if (!saveResult.success) {
      return {
        errors: { email: [saveResult.error.message] },
      };
    }
  } catch (error: unknown) {
    console.error('Login error:', error);

    let errorMessage = 'Invalid email or password';
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof (error as { code?: string }).code === 'string'
    ) {
      switch ((error as { code: string }).code) {
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
      }
    }

    return { errors: { email: [errorMessage] } };
  }

  const redirectUrl =
    callbackUrl && isValidUrl(callbackUrl) ? callbackUrl : '/products/gents';
  redirect(redirectUrl);
}

//
// ---- getProduct ----
//
export async function getProduct(): Promise<ProductType[]> {
  try {
    const response = await axiosInstance.get<{ products: ProductType[] }>(
      '/products'
    );
    return response.data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

//
// ---- logoutAction ----
//
export async function logoutAction() {
  try {
    await authService.signOut();
    await deleteSession();
  } catch (error) {
    console.error('Logout error:', error);
  }
  redirect('/');
}

//
// ---- resetPasswordAction ----
//
export async function resetPasswordAction(email: string) {
  try {
    await authService.resetPassword(email);
  } catch (error) {
    console.error('Reset password error:', error);
  }
}
