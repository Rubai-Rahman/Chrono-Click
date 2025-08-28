'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/store/useCartStore';
import { StarRating } from '@/components/ui/render-star';
import {
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Minus,
  Plus,
} from 'lucide-react';
import { ProductType } from '@/lib/types/api/product-types';
import { toast } from 'sonner';
import { useState, useCallback } from 'react';
import { WishlistButton } from '../wishlist/wishlist-button';

export default function ProductDetails({ product }: { product: ProductType }) {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} is added to cart`);
  };

  const handleShare = useCallback(async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on Chrono Click`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        // Web Share API (mobile)
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      } else {
        // Fallback: Show the URL in an alert
        prompt('Copy this link:', window.location.href);
      }
    } catch (err) {
      console.error('Error sharing:', err);
      toast.error('Failed to share. Please try again.');
    }
  }, [product.name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative group">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5 border border-border/50 shadow-lg">
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

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {product.brand && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {product.brand}
                  </Badge>
                )}
                {product.inStock ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <StarRating rating={product.rating} />
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
            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Category */}
            {product.category && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground up">
                  Category:
                </span>
                <Badge variant="default" className="uppercase">
                  {product.category}
                </Badge>
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
                    disabled={quantity <= 0}
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

              <div className="flex gap-4 relative">
                <Button
                  size="lg"
                  className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <WishlistButton
                  product={product}
                  size="lg"
                  className="h-12 w-12 p-0 rounded-md"
                />
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12 w-12 p-0"
                  onClick={() => handleShare()}
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <Card>
                <CardContent className="p-0 text-center">
                  <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-xs text-muted-foreground">
                    On orders $50+
                  </p>
                </CardContent>
              </Card>

              <Card className="p-4 text-center">
                <CardContent className="p-0">
                  <RotateCcw className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="text-sm font-medium">30-Day Returns</h4>
                  <p className="text-xs text-muted-foreground">Easy returns</p>
                </CardContent>
              </Card>

              <Card className="p-4 text-center">
                <CardContent className="p-0">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="text-sm font-medium">2-Year Warranty</h4>
                  <p className="text-xs text-muted-foreground">Full coverage</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
