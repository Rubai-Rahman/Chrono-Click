'use client';

import { useState, useTransition } from 'react';
import OrderSummary from '@/components/checkout/order-summary';
import CheckoutForm, {
  CheckoutFormData,
} from '@/components/checkout/checkout-form';
import { useCartStore } from '@/store/useCartStore';
import { checkoutAction } from '@/app/actions/checkoutAction';
import { OrderData } from '@/data/order';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CheckoutPageContent() {
  const formId = 'checkout-form';
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isPending, setTransition] = useTransition();
  const router = useRouter();
  // Get cart items and calculate order summary values
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const shipping = shippingMethod === 'express' ? 15.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const orderSummary = { subtotal, shipping, tax, total };

  const handleOrder = (data: CheckoutFormData) => {
    const orderData: OrderData = {
      orderInfo: data,
      orderItems: items.map((item) => ({
        productId: item._id,
        quantity: item.quantity ?? 1,
        price: item.price,
      })),
      orderSummary,
    };

    setTransition(async () => {
      const res = await checkoutAction(orderData);
      if (res.success) {
        toast.success('Order placed successfully');
        clearCart();
        router.push('/checkout/order-success');
      }
      toast.error(res.error?.message);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout form */}
        <div>
          <CheckoutForm
            formId={formId}
            shippingMethod={shippingMethod}
            onShippingMethodChange={setShippingMethod}
            handleOrder={handleOrder}
          />
        </div>

        {/* Order summary */}
        <div>
          <OrderSummary
            formId={formId}
            isPending={isPending}
            items={items}
            orderSummary={orderSummary}
            shippingMethod={shippingMethod}
          />
        </div>
      </div>
    </div>
  );
}
