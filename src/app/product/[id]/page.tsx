import type { Metadata } from 'next';
import ProductDetailPageContent from './page-product-detail';

export const metadata: Metadata = {
  title: 'Product Details - Chrono Click',
  description: 'View detailed information about our premium products.',
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ Promise in Next.js 15+
}) {
  const { id } = await params;
  return <ProductDetailPageContent productId={id} />;
}
