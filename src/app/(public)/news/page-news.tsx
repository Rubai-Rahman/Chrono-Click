import { fetchPages } from '@/api-lib/products';
import Container from '@/components/layout/container';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

const NewsPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page') || '0');
  const size = 16;

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', page, size],
    queryFn: () => fetchPages(page, size, 'news'),
    placeholderData: (previousData) => previousData,
  });
  return (
    <Container>
      <h1 className="text-3xl font-bold">Latest News</h1>
      <p className="mt-4">Check out our recent articles and updates.</p>
    </Container>
  );
};

export default NewsPageContent;
