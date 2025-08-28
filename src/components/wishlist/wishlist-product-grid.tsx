import { ProductType } from '@/lib/types/api/product-types';
import Product from '@/components/product/product';
import { Package, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WishlistProductGridProps {
  products: ProductType[];
  onClearFilters?: () => void;
  className?: string;
}

export function WishlistProductGrid({ 
  products, 
  onClearFilters, 
  className 
}: WishlistProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-card rounded-xl border border-border/50">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-5">
          <Package className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No items found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn&apos;t find any products matching your current filters.
        </p>
        {onClearFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="inline-flex items-center gap-2 group hover:shadow-sm transition-all"
          >
            <FilterX className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Clear all filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6",
      "transition-opacity duration-200",
      className
    )}>
      {products.map((product) => (
        <div key={product.id} className="h-full transition-transform hover:scale-[1.02] hover:shadow-md rounded-lg overflow-hidden">
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}
