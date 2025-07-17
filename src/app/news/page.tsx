import type { Metadata } from "next";
import NewsPageContent from "./page-news";

export const metadata: Metadata = {
  title: "Chrono Click - News",
  description: "Stay updated with the latest news from Chrono Click.",
};

const NewsPage = () => {
  return <NewsPageContent />;
};

export default NewsPage;