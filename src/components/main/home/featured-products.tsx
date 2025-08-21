// app/components/FeaturedProductsServer.tsx
'use server';
// This is a Server Component
import React, { Suspense } from 'react';
import Container from '@/components/layout/container';
import FeaturedProductSkeleton from '@/components/skeletons/featured-product-skeleton';
import { type ProductsResponse } from '@/api-lib/products';
import Link from 'next/link';
import ProductsGrid from '@/components/product/products-grid';
import { serverFetch } from '@/lib/fetch/serverFetch';

export async function fetchDat2<T>(
  path: string,
  opts?: { next?: { revalidate?: number } }
): Promise<T> {
  return serverFetch<T>(`/products`, {
    method: 'GET',
    next: { revalidate: opts?.next?.revalidate ?? 60 },
  });
}
export default async function FeaturedProductsServer() {
  // DO NOT await — produce a promise and stream it to the child
  const productsPromise: Promise<ProductsResponse> =
    fetchDat2<ProductsResponse>('products');

  return (
    <Container>
      <div className="text-center mb-12 sm:mb-16">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          LATEST WATCHES YOU CAN&apos;T RESIST!
        </h4>
        <h2 className="text-4xl font-bold text-primary">
          Universal Timekeepers of the world
        </h2>
      </div>

      {/* Suspense boundary: header streams first, ProductsGrid streams next */}
      <Suspense fallback={<FeaturedProductSkeleton />}>
        <ProductsGrid productsPromise={Promise.resolve(productsPromise)} />
      </Suspense>

      <div className="flex justify-center mt-8">
        <Link
          prefetch={false}
          href="/products"
          className="px-8 py-4 sm:px-10 sm:py-5 border border-primary hover:bg-primary text-foreground transition-colors duration-300 rounded-lg"
        >
          Explore
        </Link>
      </div>
    </Container>
  );
}
