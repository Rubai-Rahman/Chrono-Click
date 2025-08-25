'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Edit3,
  Trash2,
  Loader2,
} from 'lucide-react';
import CommentReply from './comment-reply';
import CommentEdit from './comment-edit';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CommentType } from '@/data/news/news';

interface CommentItemProps {
  comment: CommentType;
  onReply: (parentId: string, message: string) => void;
  onEdit: (commentId: string, message: string) => void;
  onDelete: (commentId: string) => void;
  onReact: (commentId: string, reaction: 'like' | 'dislike' | 'remove') => void;
  isAuthenticated: boolean;
  isSubmitting: boolean;
  currentUser?: string;
  depth?: number;
  maxDepth?: number;
}

const CommentItem = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onReact,
  isAuthenticated,
  isSubmitting,
  currentUser,
  depth = 0,
  maxDepth = 3,
}: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(depth === 0); // Top-level comments show replies by default
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(
    comment.userReaction || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReacting, setIsReacting] = useState<'like' | 'dislike' | null>(null);

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
  const handleReplySubmit = (message: string) => {
    onReply(comment._id, message);
    setShowReplyForm(false);
    setShowReplies(true); // Show replies when a new reply is added
  };

  const handleEditSubmit = (message: string) => {
    onEdit(comment._id, message);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setIsDeleting(true);
      try {
        await onDelete(comment._id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleReaction = async (reaction: 'like' | 'dislike') => {
    if (!isAuthenticated || isReacting) return;

    setIsReacting(reaction);

    let newReaction: 'like' | 'dislike' | 'remove';
    const previousReaction = userReaction;

    if (userReaction === reaction) {
      // If clicking the same reaction, remove it
      newReaction = 'remove';
      setUserReaction(null);
    } else {
      // If clicking a different reaction or no reaction, set the new one
      newReaction = reaction;
      setUserReaction(reaction);
    }

    try {
      await onReact(comment._id, newReaction);
    } catch (error) {
      console.error('Failed to react to comment:', error);
      // Revert the optimistic update on error
      setUserReaction(previousReaction);
    } finally {
      setIsReacting(null);
    }
  };

  const canReply = isAuthenticated && depth < maxDepth;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const replyCount = comment.replies?.length || 0;
  const isOwner = currentUser === comment.user;
  const canEdit = isAuthenticated && isOwner;
  const canDelete = isAuthenticated && isOwner;

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
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
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
              {comment.isEdited && (
                <span className="text-xs text-muted-foreground italic">
                  (edited)
                </span>
              )}
            </div>

            {/* Comment Options Menu */}
            {(canEdit || canDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  {canEdit && (
                    <DropdownMenuItem
                      onClick={() => setIsEditing(true)}
                      className="text-sm"
                    >
                      <Edit3 className="w-3 h-3 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  {canDelete && (
                    <DropdownMenuItem
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-2" />
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Comment Content */}
          {isEditing ? (
            <div className="mb-2">
              <CommentEdit
                initialMessage={comment.message}
                onSave={handleEditSubmit}
                onCancel={() => setIsEditing(false)}
                isSubmitting={isSubmitting}
              />
            </div>
          ) : (
            <div
              className={`bg-muted/30 rounded-2xl px-3 py-2 mb-2 ${
                depth > 0 ? 'text-sm' : ''
              }`}
            >
              <p className="text-foreground leading-relaxed break-words">
                {comment.message}
              </p>
            </div>
          )}

          {/* Comment Actions */}
          {!isEditing && (
            <div className="flex items-center gap-1 mb-2">
              {/* Like Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`h-auto px-2 py-1 text-xs rounded-full transition-all duration-200 ${
                  userReaction === 'like'
                    ? 'text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${
                  isReacting === 'like' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                onClick={() => handleReaction('like')}
                disabled={!isAuthenticated || isReacting !== null}
                title={
                  !isAuthenticated
                    ? 'Login to like'
                    : isReacting === 'like'
                    ? 'Processing...'
                    : 'Like'
                }
              >
                {isReacting === 'like' ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <ThumbsUp
                    className={`w-3 h-3 mr-1 ${
                      userReaction === 'like' ? 'fill-current' : ''
                    }`}
                  />
                )}
                {comment.likes || 0}
              </Button>

              {/* Dislike Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`h-auto px-2 py-1 text-xs rounded-full transition-all duration-200 ${
                  userReaction === 'dislike'
                    ? 'text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${
                  isReacting === 'dislike'
                    ? 'opacity-70 cursor-not-allowed'
                    : ''
                }`}
                onClick={() => handleReaction('dislike')}
                disabled={!isAuthenticated || isReacting !== null}
                title={
                  !isAuthenticated
                    ? 'Login to dislike'
                    : isReacting === 'dislike'
                    ? 'Processing...'
                    : 'Dislike'
                }
              >
                {isReacting === 'dislike' ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <ThumbsDown
                    className={`w-3 h-3 mr-1 ${
                      userReaction === 'dislike' ? 'fill-current' : ''
                    }`}
                  />
                )}
                {comment.dislikes || 0}
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
          )}

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
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReact={onReact}
                    isAuthenticated={isAuthenticated}
                    isSubmitting={isSubmitting}
                    currentUser={currentUser}
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
