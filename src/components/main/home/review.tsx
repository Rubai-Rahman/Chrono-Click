'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Users, Award, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { StarRating } from '@/components/ui/render-star';
import Autoplay from 'embla-carousel-autoplay';
import Container from '@/components/layout/container';
import { ReviewType } from '@/lib/types/api/review-types';

const Review = ({ reviews }: { reviews: ReviewType[] }) => {
  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true,
    })
  );

  if (!reviews.length) {
    return (
      <div className="text-center">
        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
        <p className="text-muted-foreground">
          Be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <Container>
      <div className="bg-gradient-to-br from-background via-muted/10 to-background relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
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
            customers have to say.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 sm:gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9</div>
              <div className="flex justify-center gap-1 mb-1">
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

        {/* Carousel */}
        <div className="w-full mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: false,
              dragFree: false,
            }}
            plugins={[plugin.current]}
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <CarouselContent className="-ml-4">
              {reviews.map((item) => (
                <CarouselItem
                  key={item._id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
                >
                  <Card className="group h-full bg-card/70 border-0 shadow-lg hover:shadow-xl backdrop-blur">
                    <CardContent className=" h-full flex flex-col">
                      <div className="mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20">
                          <Quote className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      <blockquote className="text-foreground/90 leading-relaxed mb-6 flex-1">
                        {item.comment}
                      </blockquote>

                      <div className="flex items-center gap-1 mb-4">
                        <StarRating rating={item.rating || 5} />
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-md"></div>
                          <Image
                            src={
                              item.img || '/placeholder.svg?height=60&width=60'
                            }
                            alt={item.name}
                            width={60}
                            height={60}
                            className="relative z-10 rounded-full object-cover border-2 border-background shadow-md"
                          />
                        </div>
                        <div>
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </Container>
  );
};

export default Review;
