'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsType } from '@/api-lib/api-type';

interface NewsItemProps {
  item: NewsType;
}

const NewsItem = ({ item }: NewsItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <Image
            src={item.img || '/placeholder.svg?height=240&width=400&text=News'}
            alt={item.name}
            width={400}
            height={240}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Featured Badge */}
          {item.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              Featured
            </Badge>
          )}

          {/* Category Badge */}
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 bg-white/90 text-foreground"
          >
            {item.category}
          </Badge>

          {/* Bookmark Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-3 right-3 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Meta Information */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(item.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{item.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
            {item.name}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
            {item.details}
          </p>

          {/* Author and Read More */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.author}
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/10 group/btn"
            >
              <Link
                href={`/news/${item._id}`}
                className="flex items-center gap-1"
              >
                Read More
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsItem;
