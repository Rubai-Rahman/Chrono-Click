'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNewsDetails } from '@/api-lib/news';
import { Breadcrumb } from '@/components/navigation/breadcrumb';

const NewsBreadcrumb = () => {
  const { newsId } = useParams();

  const { data: newsDetails } = useQuery({
    queryKey: ['newsDetails', newsId],
    queryFn: () => fetchNewsDetails(newsId as string),
    enabled: !!newsId,
  });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'News', href: '/news' },
    {
      label: newsDetails?.name || 'Article',
      href: undefined, // Current page, no link
    },
  ];

  return <Breadcrumb items={breadcrumbItems} />;
};

export default NewsBreadcrumb;
