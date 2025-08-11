'use client';

import { PageHeader } from '@/components/account/page-header';

const AdminOrdersPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Orders"
        description="Manage customer orders and fulfillment."
      />

      {/* Orders content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show order management interface.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Content from your existing /dashboard/manageOrders will be moved here.
        </p>
      </div>
    </div>
  );
};

export default AdminOrdersPageContent;
