import type { Metadata } from "next";
import NewsDetailsPageContent from "./page-news-details";

export const metadata: Metadata = {
  title: "Chrono Click - News Details",
  description: "Detailed information about a specific news article.",
};

const NewsDetailsPage = () => {
  return <NewsDetailsPageContent />;
};

export default NewsDetailsPage;