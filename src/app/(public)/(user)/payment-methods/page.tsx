import type { Metadata } from 'next';
import PaymentMethodsPageContent from './page-payment-methods';

export const metadata: Metadata = {
  title: 'Payment Methods - Chrono Click',
  description: 'Manage your payment methods and billing information.',
};

const PaymentMethodsPage = () => {
  return <PaymentMethodsPageContent />;
};

export default PaymentMethodsPage;
