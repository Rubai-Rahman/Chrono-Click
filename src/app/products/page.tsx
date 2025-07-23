import type { Metadata } from 'next';
import ProductsPageContent from './page-products';

export const metadata: Metadata = {
  title: 'Chrono Click - Shop',
  description: 'Browse our collection of stylish watches.',
};

const ShopPage = () => {
  return <ProductsPageContent />;
};

export default ShopPage;
