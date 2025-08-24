import ProductDetails from '@/components/product/product-detail';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import ProductDetailsSkeleton from '@/components/skeletons/product-details-skeleton';
import { ProductType } from '@/api-lib/api-type';
import { fetchProductById } from '@/data/product/product';
import { Suspense } from 'react';

const ProductDetailPageContent = ({ id }: { id: string }) => {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <AsyncProductDetails id={id} />
    </Suspense>
  );
};

const AsyncProductDetails = async ({ id }: { id: string }) => {
  const productData = await fetchProductById<ProductType>(`/products/${id}`, {
    next: { tags: ['products'] },
  });

  if (!productData) return <ErrorResultMessage />;

  return <ProductDetails product={productData} />;
};

export default ProductDetailPageContent;
