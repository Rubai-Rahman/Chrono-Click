import { fetchProductsData } from '@/data/product/product';
import { ProductType } from '@/lib/types/api/product-types';
import { Suspense } from 'react';
import { ProductsClientWrapper } from '../../../../components/products/products-client-wrapper';
import Loading from './loading';

const ProductsPageContent = async ({
  category,
  page,
  searchParams,
}: {
  category: string;
  page?: string;
  searchParams?: { sort?: string; size?: string };
}) => {
  const sort = searchParams?.sort || 'createdAt_desc';
  const size = parseInt(searchParams?.size || '12', 10);
  const currentPage = parseInt(page || '1', 10);

  const productsData = await fetchProductsData<{
    products: ProductType[];
    count: number;
  }>(
    `/products?page=${currentPage}&size=${size}&category=${category}&sort=${sort}`,
    {
      next: { tags: ['products'] },
    }
  );

  const { products, count } = productsData;
  const totalPages = Math.ceil(count / size);

  return (
    <Suspense fallback={<Loading />}>
      <ProductsClientWrapper
        products={products}
        totalPages={totalPages}
        currentPage={currentPage}
        category={category}
        size={size}
        sort={sort}
      />
    </Suspense>
  );
};

export default ProductsPageContent;
