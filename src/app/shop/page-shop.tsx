'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, Product as ProductItem } from '@/api-lib/products';
import Product from '@/components/main/home/product';

const ShopPageContent = () => {
  const [page, setPage] = useState<number>(0);
  const size: number = 12;

  const { data, isLoading, isError, error } = useQuery<
    {
      products: ProductItem[];
      count: number;
    },
    Error
  >({
    queryKey: ['shopProducts', page, size],
    queryFn: () => fetchProducts(page, size),
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const pageCount = data ? Math.ceil(data.count / size) : 0;

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <h4 className="text-lg font-semibold text-gray-600">
          LATEST WATCHES YOU CAN&apos;T RESIST!
        </h4>
        <h2 className="text-4xl font-bold text-gray-800 mt-2">
          Find Your Watch
        </h2>
        <div className="flex justify-center my-4">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <>
      <div className="text-center py-8">
        <h4 className="text-lg font-semibold text-gray-600">
          LATEST WATCHES YOU CAN&apos;T RESIST!
        </h4>
        <h2 className="text-4xl font-bold text-gray-800 mt-2">
          Find Your Watch
        </h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={`px-4 py-2 rounded-md ${
              number === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ShopPageContent;
