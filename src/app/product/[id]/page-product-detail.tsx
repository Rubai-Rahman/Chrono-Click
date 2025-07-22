'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api-lib/products';
import ProductDetail from '@/components/product/product-detail';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorResultMessage } from '@/components/ui/data-result-message';

export type ProductType = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  img: string;
  details?: string;
  inStock?: boolean;
  category?: string;
  brand?: string;
  rating?: number;
  reviews?: number;
};

const ProductDetailPageContent = () => {
  const params = useParams();
  const productId = params.id as string;

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchData<ProductType>(`products/${productId}`),
    enabled: !!productId,
  });

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-20">
        <ErrorResultMessage />
      </div>
    );
  }

  return <ProductDetail product={product} />;
};

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-12 w-1/3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPageContent;
