import type { Metadata } from "next";
import ManageOrdersPageContent from "./page-manageOrders";

export const metadata: Metadata = {
  title: "Chrono Click - Manage Orders",
  description: "Manage all customer orders.",
};

const ManageOrdersPage = () => {
  return <ManageOrdersPageContent />;
};

export default ManageOrdersPage;