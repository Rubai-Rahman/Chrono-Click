'use client';

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { ProductType } from '@/lib/types/api/product-types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type WishlistButtonProps = {
  product: ProductType;
  className?: string;
  size?: 'icon' | 'lg';
  iconClassName?: string;
};

export function WishlistButton({
  product,
  className,
  size,
  iconClassName,
}: WishlistButtonProps) {
  const isWishlisted = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id)
  );
  const { addToWishlist, removeFromWishlist } = useWishlistStore();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <Button
      size={size || 'icon'}
      variant="outline"
      className={cn(
        'rounded-full size-8 bg-background shadow-2xs focus:ring-0',
        className
      )}
      aria-label="Add to wishlist"
      onClick={toggleWishlist}
    >
      <Heart
        className={cn(
          `text-primary ${isWishlisted ? 'fill-primary' : ''}`,
          iconClassName
        )}
      />
    </Button>
  );
}
