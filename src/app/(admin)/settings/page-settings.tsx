'use client';

import { PageHeader } from '@/components/account/page-header';

const AdminSettingsPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage store settings, configuration, and preferences."
      />

      {/* Settings content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show store settings and configuration options.
        </p>
      </div>
    </div>
  );
};

export default AdminSettingsPageContent;
