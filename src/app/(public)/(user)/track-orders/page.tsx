import { TrackOrderPageContent } from './page-track-order';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Order',
  description: 'Track your order',
};
const TrackOrderPage = () => {
  return <TrackOrderPageContent />;
};

export default TrackOrderPage;
