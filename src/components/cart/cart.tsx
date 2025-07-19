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
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart className="hover:text-primary hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review items in your shopping cart.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.img} // ✅ fixed
                    alt={item.name}
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity || 1} x ${item.price}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item._id)} // ✅ fixed
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-6 border-t pt-4 space-y-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
