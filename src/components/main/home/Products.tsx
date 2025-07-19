'use client';
import React from 'react';
import Link from 'next/link';
import useProducts from '@/hooks/useProducts'; // Updated import path
import Product from './product'; // Updated import path

const Products = () => {
  const { products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  const random = products.sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <>
      <div className="text-center py-8">
        <h4 className="text-lg font-semibold text-gray-600">
          LATEST WATCHES YOU CAN&apos;T RESIST!
        </h4>
        <h2 className="text-4xl font-bold text-gray-800 mt-2">
          Universal Timekeepers of the world
        </h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {random.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/shop"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md"
          >
            Explore
          </Link>
        </div>
      </div>
    </>
  );
};

export default Products;
