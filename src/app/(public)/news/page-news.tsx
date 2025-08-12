import Container from '@/components/layout/container';
import NewsClient from '@/components/news/news-client';
import { Breadcrumb } from '@/components/navigation/breadcrumb';

const NewsPageContent = () => {
  return (
    <Container>
      <div className="py-6">
        <Breadcrumb />
      </div>
      <NewsClient />
    </Container>
  );
};

export default NewsPageContent;
