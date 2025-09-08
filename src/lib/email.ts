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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${formData.name}" <${formData.email}>`,
      to: process.env.RECEIVER_EMAIL,
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
