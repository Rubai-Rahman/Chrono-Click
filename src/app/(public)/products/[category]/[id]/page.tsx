import { ProductType } from '@/lib/types/api/product-types';

import { fetchProductById } from '@/data/product/product';
import { Metadata } from 'next';
import ProductDetailPageContent from './page-product-detail';
import ProductDetailsSkeleton from '@/components/skeletons/product-details-skeleton';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { category: string; id: string };
}): Promise<Metadata> {
  const { id } = await params; // just destructure normally
  try {
    const product = await fetchProductById<ProductType>(`/products/${id}`, {
      next: { tags: ['products'] },
    });

    return {
      title: product.data?.name ?? 'Product not found',
      description: product.data?.description ?? 'View product details',
      openGraph: {
        title: product.data?.name,
        description: product.data?.description,
        images: product.data?.img ? [{ url: product.data.img }] : [],
      },
    };
  } catch {
    return {
      title: 'Product not found',
      description: 'This product does not exist',
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { category: string; id: string };
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailPageContent id={id} />;
    </Suspense>
  );
}
