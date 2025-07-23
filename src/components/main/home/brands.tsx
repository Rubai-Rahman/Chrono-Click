'use client';

import { brands } from '@/lib/constant';
import Image from 'next/image';

const Brands = () => {
  return (
    <section className="py-10 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl p-6 md:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              OUR BRANDS
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 items-center">
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
        </div>
      </div>
    </section>
  );
};

export default Brands;
