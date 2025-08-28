'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CommonFormField, Form } from '@/components/ui/form';
import { User, MapPin, Phone, Mail } from 'lucide-react';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(11, 'Phone number must be at least 11 digits')
    .regex(
      /^(\+880|880|0)?1[3-9]\d{8}$/,
      'Please enter a valid Bangladeshi phone number'
    ),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(4, 'Postal code must be at least 4 characters'),
  country: z.string().min(1, 'Country is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = ({ formId }: { formId: string }) => {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Bangladesh',
      paymentMethod: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: CheckoutFormData) => {
    // send to API / proceed to payment step
    
    console.log('Checkout data:', data);
  };

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CommonFormField
                control={form.control}
                name="firstName"
                label="First Name"
              >
                {({ field }) => (
                  <Input id="firstName" placeholder="John" {...field} />
                )}
              </CommonFormField>

              <CommonFormField
                control={form.control}
                name="lastName"
                label="Last Name"
              >
                {({ field }) => (
                  <Input id="lastName" placeholder="Doe" {...field} />
                )}
              </CommonFormField>
            </div>

            <CommonFormField control={form.control} name="email" label="Email">
              {({ field }) => (
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    {...field}
                  />
                </div>
              )}
            </CommonFormField>

            <CommonFormField
              control={form.control}
              name="phone"
              label="Phone Number"
            >
              {({ field }) => (
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXXXXXXXX"
                    className="pl-10"
                    {...field}
                  />
                </div>
              )}
            </CommonFormField>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CommonFormField
              control={form.control}
              name="address"
              label="Street Address"
            >
              {({ field }) => (
                <Input
                  id="address"
                  placeholder="House, road, area"
                  {...field}
                />
              )}
            </CommonFormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CommonFormField control={form.control} name="city" label="City">
                {({ field }) => (
                  <Input id="city" placeholder="Dhaka" {...field} />
                )}
              </CommonFormField>

              <CommonFormField
                control={form.control}
                name="postalCode"
                label="Postal Code"
              >
                {({ field }) => (
                  <Input id="postalCode" placeholder="1212" {...field} />
                )}
              </CommonFormField>
            </div>

            <CommonFormField
              control={form.control}
              name="country"
              label="Country"
            >
              {({ field }) => (
                <Input id="country" disabled className="bg-muted" {...field} />
              )}
            </CommonFormField>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CommonFormField control={form.control} name="paymentMethod">
              {({ field }) => (
                <div className="space-y-3">
                  <label
                    htmlFor="sslcommerz"
                    className="flex items-center gap-3 p-4 border rounded-lg bg-muted/20 cursor-pointer"
                  >
                    <input
                      id="sslcommerz"
                      type="radio"
                      value="sslcommerz"
                      checked={field.value === 'sslcommerz'}
                      onChange={() => field.onChange('sslcommerz')}
                      className="text-primary"
                    />
                    <div className="flex-1">
                      <div className="font-medium">SSLCommerz</div>
                      <div className="text-sm text-muted-foreground">
                        Pay securely with bKash, Nagad, cards, and more
                      </div>
                    </div>
                  </label>

                  <label
                    htmlFor="cod"
                    className="flex items-center gap-3 p-4 border rounded-lg bg-muted/20 cursor-pointer"
                  >
                    <input
                      id="cod"
                      type="radio"
                      value="cashOnDelivery"
                      checked={field.value === 'cashOnDelivery'}
                      onChange={() => field.onChange('cashOnDelivery')}
                      className="text-primary"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-muted-foreground">
                        Pay after receiving the product
                      </div>
                    </div>
                  </label>
                </div>
              )}
            </CommonFormField>
          </CardContent>
        </Card>

      </form>
    </Form>
  );
};

export default CheckoutForm;
