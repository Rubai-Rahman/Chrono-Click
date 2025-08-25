'use server';

import { sendMailAction } from '@/lib/email';
import { ContactFormData } from '@/lib/validations/contact';
import { ContactSchema } from '@/lib/validations/contact';

export async function contactAction(data: ContactFormData) {
  // ✅ Validate first
  const validationResult = ContactSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: 'Please check your input and try again',
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    await sendMailAction(data); // ✅ Only call if valid
    return { success: true };
  } catch (err) {
    console.error('Email send failed:', err);
    return {
      success: false,
      error: 'Something went wrong while sending mail.',
    };
  }
}
