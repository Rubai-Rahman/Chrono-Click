import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    await transporter.sendMail({
      from: `"Watch Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to our Newsletter!',
      text: 'Thanks for subscribing to our newsletter. Stay updated with the latest watch news and exclusive offers.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to our Newsletter! 🕰️</h2>
          <p>Thanks for subscribing to our newsletter!</p>
          <p>You'll now receive:</p>
          <ul>
            <li>Latest watch news and insights</li>
            <li>Exclusive offers and early access to sales</li>
            <li>New product announcements</li>
          </ul>
          <p>Stay tuned for amazing updates!</p>
          <hr style="margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            You can unsubscribe at any time by replying to this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription successful',
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
