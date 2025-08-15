'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { CommentType } from '@/api-lib/news';
import CommentReply from './comment-reply';

interface CommentItemProps {
  comment: CommentType;
  onReply: (parentId: string, message: string) => void;
  isAuthenticated: boolean;
  isSubmitting: boolean;
  depth?: number;
  maxDepth?: number;
}

const CommentItem = ({
  comment,
  onReply,
  isAuthenticated,
  isSubmitting,
  depth = 0,
  maxDepth = 3,
}: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(depth === 0); // Top-level comments show replies by default
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString: string) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - commentDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;

    return commentDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year:
        commentDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  console.log('comment', comment);
  const handleReplySubmit = (message: string) => {
    onReply(comment._id, message);
    setShowReplyForm(false);
    setShowReplies(true); // Show replies when a new reply is added
  };

  const canReply = isAuthenticated && depth < maxDepth;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const replyCount = comment.replies?.length || 0;

  return (
    <div className={`${depth > 0 ? 'ml-10 mt-3' : 'mb-6'}`}>
      <div className="flex gap-3">
        <Avatar
          className={`${depth > 0 ? 'w-7 h-7' : 'w-10 h-10'} flex-shrink-0`}
        >
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {getInitials(comment.user)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* Comment Header */}
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`font-medium text-foreground ${
                depth > 0 ? 'text-sm' : ''
              }`}
            >
              {comment.user}
            </span>
            <span
              className={`text-muted-foreground ${
                depth > 0 ? 'text-xs' : 'text-sm'
              }`}
            >
              {formatDate(comment.date)}
            </span>
          </div>

          {/* Comment Content */}
          <div
            className={`bg-muted/30 rounded-2xl px-3 py-2 mb-2 ${
              depth > 0 ? 'text-sm' : ''
            }`}
          >
            <p className="text-foreground leading-relaxed break-words">
              {comment.message}
            </p>
          </div>

          {/* Comment Actions */}
          <div className="flex items-center gap-1 mb-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-auto px-2 py-1 text-xs rounded-full transition-colors ${
                isLiked
                  ? 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`w-3 h-3 mr-1 ${isLiked ? 'fill-current' : ''}`}
              />
              {comment.likes || 0}
            </Button>

            {canReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Reply
              </Button>
            )}
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mb-3">
              <CommentReply
                onSubmit={handleReplySubmit}
                onCancel={() => setShowReplyForm(false)}
                isSubmitting={isSubmitting}
                placeholder={`Reply to ${comment.user}...`}
              />
            </div>
          )}

          {/* Show/Hide Replies Button */}
          {hasReplies && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-0 py-1 text-xs text-primary hover:text-primary/80 font-medium mb-2"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Hide {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  View {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                </>
              )}
            </Button>
          )}

          {/* Nested Replies */}
          {hasReplies && showReplies && (
            <div className="space-y-0">
              {comment.replies?.map((reply, index) => (
                <div key={reply._id}>
                  <CommentItem
                    comment={reply}
                    onReply={onReply}
                    isAuthenticated={isAuthenticated}
                    isSubmitting={isSubmitting}
                    depth={depth + 1}
                    maxDepth={maxDepth}
                  />
                  {/* Add a subtle separator between replies except for the last one */}
                  {index < comment.replies!.length - 1 && (
                    <div className="ml-10 border-l border-muted/30 h-3" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
