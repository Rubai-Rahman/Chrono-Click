'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  img: string;
  inStock?: boolean;
  category?: string;
  brand?: string;
  rating?: number;
  reviews?: number;
}

interface ProductProps {
  product: Product;
}

const renderStars = (rating = 0) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    );
  }
  return stars;
};

const formatPrice = (price: number) => {
  return `$${Number(price).toFixed(2)}`;
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const { _id, name, price, img } = product;
  const router = useRouter();

  const handleDetails = () => {
    router.push(`/products/${_id}`);
  };

  const { items, addToCart } = useCartStore();

  return (
    <Card className="group w-full max-w-sm rounded-2xl overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-card/60 backdrop-blur-md">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
          <Image
            src={img || '/placeholder.svg?height=300&width=300&text=Watch'}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                onClick={handleDetails}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Badges */}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-3 left-3">
              Out of Stock
            </Badge>
          )}
          {product.category && (
            <Badge
              variant="secondary"
              className="absolute top-3 right-3 bg-white/90 text-black"
            >
              {product.category}
            </Badge>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          {product.brand && (
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {product.brand}
            </p>
          )}

          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>

          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm font-medium text-foreground">
                {product.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews ?? 0} reviews)
              </span>
            </div>
          )}

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xl font-bold text-primary">
              {formatPrice(price)}
            </p>

            <Button
              disabled={!product.inStock}
              onClick={() => addToCart(product)}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-xl transition-all duration-300 group/btn"
            >
              <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              {product.inStock ? 'Add to Cart' : 'Sold Out'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
