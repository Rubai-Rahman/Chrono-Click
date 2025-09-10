import type { Metadata } from 'next';
import { AddressesPageContent } from './page-addresses';
import { fetchAllAddresses } from '@/data/address';
import { TAddress } from '@/lib/types/api/address-types';
import CardSkeleton from '@/components/skeletons/review-skeleton';
import { Suspense } from 'react';
import { ErrorResultMessage } from '@/components/ui/data-result-message';

export const metadata: Metadata = {
  title: 'Addresses - Chrono Click',
  description: 'Manage your shipping and billing addresses.',
};

const AddressesPage = async () => {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <AddressesPageContentWrapper />
    </Suspense>
  );
};

const AddressesPageContentWrapper = async () => {
  const addresses = await fetchAllAddresses<TAddress[]>('address/all');
  if (!addresses) {
    return <ErrorResultMessage />;
  }
  return <AddressesPageContent addresses={addresses} />;
};
export default AddressesPage;
