import React, { Suspense, use } from 'react';
import Container from '@/components/layout/container';
import FeaturedProductSkeleton from '@/components/skeletons/featured-product-skeleton';
import { fetchFeaturedData } from '@/data/product/product';
import Product from '@/components/product/product';
import { ProductsResponse } from '@/lib/types/api/product-types';

export default function FeaturedProductsServer() {
  const featuredPromise = fetchFeaturedData<ProductsResponse>(
    'products?isFeatured=true&limit=4'
  );

  const latestPromise = fetchFeaturedData<ProductsResponse>(
    'products?sort=createdAt_desc&limit=4'
  );

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

      {/* Single Suspense boundary for group-level streaming */}
      <Suspense fallback={<FeaturedProductSkeleton />}>
        <ProductsGrid
          featuredPromise={featuredPromise}
          latestPromise={latestPromise}
        />
      </Suspense>
    </Container>
  );
}

function ProductsGrid({
  featuredPromise,
  latestPromise,
}: {
  featuredPromise: Promise<ProductsResponse>;
  latestPromise: Promise<ProductsResponse>;
}) {
  const featuredRes = use(featuredPromise);
  const latestRes = use(latestPromise);

  // Combine featured + latest to always show 4 products
  const combined = [...featuredRes.products];
  for (const p of latestRes.products) {
    if (combined.length >= 4) break;
    if (!combined.find((fp) => fp.id === p.id)) {
      combined.push(p);
    }
  }

  return (
    <div className="responsive-grid">
      {combined.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
