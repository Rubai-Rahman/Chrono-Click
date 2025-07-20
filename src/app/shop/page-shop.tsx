'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPages } from '@/api-lib/products';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import ProductSkeleton from '@/components/skeletons/product-skeleton';
import Shop from '@/components/shop/shop';

const ShopPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page') || '0');
  const size = 12;

  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['products', page, size],
    queryFn: () => fetchPages(page, size, 'products'),
    placeholderData: (previousData) => previousData,
  });

  if (isPending) return <ProductSkeleton />;
  if (isError) return <ErrorResultMessage />;
  if (!products) return notFound();

  const totalPages = Math.ceil(products.count / size);

  // page change handler: update URL with new page param
  const onPageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return; // boundary check
    router.push(`/shop?page=${newPage}`);
  };

  return (
    <Shop
      products={products.products}
      totalPages={totalPages}
      currentPage={page}
      onPageChange={onPageChange}
    />
  );
};

export default ShopPageContent;
