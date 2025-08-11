'use client';

import { PageHeader } from '@/components/account/page-header';

const SettingsPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Account Settings"
        description="Manage your account preferences, notifications, and privacy settings."
      />

      {/* Settings content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show account settings, preferences, and privacy
          options.
        </p>
      </div>
    </div>
  );
};

export default SettingsPageContent;
