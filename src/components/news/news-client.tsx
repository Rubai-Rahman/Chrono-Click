'use client';

import News from './news';
import { NewsType } from '@/lib/types/api/new-types';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Container from '../layout/container';

interface NewsProps {
  news: NewsType[];
  totalPages: number;
  currentPage: number;
  sort: string;
  size: number;
}

const NewsClientWrapper = ({
  news,
  totalPages,
  currentPage,
  sort,
  size,
}: NewsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentSize, setCurrentSize] = useState(size);
  const [currentSort, setCurrentSort] = useState(sort);

  // Update local state when props change (from server)
  useEffect(() => {
    setCurrentSize(size);
    setCurrentSort(sort);
  }, [size, sort]);

  const onPageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    // newPage is 0-indexed, but we store it as 1-indexed in URL
    params.set('page', (newPage + 1).toString());
    router.push(`/news?${params.toString()}`);
  };

  const onSizeChange = (newSize: string) => {
    const newSizeNum = parseInt(newSize, 10);
    setCurrentSize(newSizeNum);
    const params = new URLSearchParams(searchParams);
    params.set('size', newSizeNum.toString());
    params.set('page', '1'); // Reset to first page when changing page size
    router.push(`/news?${params.toString()}`);
  };

  const onSortChange = (newSort: string) => {
    setCurrentSort(newSort);
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    params.set('page', '1'); // Reset to first page when changing sort
    router.push(`/news?${params.toString()}`);
  };

  return (
    <Container>
      <News
        news={news}
        totalPages={totalPages}
        currentPage={currentPage - 1}
        onPageChange={onPageChange}
        onSizeChange={onSizeChange}
        onSortChange={onSortChange}
        currentSize={currentSize}
        currentSort={currentSort}
      />
    </Container>
  );
};

export default NewsClientWrapper;
