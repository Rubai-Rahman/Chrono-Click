'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { postData } from '@/api-lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Mail, Send, Sparkles, Gift, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

// Zod schema for email validation
const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationKey: ['newsletter'],
    mutationFn: (data: string) => postData('/api/newsletter', data),
    onMutate: () => {
      toast.loading('Subscribing to newsletter...', {
        id: 'newsletter-submit',
      });
    },
    onSuccess: () => {
      toast.success('🎉 Thank you for subscribing! Welcome to our community.');
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong. Please try again.');
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    mutation.mutate(data.email);
  };

  return (
    <section className="py-10 bg-gradient-to-br from-primary/5 to-accent/5 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-xl bg-card/90">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                {/* Left Side - Content */}
                <div className="p-8 lg:p-12">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6">
                      <Bell className="w-4 h-4" />
                      Stay Updated
                    </div>

                    <h6 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
                      Subscribe to the Mailing List
                    </h6>

                    <h3 className="text-4xl lg:text-5xl font-bold mb-6">
                      Newsletter
                    </h3>

                    <p className="text-lg text-muted-foreground mb-8">
                      Get exclusive access to new arrivals, special offers, and
                      insider news from the world of luxury timepieces.
                    </p>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3">
                        <Gift className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Exclusive early access to sales
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          New product announcements
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Weekly curated watch insights
                        </span>
                      </div>
                    </div>
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                  type="email"
                                  placeholder="Enter your email address"
                                  className={cn(
                                    'pl-12 h-14 text-lg',
                                    fieldState.error && 'border-destructive'
                                  )}
                                  disabled={mutation.isPending}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={mutation.isPending || !form.watch('email')}
                        className="w-full h-14 text-lg"
                      >
                        {mutation.isPending ? (
                          <>
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Subscribe Now
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>

                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    🔒 We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>

                <div className="bg-primary/10 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Bell className="w-16 h-16 text-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background/80 rounded-lg p-3">
                        <div className="text-2xl font-bold text-primary">
                          10K+
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Subscribers
                        </div>
                      </div>
                      <div className="bg-background/80 rounded-lg p-3">
                        <div className="text-2xl font-bold text-primary">
                          Weekly
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updates
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
