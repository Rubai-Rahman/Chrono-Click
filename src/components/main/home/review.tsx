'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api-lib/products';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import { Star, Quote, Users, Award, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { StarRating } from '@/components/ui/render-start';

export type ReviewType = {
  _id: string;
  name: string;
  comment: string;
  img: string;
  location?: string;
  verified?: boolean;
  rating?: number;
};

const Review = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['review'],
    queryFn: () => fetchData<ReviewType[]>('review'),
  });

  console.log('reviews', reviews);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          {/* Loading Header */}
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Loading Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="w-20 h-20 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError && !reviews) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ErrorResultMessage />
        </div>
      </section>
    );
  }

  if (!reviews?.length) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">
              Be the first to share your experience!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Customer Reviews
          </div>

          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-6">
            What Our Customers
            <br />
            <span className="text-primary">Are Saying</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied
            customers have to say about their experience.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9</div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <StarRating rating={5} />
              </div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {reviews.length}+
              </div>
              <div className="text-sm text-muted-foreground">
                Happy Customers
              </div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>

        {/* reviews Carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
            onSelect={(index) => setCurrentSlide(index)}
          >
            <CarouselContent className="-ml-4">
              {reviews.map((item, index) => (
                <CarouselItem
                  key={item._id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                  }}
                >
                  <div className="p-1 h-full">
                    <Card className="group h-full bg-gradient-to-br from-card to-card/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                      <CardContent className="p-8 h-full flex flex-col">
                        {/* Quote Icon */}
                        <div className="mb-6">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Quote className="w-6 h-6 text-primary" />
                          </div>
                        </div>

                        {/* Review Text */}
                        <blockquote className="text-foreground/90 leading-relaxed mb-6 flex-1">
                          {item.comment}
                        </blockquote>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-4">
                          <StarRating rating={item.rating || 5} />
                        </div>

                        {/* Customer Info */}
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                            <Image
                              src={
                                item.img ||
                                '/placeholder.svg?height=60&width=60'
                              }
                              alt={item.name}
                              width={60}
                              height={60}
                              className="relative z-10 rounded-full object-cover border-2 border-background shadow-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">
                                {item.name}
                              </h4>
                              {item.verified && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-green-100 text-green-800 border-green-200"
                                >
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {item.location || 'Verified Customer'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-primary/10 hover:bg-primary/20 border-primary/20" />
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(reviews.length / 3) }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        Math.floor(currentSlide / 3) === index
                          ? 'bg-primary w-8'
                          : 'bg-muted-foreground/30'
                      }`}
                    />
                  )
                )}
              </div>
              <CarouselNext className="relative inset-0 translate-y-0 bg-primary/10 hover:bg-primary/20 border-primary/20" />
            </div>
          </Carousel>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground">
              Join Our Happy Customers
            </h3>
            <p className="text-muted-foreground max-w-md">
              Experience the quality and craftsmanship that our customers love.
              Start your journey today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
