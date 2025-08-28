'use client';
import { useState } from 'react';
import { ProductType } from '@/lib/types/api/product-types';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { WishlistFilters } from '@/components/wishlist/wishlist-filters';
import { WishlistHeader } from '@/components/wishlist/wishlist-header';
import { WishlistStats } from '@/components/wishlist/wishlist-stats';
import { WishlistEmptyState } from '@/components/wishlist/wishlist-empty-state';
import { WishlistProductGrid } from '@/components/wishlist/wishlist-product-grid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';

export interface filterProps {
  brand?: string;
  category: string;
  stock: string;
  priceRange: string;
}

const WishlistPageContent = () => {
  const { items, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const [activeFilters, setActiveFilters] = useState({
    brand: '',
    category: '',
    stock: '',
    priceRange: '',
  });

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success('Wishlist cleared successfully');
  };
  console.log('items', items);
  const handleAddAllToCart = () => {
    const inStockItems = filteredProducts.filter((product) => product.inStock);

    if (inStockItems.length === 0) {
      toast.info('No in-stock items to add to cart');
      return;
    }

    inStockItems.forEach((item) => {
      addToCart(item);
    });

    toast.success(`Added ${inStockItems.length} items to cart`);
  };

  const applyFilters = (products: ProductType[], filters: filterProps) => {
    let filtered = [...products];

    if (filters.brand) {
      filtered = filtered.filter(
        (product) => product.brand && product.brand === filters.brand
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.stock === 'in-stock') {
      filtered = filtered.filter((product) => product.inStock);
    } else if (filters.stock === 'out-of-stock') {
      filtered = filtered.filter((product) => !product.inStock);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    return filtered;
  };

  // Derive filteredProducts from items and activeFilters
  const filteredProducts = applyFilters(items, activeFilters);

  const handleFilterChange = (filterType: keyof filterProps, value: string) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({ brand: '', category: '', stock: '', priceRange: '' });
  };

  const totalValue = filteredProducts.reduce(
    (sum, product) => sum + Number(product.price),
    0
  );
  const inStockCount = filteredProducts.filter(
    (product) => product.inStock
  ).length;
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  // Get unique values for filter options
  const brands = [
    ...new Set(
      items.map((p) => p.brand).filter((b): b is string => Boolean(b))
    ),
  ];
  const categories = [
    ...new Set(
      items.map((p) => p.category).filter((c): c is string => Boolean(c))
    ),
  ];

  if (items.length === 0) {
    return <WishlistEmptyState />;
  }

  console.log('filteredProducts', filteredProducts);
  return (
    <div className="min-h-screen bg-background animate-fade-in container mx-auto px-4 py-8 ">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-4">
        <WishlistHeader
          filteredCount={filteredProducts.length}
          totalCount={items.length}
          activeFilterCount={activeFilterCount}
        />

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <WishlistFilters
            activeFilters={activeFilters}
            brands={brands}
            categories={categories}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          <Button
            onClick={handleAddAllToCart}
            disabled={inStockCount === 0}
            className="bg-primary hover:shadow-elegant transition-all duration-300 hover-scale"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add All to Cart ({inStockCount})
          </Button>

          <Button
            onClick={handleClearWishlist}
            variant="destructive"
            className="hover-scale"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Wishlist
          </Button>
        </div>
      </div>

      <WishlistStats
        filteredCount={filteredProducts.length}
        totalCount={items.length}
        inStockCount={inStockCount}
        totalValue={totalValue}
      />

      <Separator className="mb-8" />

      {/* Results Summary */}
      {activeFilterCount > 0 && (
        <div className="mb-6 p-4 bg-accent/50 rounded-xl border border-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                Showing {filteredProducts.length} of {items.length} items
              </p>
              <div className="flex gap-2 mt-2">
                {activeFilters.brand && (
                  <Badge variant="secondary" className="text-xs">
                    Brand: {activeFilters.brand}
                  </Badge>
                )}
                {activeFilters.category && (
                  <Badge variant="secondary" className="text-xs">
                    Category: {activeFilters.category}
                  </Badge>
                )}
                {activeFilters.stock && (
                  <Badge variant="secondary" className="text-xs">
                    {activeFilters.stock === 'in-stock'
                      ? 'In Stock'
                      : 'Out of Stock'}
                  </Badge>
                )}
                {activeFilters.priceRange && (
                  <Badge variant="secondary" className="text-xs">
                    ${activeFilters.priceRange.replace('-', ' - $')}
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <WishlistProductGrid
          products={filteredProducts}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default WishlistPageContent;
