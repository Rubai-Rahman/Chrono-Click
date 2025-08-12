'use client';

import { fetchNewsPages } from '@/api-lib/news';
import News from './news';
import NewsSkeleton from '@/components/skeletons/news-skeleton';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import { useQuery } from '@tanstack/react-query';
import { notFound, useRouter, useSearchParams } from 'next/navigation';

const NewsClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page') || '0');
  const size = 4;

  const {
    data: newsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['news', page, size],
    queryFn: () => fetchNewsPages(page, size),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <NewsSkeleton />;
  if (isError) return <ErrorResultMessage />;
  if (!newsResponse) return notFound();

  const totalPages = Math.ceil(newsResponse.count / size);

  // page change handler: update URL with new page param
  const onPageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return; // boundary check
    router.push(`/news?page=${newPage}`);
  };

  return (
    <News
      news={newsResponse}
      totalPages={totalPages}
      currentPage={page}
      onPageChange={onPageChange}
    />
  );
};

export default NewsClient;
