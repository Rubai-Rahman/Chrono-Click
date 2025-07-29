'use client';

import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { placeOrder } from '@/api-lib/orders';
import { useAuth } from '@/hooks/useAuth';

const OrdersPageContent = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { items, removeFromCart, totalPrice, clearCart } = useCartStore();

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      clearCart();
      router.push('/payment');
    },
    onError: (error) => {
      console.error('Error placing order:', error);
    },
  });

  const handleOrder = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (user?.email) {
      orderMutation.mutate({ email: user.email, cart: items });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {items.map((product) => (
              <li key={product._id} className="p-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 mr-4 flex-shrink-0">
                    <Image
                      src={product.img}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-600">Price: ${product.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Trash2
                      className="text-red-500 cursor-pointer text-lg"
                      onClick={() => removeFromCart(product._id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 flex justify-between items-center bg-gray-50">
            <span className="text-lg font-semibold">
              Subtotal ({items.length}) items
            </span>
            <span className="text-xl font-bold">
              Total: $ {totalPrice().toFixed(2)}
            </span>
            <button
              onClick={handleOrder}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPageContent;
