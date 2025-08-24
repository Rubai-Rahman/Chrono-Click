import ProductDetails from '@/components/product/product-detail';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import { ProductType } from '@/lib/types/api/product-types';

import { fetchProductById } from '@/data/product/product';

const ProductDetailPageContent = async ({ id }: { id: string }) => {
  const productData = await fetchProductById<ProductType>(`/products/${id}`, {
    next: { tags: ['products'] },
  });

  if (!productData) return <ErrorResultMessage />;

  return <ProductDetails product={productData} />;
};

export default ProductDetailPageContent;
