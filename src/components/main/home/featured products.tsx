'use client';
import React from 'react';
import Product from '../../products/product';
import { useQuery } from '@tanstack/react-query';
import { fetchData, ProductsResponse } from '@/api-lib/products';
import {
  ErrorResultMessage,
  NotFoundMessage,
} from '@/components/ui/data-result-message';
import FeaturedProductSkeleton from '@/components/skeletons/featured-product-skeleton';
import Link from 'next/link';

const FeaturedProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchData<ProductsResponse>('products'),
  });

  if (isLoading) return <FeaturedProductSkeleton />;
  if (isError) return <ErrorResultMessage />;
  if (!products) return <NotFoundMessage />;

  const random = products.products.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <>
      <div className="text-center py-8">
        <h4 className="text-lg font-semibold text-foreground">
          LATEST WATCHES YOU CAN&apos;T RESIST!
        </h4>
        <h2 className="text-4xl font-bold text-primary mt-2">
          Universal Timekeepers of the world
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {random.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <Link
          href="/shop"
          className="px-6 md:px-9 lg:px-9 py-3 md:py-4 border border-primary hover:bg-primary text-foreground transition-colors duration-300"
        >
          Explore
        </Link>
      </div>
    </>
  );
};

export default FeaturedProducts;
