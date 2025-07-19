'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials, TestimonialItem } from '@/api-lib/testimonials';

const Testimonials = () => {
  const {
    data: story,
    isLoading,
    isError,
    error,
  } = useQuery<TestimonialItem[], Error>({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });
  console.log('testomonials', story);
  if (isLoading) {
    return (
      <div className="py-16 px-4 text-center">Loading testimonials...</div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 px-4 text-center text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div className="py-16 px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Testimonials</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {story?.map((item) => (
            <CarouselItem
              key={item._id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                  <div className="mb-4">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h1 className="text-xl font-semibold mb-2">{item.name}</h1>
                  <p className="text-gray-600 text-center">{item.comment}</p>
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

export default Testimonials;
