import type { Metadata } from "next";
import ProductDetailsPageContent from "./page-product-details";

export const metadata: Metadata = {
  title: "Chrono Click - Product Details",
  description: "Detailed information about a specific product.",
};

const ProductDetailsPage = () => {
  return <ProductDetailsPageContent />;
};

export default ProductDetailsPage;