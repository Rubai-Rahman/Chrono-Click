import { Star } from 'lucide-react';
import { cn } from '@/lib/utils'; // uses clsx under the hood

interface StarRatingProps {
  rating: number;
  total?: number;
  className?: string;
}

export const StarRating = ({
  rating,
  total = 5,
  className,
}: StarRatingProps) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            'w-4 h-4',
            index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          )}
        />
      ))}
    </div>
  );
};
