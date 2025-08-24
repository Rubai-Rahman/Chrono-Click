import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '../ui/card';

const ProductSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="h-64 w-full" />
        <div className="p-6 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSkeleton;
