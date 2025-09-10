'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { GoogleLogin } from '@react-oauth/google';
import { CredentialResponse } from '@react-oauth/google';

export default function GoogleSignInButton() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/google`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // important for refresh token cookie
          body: JSON.stringify({ idToken: credentialResponse.credential }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Google login failed');

      setAccessToken(data.payload.accessToken);
      setUser(data.payload.user);
    } catch (err) {
      console.error('Google login error:', err);
    }
  };

  const handleError = () => {
    console.error('Google login failed');
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}
