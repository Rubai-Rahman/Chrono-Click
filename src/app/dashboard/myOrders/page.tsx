import type { Metadata } from "next";
import MyOrdersPageContent from "./page-myOrders";

export const metadata: Metadata = {
  title: "Chrono Click - My Orders",
  description: "View your past orders.",
};

const MyOrdersPage = () => {
  return <MyOrdersPageContent />;
};

export default MyOrdersPage;