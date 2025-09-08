'use server';

import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { safeApi } from '@/lib/fetch/serverFetch';

interface SignupPayload {
  accessToken: string;
  refreshToken: string;
  maxAge: number;
  user: { email: string; name: string; role: 'user' | 'admin' };
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
      createSession(
        result.data?.payload.accessToken,
        result.data?.payload.refreshToken,
        result.data?.payload.maxAge
      );
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
      createSession(
        result.data?.payload.accessToken,
        result.data?.payload.refreshToken,
        result.data?.payload.maxAge
      );
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
    const result = await safeApi.post<RegisterResultAlt>(
      'auth/logout',
      {},
      {
        credentials: 'include',
      }
    );

    if (!result.success) {
      return {
        success: false,
        message: result.error?.message || 'Unknown error',
      };
    }
    await deleteSession();
    redirect('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

//
// ---- resetPasswordAction ----
//
export async function resetPasswordAction(email: string) {
  try {
    console.log('email', email);
    const result = await safeApi.post<RegisterResultAlt>(
      'auth/reset-password',
      { email },
      {
        credentials: 'include',
      }
    );
    if (!result.success) {
      return {
        success: false,
        message: result.error?.message || 'Unknown error',
      };
    }
    return {
      success: true,
      message: 'Password reset email sent successfully!',
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      success: false,
      message: 'Failed to send password reset email.',
    };
  }
}
