import type { Metadata } from 'next';
import AddNewsPageContent from './page-addNews';

export const metadata: Metadata = {
  title: 'Add News - Chrono Click',
  description: 'Create and publish news articles and announcements.',
};

const AddNewsPage = () => {
  return <AddNewsPageContent />;
};

export default AddNewsPage;
