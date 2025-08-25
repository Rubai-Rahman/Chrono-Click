import React, { Suspense, use } from 'react';
import Container from '@/components/layout/container';
import FeaturedProductSkeleton from '@/components/skeletons/featured-product-skeleton';
import { fetchFeaturedProducts } from '@/data/product/product';
import Product from '@/components/product/product';
import { ProductsResponse } from '@/lib/types/api/product-types';
import { ErrorResultMessage } from '@/components/ui/data-result-message';

type ProductsResult = {
  success: boolean;
  data: ProductsResponse | null;
  error: { message: string; status: number } | null;
};

export default function FeaturedProductsServer() {
  const featuredPromise = fetchFeaturedProducts<ProductsResponse>(
    'products?isFeatured=true&limit=4'
  );

  const latestPromise = fetchFeaturedProducts<ProductsResponse>(
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
  featuredPromise: Promise<ProductsResult>;
  latestPromise: Promise<ProductsResult>;
}) {
  const featuredRes = use(featuredPromise);
  const latestRes = use(latestPromise);

  if (!featuredRes.success || !featuredRes.data) return <ErrorResultMessage />;
  if (!latestRes.success || !latestRes.data) return <ErrorResultMessage />;

  const combined = [...featuredRes.data.products];
  for (const p of latestRes.data.products) {
    if (combined.length >= 4) break;
    if (!combined.some((fp) => fp.id === p.id)) combined.push(p);
  }

  return (
    <div className="responsive-grid">
      {combined.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
