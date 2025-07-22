'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { ReviewableProductType } from '@/app/dashboard/review/page-review';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ContentCard } from '@/components/ui/content-card';
import {
  Star,
  MessageSquare,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
} from 'lucide-react';

interface ReviewManagerProps {
  products: ReviewableProductType[];
}

interface ReviewFormData {
  productId: string;
  rating: number;
  comment: string;
}

const ReviewManager = ({ products }: ReviewManagerProps) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ReviewableProductType | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const submitReviewMutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewableProducts'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
      setSelectedProduct(null);
      setRating(0);
      setComment('');
      setIsEditing(false);
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: async (data: ReviewFormData & { reviewId: string }) => {
      const response = await fetch(`/api/reviews/${data.reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewableProducts'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
      setSelectedProduct(null);
      setRating(0);
      setComment('');
      setIsEditing(false);
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewableProducts'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });

  const handleSubmitReview = () => {
    if (!selectedProduct || rating === 0 || !comment.trim()) return;

    const reviewData = {
      productId: selectedProduct._id,
      rating,
      comment: comment.trim(),
    };

    if (isEditing && selectedProduct.reviewId) {
      updateReviewMutation.mutate({
        ...reviewData,
        reviewId: selectedProduct.reviewId,
      });
    } else {
      submitReviewMutation.mutate(reviewData);
    }
  };

  const handleEditReview = (product: ReviewableProductType) => {
    setSelectedProduct(product);
    setIsEditing(true);
    // In a real app, you'd fetch the existing review data
    setRating(5); // Mock data
    setComment('Great product! Really satisfied with the quality.');
  };

  const handleDeleteReview = (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isActive = interactive
        ? starValue <= (hoveredStar || rating)
        : starValue <= currentRating;

      return (
        <button
          key={index}
          type="button"
          className={`${
            interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          } transition-all duration-200`}
          onClick={interactive ? () => setRating(starValue) : undefined}
          onMouseEnter={
            interactive ? () => setHoveredStar(starValue) : undefined
          }
          onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
          disabled={!interactive}
        >
          <Star
            className={`w-6 h-6 ${
              isActive ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const pendingReviews = products.filter((p) => !p.hasReview);
  const completedReviews = products.filter((p) => p.hasReview);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-primary" />
          Product Reviews
        </h1>
        <p className="text-muted-foreground mt-2">
          Share your experience and help other customers make informed decisions
        </p>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            Pending Reviews ({pendingReviews.length})
          </h2>
          <div className="grid gap-4">
            {pendingReviews.map((product) => (
              <ContentCard
                key={product._id}
                id={product._id}
                title={product.name}
                image={product.img}
                date={product.orderDate}
                content={`Order #${product.orderId} • $${product.price.toFixed(
                  2
                )}`}
                layout="horizontal"
                badges={[
                  {
                    label: 'Pending Review',
                    variant: 'secondary',
                    color: 'bg-orange-100 text-orange-800',
                  },
                ]}
                actions={[
                  {
                    label: 'Write Review',
                    onClick: () => setSelectedProduct(product),
                    variant: 'default',
                  },
                ]}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Reviews */}
      {completedReviews.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Your Reviews ({completedReviews.length})
          </h2>
          <div className="grid gap-4">
            {completedReviews.map((product) => (
              <Card key={product._id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={product.img || '/default.webp'}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Reviewed on {formatDate(product.orderDate)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {renderStars(5)} {/* Mock rating */}
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Published
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditReview(product)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              product.reviewId &&
                              handleDeleteReview(product.reviewId)
                            }
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        "Great product! Really satisfied with the quality and
                        design. Would definitely recommend to others."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Products Message */}
      {products.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No products to review
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Purchase products to be able to write reviews and share your
              experience.
            </p>
            <Button asChild>
              <a href="/product">Start Shopping</a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Review Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>
                {isEditing ? 'Edit Review' : 'Write Review'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Info */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-16 h-16 bg-background rounded-lg overflow-hidden">
                  <Image
                    src={selectedProduct.img || '/default.webp'}
                    alt={selectedProduct.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(rating, true)}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {rating > 0
                      ? `${rating} out of 5 stars`
                      : 'Select a rating'}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium mb-2"
                >
                  Your Review *
                </label>
                <Textarea
                  id="comment"
                  placeholder="Share your experience with this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {comment.length}/500 characters
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProduct(null);
                    setRating(0);
                    setComment('');
                    setIsEditing(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={
                    rating === 0 ||
                    !comment.trim() ||
                    submitReviewMutation.isPending ||
                    updateReviewMutation.isPending
                  }
                  className="flex-1"
                >
                  {submitReviewMutation.isPending ||
                  updateReviewMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {isEditing ? 'Updating...' : 'Submitting...'}
                    </>
                  ) : isEditing ? (
                    'Update Review'
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReviewManager;
