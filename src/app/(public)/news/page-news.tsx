import NewsClientWrapper from '@/components/news/news-client';
import { fetchNewsPages } from '@/data/news/news.server';

import { ErrorResultMessage } from '@/components/ui/data-result-message';
import { Suspense } from 'react';
import NewsSkeleton from '@/components/skeletons/news-skeleton';

interface PageProps {
  page?: string;
  searchParams?: { sort?: string; size?: string };
}
const NewsPageContent = async ({ page, searchParams }: PageProps) => {
  const sort = searchParams?.sort || 'createdAt_desc';
  const size = parseInt(searchParams?.size || '12', 10);
  const currentPage = parseInt(page || '1', 10);

  const newsData = await fetchNewsPages(currentPage, size, sort, {
    next: { tags: ['news'] },
  });

  if (!newsData) return <ErrorResultMessage />;
  const { data, count } = newsData;
  const totalPages = Math.ceil(count / size);

  return (
    <Suspense fallback={<NewsSkeleton />}>
      <NewsClientWrapper
        news={data}
        totalPages={totalPages}
        currentPage={currentPage}
        sort={sort}
        size={size}
      />
    </Suspense>
  );
};

export default NewsPageContent;
