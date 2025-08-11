'use client';

import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const OrdersPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="My Orders"
        description="View and track your order history and status."
      >
        <Button asChild>
          <Link href="/products">
            <Plus className="w-4 h-4 mr-2" />
            Shop More
          </Link>
        </Button>
      </PageHeader>

      {/* Orders content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show your order history and tracking information.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Content from your existing /dashboard/myOrders will be moved here.
        </p>
      </div>
    </div>
  );
};

export default OrdersPageContent;
