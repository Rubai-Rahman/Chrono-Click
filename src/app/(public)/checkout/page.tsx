import type { Metadata } from 'next';
import CheckoutPageContent from './page-checkout';

export const metadata: Metadata = {
  title: 'Check Out - Chrono Click',
  description:
    "Get in touch with Chrono Click for inquiries about premium timepieces, customer support, or any questions about luxury watches. We're here to help.",
};

const CheckoutPage = async () => {
  return <CheckoutPageContent />;
};

export default CheckoutPage;
