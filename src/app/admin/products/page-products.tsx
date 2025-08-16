import { Suspense } from 'react';
import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getProduct } from '@/app/actions/authAction';
import { TableFallback } from '@/components/layout/suspense-wrapper';

// Separate component for the data table to enable Suspense
async function ProductsDataTable() {
  const data = await getProduct();
  return <DataTable columns={columns} data={data} />;
}

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
        <Suspense fallback={<TableFallback />}>
          <ProductsDataTable />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminProductsPageContent;
