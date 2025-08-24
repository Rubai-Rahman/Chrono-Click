'use client';

import OrderSummary from '@/components/checkout/order-summary';
import CheckoutForm from '@/components/checkout/checkout-form';

export default function CheckoutPageContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout form */}
        <div>
          <CheckoutForm />
        </div>

        {/* Order summary */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
