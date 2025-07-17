import type { Metadata } from "next";
import PaymentPageContent from "./page-payment";

export const metadata: Metadata = {
  title: "Chrono Click - Payment",
  description: "Payment options for your orders.",
};

const PaymentPage = () => {
  return <PaymentPageContent />;
};

export default PaymentPage;
