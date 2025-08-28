'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Filter, 
  Check, 
  ChevronDown,
  Tag as TagIcon,
  Package,
  Star,
  DollarSign
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { filterProps } from '@/app/(public)/(user)/wishlist/page-wishlist';

interface FilterProps {
  activeFilters: filterProps;
  brands: string[];
  categories: string[];
  onFilterChange: (filterType: keyof filterProps, value: string) => void;
  onClearFilters: () => void;
}

const FilterSection = ({
  title,
  icon: Icon,
  children,
  isOpen = true,
  onToggle,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle: () => void;
}) => (
  <div className="space-y-3">
    <button 
      onClick={onToggle} 
      className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
    >
      <div className="flex items-center">
        <Icon className="h-4 w-4 mr-2 text-muted-foreground" />
        {title}
      </div>
      <ChevronDown className={cn(
        'h-4 w-4 text-muted-foreground transition-transform duration-200',
        isOpen && 'rotate-180'
      )} />
    </button>
    <div 
      className={cn(
        'space-y-2 overflow-hidden transition-all duration-200',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      {children}
    </div>
  </div>
);

const FilterOption = ({
  label,
  active,
  onSelect,
  count,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
  count?: number;
}) => (
  <button
    onClick={onSelect}
    className={cn(
      'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all',
      'hover:scale-[1.02] active:scale-[0.98] transform-gpu',
      active
        ? 'bg-primary/10 text-primary font-medium'
        : 'hover:bg-accent/50 text-muted-foreground'
    )}
  >
    <span>{label}</span>
    {count !== undefined && (
      <span className="text-xs text-muted-foreground">{count}</span>
    )}
    {active && <Check className="h-4 w-4 text-primary" />}
  </button>
);

export function WishlistFilters({
  activeFilters,
  brands,
  categories,
  onFilterChange,
  onClearFilters,
}: FilterProps) {
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleFilterChange = (type: keyof filterProps, value: string) => {
    onFilterChange(type, activeFilters[type] === value ? '' : value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="relative group border-dashed hover:border-primary/50 transition-colors"
        >
          <Filter className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-72 p-4 space-y-4 rounded-xl shadow-lg border border-gray-100"
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-base">Filter Products</h3>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClearFilters();
              }}
              className="h-6 px-2 text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Brand Filter */}
          <FilterSection 
            title="Brands" 
            icon={TagIcon}
            isOpen={openSection === 'brands'}
            onToggle={() => toggleSection('brands')}
          >
            {brands.map((brand) => (
              <FilterOption
                key={brand}
                label={brand}
                active={activeFilters.brand === brand}
                onSelect={() => handleFilterChange('brand', brand)}
              />
            ))}
          </FilterSection>
          
          {/* Category Filter */}
          <FilterSection 
            title="Categories" 
            icon={Package}
            isOpen={openSection === 'categories'}
            onToggle={() => toggleSection('categories')}
          >
            {categories.map((category) => (
              <FilterOption
                key={category}
                label={category}
                active={activeFilters.category === category}
                onSelect={() => handleFilterChange('category', category)}
              />
            ))}
          </FilterSection>
          
          {/* Stock Status */}
          <FilterSection 
            title="Stock Status" 
            icon={Star}
            isOpen={openSection === 'stock'}
            onToggle={() => toggleSection('stock')}
          >
            <FilterOption
              label="In Stock"
              active={activeFilters.stock === 'in-stock'}
              onSelect={() => handleFilterChange('stock', 'in-stock')}
            />
            <FilterOption
              label="Out of Stock"
              active={activeFilters.stock === 'out-of-stock'}
              onSelect={() => handleFilterChange('stock', 'out-of-stock')}
            />
          </FilterSection>
          
          {/* Price Range */}
          <FilterSection 
            title="Price Range" 
            icon={DollarSign}
            isOpen={openSection === 'price'}
            onToggle={() => toggleSection('price')}
          >
            {[
              { label: 'Under $50', value: '0-50' },
              { label: '$50 - $100', value: '50-100' },
              { label: '$100 - $200', value: '100-200' },
              { label: 'Over $200', value: '200+' },
            ].map((range) => (
              <FilterOption
                key={range.value}
                label={range.label}
                active={activeFilters.priceRange === range.value}
                onSelect={() => handleFilterChange('priceRange', range.value)}
              />
            ))}
          </FilterSection>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
