'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/useCartStore';
import {
  CreditCard,
  Lock,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const PaymentForm = () => {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    },
    shippingAddress: {
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    },
  });

  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'paypal' | 'stripe'
  >('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const processPaymentMutation = useMutation({
    mutationFn: async (data: PaymentData) => {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock payment API call
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          amount: getTotalPrice(),
          items: cart,
          paymentMethod,
        }),
      });

      if (!response.ok) throw new Error('Payment failed');
      return response.json();
    },
    onSuccess: () => {
      setPaymentSuccess(true);
      clearCart();
      setTimeout(() => {
        router.push('/dashboard/myOrders');
      }, 3000);
    },
  });

  const handleInputChange = (
    field: string,
    value: string,
    section?: string
  ) => {
    if (section) {
      setPaymentData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof PaymentData],
          [field]: value,
        },
      }));
    } else {
      setPaymentData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const finalData = {
      ...paymentData,
      shippingAddress: sameAsBilling
        ? {
            name: paymentData.cardholderName,
            ...paymentData.billingAddress,
          }
        : paymentData.shippingAddress,
    };

    processPaymentMutation.mutate(finalData);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (cart.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-primary" />
            Payment
          </h1>
          <p className="text-muted-foreground mt-2">
            Complete your secure payment
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mb-6">
              Add some products to your cart before proceeding to payment.
            </p>
            <Button asChild>
              <a href="/product">Continue Shopping</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="space-y-8">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
              Payment Successful!
            </h3>
            <p className="text-green-700 dark:text-green-300 text-center mb-6">
              Your order has been placed successfully. You will be redirected to
              your orders page shortly.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <a href="/product">Continue Shopping</a>
              </Button>
              <Button asChild>
                <a href="/dashboard/myOrders">View Orders</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-primary" />
          Secure Checkout
        </h1>
        <p className="text-muted-foreground mt-2">
          Complete your payment securely with SSL encryption
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="text-sm font-medium">Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    P
                  </div>
                  <span className="text-sm font-medium">PayPal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'stripe'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    S
                  </div>
                  <span className="text-sm font-medium">Stripe</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Card Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cardholder Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={paymentData.cardholderName}
                      onChange={(e) =>
                        handleInputChange('cardholderName', e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) =>
                        handleInputChange(
                          'cardNumber',
                          formatCardNumber(e.target.value)
                        )
                      }
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) =>
                          handleInputChange(
                            'expiryDate',
                            formatExpiryDate(e.target.value)
                          )
                        }
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVV
                      </label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) =>
                          handleInputChange(
                            'cvv',
                            e.target.value.replace(/\D/g, '')
                          )
                        }
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Street Address"
                  value={paymentData.billingAddress.street}
                  onChange={(e) =>
                    handleInputChange(
                      'street',
                      e.target.value,
                      'billingAddress'
                    )
                  }
                  required
                />
                <Input
                  placeholder="City"
                  value={paymentData.billingAddress.city}
                  onChange={(e) =>
                    handleInputChange('city', e.target.value, 'billingAddress')
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="State"
                  value={paymentData.billingAddress.state}
                  onChange={(e) =>
                    handleInputChange('state', e.target.value, 'billingAddress')
                  }
                  required
                />
                <Input
                  placeholder="ZIP Code"
                  value={paymentData.billingAddress.zipCode}
                  onChange={(e) =>
                    handleInputChange(
                      'zipCode',
                      e.target.value,
                      'billingAddress'
                    )
                  }
                  required
                />
                <Input
                  placeholder="Country"
                  value={paymentData.billingAddress.country}
                  onChange={(e) =>
                    handleInputChange(
                      'country',
                      e.target.value,
                      'billingAddress'
                    )
                  }
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sameAsBilling"
                  checked={sameAsBilling}
                  onChange={(e) => setSameAsBilling(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="sameAsBilling" className="text-sm">
                  Same as billing address
                </label>
              </div>

              {!sameAsBilling && (
                <>
                  <Input
                    placeholder="Full Name"
                    value={paymentData.shippingAddress.name}
                    onChange={(e) =>
                      handleInputChange(
                        'name',
                        e.target.value,
                        'shippingAddress'
                      )
                    }
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Street Address"
                      value={paymentData.shippingAddress.street}
                      onChange={(e) =>
                        handleInputChange(
                          'street',
                          e.target.value,
                          'shippingAddress'
                        )
                      }
                      required
                    />
                    <Input
                      placeholder="City"
                      value={paymentData.shippingAddress.city}
                      onChange={(e) =>
                        handleInputChange(
                          'city',
                          e.target.value,
                          'shippingAddress'
                        )
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="State"
                      value={paymentData.shippingAddress.state}
                      onChange={(e) =>
                        handleInputChange(
                          'state',
                          e.target.value,
                          'shippingAddress'
                        )
                      }
                      required
                    />
                    <Input
                      placeholder="ZIP Code"
                      value={paymentData.shippingAddress.zipCode}
                      onChange={(e) =>
                        handleInputChange(
                          'zipCode',
                          e.target.value,
                          'shippingAddress'
                        )
                      }
                      required
                    />
                    <Input
                      placeholder="Country"
                      value={paymentData.shippingAddress.country}
                      onChange={(e) =>
                        handleInputChange(
                          'country',
                          e.target.value,
                          'shippingAddress'
                        )
                      }
                      required
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={item.img || '/default.webp'}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800 dark:text-green-200">
                  Secured by SSL encryption
                </span>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handleSubmit}
                disabled={isProcessing || processPaymentMutation.isPending}
                className="w-full h-12 text-lg font-semibold"
              >
                {isProcessing || processPaymentMutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Place Order - ${total.toFixed(2)}
                  </>
                )}
              </Button>

              {processPaymentMutation.isError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-800 dark:text-red-200">
                    Payment failed. Please try again.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
