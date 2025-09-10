// app/(public)/(user)/addresses/page.tsx
import type { Metadata } from 'next';
import { AddressesPageContent } from './page-addresses';
import { fetchAllAddresses } from '@/data/address';

export const metadata: Metadata = {
  title: 'Addresses - Chrono Click',
  description: 'Manage your shipping and billing addresses.',
};

const AddressesPage = async () => {
  const addresses = await fetchAllAddresses();
  return <AddressesPageContent addresses={addresses} />;
};

export default AddressesPage;
