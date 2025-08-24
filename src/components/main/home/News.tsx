'use client';
import { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import NewsItem from './news-Item';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/layout/container';
import { NewsType } from '@/lib/types/api/new-types';

const News = ({ news }: { news: NewsType[] }) => {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true,
    })
  );

  return (
    <Container>
      <div className="bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
        {/* Background Decorations */}
        <div className="space-y-8 sm:space-y-12 relative z-10">
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-muted-foreground mb-4 tracking-wide uppercase">
              Time is Precious ... Check Out Now
            </h2>

            <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-6">
              Latest News & <span className="text-primary">Insights</span>
            </h1>
          </div>

          {/* News Carousel */}
          <div className="w-full mx-auto">
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
                    className="pl-4 md:basis-1/2 lg:basis-1/3  2xl:basis-1/4"
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
          <div className="w-full">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg flex flex-col items-center gap-6 p-8">
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
      </div>
    </Container>
  );
};

export default News;
