import { NewsType } from '@/lib/types/api/new-types';
import Container from '@/components/layout/container';
import NewsClient from '@/components/news/news-client';
import { fetchNewsData } from '@/data/news/news.server';

const NewsPageContent = async () => {
  const newsResult = await fetchNewsData<NewsType[]>('news', {
    next: { tags: ['news'] },
  });
  console.log(newsResult, 'newsResult');
  return (
    <Container>
      <NewsClient />
    </Container>
  );
};

export default NewsPageContent;
