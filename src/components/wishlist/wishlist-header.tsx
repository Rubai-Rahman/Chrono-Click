import { Heart, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface WishlistHeaderProps {
  filteredCount: number;
  totalCount: number;
  activeFilterCount: number;
  className?: string;
}

export function WishlistHeader({
  filteredCount,
  totalCount,
  activeFilterCount,
  className,
}: WishlistHeaderProps) {
  const hasActiveFilters = activeFilterCount > 0;
  const allItemsShown = filteredCount === totalCount;
  
  return (
    <div className={cn("w-full space-y-4 mb-8", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary/90 rounded-xl flex items-center justify-center shadow-sm">
            <Heart className="h-6 w-6 md:h-7 md:w-7 text-white" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              My Wishlist
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">
                {filteredCount} {filteredCount === 1 ? 'item' : 'items'}
                {!allItemsShown && ` of ${totalCount}`}
              </span>
              
              {hasActiveFilters && (
                <Badge variant="outline" className="gap-1.5 text-xs py-0.5">
                  <Filter className="h-3 w-3" />
                  {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {!allItemsShown && (
          <div className="text-sm text-muted-foreground">
            Showing {filteredCount} of {totalCount} items
          </div>
        )}
      </div>
      
      {hasActiveFilters && (
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            Filtered to show {filteredCount} {filteredCount === 1 ? 'item' : 'items'}
          </p>
        </div>
      )}
    </div>
  );
}
