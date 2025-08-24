import type { ProductType } from '@/api-lib/api-type';
import Product from '../product/product';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Container from '../layout/container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductsProps {
  products: ProductType[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSizeChange?: (size: string) => void;
  onSortChange?: (sort: string) => void;
  currentSize?: number;
  currentSort?: string;
}

const sort = [
  { value: 'createdAt_desc', label: 'Newest First' },
  { value: 'createdAt_asc', label: 'Oldest First' },
  { value: 'price_desc', label: 'Price: High > Low' },
  { value: 'price_asc', label: 'Price: Low > High' },
];
const Products = ({
  products,
  totalPages,
  currentPage,
  onPageChange,
  onSizeChange,
  onSortChange,
  currentSize = 12,
  currentSort = 'createdAt_desc',
}: ProductsProps) => {
  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 0 && page < totalPages) onPageChange(page);
  };

  return (
    <div>
      {/* Filters */}
      {products.length > 0 && totalPages > 1 && (
        <div className="flex justify-between bg-card mb-3 p-6 rounded-md shadow-2xs">
          <Select value={currentSize.toString()} onValueChange={onSizeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent>
              {[12, 16, 28, 36].map((val) => (
                <SelectItem key={val} value={val.toString()}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={currentSort} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sort.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 mb-6 text-muted-foreground">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We couldn&apos;t find any products matching your criteria. Try
            adjusting your filters or browse other categories.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <div className="responsive-grid w-full">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && totalPages > 1 && (
        <div className="flex justify-center py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => handlePageChange(e, currentPage - 1)}
                  className={
                    currentPage === 0 ? 'opacity-50 pointer-events-none' : ''
                  }
                  aria-disabled={currentPage === 0}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={i === currentPage}
                    onClick={(e) => handlePageChange(e, i)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => handlePageChange(e, currentPage + 1)}
                  className={
                    currentPage === totalPages - 1
                      ? 'opacity-50 pointer-events-none'
                      : ''
                  }
                  aria-disabled={currentPage === totalPages - 1}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Products;
