import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Get user by email
    const user = await adminAuth.getUserByEmail(email);

    // Set custom claims
    await adminAuth.setCustomUserClaims(user.uid, { admin: true });

    console.log(`✅ Admin role set for user: ${email}`);

    return NextResponse.json({
      success: true,
      message: `Admin role set for ${email}`,
    });
  } catch (error) {
    console.error('Error setting admin role:', error);
    return NextResponse.json(
      { error: 'Failed to set admin role' },
      { status: 500 }
    );
  }
}

// Remove admin role
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Get user by email
    const user = await adminAuth.getUserByEmail(email);

    // Remove custom claims
    await adminAuth.setCustomUserClaims(user.uid, { admin: false });

    console.log(`✅ Admin role removed for user: ${email}`);

    return NextResponse.json({
      success: true,
      message: `Admin role removed for ${email}`,
    });
  } catch (error) {
    console.error('Error removing admin role:', error);
    return NextResponse.json(
      { error: 'Failed to remove admin role' },
      { status: 500 }
    );
  }
}
