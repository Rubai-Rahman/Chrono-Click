'use client';

import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { ShoppingCart } from 'lucide-react';

const WishlistPageContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb />

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
        </div>
      </div>
    </div>
  );
};

export default WishlistPageContent;
