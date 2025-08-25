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

import { contactAction } from '@/app/actions/contactAction';
import { ContactSchema } from '@/lib/validations/contact';
import z from 'zod';
import { useTransition } from 'react';
import { toast } from 'sonner';

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(ContactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof ContactSchema>) => {
    startTransition(async () => {
      const result = await contactAction(data);

      if (result?.success) {
        toast.success(
          '🎉 Your message has been sent successfully. We will get back to you soon!'
        );
        form.reset();
      } else {
        toast.error(
          result?.error || '❌ Something went wrong. Please try again.'
        );
      }
    });
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
              loading={isPending}
              disabled={isPending}
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
