import type { Metadata } from 'next';
import AddressesPageContent from './page-addresses';

export const metadata: Metadata = {
  title: 'Addresses - Chrono Click',
  description: 'Manage your shipping and billing addresses.',
};

const AddressesPage = () => {
  return <AddressesPageContent />;
};

export default AddressesPage;
