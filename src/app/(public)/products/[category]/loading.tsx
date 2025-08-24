import Container from '@/components/layout/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container>
      {/* Heading Skeleton */}
      <div className="text-center mb-12 sm:mb-16">
        <Skeleton className="h-6 w-64 mx-auto mb-4" />
        <Skeleton className="h-12 w-80 mx-auto" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex justify-between bg-card mb-3 p-6 rounded-md shadow-2xs">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Products Grid Skeleton - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Product Image */}
            <Skeleton className="h-64 w-full rounded-lg" />

            {/* Product Info */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center py-4 mt-8">
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-md" />
          ))}
        </div>
      </div>
    </Container>
  );
}
