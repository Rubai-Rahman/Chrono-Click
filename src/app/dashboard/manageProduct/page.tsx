import type { Metadata } from "next";
import ManageProductPageContent from "./page-manageProduct";

export const metadata: Metadata = {
  title: "Chrono Click - Manage Products",
  description: "Manage all products in the Chrono Click store.",
};

const ManageProductPage = () => {
  return <ManageProductPageContent />;
};

export default ManageProductPage;