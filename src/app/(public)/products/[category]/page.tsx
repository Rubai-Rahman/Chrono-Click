import ProductsPageContent from './page-products';

interface PageProps {
  params: { category: string };
  searchParams?: { page?: string; sort?: string; size?: string };
}

const ProductPage = async ({ params, searchParams }: PageProps) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const category = resolvedParams.category;
  const page = resolvedSearchParams?.page || '1';
  const sort = resolvedSearchParams?.sort;
  const size = resolvedSearchParams?.size;

  return (
    <ProductsPageContent
      category={category}
      page={page}
      searchParams={{ sort, size }}
    />
  );
};

export default ProductPage;
