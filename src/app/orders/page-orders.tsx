"use client"; // This component uses client-side hooks

import React, { useEffect, useState } from "react";
import { useAuth } from "@/Contexts/AuthProvider/AuthProvider"; // Updated import path
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Minus, Trash2 } from "lucide-react"; // Using lucide-react
import { useMutation, useQuery } from "@tanstack/react-query";
import { placeOrder, CartProduct } from "@/api-lib/orders";

const OrdersPageContent = () => {
  const {
    user,
    state: { cart },
    dispatch,
  } = useAuth();
  const router = useRouter();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acc: number, curr: CartProduct) => acc + Number(curr.price * curr.qty), 0)
    );
  }, [cart]);

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      dispatch({ type: "CLEAR_CART" }); // Clear Cart
      router.push("/payment"); // Navigate to payment page
    },
    onError: (error) => {
      console.error("Error placing order:", error);
    },
  });

  const handleOrder = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (user?.email) {
      orderMutation.mutate({ email: user.email, cart });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cart.map((product: CartProduct) => (
              <li key={product._id} className="p-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 mr-4 flex-shrink-0">
                    <Image src={product.img} alt={product.name} width={64} height={64} className="object-cover rounded" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-600">Price: ${product.price * product.qty}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                      onClick={() =>
                        dispatch({
                          type: "INCREASE_CART_QTY",
                          payload: {
                            _id: product._id,
                            qty: product.qty,
                          },
                        })
                      }
                    >
                      <Plus size={16} />
                    </button>
                    <span>{product.qty}</span>
                    <button
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                      onClick={() =>
                        dispatch({
                          type: "DECREASE_CART_QTY",
                          payload: {
                            _id: product._id,
                            qty: product.qty,
                          },
                        })
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <Trash2
                      className="text-red-500 cursor-pointer text-lg"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product,
                        })
                      }
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 flex justify-between items-center bg-gray-50">
            <span className="text-lg font-semibold">Subtotal ({cart.length}) items</span>
            <span className="text-xl font-bold">Total: $ {total.toFixed(2)}</span>
            <button onClick={handleOrder} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPageContent;