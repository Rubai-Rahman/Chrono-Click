"use client"; // This component uses client-side hooks

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetails, ProductDetailsItem } from "@/api-lib/products";

const ProductDetailsPageContent = () => {
  const { productId } = useParams();
  const { 
    state: { cart },
    dispatch,
  } = useAuth();

  const { data: proDetails, isLoading, isError, error } = useQuery<ProductDetailsItem, Error>({
    queryKey: ["productDetails", productId],
    queryFn: () => fetchProductDetails(productId as string),
    enabled: !!productId, // Only run query if productId is available
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Error: {error?.message}</div>;
  }

  if (!proDetails) {
    return <div className="text-center py-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="bg-white shadow-lg p-3 rounded-lg">
            <Image src={proDetails.img} alt={proDetails.name} width={500} height={500} className="w-full h-auto object-cover" />
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white shadow-lg p-5 rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{proDetails.name}</h1>
            <p className="text-xl text-gray-700 mb-4">Price: ${proDetails.price}</p>
            <p className="text-gray-800 mb-6">{proDetails.details}</p>

            <div className="flex space-x-4">
              {cart.some((p: any) => p._id === proDetails._id) ? (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: proDetails,
                    });
                  }}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: proDetails,
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
    </div>
  );
};

export default ProductDetailsPageContent;
