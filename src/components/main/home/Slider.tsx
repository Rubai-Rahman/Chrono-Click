import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "/images/slider/slider1-bg.webp",
    title: "PREMIUM MODEL",
    description: "Stylish external wrist watch",
    link: "/shop",
  },
  {
    image: "/images/slider/slider2-bg.webp",
    title: "FALL IN LOVE",
    description: "Redefining the meaning of time",
    link: "/shop",
  },
  {
    image: "/images/slider/slider3-bg.webp",
    title: "SECRET NEW MODELS",
    description: "Priceless and timeless designs",
    link: "/shop",
  },
];

const Slider = () => {
  return (
    <div className="mt-10">
      <Carousel className="w-full">
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
                  priority={index === 0} // Load the first image with high priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <h3 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                  <Link href={slide.link} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors duration-300">
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