'use server';

import { redirect } from 'next/navigation';
import { authService } from '@/lib/firebase/auth';
import { createSession, deleteSession } from '@/lib/session';
import { safeApi } from '@/lib/fetch/serverFetch';
import { isValidUrl } from '@/lib/utils';

//
// ---- Types ----
//
export type RegisterResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

export type UserData = { email: string; name: string; role: 'user' | 'admin' };

type SaveUserOk = { success: true; data: UserData };
type SaveUserErr = {
  success: false;
  error: { message: string; status?: number; details?: unknown };
};
type SaveUserResult = SaveUserOk | SaveUserErr;

//
// ---- Helpers ----
//
export async function saveUser(
  idToken: string,
  rememberMe: boolean
): Promise<SaveUserResult> {
  await createSession({ idToken, rememberMe });
  const result = await safeApi.put<UserData>('/users', {});

  if (result.success && result.data) {
    createSession({ idToken, rememberMe, userData: result.data });
    return { success: true, data: result.data };
  }

  return {
    success: false,
    error: {
      message: result.error?.message || 'Failed to save user',
      status: result.error?.status,
      details: result.error?.details,
    },
  };
}

//
// ---- Actions ----
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

    const saveResult = await saveUser(idToken, true);

    if (!saveResult.success) {
      return { success: false, errors: { email: [saveResult.error.message] } };
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

export async function loginAction(
  data: { email: string; password: string; rememberMe: boolean },
  callbackUrl?: string
) {
  const { email, password, rememberMe } = data;

  try {
    const userCred = await authService.signInWithEmail(email, password);
    const idToken = await userCred.user.getIdToken();

    const saveResult = await saveUser(idToken, rememberMe);
    console.log('saveResult', saveResult);
    if (!saveResult.success) {
      return { errors: { email: [saveResult.error.message] } };
    }
  } catch (error: unknown) {
    console.error('Login error:', error);

    let errorMessage = 'Invalid email or password';

    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      typeof (error as { code?: string }).code === 'string'
    ) {
      const code = (error as { code: string }).code;
      switch (code) {
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

export async function logoutAction() {
  try {
    await authService.signOut();
    await deleteSession();
  } catch (error) {
    console.error(
      'Logout error:',
      error instanceof Error ? error.message : error
    );
  }
  redirect('/');
}

export async function resetPasswordAction(email: string) {
  try {
    await authService.resetPassword(email);
  } catch (error) {
    console.error(
      'Reset password error:',
      error instanceof Error ? error.message : error
    );
  }
}
