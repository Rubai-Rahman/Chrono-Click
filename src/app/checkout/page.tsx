import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - Chrono Click',
  description: 'Complete your purchase',
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout form will go here */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          {/* Add checkout form */}
        </div>

        {/* Order summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {/* Add order summary */}
        </div>
      </div>
    </div>
  );
}
