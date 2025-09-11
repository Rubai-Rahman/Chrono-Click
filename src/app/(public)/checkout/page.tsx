import type { Metadata } from 'next';
import CheckoutPageContent from './page-checkout';
import { fetchAllAddresses } from '@/data/address';

export const metadata: Metadata = {
  title: 'Check Out - Chrono Click',
  description:
    "Get in touch with Chrono Click for inquiries about premium timepieces, customer support, or any questions about luxury watches. We're here to help.",
};

const CheckoutPage = async () => {
  const addressesPromise = fetchAllAddresses();
  const addresses = await addressesPromise;
  return <CheckoutPageContent addresses={addresses} />;
};

export default CheckoutPage;
