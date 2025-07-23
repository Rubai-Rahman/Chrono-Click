'use client';
import React, { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useQuery } from '@tanstack/react-query';
import NewsItem from './news-Item';
import { NewsType } from '@/api-lib/api-type';
import { fetchData } from '@/api-lib/products';
import CardSkeleton from '@/components/skeletons/review-skeleton';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const News = () => {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true,
    })
  );

  const {
    data: news,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['news'],
    queryFn: () => fetchData<NewsType[]>('news'),
  });

  if (isLoading) return <CardSkeleton />;
  if (isError && !news) return <ErrorResultMessage />;

  return (
    <section className=" bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background Decorations */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 tracking-wide uppercase">
            Time is Precious ... Check Out Now
          </h2>

          <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-6">
            Latest News & <span className="text-primary">Insights</span>
          </h1>
        </div>

        {/* News Carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: false,
              dragFree: false,
            }}
            className="w-full"
            plugins={[plugin.current]}
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <CarouselContent className="-ml-4">
              {news?.map((item) => (
                <CarouselItem
                  key={item._id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <NewsItem item={item} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-primary/10 hover:bg-primary/20 border-primary/20" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-primary/10 hover:bg-primary/20 border-primary/20" />
            </div>
          </Carousel>
        </div>

        {/* Call to Action */}
        <div className="text-center  max-w-7xl">
          <div className="inline-flex flex-col items-center gap-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Want to read more?
              </h3>
              <p className="text-muted-foreground">
                Explore our complete collection of articles and insights
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link href="/news" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
