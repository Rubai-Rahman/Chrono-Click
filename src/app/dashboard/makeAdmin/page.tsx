import type { Metadata } from 'next';
import MakeAdminPageContent from './page-makeAdmin';

export const metadata: Metadata = {
  title: 'Make Admin - Chrono Click',
  description: 'Manage user roles and permissions.',
};

const MakeAdminPage = () => {
  return <MakeAdminPageContent />;
};

export default MakeAdminPage;
