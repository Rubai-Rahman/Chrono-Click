"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/Contexts/AuthProvider/AuthProvider"; // Updated import path

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number;
    img: string;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { _id, name, price, img } = product;
  const router = useRouter();

  const handleDetails = () => {
    router.push(`/products/${_id}`);
  };

  const { state: { cart }, dispatch } = useAuth(); // Assuming useAuth returns state and dispatch

  return (
    <div className="w-full p-2">
      <div className="product shadow-lg p-3 mb-5 rounded-lg flex flex-col items-center">
        <Image src={img} alt={name} width={200} height={200} className="object-cover" />
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-700 mb-4">Price: ${price}</p>
          <div className="flex justify-center space-x-4">
            <button onClick={handleDetails} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Details
            </button>
            {cart.some((p: any) => p._id === product._id) ? (
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                  });
                }}
              >
                Remove
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                  });
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;