'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Package, Truck } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

interface OrderSummaryProps {
  formId: string;
  isPending: boolean;
  orderSummary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  items: Array<{
    _id: string;
    name: string;
    price: number;
    quantity?: number;
    img?: string;
    brand?: string;
  }>;
  shippingMethod: string;
}

const OrderSummary = ({
  formId,
  isPending,
  orderSummary,
  items,
  shippingMethod,
}: OrderSummaryProps) => {
  const [mounted, setMounted] = useState(false);
  const { subtotal, shipping, tax, total } = orderSummary;

  const formatPrice = (price: number) => {
    if (!mounted) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Items List */}
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={item.img || '/placeholder.svg?height=60&width=60'}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {item.quantity || 1}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.brand || 'Premium Watch'}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {mounted ? formatPrice(item.price) : '$0.00'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{mounted ? formatPrice(subtotal) : '$0.00'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Shipping</div>
                  <div className="text-xs text-muted-foreground">
                    {shippingMethod === 'express'
                      ? 'Express (1-2 business days)'
                      : 'Standard (3-5 business days)'}
                    {shipping === 0 && ' - Free'}
                  </div>
                </div>
              </div>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : mounted ? (
                  formatPrice(shipping)
                ) : (
                  '$0.00'
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>{mounted ? formatPrice(tax) : '$0.00'}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">
                {mounted ? formatPrice(total) : '$0.00'}
              </span>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-muted/20 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your
                order
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Estimated delivery: 3-5 business days
              </span>
            </div>
          </div>
          <Button
            type="submit"
            loading={isPending}
            disabled={isPending}
            form={formId}
            className="w-full h-12"
          >
            Order Product
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderSummary;
