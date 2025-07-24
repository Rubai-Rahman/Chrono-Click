'use client';
import React from 'react';
import Product from '../../product/product';
import { useQuery } from '@tanstack/react-query';
import { fetchData, ProductsResponse } from '@/api-lib/products';
import {
  ErrorResultMessage,
  NotFoundMessage,
} from '@/components/ui/data-result-message';
import FeaturedProductSkeleton from '@/components/skeletons/featured-product-skeleton';
import PageWrapper from '@/components/layout/page-wrapper';
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

  const random = products.products.sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <div>
      <div className="text-center mb-12 sm:mb-16">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          LATEST WATCHES YOU CAN&apos;T RESIST!
        </h4>
        <h2 className="text-4xl font-bold text-primary">
          Universal Timekeepers of the world
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-col-6 gap-4 justify-items-center mb-12 sm:mb-16">
        {random.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="/shop"
          className="px-8 py-4 sm:px-10 sm:py-5 border border-primary hover:bg-primary text-foreground transition-colors duration-300 rounded-lg"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
