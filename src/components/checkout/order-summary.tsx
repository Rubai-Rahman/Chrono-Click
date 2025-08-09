'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Package, Truck, Gift } from 'lucide-react';
import Image from 'next/image';

const OrderSummary = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const subtotal = isHydrated ? totalPrice() : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isHydrated) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-3">
            <div className="h-16 bg-muted rounded-lg"></div>
            <div className="h-16 bg-muted rounded-lg"></div>
            <Separator />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4">
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
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Free Shipping Banner */}
        {subtotal < 100 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <Gift className="size-4 text-amber-600" />
              <span className="text-amber-800 dark:text-amber-200">
                Add {formatPrice(100 - subtotal)} more for free shipping!
              </span>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <Truck className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Shipping</span>
            </div>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                formatPrice(shipping)
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">{formatPrice(total)}</span>
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
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
