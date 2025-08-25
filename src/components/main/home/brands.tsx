import BrandItem from '@/components/brands/branditem';
import Container from '@/components/layout/container';

const Brands = () => {
  return (
    <Container>
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 ">
        <div className="bg-card rounded-2xl p-6 ">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl font-semibold text-primary">OUR BRANDS</h2>
          </div>
          <BrandItem />
        </div>
      </div>
    </Container>
  );
};

export default Brands;
