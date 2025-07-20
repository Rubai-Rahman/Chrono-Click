import type { Metadata } from 'next';
import ShopPageContent from './page-shop';

export const metadata: Metadata = {
  title: 'Chrono Click - Shop',
  description: 'Browse our collection of stylish watches.',
};

const ShopPage = () => {
  return <ShopPageContent />;
};

export default ShopPage;
