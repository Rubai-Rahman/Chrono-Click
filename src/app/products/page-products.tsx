'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPages } from '@/api-lib/products';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import ProductSkeleton from '@/components/skeletons/product-skeleton';
import Products from '@/components/products/products';

const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page') || '0');
  const size = 12;

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', page, size],
    queryFn: () => fetchPages(page, size, 'products'),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <ProductSkeleton />;
  if (isError) return <ErrorResultMessage />;
  if (!products) return notFound();

  const totalPages = Math.ceil(products.count / size);

  // page change handler: update URL with new page param
  const onPageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return; // boundary check
    router.push(`/shop?page=${newPage}`);
  };

  return (
    <Products
      products={products.products}
      totalPages={totalPages}
      currentPage={page}
      onPageChange={onPageChange}
    />
  );
};

export default ProductsPageContent;
