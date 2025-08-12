'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNewsDetails, NewsType } from '@/api-lib/news';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Star,
  Tag,
} from 'lucide-react';
import NewsDetailsSkeleton from '@/components/skeletons/news-details-skeleton';

const NewsDetailsClient = () => {
  const { newsId } = useParams();
  const router = useRouter();

  const {
    data: newsDetails,
    isLoading,
    isError,
    error,
  } = useQuery<NewsType, Error>({
    queryKey: ['newsDetails', newsId],
    queryFn: () => fetchNewsDetails(newsId as string),
    enabled: !!newsId,
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Gadgets:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Science:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Lifestyle:
        'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      Fashion:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    };
    return (
      colors[category as keyof typeof colors] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    );
  };

  const handleShare = async () => {
    if (navigator.share && newsDetails) {
      try {
        await navigator.share({
          title: newsDetails.name,
          text: newsDetails.details.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return <NewsDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <CardContent>
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Error Loading Article
            </h2>
            <p className="text-muted-foreground mb-4">{error?.message}</p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!newsDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <CardContent>
            <div className="text-muted-foreground text-6xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Article Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The news article you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button onClick={() => router.push('/news')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Navigation */}
      <div className="mb-8">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Button>
      </div>

      {/* Article Header */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {newsDetails.featured && (
            <Badge className="bg-primary/90 text-primary-foreground">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge className={getCategoryColor(newsDetails.category)}>
            <Tag className="w-3 h-3 mr-1" />
            {newsDetails.category}
          </Badge>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight font-serif text-foreground">
          {newsDetails.name}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="font-medium">{newsDetails.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{formatDate(newsDetails.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{newsDetails.readTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={handleShare} variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share Article
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-8 group">
            <Image
              src={newsDetails.img}
              alt={newsDetails.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Article Body */}
          <Card className="p-8 rounded-2xl shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-xl leading-relaxed text-muted-foreground mb-8 font-light">
                  {newsDetails.details}
                </p>

                {/* You can add more content sections here */}
                <div className="border-t border-border pt-8 mt-8">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    About This Article
                  </h3>
                  <div className="bg-muted/50 rounded-xl p-6">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-foreground">
                          Category:
                        </span>
                        <span className="ml-2 text-muted-foreground">
                          {newsDetails.category}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">
                          Reading Time:
                        </span>
                        <span className="ml-2 text-muted-foreground">
                          {newsDetails.readTime}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">
                          Author:
                        </span>
                        <span className="ml-2 text-muted-foreground">
                          {newsDetails.author}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">
                          Published:
                        </span>
                        <span className="ml-2 text-muted-foreground">
                          {formatDate(newsDetails.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 rounded-2xl shadow-lg bg-card/50 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-4 text-foreground">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href="/news">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to News
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Article Info */}
            <Card className="p-6 rounded-2xl shadow-lg bg-card/50 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-4 text-foreground">
                Article Information
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Badge
                    className={getCategoryColor(newsDetails.category)}
                    variant="secondary"
                  >
                    {newsDetails.category}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reading Time</span>
                  <span className="font-medium text-foreground">
                    {newsDetails.readTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author</span>
                  <span className="font-medium text-foreground">
                    {newsDetails.author}
                  </span>
                </div>
                {newsDetails.featured && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className="bg-primary/90 text-primary-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">
          Discover More Stories
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Stay updated with the latest trends and insights from the world of
          luxury timepieces
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/news">Explore All News</Link>
        </Button>
      </div>
    </div>
  );
};

export default NewsDetailsClient;
