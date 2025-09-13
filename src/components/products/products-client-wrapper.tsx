'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Products from '@/components/products/products';
import { ProductType } from '@/lib/types/api/product-types';
import Container from '@/components/layout/container';

interface ProductsClientWrapperProps {
  products: ProductType[];
  totalPages: number;
  currentPage: number;
  category: string;
  size: number;
  sort: string;
}

export const ProductsClientWrapper = ({
  products,
  totalPages,
  currentPage,
  category,
  size,
  sort,
}: ProductsClientWrapperProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentSize, setCurrentSize] = useState(size);
  const [currentSort, setCurrentSort] = useState(sort);

  // Update local state when props change (from server)
  useEffect(() => {
    setCurrentSize(size);
    setCurrentSort(sort);
  }, [size, sort]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (newPage + 1).toString()); // Convert back to 1-based for URL
    router.push(`/products/${category}?${params.toString()}`);
  };

  const handleSizeChange = (newSize: string) => {
    const newSizeNum = parseInt(newSize, 10);
    setCurrentSize(newSizeNum);
    const params = new URLSearchParams(searchParams);
    params.set('size', newSizeNum.toString());
    params.set('page', '1');
    router.push(`/products/${category}?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    setCurrentSort(newSort);
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    params.set('page', '1');
    router.push(`/products/${category}?${params.toString()}`);
  };

  return (
    <Container>
      <div className="text-center mb-8 sm:mb-16 bg-gradient-to-l from-primary/30 to-card p-3 rounded-md ">
        <p className="uppercase text-4xl font-bold">{category} - Collections</p>
      </div>

      <Products
        products={products}
        totalPages={totalPages}
        currentPage={currentPage - 1}
        onPageChange={handlePageChange}
        onSizeChange={handleSizeChange}
        onSortChange={handleSortChange}
        currentSize={currentSize}
        currentSort={currentSort}
      />
    </Container>
  );
};
