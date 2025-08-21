// app/components/ProductsGrid.tsx
import { ProductType } from '@/api-lib/api-type';
import React from 'react';
import Product from './product';

type Props = {
  productsPromise: Promise<{products: ProductType[]}>;
};

export default async function ProductsGrid({ productsPromise }: Props) {
  const productsRes = await productsPromise;
  // defensive: if API returns empty or error, decide fallback
  const products = productsRes?.products ?? [];

  // randomize and slice on server (deterministic each request)
  const random = products
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  return (
    <div className="responsive-grid mb-12 sm:mb-16">
      {random.map((product: ProductType) => (
        // Product can be client component
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}
