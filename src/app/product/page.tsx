import type { Metadata } from 'next';
import ProductPageContent from './page-product';

export const metadata: Metadata = {
  title: 'Chrono Click - Products',
  description:
    'Discover our carefully curated collection of premium products designed to enhance your lifestyle.',
};

const ProductsPage = () => {
  return <ProductPageContent />;
};

export default ProductsPage;
