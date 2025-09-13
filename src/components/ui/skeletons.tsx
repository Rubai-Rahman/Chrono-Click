import { Skeleton } from '@/components/ui/skeleton';

export function LoginFormSkeleton() {
  return (
    <div className="flex flex-col space-y-6 w-full max-w-md mx-auto p-8">
      <div className="space-y-2 text-center">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full mt-4" />
        <div className="flex justify-center pt-4">
          <Skeleton className="h-8 w-3/4" />
        </div>
      </div>
    </div>
  );
}
