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

interface PageProps {
  searchParams?: Promise<{ page?: string; sort?: string; size?: string }>;
}
const NewsPage = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams?.page || '1';
  const sort = resolvedSearchParams?.sort;
  const size = resolvedSearchParams?.size;

  return <NewsPageContent page={page} searchParams={{ sort, size }} />;
};

export default NewsPage;
