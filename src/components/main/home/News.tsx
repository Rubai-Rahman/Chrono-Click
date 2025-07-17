'use client';
import React from "react";
import NewsItem from "./NewsItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { fetchNews, NewsStory } from "@/api-lib/news";

const News = () => {
  const { data: story, isLoading, isError, error } = useQuery<NewsStory[], Error>({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  if (isLoading) {
    return <div className="py-16 px-4 text-center">Loading news...</div>;
  }

  if (isError) {
    return <div className="py-16 px-4 text-center text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="py-16 px-4 text-center">
      <h2 className="text-lg font-semibold text-gray-600">TIME IS PRECIOUS ... CHECK OUT NOW</h2>
      <h1 className="text-4xl font-bold text-gray-800 mt-2 mb-8">Latest News</h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {story?.map((item) => (
            <CarouselItem key={item._id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <NewsItem item={item} />
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

export default News;