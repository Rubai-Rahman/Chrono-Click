'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, CommonFormField } from '@/components/ui/form';

import { submitContactForm } from '@/app/actions/contactAction';
import { useState } from 'react';

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setSubmitResult(null);

    try {
      const result = await submitContactForm(data);
      setSubmitResult(result);

      if (result.success) {
        form.reset();
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitResult({
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 rounded-3xl shadow-xl border border-border bg-card">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-foreground font-serif mb-2">
          Send Us a Message
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {/* Success Message */}
        {submitResult?.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  {submitResult.message ||
                    "Message sent successfully! We'll get back to you soon."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitResult?.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {submitResult.error}
                </p>
              </div>
            </div>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Name Input */}
            <CommonFormField
              control={form.control}
              name="name"
              label="Your Name"
            >
              {({ field }) => (
                <Input
                  type="text"
                  placeholder="John Doe"
                  className="pl-4 pr-4 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
                  {...field}
                />
              )}
            </CommonFormField>

            {/* Email Input */}
            <CommonFormField
              control={form.control}
              name="email"
              label="Your Email"
            >
              {({ field }) => (
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="pl-4 pr-4 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
                  {...field}
                />
              )}
            </CommonFormField>

            {/* Subject Input */}
            <CommonFormField
              control={form.control}
              name="subject"
              label="Subject"
            >
              {({ field }) => (
                <Input
                  type="text"
                  placeholder="Inquiry about a product"
                  className="pl-4 pr-4 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
                  {...field}
                />
              )}
            </CommonFormField>

            {/* Message Input */}
            <CommonFormField
              control={form.control}
              name="message"
              label="Your Message"
            >
              {({ field }) => (
                <Textarea
                  placeholder="Type your message here..."
                  rows={5}
                  className="pl-4 pr-4 py-2.5 rounded-md border border-input bg-input/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-0"
                  {...field}
                />
              )}
            </CommonFormField>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground rounded-md shadow-md hover:bg-primary/90 transition-colors duration-200"
              loading={isLoading}
              disabled={isLoading}
            >
              Send Message
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
