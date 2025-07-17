import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product, ProductsResponse } from "@/api-lib/products";

const useProducts = (page: number = 0, size: number = 10) => {
  const { data, isLoading, isError, error } = useQuery<ProductsResponse, Error>({
    queryKey: ["products", page, size],
    queryFn: () => fetchProducts(page, size),
    keepPreviousData: true, // Optional: to keep data while fetching new page
  });

  const products = data?.products || [];
  const pageCount = data ? Math.ceil(data.count / size) : 0;

  return {
    products,
    pageCount,
    isLoading,
    isError,
    error,
  };
};

export default useProducts;