'use client';

import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const AdminProductsPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Products"
        description="Manage your product inventory and catalog."
      >
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </PageHeader>

      {/* Products content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show your product management interface.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Content from your existing /dashboard/addProduct and
          /dashboard/manageProduct will be moved here.
        </p>
      </div>
    </div>
  );
};

export default AdminProductsPageContent;
