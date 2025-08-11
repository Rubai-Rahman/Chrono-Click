import type { Metadata } from 'next';
import AdminProductsPageContent from './page-products';

export const metadata: Metadata = {
  title: 'Products - Admin - Chrono Click',
  description: 'Manage your product inventory.',
};

const AdminProductsPage = () => {
  return <AdminProductsPageContent />;
};

export default AdminProductsPage;
