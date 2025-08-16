'use server';

import { contactSchema, ContactFormData } from '@/lib/validations/contact';

export async function submitContactForm(data: ContactFormData) {
  // Validate the data using Zod schema
  const validationResult = contactSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: 'Please check your input and try again',
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validationResult.data;

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      }/api/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to send message',
      };
    }

    return {
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: 'Failed to send message. Please try again.',
    };
  }
}
