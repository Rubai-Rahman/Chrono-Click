import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const FeaturedProductSkeleton = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="responsive-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <Skeleton className="h-64 w-full" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-1/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProductSkeleton;
