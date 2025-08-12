import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const NewsDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Navigation Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="flex gap-3 mb-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>

        <Skeleton className="h-16 w-full mb-6" />
        <Skeleton className="h-12 w-3/4 mb-6" />

        <div className="flex gap-6 mb-8">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>

        <Skeleton className="h-10 w-36" />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2">
          {/* Image Skeleton */}
          <Skeleton className="h-64 md:h-96 w-full rounded-2xl mb-8" />

          {/* Article Body Skeleton */}
          <Card className="p-8 rounded-2xl shadow-lg border-0 bg-card/50">
            <CardContent className="p-0">
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
              </div>

              <div className="border-t border-border pt-8 mt-8">
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="bg-muted/50 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Quick Actions Skeleton */}
            <Card className="p-6 rounded-2xl shadow-lg bg-card/50">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>

            {/* Article Info Skeleton */}
            <Card className="p-6 rounded-2xl shadow-lg bg-card/50">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Skeleton */}
      <div className="mt-16 text-center bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-3xl p-8 md:p-12">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto mb-6" />
        <Skeleton className="h-12 w-40 mx-auto" />
      </div>
    </div>
  );
};

export default NewsDetailsSkeleton;
