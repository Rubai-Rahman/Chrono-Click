'use client';

import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const PaymentMethodsPageContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-8">
            <PageHeader
              title="Payment Methods"
              description="Manage your payment methods and billing information."
            >
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </PageHeader>

            {/* Payment methods content will be implemented here */}
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                This page will show your saved payment methods and cards.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Content from your existing /dashboard/payment will be moved
                here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPageContent;
