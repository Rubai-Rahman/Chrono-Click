import { ReviewableProductType } from '@/app/dashboard/review/page-review';

export const sampleReviewableProducts: ReviewableProductType[] = [
  {
    _id: '1',
    name: 'Premium Wireless Headphones',
    img: '/default.webp',
    price: 299.99,
    orderId: 'ORD-2024-001',
    orderDate: '2024-01-15T10:30:00Z',
    hasReview: true,
    reviewId: 'rev-1',
  },
  {
    _id: '2',
    name: 'Smart Fitness Watch',
    img: '/default.webp',
    price: 199.99,
    orderId: 'ORD-2024-002',
    orderDate: '2024-01-20T14:15:00Z',
    hasReview: false,
  },
  {
    _id: '4',
    name: 'Ergonomic Office Chair',
    img: '/default.webp',
    price: 449.99,
    orderId: 'ORD-2024-003',
    orderDate: '2024-01-25T09:45:00Z',
    hasReview: false,
  },
];

export const getMockReviewableProducts = (): ReviewableProductType[] => {
  return sampleReviewableProducts;
};
