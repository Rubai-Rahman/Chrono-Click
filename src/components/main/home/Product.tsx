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
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
          <Image
            src={img || '/placeholder.svg?height=300&width=300&text=Watch'}
            alt={name}
            width={300}
            height={300}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/90 hover:bg-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                onClick={handleDetails}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/90 hover:bg-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stock Badge */}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-3 left-3">
              Out of Stock
            </Badge>
          )}

          {/* Category Badge */}
          {product.category && (
            <Badge
              variant="secondary"
              className="absolute top-3 right-3 bg-white/90"
            >
              {product.category}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
              {product.brand}
            </p>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>

          {/* Description */}
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

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">
                {formatPrice(price)}
              </p>
            </div>

            <Button
              disabled={!product.inStock}
              onClick={() => addToCart(product)}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
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
