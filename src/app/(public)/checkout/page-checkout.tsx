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
import { TAddress } from '@/lib/types/api/address-types';
import { ApiResult } from '@/lib/fetch';

export default function CheckoutPageContent({
  addresses,
}: {
  addresses: ApiResult<TAddress[]>;
}) {
  const formId = 'checkout-form';
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isPending, setTransition] = useTransition();
  const router = useRouter();
  // Get cart items and calculate order summary values
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleOrder = (data: CheckoutFormData) => {
    const orderData: OrderData = {
      orderInfo: data,
      orderItems: items.map((item) => ({
        productId: item._id,
        quantity: item.quantity ?? 1,
      })),
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
            addresses={addresses.data ?? []}
          />
        </div>

        {/* Order summary */}
        <div>
          <OrderSummary
            formId={formId}
            isPending={isPending}
            items={items}
            shippingMethod={shippingMethod}
          />
        </div>
      </div>
    </div>
  );
}
