import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  // In a real app, fetch product data here
  return {
    title: `Product ${params.id} - Chrono Click`,
    description: 'Product details page',
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // TODO: Fetch product data using params.id

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product images */}
        <div>
          <div className="aspect-square bg-muted rounded-lg mb-4">
            {/* Product image gallery will go here */}
          </div>
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Product Name</h1>
          <p className="text-2xl font-semibold text-primary mb-4">$299.99</p>
          <p className="text-muted-foreground mb-6">
            Product description will go here...
          </p>

          {/* Add to cart button */}
          <button className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
