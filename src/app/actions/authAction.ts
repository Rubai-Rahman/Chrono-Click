'use server';

import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { isValidUrl } from '@/lib/utils';
import { safeApi } from '@/lib/fetch/serverFetch';

interface SignupPayload {
  accessToken: string;
  user: { userId: string; email: string; name: string; role: 'user' | 'admin' };
  message: string;
}

interface SignupSuccess {
  success: true;
  payload: SignupPayload;
}

interface ErrorResponse {
  success: false;
  message: string;
}

type RegisterResultAlt = SignupSuccess | ErrorResponse;

//
// ---- registerAction ----
//
export async function registerAction(data: {
  email: string;
  password: string;
  name: string;
}): Promise<RegisterResultAlt> {
  try {
    const result = await safeApi.post<RegisterResultAlt>('auth/signup', data, {
      credentials: 'include',
    });

    if (!result.success) {
      // Return a proper ErrorResponse, not the whole ApiResult
      return {
        success: false,
        message: result.error?.message || 'Unknown error',
      };
    }
    return result.data!;
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
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
    const saveResult = await saveUser(idToken);
    console.log('saveResult', saveResult);
    if (!saveResult.success) {
      return {
        errors: { email: [saveResult.error.message] },
      };
    }

    const userData = {
      email: saveResult.data.email,
      name: saveResult.data.name,
      role: saveResult.data.role,
    };
    await createSession({ rememberMe, userData: userData });

    // Success - user is now logged in and session is created
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
// ---- logoutAction ----
//
export async function logoutAction() {
  try {
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
    console.log('email', email);
  } catch (error) {
    console.error('Reset password error:', error);
  }
}
