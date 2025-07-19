'use client';

import { useCartStore } from '@/store/useCartStore';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Gift,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const subtotal = totalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <div className="relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:scale-110" />
            {items.length > 0 && (
              <>
                {/* Animated pulse ring */}
                <div className="absolute -inset-1 bg-primary/20 rounded-full animate-ping"></div>
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-primary to-primary/80 animate-bounce"
                >
                  {items.length}
                </Badge>
              </>
            )}
          </div>
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[450px] flex flex-col p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b">
          <SheetHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl font-bold">
                  Shopping Cart
                </SheetTitle>
                <SheetDescription className="text-sm">
                  {items.length === 0
                    ? 'Your cart is waiting for some amazing products'
                    : `${items.length} ${
                        items.length === 1 ? 'item' : 'items'
                      } in your cart`}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="size-4 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Discover our amazing collection of premium timepieces and add
                your favorites to get started.
              </p>
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Start Shopping
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map((item, index) => (
                <Card
                  key={item._id}
                  className="group hover:shadow-md transition-all duration-300 border-0 bg-gradient-to-r from-background to-muted/20"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInRight 0.5s ease-out forwards',
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="relative overflow-hidden rounded-lg bg-muted/20">
                        <Image
                          src={
                            item.img || '/placeholder.svg?height=80&width=80'
                          }
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.brand || 'Premium Watch'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(item.price)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-transparent"
                              onClick={() =>
                                updateQuantity?.(
                                  item._id,
                                  Math.max(1, (item.quantity || 1) - 1)
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity || 1}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-transparent"
                              onClick={() =>
                                updateQuantity?.(
                                  item._id,
                                  (item.quantity || 1) + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals and checkout */}
        {items.length > 0 && (
          <div className="border-t bg-gradient-to-t from-muted/20 to-transparent p-6 space-y-4">
            {/* Promo Banner */}
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

            {/* Order Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full h-12 bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group"
              size="lg"
            >
              <CreditCard className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Proceed to Checkout
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
