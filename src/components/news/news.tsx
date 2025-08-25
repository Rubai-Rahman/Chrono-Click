import SingleNews from './single-news';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star } from 'lucide-react';
import { NewsResponse, NewsType } from '@/data/news/news';

interface NewsProps {
  news: NewsResponse | NewsType[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const News = ({ news, totalPages, currentPage, onPageChange }: NewsProps) => {
  // Handle the actual API response structure - data might be direct array or nested
  const newsData = Array.isArray(news) ? news : news.data || [];
  const newsCount = Array.isArray(news) ? news.length : news.count || 0;

  const featuredNews = newsData.filter((article) => article.featured);
  const allNews = newsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-3xl p-8 md:p-16 mb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight font-serif bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Latest News & Insights
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest trends, innovations, and stories from
            the world of luxury timepieces
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            {newsCount} Articles Available
          </Badge>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredNews.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground font-serif">
              Featured Stories
            </h2>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredNews.map((article) => (
              <SingleNews key={article._id} article={article} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground font-serif">
            All Articles
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allNews.map((article) => (
            <SingleNews key={article._id} article={article} />
          ))}
        </div>
      </section>

      {/* Pagination Section */}
      <section className="mt-16 pt-8 border-t border-border/50">
        <div className="flex flex-col items-center gap-6">
          {/* Pagination Info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Showing {allNews.length} of {newsCount} articles
            </p>
            {totalPages > 1 && (
              <p className="text-xs text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage === 0) return;
                      onPageChange(currentPage - 1);
                    }}
                    className={
                      currentPage === 0
                        ? 'opacity-50 pointer-events-none select-none'
                        : 'hover:bg-primary/10 transition-all duration-200 hover:scale-105'
                    }
                    aria-disabled={currentPage === 0}
                  />
                </PaginationItem>

                {/* Show first page if not in first few pages */}
                {currentPage > 2 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(0);
                        }}
                        className="hover:bg-primary/10 transition-colors"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {currentPage > 3 && (
                      <PaginationItem>
                        <span className="px-2 text-muted-foreground">...</span>
                      </PaginationItem>
                    )}
                  </>
                )}

                {/* Show current page and surrounding pages */}
                {[...Array(totalPages)].map((_, index) => {
                  if (
                    index === currentPage ||
                    index === currentPage - 1 ||
                    index === currentPage + 1 ||
                    (currentPage <= 1 && index <= 2) ||
                    (currentPage >= totalPages - 2 && index >= totalPages - 3)
                  ) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          isActive={index === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            onPageChange(index);
                          }}
                          className={
                            index === currentPage
                              ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                              : 'hover:bg-primary/10 transition-all duration-200 hover:scale-105'
                          }
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                {/* Show last page if not in last few pages */}
                {currentPage < totalPages - 3 && (
                  <>
                    {currentPage < totalPages - 4 && (
                      <PaginationItem>
                        <span className="px-2 text-muted-foreground">...</span>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(totalPages - 1);
                        }}
                        className="hover:bg-primary/10 transition-colors"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage === totalPages - 1) return;
                      onPageChange(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages - 1
                        ? 'opacity-50 pointer-events-none select-none'
                        : 'hover:bg-primary/10 transition-all duration-200 hover:scale-105'
                    }
                    aria-disabled={currentPage === totalPages - 1}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          {/* Load More Button Alternative (if you prefer) */}
          {totalPages === 1 && newsCount > allNews.length && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                All articles loaded
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
