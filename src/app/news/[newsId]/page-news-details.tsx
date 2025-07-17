"use client"; // This component uses client-side hooks

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchNewsDetails, NewsDetailsItem } from "@/api-lib/news";

const NewsDetailsPageContent = () => {
  const { newsId } = useParams();

  const { data: newsDetails, isLoading, isError, error } = useQuery<NewsDetailsItem, Error>({
    queryKey: ["newsDetails", newsId],
    queryFn: () => fetchNewsDetails(newsId as string),
    enabled: !!newsId, // Only run query if newsId is available
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading news details...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Error: {error?.message}</div>;
  }

  if (!newsDetails) {
    return <div className="text-center py-8">News item not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="bg-white shadow-lg p-3 rounded-lg">
            <Image src={newsDetails.img} alt={newsDetails.name} width={500} height={300} className="w-full h-auto object-cover" />
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white shadow-lg p-3 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{newsDetails.name}</h3>
            <p className="text-gray-800">{newsDetails.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPageContent;
