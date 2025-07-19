'use client';

import Link from 'next/link';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { slides } from '@/lib/constant';
import { useRef } from 'react';

const Slider = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full">
                <Image
                  className="w-full object-cover"
                  src={slide.image}
                  alt={slide.title}
                  width={1920}
                  height={1080}
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                  <h3 className="text-2xl md:text-5xl font-bold mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-lg md:text-xl mb-6 text-primary">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className="px-8 py-3  border border-primary hover:bg-primary text-primary-foreground transition-colors duration-300"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Slider;
