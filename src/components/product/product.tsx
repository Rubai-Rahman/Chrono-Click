'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductType } from '@/api-lib/api-type';

const formatPrice = (price: number) => {
  return `$${Number(price).toFixed(2)}`;
};

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { _id, name, price, img, brand } = product;
  const router = useRouter();
  const { addToCart } = useCartStore();

  const handleBuyNow = () => {
    addToCart(product);
    // Optionally, redirect to cart or checkout after adding
    // router.push('/cart');
  };

  const handleProductClick = () => {
    router.push(`/product/${_id}`);
  };

  return (
    <Card
      className="group w-full max-w-xs rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border hover:border-primary hover:cursor-pointer py-0"
      onClick={handleProductClick}
    >
      <CardContent className="p-3">
        <div className="relative w-full h-56 bg-muted rounded-3xl overflow-hidden flex items-center justify-center mb-4 cursor-pointer">
          <Image
            src={img || '/placeholder.svg?height=200&width=200&text=Product'}
            alt={name}
            width={300}
            height={310}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />

          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 rounded-full w-8 h-8 text-destructive bg-background shadow-2xs  focus:ring-0"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4 text-primary" />
          </Button>
        </div>

        {/* Product Details */}
        <div className="px-1 space-y-1">
          {brand && (
            <Badge variant="outline" className="text-primary">
              {brand}
            </Badge>
          )}
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {name}
          </h3>
          {/* Price and Buy Now Button */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xl font-bold text-primary">
              {formatPrice(price)}
            </p>
            <Button
              disabled={!product.inStock}
              onClick={handleBuyNow}
              variant="outline"
              className=" border border-primary rounded-full px-6 py-2 text-base font-medium shadow-md hover:bg-primary/80 hover:text-primary-foreground transition-colors duration-200"
            >
              {product.inStock ? 'Add to Cart' : 'Sold Out'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
