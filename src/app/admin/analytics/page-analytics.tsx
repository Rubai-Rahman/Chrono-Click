'use client';

import { PageHeader } from '@/components/account/page-header';

const AdminAnalyticsPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        description="View store analytics and performance metrics."
      />

      {/* Analytics content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show analytics dashboard with charts and metrics.
        </p>
      </div>
    </div>
  );
};

export default AdminAnalyticsPageContent;
