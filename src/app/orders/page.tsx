import type { Metadata } from "next";
import OrdersPageContent from "./page-orders";

export const metadata: Metadata = {
  title: "Chrono Click - Orders",
  description: "View and manage your orders.",
};

const OrdersPage = () => {
  return <OrdersPageContent />;
};

export default OrdersPage;