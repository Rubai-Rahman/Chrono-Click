import { Suspense } from 'react';
import { fetchAllAddresses } from '@/data/address';
import { AddressesPageContent } from './page-addresses';
import { Metadata } from 'next';
import CardSkeleton from '@/components/skeletons/review-skeleton';

export const metadata: Metadata = {
  title: 'Addresses - Chrono Click',
  description: 'Manage your shipping and billing addresses.',
};

export default async function Page() {
  const addressesPromise = fetchAllAddresses();

  return (
    <Suspense fallback={<CardSkeleton />}>
      <AddressesPageContent addresses={addressesPromise} />
    </Suspense>
  );
}
