import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

// Separate component for the data table to enable Suspense

const AdminProductsPageContent = () => {
  return (
    <div>
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

      <div className="container mx-auto py-10">
        <h1>test</h1>
      </div>
    </div>
  );
};

export default AdminProductsPageContent;
