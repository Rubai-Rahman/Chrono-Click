import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  // Forward credentials to your Express backend
  const res = await fetch(`${process.env.NODE_ENV}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) return NextResponse.json({ error: 'Invalid' }, { status: 401 });

  const { token, ...rest } = await res.json();
  const maxAge = 10 * 24 * 60 * 60; // e.g. 10 days

  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  });

  return NextResponse.json(rest);
}
