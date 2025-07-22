import type { Metadata } from 'next';
import ProductDetailPageContent from './page-product-detail';

export const metadata: Metadata = {
  title: 'Product Details - Chrono Click',
  description: 'View detailed information about our premium products.',
};

export default function ProductPage() {
  return <ProductDetailPageContent />;
}
