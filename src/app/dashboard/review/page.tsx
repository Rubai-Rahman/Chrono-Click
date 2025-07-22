import type { Metadata } from 'next';
import ReviewPageContent from './page-review';

export const metadata: Metadata = {
  title: 'Reviews - Chrono Click',
  description: 'Write and manage your product reviews.',
};

const ReviewPage = () => {
  return <ReviewPageContent />;
};

export default ReviewPage;
