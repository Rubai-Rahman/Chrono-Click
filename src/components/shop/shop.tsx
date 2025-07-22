import type { Product as ProductType } from '@/api-lib/api-type';
import Product from './product';
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

const Shop = ({
  products,
  totalPages,
  currentPage,
  onPageChange,
}: ShopProps) => {
  return (
    <>
      <div className="text-center py-8">
        <h4 className="text-lg font-semibold text-foreground">
          LATEST WATCHES YOU CAN&apos;T RESIST!
        </h4>
        <h2 className="text-4xl font-bold text-primary mt-2">
          Find Your Watch
        </h2>
      </div>
      <div className="container mx-auto  space-y-5 ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage === 0) return; // disabled হলে কাজ বন্ধ
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
                  if (currentPage === totalPages - 1) return; // disabled হলে কাজ বন্ধ
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
    </>
  );
};

export default Shop;
