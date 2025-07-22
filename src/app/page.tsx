import { Metadata } from 'next';
import Banner from '@/components/main/home/banner';
import News from '@/components/main/home/news';
import Newsletter from '@/components/main/home/news-letter';
import Slider from '@/components/main/home/slider';
import FeaturedProducts from '@/components/main/home/featured products';
import Review from '@/components/main/home/review';
import Brands from '@/components/main/home/brands';

export const metadata: Metadata = {
  title: 'Chrono Click - Home',
  description: 'Your ultimate destination for stylish watches and accessories.',
};

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <FeaturedProducts />
      <Banner />
      <Review />
      <News />
      <Brands />
      <Newsletter />
    </div>
  );
};

export default HomePage;
