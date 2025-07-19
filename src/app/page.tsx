import { Metadata } from 'next';
import Products from '@/components/main/home/products';
import Banner from '@/components/main/home/banner';
import Slider from '@/components/main/home/slider';
import Testimonials from '@/components/main/home/testimonials';
import News from '@/components/main/home/news';
import Newsletter from '@/components/main/home/news-letter';

export const metadata: Metadata = {
  title: 'Chrono Click - Home',
  description: 'Your ultimate destination for stylish watches and accessories.',
};

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <Products />
      <Banner />
      <Testimonials />
      <News />
      <Newsletter />
    </div>
  );
};

export default HomePage;
