'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Package,
  Truck,
  Calendar,
  CreditCard,
  ArrowRight,
  Home,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function OrderSuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-2024-005';
  const total = searchParams.get('total') || '249.99';

  // Mock order data - in real app this would come from API
  const orderDetails = {
    id: orderId,
    date: new Date().toISOString().split('T')[0],
    total: Number.parseFloat(total),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // 5 days from now
    items: [
      { name: 'Wireless Earbuds Pro', quantity: 1, price: 199.99 },
      { name: 'Phone Stand', quantity: 1, price: 49.99 },
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
    },
    paymentMethod: '•••• •••• •••• 4242',
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground text-balance">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg text-pretty">
              Thank you for your purchase. Your order has been successfully
              placed and is being processed.
            </p>
          </div>
        </div>

        {/* Order Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">
                  {orderDetails.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  Placed on{' '}
                  {new Date(orderDetails.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  ${orderDetails.total.toFixed(2)}
                </p>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="h-3 w-3" />
                  Confirmed
                </Badge>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Items Ordered</h3>
              <div className="space-y-2">
                {orderDetails.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery & Payment Info */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Delivery Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Estimated delivery:
                </span>
                <span className="font-medium text-foreground">
                  {new Date(orderDetails.estimatedDelivery).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                    }
                  )}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Shipping Address
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>{orderDetails.shippingAddress.name}</p>
                  <p>{orderDetails.shippingAddress.street}</p>
                  <p>
                    {orderDetails.shippingAddress.city},{' '}
                    {orderDetails.shippingAddress.state}{' '}
                    {orderDetails.shippingAddress.zip}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">
                  Payment successful
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Payment Method
                </p>
                <p className="text-sm text-muted-foreground">
                  {orderDetails.paymentMethod}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Total Charged
                </p>
                <p className="text-lg font-bold text-foreground">
                  ${orderDetails.total.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What&apos;s Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-medium text-foreground">
                    Order Processing
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;re preparing your items for shipment. You&apos;ll
                    receive an email confirmation shortly.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2" />
                <div>
                  <p className="font-medium text-foreground">
                    Shipping Notification
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Once shipped, you&apos;ll receive tracking information to
                    monitor your package.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2" />
                <div>
                  <p className="font-medium text-foreground">Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Your order will arrive by{' '}
                    {new Date(
                      orderDetails.estimatedDelivery
                    ).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })}
                    .
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/orders">
              View Order Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="text-center space-y-2 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Need help with your order?{' '}
            <Link
              href="/support"
              className="text-primary hover:underline font-medium"
            >
              Contact Support
            </Link>
          </p>
          <p className="text-xs text-muted-foreground">
            Order confirmation has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
}
