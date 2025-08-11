import type { Metadata } from 'next';
import AdminNewsPageContent from './page-news';

export const metadata: Metadata = {
  title: 'News & Content - Admin - Chrono Click',
  description: 'Manage news articles and content.',
};

const AdminNewsPage = () => {
  return <AdminNewsPageContent />;
};

export default AdminNewsPage;
