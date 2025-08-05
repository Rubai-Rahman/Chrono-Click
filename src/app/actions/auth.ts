import { LoginFormData, loginSchema } from '@/lib/validations/auth';

export async function loginAction(formData: LoginFormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.email,
    password: formData.password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
