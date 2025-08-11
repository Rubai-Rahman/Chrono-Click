import type { Metadata } from 'next';
import AdminAnalyticsPageContent from './page-analytics';

export const metadata: Metadata = {
  title: 'Analytics - Admin - Chrono Click',
  description: 'View store analytics and performance metrics.',
};

const AdminAnalyticsPage = () => {
  return <AdminAnalyticsPageContent />;
};

export default AdminAnalyticsPage;
