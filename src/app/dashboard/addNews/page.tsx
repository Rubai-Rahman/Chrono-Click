import type { Metadata } from "next";
import AddNewsPageContent from "./page-addNews";

export const metadata: Metadata = {
  title: "Chrono Click - Add News",
  description: "Add a new news article to the Chrono Click website.",
};

const AddNewsPage = () => {
  return <AddNewsPageContent />;
};

export default AddNewsPage;