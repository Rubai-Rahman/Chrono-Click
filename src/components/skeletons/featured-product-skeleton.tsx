import ProductSkeleton from './product-skeleton';

const FeaturedProductSkeleton = () => {
  return (
    <section className=" bg-gradient-to-br from-background via-background to-muted/20 responsive-space-x my-12 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProductSkeleton;
