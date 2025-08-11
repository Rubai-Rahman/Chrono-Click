import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from './data-table';
import { columns } from './columns';
import { fetchData } from '@/api-lib/products';
import { useQuery } from '@tanstack/react-query';
import { ProductType } from '@/api-lib/api-type';
import { getProduct } from '@/app/actions/authAction';

const AdminProductsPageContent = async () => {
  // const { data, isLoading } = useQuery<ProductType[], Error>({
  //   queryKey: ['products'],
  //   queryFn: () => fetchData<ProductType[]>('products'),
  // });

  const data = await getProduct();

  console.log();
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

      {/* Products content will be implemented here */}
      <div className="container mx-auto py-10 ">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminProductsPageContent;
