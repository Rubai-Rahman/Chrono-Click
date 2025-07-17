import type { Metadata } from "next";
import AddProductPageContent from "./page-addProduct";

export const metadata: Metadata = {
  title: "Chrono Click - Add Product",
  description: "Add a new product to the Chrono Click store.",
};

const AddProductPage = () => {
  return <AddProductPageContent />;
};

export default AddProductPage;