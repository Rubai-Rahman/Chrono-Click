'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api-lib/products';
import ProductDetail from '@/components/product/product-detail';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import ProductDetailsSkeleton from '@/components/skeletons/product-details-skeleton';
import { ProductType } from '@/api-lib/api-type';

const ProductDetailPageContent = ({ productId }: { productId: string }) => {
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchData<ProductType>(`products/${productId}`),
    enabled: !!productId,
  });
 
  console.log('productId', productId);
  if (isLoading) return <ProductDetailsSkeleton />;

  if (isError || !productData) return <ErrorResultMessage />;

  return <ProductDetail product={productData} />;
};

export default ProductDetailPageContent;
