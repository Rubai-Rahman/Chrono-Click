import type { Metadata } from 'next';
import PaymentPageContent from './page-payment';

export const metadata: Metadata = {
  title: 'Payment - Chrono Click',
  description: 'Complete your payment securely.',
};

const PaymentPage = () => {
  return <PaymentPageContent />;
};

export default PaymentPage;
