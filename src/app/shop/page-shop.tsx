'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPages } from '@/api-lib/products';
import { notFound } from 'next/navigation';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import ProductSkeleton from '@/components/skeletons/product-skeleton';
import Shop from '@/components/shop/shop';

const ShopPageContent = () => {
  const [page, setPage] = useState<number>(0);
  const size: number = 12;

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
  return <Shop products={products.products} totalPages={totalPages} currentPage={page} onPageChange={setPage} />;
};

export default ShopPageContent;
