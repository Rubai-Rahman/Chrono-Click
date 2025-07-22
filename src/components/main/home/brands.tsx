'use client';

import Image from 'next/image';

// Brand data - Add your own image URLs here
const brands = [
  {
    name: 'CARTIER',
    logo: '/brands/cartier.png', // Add your image to public/brands/ folder
    alt: 'Cartier logo',
  },
  {
    name: 'CASIO',
    logo: '/brands/casio.png',
    alt: 'Casio logo',
  },
  {
    name: 'CITIZEN',
    logo: '/brands/citizen.png',
    alt: 'Citizen logo',
  },
  {
    name: 'SEIKO',
    logo: '/brands/seiko.png',
    alt: 'Seiko logo',
  },
  {
    name: 'TIMEX',
    logo: '/brands/timex.png',
    alt: 'Timex logo',
  },
  {
    name: 'TITAN',
    logo: '/brands/titan.png',
    alt: 'Titan logo',
  },
  {
    name: 'MONTBLANC',
    logo: '/brands/montblanc.png',
    alt: 'Montblanc logo',
  },
  {
    name: 'ROLEX',
    logo: '/brands/rolex.png',
    alt: 'Rolex logo',
  },
  {
    name: 'OMEGA',
    logo: '/brands/omega.png',
    alt: 'Omega logo',
  },
  {
    name: 'TAG HEUER',
    logo: '/brands/tag-heuer.png',
    alt: 'TAG Heuer logo',
  },
  {
    name: 'BREITLING',
    logo: '/brands/breitling.png',
    alt: 'Breitling logo',
  },
  {
    name: 'FOSSIL',
    logo: '/brands/fossil.png',
    alt: 'Fossil logo',
  },
  {
    name: 'TISSOT',
    logo: '/brands/tissot.png',
    alt: 'Tissot logo',
  },
  {
    name: 'LONGINES',
    logo: '/brands/longines.png',
    alt: 'Longines logo',
  },
];

const Brands = () => {
  return (
    <section className="py-12 bg-foreground/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-priamry mb-4">
            OUR BRANDS
          </h2>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-back rounded-lg shadow-sm hover:shadow-md transition-shadow h-20"
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
    </section>
  );
};

export default Brands;
