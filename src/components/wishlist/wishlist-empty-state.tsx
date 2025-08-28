import { Button } from '@/components/ui/button';
import { HeartOff } from 'lucide-react';
import Link from 'next/link';

export function WishlistEmptyState() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-pink-50 to-rose-50 rounded-full flex items-center justify-center">
          <HeartOff className="h-16 w-16 text-rose-300" strokeWidth={1.5} />
        </div>
        <div className="absolute -inset-2 rounded-full border-2 border-dashed border-rose-100 animate-pulse"></div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Looks like you haven&apos;t added any products to your wishlist yet.
        Start exploring our collection and save your favorites!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/products/gents">
          <Button className="bg-primary hover:bg-primary/90 px-8 h-12 rounded-full text-base font-medium transition-all duration-300 transform hover:-translate-y-0.5">
            Explore Products
          </Button>
        </Link>
        <Link href="/products/gents">
          <Button
            variant="outline"
            className="px-8 h-12 rounded-full text-base font-medium border-2 hover:bg-gray-50 transition-all duration-300"
          >
            New Arrivals
          </Button>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-50 rounded-xl opacity-70 hover:opacity-100 transition-opacity duration-300"
          ></div>
        ))}
      </div>
    </div>
  );
}
