import { Star } from 'lucide-react';
import { cn } from '@/lib/utils'; // uses clsx under the hood

interface StarRatingProps {
  rating: number;
  total?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating = ({
  rating,
  total = 5,
  className,
  size = 'md',
}: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            sizeClasses[size],
            index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          )}
        />
      ))}
    </div>
  );
};
