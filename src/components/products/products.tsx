import type { ProductType } from '@/api-lib/api-type';
import Product from '../product/product';
import PageWrapper from '@/components/layout/page-wrapper';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ShopProps {
  products: ProductType[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Products = ({
  products,
  totalPages,
  currentPage,
  onPageChange,
}: ShopProps) => {
  return (
    <PageWrapper spacing="md" containerSize="base">
      <div className="text-center mb-12 sm:mb-16">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          LATEST WATCHES YOU CAN&apos;T RESIST!
        </h4>
        <h2 className="text-4xl font-bold text-primary">Find Your Watch</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-items-center mb-12 sm:mb-16">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage === 0) return;
                  onPageChange(currentPage - 1);
                }}
                className={
                  currentPage === 0
                    ? 'opacity-50 pointer-events-none select-none'
                    : ''
                }
                aria-disabled={currentPage === 0}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={index === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(index);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage === totalPages - 1) return;
                  onPageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages - 1
                    ? 'opacity-50 pointer-events-none select-none'
                    : ''
                }
                aria-disabled={currentPage === totalPages - 1}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </PageWrapper>
  );
};

export default Products;
