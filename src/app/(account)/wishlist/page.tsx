import type { Metadata } from 'next';
import WishlistPageContent from './page-wishlist';

export const metadata: Metadata = {
  title: 'Wishlist - Chrono Click',
  description: 'Items you want to buy later.',
};

const WishlistPage = () => {
  return <WishlistPageContent />;
};

export default WishlistPage;
