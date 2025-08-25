import { Metadata } from 'next';
import FeaturedProducts from '@/components/main/home/featured-products';
import Review from '@/components/main/home/review';
import Brands from '@/components/main/home/brands';
import { Slider, Banner } from '@/components/main/home';
import Newsletter from '@/components/main/home/news-letter';
import { NewsType } from '@/lib/types/api/new-types';
import { ReviewType } from '@/lib/types/api/review-types';
import { toast } from 'sonner';
import NewsCarousel from '@/components/main/home/news-carousel';
import { fetchNewsData } from '@/data/news/news.server';

export const metadata: Metadata = {
  title: 'Chrono Click - Home',
  description: 'Your ultimate destination for stylish watches and accessories.',
};

const HomePage = async () => {
  const news = await fetchNewsData<NewsType[]>('news', {
    next: { tags: ['news'] },
  });

  const reviews = await fetchNewsData<ReviewType[]>('review', {
    next: { tags: ['review'] },
  });
  if (news.error) {
    toast.error(news.error.message);
  }
  if (reviews.error) {
    toast.error(reviews.error.message);
  }

  const newsItem = news.data ?? [];
  const reviewItem = reviews.data ?? [];
  return (
    <div>
      <Slider />
      <FeaturedProducts />
      <Banner />
      <Review reviews={reviewItem} />
      <NewsCarousel news={newsItem} />
      <Brands />
      <Newsletter />
    </div>
  );
};

export default HomePage;
