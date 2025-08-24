import { Metadata } from 'next';
import FeaturedProducts from '@/components/main/home/featured-products';
import Review from '@/components/main/home/review';
import Brands from '@/components/main/home/brands';
import Slider from '@/components/main/home/slider';
import Banner from '@/components/main/home/banner';
import Newsletter from '@/components/main/home/news-letter';
import News from '@/components/main/home/News';
import { fetchNewsData } from '@/data/news/news';
import { NewsType } from '@/lib/types/api/new-types';
import { ReviewType } from '@/lib/types/api/review-types';

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
  return (
    <div>
      <Slider />
      <FeaturedProducts />
      <Banner />
      <Review reviews={reviews} />
      <News news={news} />
      <Brands />
      <Newsletter />
    </div>
  );
};

export default HomePage;
