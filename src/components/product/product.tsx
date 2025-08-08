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
    <Card className="group w-full max-w-xs rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border">
      <CardContent className="p-4">
        {/* Image Container */}
        <div
          className="relative w-full h-48 bg-muted rounded-xl overflow-hidden flex items-center justify-center mb-4 cursor-pointer"
          onClick={handleProductClick}
        >
          <Image
            src={img || '/placeholder.svg?height=200&width=200&text=Product'}
            alt={name}
            width={200}
            height={200}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority // Assuming product images are important for LCP
          />
          {/* Top Left Badge/Logo & Top Right Heart Icon */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {/* {isBestSeller && (
              <Badge className="bg-foreground text-background text-xs font-medium px-2 py-1 rounded-full">
                Best Seller
              </Badge>
            )} */}
            {/* Placeholder for Brand Logo (e.g., Nike swoosh) */}
            {brand && (
              <Image
                src={`/placeholder.svg?height=20&width=20&text=${brand}`} // Replace with actual brand logo path if available
                alt={`${brand} Logo`}
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 rounded-full w-8 h-8 text-destructive hover:bg-destructive/10 focus:ring-0"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4 fill-destructive" />
          </Button>

          {/* Pagination Dots (Placeholder) */}
          <div className="absolute bottom-3 flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 group-hover:bg-muted-foreground transition-colors" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted/50 group-hover:bg-muted-foreground/70 transition-colors" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted/50 group-hover:bg-muted-foreground/70 transition-colors" />
          </div>
        </div>

        {/* Product Details */}
        <div className="px-1 space-y-1">
          {brand && (
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
              {brand}
            </p>
          )}
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
            {name}
          </h3>
          {/* Price and Buy Now Button */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xl font-bold text-foreground">
              {formatPrice(price)}
            </p>
            <Button
              disabled={!product.inStock}
              onClick={handleBuyNow}
              className="bg-foreground text-background rounded-full px-6 py-2 text-base font-medium shadow-md hover:bg-foreground/90 transition-colors duration-200"
            >
              {product.inStock ? 'Buy Now' : 'Sold Out'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
