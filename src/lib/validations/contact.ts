import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Please enter a valid email address').trim(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
