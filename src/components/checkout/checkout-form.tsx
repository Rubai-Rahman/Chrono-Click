'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CommonFormField, Form } from '@/components/ui/form';
import { User, MapPin, Phone, Mail } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { TAddress } from '@/lib/types/api/address-types';

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
  paymentMethod: z.string().min(1, 'Payment method is required'),
  shippingMethod: z.string().min(1, 'Shipping method is required'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = ({
  formId,
  shippingMethod,
  onShippingMethodChange,
  handleOrder,
  addresses,
}: {
  formId: string;
  shippingMethod: string;
  onShippingMethodChange: (method: string) => void;
  handleOrder: (data: CheckoutFormData) => void;
  addresses: TAddress[];
}) => {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: addresses.find((addr) => addr.isDefault)?._id || '',
      paymentMethod: 'sslcommerz',
      shippingMethod: shippingMethod || 'standard',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: CheckoutFormData) => {
    handleOrder(data);
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
            <CommonFormField control={form.control} name="address">
              {({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  {addresses.map((addr) => {
                    const id = `address-${addr._id}`;
                    const isSelected = field.value === addr._id;
                    return (
                      <div
                        key={addr._id}
                        className={`
              flex items-start gap-3 p-4 border rounded-lg cursor-pointer
              ${
                isSelected
                  ? ' border-primary' /* selected styles */
                  : '' /* unselected styles */
              }
              transition-colors
            `}
                      >
                        <RadioGroupItem value={addr._id!} id={id} />
                        <Label htmlFor={id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{addr.name}</div>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              )}
            </CommonFormField>
          </CardContent>
        </Card>
        {/* Payment method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <CommonFormField control={form.control} name="paymentMethod">
              {({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-3"
                >
                  <div
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      field.value === 'sslcommerz' ? 'border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem value="sslcommerz" id="sslcommerz" />
                    <Label
                      htmlFor="sslcommerz"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">SSLCommerz</div>
                      <div className="text-sm text-muted-foreground">
                        Pay securely with bKash, Nagad, cards, and more
                      </div>
                    </Label>
                  </div>

                  <div
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      field.value === 'cash_on_delivery'
                        ? ' border-primary'
                        : ''
                    }`}
                  >
                    <RadioGroupItem value="cash_on_delivery" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-muted-foreground">
                        Pay after receiving the product
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </CommonFormField>
          </CardContent>
        </Card>
        {/* shipping method */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Method</CardTitle>
          </CardHeader>
          <CardContent>
            <CommonFormField control={form.control} name="shippingMethod">
              {({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    onShippingMethodChange(value);
                  }}
                  className="space-y-3"
                >
                  <div
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      field.value === 'standard' ? 'border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="font-medium">Standard Shipping</div>
                      <div className="text-sm text-muted-foreground">
                        3–5 business days
                      </div>
                    </Label>
                  </div>

                  <div
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      field.value === 'express' ? ' border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="font-medium">Express Shipping</div>
                      <div className="text-sm text-muted-foreground">
                        1–2 business days
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </CommonFormField>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default CheckoutForm;
