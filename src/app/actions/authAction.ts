'use server';

import { deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { safeApi } from '@/lib/fetch/serverFetch';
import { cookies } from 'next/headers';

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
    if (result.success && result.data && 'payload' in result.data) {
      const cookieStore = await cookies();
      cookieStore.set('accessToken', result.data?.payload.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    return result.data!;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

//
// ---- loginAction ----
//
export async function loginAction(data: {
  email: string;
  password: string;
  rememberMe: boolean;
}): Promise<RegisterResultAlt> {
  try {
    const result = await safeApi.post<RegisterResultAlt>('auth/login', data, {
      credentials: 'include',
    });

    if (!result.success) {
      return {
        success: false,
        message: result.error?.message || 'Unknown error',
      };
    }
if (result.success && result.data && 'payload' in result.data) {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', result.data?.payload.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
    return result.data!;
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
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
