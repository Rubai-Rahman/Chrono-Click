'use server';

import nodemailer from 'nodemailer';

export async function sendMailAction(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${formData.name}" <${formData.email}>`,
      to: process.env.RECEIVER_EMAIL, // তোমার ইমেইল যেখানে পাবে
      subject: `Contact Form Submission from ${formData.name}`,
      text: formData.message,
      html: `
        <p><b>Name:</b> ${formData.name}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Message:</b></p>
        <p>${formData.message}</p>
      `,
    });

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to send email' };
  }
}
