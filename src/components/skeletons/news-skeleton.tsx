import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const NewsCardSkeleton = () => (
  <Card className="overflow-hidden rounded-xl">
    <Skeleton className="h-48 w-full" />
    <CardContent className="p-5">
      <div className="flex gap-2 mb-3">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-12" />
      </div>
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </CardContent>
  </Card>
);

const FeaturedNewsCardSkeleton = () => (
  <Card className="overflow-hidden rounded-2xl">
    <Skeleton className="h-64 w-full" />
    <CardContent className="p-6">
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-7 w-full mb-2" />
      <Skeleton className="h-7 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
    </CardContent>
  </Card>
);

const NewsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-3xl p-8 md:p-16 mb-16">
        <div className="text-center max-w-4xl mx-auto">
          <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
          <Skeleton className="h-8 w-32 mx-auto" />
        </div>
      </div>

      {/* Featured Articles Skeleton */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[...Array(3)].map((_, index) => (
            <FeaturedNewsCardSkeleton key={index} />
          ))}
        </div>
      </section>

      {/* All Articles Skeleton */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      </section>

      {/* Pagination Skeleton */}
      <div className="flex justify-center py-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-20" />
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-10" />
          ))}
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  );
};

export default NewsSkeleton;
