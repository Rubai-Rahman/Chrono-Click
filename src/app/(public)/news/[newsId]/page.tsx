import type { Metadata } from 'next';
import NewsDetailsPageContent from './page-news-details';

export async function generateMetadata({
  params,
}: {
  params: { newsId: string };
}): Promise<Metadata> {
  // Default metadata in case of any issues
  const defaultMetadata: Metadata = {
    title: 'News Article - Chrono Click',
    description:
      'Read the latest news and insights from the world of luxury timepieces.',
    keywords: [
      'watch news',
      'luxury timepiece news',
      'chronograph news',
      'watch trends',
      'timepiece insights',
    ],
  };

  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Check if API base URL is available
    if (!apiBaseUrl) {
      console.warn('NEXT_PUBLIC_API_BASE_URL is not defined');
      return defaultMetadata;
    }

    const response = await fetch(`${apiBaseUrl}/news/${params.newsId}`, {
      // Add timeout and error handling
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(`Failed to fetch news details: ${response.status}`);
      return defaultMetadata;
    }

    const newsDetails = await response.json();

    // Validate that we have the required data
    if (!newsDetails || !newsDetails.name) {
      return defaultMetadata;
    }

    return {
      title: `${newsDetails.name} - Chrono Click News`,
      description: newsDetails.details
        ? newsDetails.details.substring(0, 160) + '...'
        : 'Read this interesting article about luxury timepieces.',
      keywords: [
        'watch news',
        'luxury timepiece news',
        newsDetails.category?.toLowerCase() || 'watches',
        'chronograph news',
        'watch trends',
        newsDetails.author?.toLowerCase() || 'timepiece expert',
      ].filter(Boolean), // Remove any undefined values
    };
  } catch (fetchError) {
    console.warn('Error generating metadata for news article:', fetchError);
    return defaultMetadata;
  }
}

const NewsDetailsPage = () => {
  return <NewsDetailsPageContent />;
};

export default NewsDetailsPage;
