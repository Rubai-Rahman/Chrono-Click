'use client';
import { useState } from 'react';
import Product from '@/components/main/home/product';
import { useQuery } from '@tanstack/react-query';
import { fetchPages } from '@/api-lib/products';
import { notFound } from 'next/navigation';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import ProductSkeleton from '@/components/skeletons/product-skeleton';

const ShopPageContent = () => {
  const [page, setPage] = useState<number>(0);
  const size: number = 12;

  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['products', page, size],
    queryFn: () => fetchPages(page, size, 'products'),
    placeholderData: (previousData) => previousData,
  });

  if (isPending) return <ProductSkeleton />;
  if (isError) return <ErrorResultMessage />;
  if (!products) return notFound();

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
          {products.products.map((product) => (
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
