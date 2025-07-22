'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductType } from '@/app/product/[id]/page-product-detail';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/store/useCartStore';
import {
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Minus,
  Plus,
  Star,
} from 'lucide-react';

interface ProductDetailProps {
  product: ProductType;
}

const renderStars = (rating = 0) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`w-4 h-4 ${
          i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    );
  }
  return stars;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCartStore();

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5 border border-border/50">
                <Image
                  src={product.img || '/placeholder.svg?height=600&width=600'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.brand && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {product.brand}
                  </Badge>
                )}
                {product.inStock && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>

            {/* Description */}
            {(product.description || product.details) && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description || product.details}
              </p>
            )}

            {/* Category */}
            {product.category && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Category:{' '}
                </span>
                <Badge variant="outline">{product.category}</Badge>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 h-12 text-lg font-semibold"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 p-0"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </Button>
                <Button variant="outline" size="lg" className="h-12 w-12 p-0">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-4 bg-card/50 rounded-lg border border-border/50">
                <Truck className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">Free Shipping</span>
                <span className="text-xs text-muted-foreground">
                  On orders $50+
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-card/50 rounded-lg border border-border/50">
                <RotateCcw className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">30-Day Returns</span>
                <span className="text-xs text-muted-foreground">
                  Easy returns
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-card/50 rounded-lg border border-border/50">
                <Shield className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">2-Year Warranty</span>
                <span className="text-xs text-muted-foreground">
                  Full coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
