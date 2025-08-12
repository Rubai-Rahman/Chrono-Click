import type { Metadata } from 'next';
import NewsPageContent from './page-news';

export const metadata: Metadata = {
  title: 'Latest News & Insights - Chrono Click',
  description:
    'Stay updated with the latest trends, innovations, and stories from the world of luxury timepieces. Discover expert insights and industry news.',
  keywords: [
    'watch news',
    'luxury timepiece news',
    'watch industry insights',
    'chronograph news',
    'watch trends',
    'timepiece innovations',
    'luxury watch updates',
    'watch technology news',
  ],
};

const NewsPage = () => {
  return <NewsPageContent />;
};

export default NewsPage;
