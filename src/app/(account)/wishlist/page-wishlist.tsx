'use client';

import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const WishlistPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="My Wishlist"
        description="Items you've saved for later."
      >
        <Button>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add All to Cart
        </Button>
      </PageHeader>

      {/* Wishlist content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show your saved items and wishlist.
        </p>
      </div>
    </div>
  );
};

export default WishlistPageContent;
