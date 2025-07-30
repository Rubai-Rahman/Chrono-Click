import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Fetch user role from your MongoDB backend
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${email}`
    );

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    const userData = await backendResponse.json();
    console.log('📊 Backend user data:', userData);

    // Get Firebase user
    const firebaseUser = await adminAuth.getUserByEmail(email);

    // Set Firebase custom claims based on MongoDB role
    const isAdmin = userData.admin === true; // Your backend returns {admin: true/false}
    await adminAuth.setCustomUserClaims(firebaseUser.uid, { admin: isAdmin });

    console.log(`✅ Synced role for ${email}: admin=${isAdmin}`);

    return NextResponse.json({
      success: true,
      message: `Role synced for ${email}`,
      isAdmin,
    });
  } catch (error) {
    console.error('Error syncing role:', error);
    return NextResponse.json({ error: 'Failed to sync role' }, { status: 500 });
  }
}
