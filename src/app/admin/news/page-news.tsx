'use client';

import { PageHeader } from '@/components/account/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const AdminNewsPageContent = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="News & Content"
        description="Manage news articles, announcements, and content."
      >
        <Button asChild>
          <Link href="/admin/news/new">
            <Plus className="w-4 h-4 mr-2" />
            Add News Article
          </Link>
        </Button>
      </PageHeader>

      {/* News content will be implemented here */}
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          This page will show news and content management interface.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Content from your existing /dashboard/addNews will be moved here.
        </p>
      </div>
    </div>
  );
};

export default AdminNewsPageContent;
