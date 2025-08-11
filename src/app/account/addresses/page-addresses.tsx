'use client';

import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AddressesPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="My Addresses"
        description="Manage your shipping and billing addresses."
      >
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </Button>
      </PageHeader>

      {/* Addresses content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show your saved addresses for shipping and billing.
        </p>
      </div>
    </div>
  );
};

export default AddressesPageContent;
