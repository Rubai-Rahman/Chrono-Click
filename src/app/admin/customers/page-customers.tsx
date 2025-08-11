'use client';

import { PageHeader } from '@/components/account/page-header';

const AdminCustomersPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Customers"
        description="Manage customer accounts and permissions."
      />

      {/* Customers content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show customer management interface.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Content from your existing /dashboard/makeAdmin will be moved here.
        </p>
      </div>
    </div>
  );
};

export default AdminCustomersPageContent;
