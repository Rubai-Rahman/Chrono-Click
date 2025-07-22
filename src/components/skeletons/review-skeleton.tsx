import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const CardSkeleton = () => {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid gap-4">
          {Array.from({ length: 1 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-16 h-16 rounded-lg" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-32 mb-2" />
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Skeleton key={j} className="w-5 h-5" />
                            ))}
                          </div>
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mt-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
