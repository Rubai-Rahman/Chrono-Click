import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Star, ArrowRight } from 'lucide-react';
import { NewsType } from '@/api-lib/news';

interface SingleNewsProps {
  article: NewsType;
  featured?: boolean;
}

const SingleNews = ({ article, featured = false }: SingleNewsProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Gadgets:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Science:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Lifestyle:
        'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      Fashion:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    };
    return (
      colors[category as keyof typeof colors] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    );
  };

  if (featured) {
    return (
      <Card className="group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-card border-0 hover:scale-[1.02]">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={article.img}
            alt={article.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            {article.featured && (
              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            <Badge
              className={`${getCategoryColor(
                article.category
              )} backdrop-blur-sm`}
            >
              {article.category}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary-foreground transition-colors">
              {article.name}
            </h3>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
            {article.details}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.date)}</span>
            </div>
            <Link
              href={`/news/${article._id}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group/link"
            >
              Read More
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card border hover:border-primary/20 hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.img}
          alt={article.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <Badge className={getCategoryColor(article.category)}>
            {article.category}
          </Badge>
        </div>
        {article.featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary/90 text-primary-foreground">
              <Star className="w-3 h-3" />
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {article.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
          {article.details}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(article.date)}</span>
          </div>
          <Link
            href={`/news/${article._id}`}
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium transition-colors group/link"
          >
            Read
            <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleNews;
