'use client';

import { PageHeader } from '@/components/account/page-header';
import { Breadcrumb } from '@/components/navigation/breadcrumb';

const SettingsPageContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb />

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
        </div>
      </div>
    </div>
  );
};

export default SettingsPageContent;
