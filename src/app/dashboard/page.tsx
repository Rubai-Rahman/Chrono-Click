import type { Metadata } from 'next';
import DashboardPageContent from './page-dashboard';

export const metadata: Metadata = {
  title: 'Chrono Click - Dashboard',
  description: 'Manage your Chrono Click account and tasks.',
};

const DashboardPage = () => {
  return <DashboardPageContent />;
};

export default DashboardPage;
