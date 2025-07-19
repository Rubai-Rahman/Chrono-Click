'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetails, ProductDetailsItem } from '@/api-lib/products';
import { useCartStore } from '@/store/useCartStore';

const ProductDetailsPageContent = () => {
  const { productId } = useParams();
  const {
    items: cart,
    addToCart,
    removeFromCart,
  } = useCartStore((state) => ({
    items: state.items,
    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
  }));

  const {
    data: proDetails,
    isLoading,
    isError,
    error,
  } = useQuery<ProductDetailsItem, Error>({
    queryKey: ['productDetails', productId],
    queryFn: () => fetchProductDetails(productId as string),
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="text-center py-12 text-lg text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600">
        Error: {error?.message}
      </div>
    );
  }

  if (!proDetails) {
    return (
      <div className="text-center py-12 text-gray-600">Product not found.</div>
    );
  }

  const isInCart = cart.some((p) => p._id === proDetails._id);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="bg-white shadow-xl p-4 rounded-lg border">
            <Image
              src={proDetails.img}
              alt={proDetails.name}
              width={500}
              height={500}
              className="w-full h-auto rounded object-contain"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2">
          <div className="bg-white shadow-xl p-6 rounded-lg border space-y-5">
            <h1 className="text-4xl font-semibold text-gray-900">
              {proDetails.name}
            </h1>
            <p className="text-2xl text-primary font-bold">
              ৳{proDetails.price}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {proDetails.details}
            </p>

            <div className="mt-6">
              {isInCart ? (
                <button
                  onClick={() => removeFromCart(proDetails._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded shadow transition duration-200"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => addToCart(proDetails)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow transition duration-200"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPageContent;
