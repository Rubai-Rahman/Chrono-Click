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
import Container from '@/components/layout/container';

const Slider = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <Container>
      <div className="w-full overflow-hidden">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[calc(100vw*9/16)] max-h-[500px] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
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
                      className="px-6 md:px-9 lg:px-9 py-3 md:py-4 border border-primary hover:bg-primary text-primary-foreground transition-colors duration-300"
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
    </Container>
  );
};

export default Slider;
