import type { Metadata } from 'next';
import ProductsPageContent from './page-products';

export const metadata: Metadata = {
  title: 'Chrono Click - Shop',
  description: 'Browse our collection of stylish watches.',
};

const ProductPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  return <ProductsPageContent category={category} />;
};

export default ProductPage;
