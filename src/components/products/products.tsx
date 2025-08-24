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
}

const sort = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'new', label: 'New' },
  { value: 'price_desc', label: 'Price: High > Low' },
  { value: 'price_asc', label: 'Price: Low > High' },
];
const Products = ({
  products,
  totalPages,
  currentPage,
  onPageChange,
}: ProductsProps) => {
  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 0 && page < totalPages) onPageChange(page);
  };

  return (
    <Container>
      {/* Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          LATEST WATCHES YOU CAN&apos;T RESIST!
        </h4>
        <h2 className="text-4xl font-bold text-primary">Find Your Watch</h2>
      </div>

      {/* Filters */}
      <div className="flex justify-between bg-card mb-3 p-6 rounded-md shadow-2xs">
        <Select>
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

        <Select>
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

      {/* Products Grid */}
      <div className="responsive-grid w-full  ">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
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
    </Container>
  );
};

export default Products;
