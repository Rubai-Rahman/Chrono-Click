import type { Metadata } from 'next';
import NewsDetailsPageContent from './page-news-details';

export const metadata: Metadata = {
  title: 'News Article - Chrono Click',
  description: 'Read the latest news and updates about Chrono Click.',
  keywords: [
    'chrono click',
    'news',
    'updates',
    'chronograph news',
    'watch trends',
    'timepiece expert',
  ],
};

const NewsDetailsPage = () => {
  return <NewsDetailsPageContent />;
};

export default NewsDetailsPage;
