import { fetchNewsDetails } from '@/data/news/news.server';
import NewsDetailsPageContent from './page-news-details';
import { Suspense } from 'react';
import NewsDetailsSkeleton from '@/components/skeletons/news-details-skeleton';

export async function generateMetadata({
  params,
}: {
  params: { newsId: string };
}) {
  const { newsId } = params;

  try {
    const data = await fetchNewsDetails(newsId);
    return {
      title: data.name,
      description: data.details,
      openGraph: {
        title: data.name,
        description: data.details,
        images: data.img ? [{ url: data.img }] : [],
      },
    };
  } catch {
    return {
      title: 'News not found',
      description: 'This news article does not exist',
    };
  }
}

const NewsDetailsPage = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  return (
    <Suspense fallback={<NewsDetailsSkeleton />}>
      <NewsDetailsPageContent newsId={newsId} />
    </Suspense>
  );
};

export default NewsDetailsPage;
