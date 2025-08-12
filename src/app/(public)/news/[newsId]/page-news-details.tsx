import Container from '@/components/layout/container';
import NewsDetailsClient from '@/components/news/news-details-client';
import NewsBreadcrumb from '@/components/news/news-breadcrumb';

const NewsDetailsPageContent = () => {
  return (
    <Container>
      <div className="py-6">
        <NewsBreadcrumb />
      </div>
      <NewsDetailsClient />
    </Container>
  );
};

export default NewsDetailsPageContent;
