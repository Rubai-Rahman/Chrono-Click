'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/render-star';

interface ContentCardProps {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  image?: string;
  author?: string;
  date?: string;
  rating?: number;
  status?: string;
  category?: string;
  tags?: string[];
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'destructive';
    icon?: ReactNode;
  }[];
  badges?: {
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    color?: string;
  }[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export const ContentCard = ({
  title,
  content,
  excerpt,
  image,
  author,
  date,
  rating,
  status,
  category,
  tags,
  actions = [],
  badges = [],
  className = '',
  layout = 'vertical',
}: ContentCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (layout === 'horizontal') {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            {image && (
              <div className="md:w-48 aspect-video md:aspect-square overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {/* Category & Status */}
                  <div className="flex items-center gap-2 mb-2">
                    {category && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary text-xs"
                      >
                        {category}
                      </Badge>
                    )}
                    {badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant={badge.variant || 'secondary'}
                        className={badge.color || ''}
                      >
                        {badge.label}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {title}
                  </h3>

                  {/* Author & Date */}
                  {(author || date) && (
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      {author && <span>By {author}</span>}
                      {date && <span>{formatDate(date)}</span>}
                    </div>
                  )}

                  {/* Rating */}
                  {rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={rating} size="sm" />
                      <span className="text-sm font-medium">{rating}</span>
                    </div>
                  )}

                  {/* Content */}
                  {(excerpt || content) && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {excerpt || content}
                    </p>
                  )}

                  {/* Tags */}
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                {actions.length > 0 && (
                  <div className="flex gap-2 ml-4">
                    {actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant || 'outline'}
                        size="sm"
                        onClick={action.onClick}
                      >
                        {action.icon}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`group overflow-hidden bg-gradient-to-br from-card to-card/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${className}`}
    >
      <CardContent className="p-0">
        {/* Image */}
        {image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {category && (
                <Badge variant="secondary" className="bg-white/90 text-black">
                  {category}
                </Badge>
              )}
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge.variant || 'secondary'}
                  className={badge.color || 'bg-white/90 text-black'}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Category & Status (if no image) */}
          {!image && (category || badges.length > 0) && (
            <div className="flex items-center gap-2">
              {category && (
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary text-xs"
                >
                  {category}
                </Badge>
              )}
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge.variant || 'secondary'}
                  className={badge.color || ''}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Author & Date */}
          {(author || date) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {author && <span>By {author}</span>}
              {date && <span>{formatDate(date)}</span>}
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-2">
              <StarRating rating={rating} size="sm" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          )}

          {/* Content */}
          {(excerpt || content) && (
            <p className="text-muted-foreground text-sm line-clamp-3">
              {excerpt || content}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex gap-2 pt-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'outline'}
                  size="sm"
                  onClick={action.onClick}
                  className="flex-1"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
