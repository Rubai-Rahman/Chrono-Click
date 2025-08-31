import Container from '@/components/layout/container';
import NewsDetailsClient from '@/components/news/news-details-client';
import { fetchNewsDetails } from '@/data/news/news.server';

const NewsDetailsPageContent = async ({ newsId }: { newsId: string }) => {
  const newsData = await fetchNewsDetails(newsId);

  return (
    <Container>
      <NewsDetailsClient newsDetails={newsData} />
    </Container>
  );
};

export default NewsDetailsPageContent;
