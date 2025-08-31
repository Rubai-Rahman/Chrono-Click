import Container from '@/components/layout/container';
import NewsDetailsClient from '@/components/news/news-details-client';
import { fetchNewsDetails } from '@/data/news/news.server';

const NewsDetailsPageContent = async ({ newsId }: { newsId: string }) => {
  console.log('newsId', newsId);
  const newsData = await fetchNewsDetails(newsId);

  // if (!newsData.success || !newsData.data) return <ErrorResultMessage />;
  console.log('newsData', newsData);
  return (
    <Container>
      <NewsDetailsClient newsDetails={newsData} />
    </Container>
  );
};

export default NewsDetailsPageContent;
