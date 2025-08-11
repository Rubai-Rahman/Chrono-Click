import Container from '@/components/layout/container';

const NewsPageContent = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold">Latest News</h1>
      <p className="mt-4">Check out our recent articles and updates.</p>
      {/* You would typically fetch and display a list of news articles here */}
    </Container>
  );
};

export default NewsPageContent;
