import { brands } from '@/lib/constant';
import Image from 'next/image';

const BrandItem = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10  items-center gap-3">
      {brands.map((brand, index) => (
        <div
          key={index}
          className="flex items-center justify-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow h-20"
        >
          <div className="relative w-full h-full">
            <Image
              src={brand.logo}
              alt={brand.alt}
              fill
              className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              sizes="(max-width: 768px) 100px, (max-width: 1200px) 120px, 140px"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandItem;
