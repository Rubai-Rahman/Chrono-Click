'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api-lib/products';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import ReviewSkeleton from '@/components/skeletons/review-skeleton';
import ReviewManager from '@/components/dashboard/review-manager';

export type ReviewableProductType = {
  _id: string;
  name: string;
  img: string;
  price: number;
  orderId: string;
  orderDate: string;
  hasReview: boolean;
  reviewId?: string;
};

const ReviewPageContent = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['reviewableProducts'],
    queryFn: () => fetchData<ReviewableProductType[]>('reviews/products'),
  });

  if (isLoading) return <ReviewSkeleton />;
  if (isError) return <ErrorResultMessage />;
  if (!products) return <ErrorResultMessage />;

  return <ReviewManager products={products} />;
};

export default ReviewPageContent;
